import { z } from 'zod'

export const scaffoldNodeServiceSchema = {
  appName: z.string().describe('App name in kebab-case'),
  vendor: z.string().describe('VTEX account vendor name'),
  routes: z
    .array(
      z.object({
        name: z.string().describe('Route handler name (camelCase, e.g. "getOrder")'),
        path: z
          .string()
          .describe('HTTP path with optional params (e.g. "/_v/order/:orderId")'),
        public: z
          .boolean()
          .optional()
          .describe('Whether the route is publicly accessible (default: false)'),
        method: z
          .enum(['GET', 'POST', 'PUT', 'DELETE', 'PATCH'])
          .optional()
          .describe('HTTP method (default: GET)'),
      })
    )
    .optional()
    .describe('HTTP routes to expose'),
  events: z
    .array(
      z.object({
        name: z.string().describe('Event handler name (camelCase, e.g. "onOrderCreated")'),
        sender: z.string().describe('Event sender app (e.g. "vtex.orders-broadcast")'),
        keys: z
          .array(z.string())
          .describe('Event keys to listen to (e.g. ["order.created"])'),
      })
    )
    .optional()
    .describe('Event handlers to register'),
  memory: z.number().optional().describe('Memory in MB (default: 256, max: 512)'),
  timeout: z.number().optional().describe('Request timeout in seconds (default: 10)'),
}

export async function scaffoldNodeService({
  appName,
  vendor,
  routes = [],
  events = [],
  memory = 256,
  timeout = 10,
}: {
  appName: string
  vendor: string
  routes?: Array<{ name: string; path: string; public?: boolean; method?: string }>
  events?: Array<{ name: string; sender: string; keys: string[] }>
  memory?: number
  timeout?: number
}): Promise<{ content: Array<{ type: 'text'; text: string }> }> {
  const files: Record<string, string> = {}

  // service.json
  const serviceJson: Record<string, unknown> = {
    memory,
    timeout,
    minReplicas: 1,
    maxReplicas: 2,
    workers: 1,
  }

  if (routes.length > 0) {
    const routesObj: Record<string, unknown> = {}
    for (const r of routes) {
      routesObj[r.name] = {
        path: r.path,
        public: r.public ?? false,
      }
    }
    serviceJson.routes = routesObj
  } else {
    serviceJson.routes = {}
  }

  if (events.length > 0) {
    const eventsObj: Record<string, unknown> = {}
    for (const e of events) {
      eventsObj[e.name] = {
        sender: e.sender,
        keys: e.keys,
      }
    }
    serviceJson.events = eventsObj
  } else {
    serviceJson.events = {}
  }

  files['node/service.json'] = JSON.stringify(serviceJson, null, 2)

  // package.json
  files['node/package.json'] = JSON.stringify(
    {
      name: appName,
      version: '1.0.0',
      main: 'index.js',
      license: 'UNLICENSED',
      dependencies: {
        '@vtex/api': '6.x',
      },
      devDependencies: {
        typescript: '^4.0.0',
      },
    },
    null,
    2
  )

  // tsconfig.json
  files['node/tsconfig.json'] = JSON.stringify(
    {
      extends: 'vtex.tsconfig/node',
      include: ['node'],
    },
    null,
    2
  )

  // clients/index.ts
  files['node/clients/index.ts'] = `import { IOClients } from '@vtex/api'

// Add your custom clients here
export class Clients extends IOClients {}
`

  // Generate middleware files for routes
  for (const route of routes) {
    const paramNames =
      route.path.match(/:(\w+)/g)?.map((p) => p.slice(1)) ?? []
    const paramsDestructure = paramNames.length > 0 ? paramNames.join(', ') : ''
    const handlerContent = `import type { Context } from '..'

export async function ${route.name}(ctx: Context, next: () => Promise<unknown>) {
  ${paramsDestructure ? `const { ${paramsDestructure} } = ctx.vtex.route.params\n` : ''}
  ctx.status = 200
  ctx.body = {
    status: 'ok',
    route: '${route.name}',
  }

  await next()
}
`
    files[`node/middlewares/${route.name}.ts`] = handlerContent
  }

  // Generate middleware files for events
  for (const event of events) {
    files[`node/middlewares/${event.name}.ts`] = `import type { EventContext } from '@vtex/api'
import type { Clients } from '../clients'

export async function ${event.name}(ctx: EventContext<Clients>) {
  const { body } = ctx

  ctx.vtex.logger.info({
    message: 'Event received',
    event: '${event.name}',
    body,
  })
}
`
  }

  // index.ts — route imports
  const routeImports = routes
    .map((r) => `import { ${r.name} } from './middlewares/${r.name}'`)
    .join('\n')
  const eventImports = events
    .map((e) => `import { ${e.name} } from './middlewares/${e.name}'`)
    .join('\n')

  const methodImport = routes.length > 0 ? ', method' : ''

  const routeHandlers =
    routes.length > 0
      ? `\n  routes: {\n${routes.map((r) => `    ${r.name}: method(['${r.method ?? 'GET'}'], [${r.name}]),`).join('\n')}\n  },`
      : ''

  const eventHandlers =
    events.length > 0
      ? `\n  events: {\n${events.map((e) => `    ${e.name}: [${e.name}],`).join('\n')}\n  },`
      : ''

  files['node/index.ts'] = `import { Service, ServiceContext${methodImport} } from '@vtex/api'
import { Clients } from './clients'
${routeImports}
${eventImports}

declare global {
  type Context = ServiceContext<Clients>
}

export default new Service<Clients>({
  clients: {
    implementation: Clients,
    options: {
      default: {
        retries: 2,
        timeout: ${timeout * 1000},
      },
    },
  },${routeHandlers}${eventHandlers}
})
`

  // Build output
  const sections = [
    `# Node.js Service Scaffold: \`${vendor}.${appName}\``,
    '',
    '## Files Generated',
    '',
  ]

  for (const [filePath, content] of Object.entries(files)) {
    const ext = filePath.split('.').pop() ?? 'txt'
    const lang = ext === 'json' ? 'json' : ext === 'ts' ? 'typescript' : 'text'
    sections.push(`### \`${filePath}\``)
    sections.push(`\`\`\`${lang}`)
    sections.push(content)
    sections.push('```')
    sections.push('')
  }

  sections.push('## Setup Instructions')
  sections.push('')
  sections.push('1. Make sure your `manifest.json` includes the `node` builder:')
  sections.push('   ```json')
  sections.push('   { "builders": { "node": "6.x" } }')
  sections.push('   ```')
  sections.push('2. Install dependencies: `cd node && npm install`')
  sections.push('3. Link the app: `vtex link`')
  sections.push('')
  sections.push('## Important: Policies')
  sections.push('')
  sections.push(
    'VTEX IO Node services run inside a VPC. To access external APIs or VTEX internal APIs, you must declare the required policies in your `manifest.json`:'
  )
  sections.push('')
  sections.push('```json')
  sections.push(
    JSON.stringify(
      {
        policies: [
          {
            name: 'outbound-access',
            attrs: {
              host: 'api.example.com',
              path: '/*',
            },
          },
          {
            name: 'ADMIN_DS',
          },
        ],
      },
      null,
      2
    )
  )
  sections.push('```')
  sections.push('')
  sections.push('Common policies:')
  sections.push(
    '- `outbound-access` — Access external HTTP endpoints (requires host and path)'
  )
  sections.push('- `ADMIN_DS` — Access VTEX Admin APIs')
  sections.push('- `vbase-read-write` — Read/write to VBase storage')
  sections.push('- `AppSettings` — Read app settings')
  sections.push('')
  sections.push(
    'See: https://developers.vtex.com/docs/guides/vtex-io-documentation-policies'
  )
  if (routes.length > 0) {
    sections.push('')
    sections.push('## Routes Available')
    for (const r of routes) {
      sections.push(
        `- \`${r.method ?? 'GET'} ${r.path}\` → \`${r.name}\` (${r.public ? 'public' : 'private'})`
      )
    }
  }

  return { content: [{ type: 'text', text: sections.join('\n') }] }
}
