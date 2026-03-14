import { z } from 'zod'

export const scaffoldVtexAppSchema = {
  appName: z
    .string()
    .describe(
      'App name in kebab-case (e.g. "my-store-theme", "product-recommender")'
    ),
  vendor: z.string().describe('VTEX account vendor name (e.g. "mystore", "vtex")'),
  builders: z
    .array(
      z.enum([
        'store',
        'react',
        'node',
        'graphql',
        'styles',
        'messages',
        'admin',
        'pixel',
        'docs',
      ])
    )
    .describe('List of VTEX IO builders to include in the app'),
  version: z.string().optional().describe('App version (default: "0.0.1")'),
  description: z.string().optional().describe('App description'),
}

const BUILDER_VERSIONS: Record<string, string> = {
  store: '0.x',
  react: '3.x',
  node: '6.x',
  graphql: '1.x',
  styles: '2.x',
  messages: '1.x',
  admin: '0.x',
  pixel: '0.x',
  docs: '0.x',
}

function generateManifest(
  vendor: string,
  appName: string,
  version: string,
  builders: string[],
  description?: string
): string {
  const buildersObj: Record<string, string> = {}
  for (const b of builders) {
    buildersObj[b] = BUILDER_VERSIONS[b] ?? '0.x'
  }

  const manifest: Record<string, unknown> = {
    vendor,
    name: appName,
    version,
    title: appName
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' '),
    description: description ?? `VTEX IO app: ${appName}`,
    mustUpdateAt: new Date().toISOString().split('T')[0],
    builders: buildersObj,
    dependencies: {} as Record<string, string>,
    $schema:
      'https://raw.githubusercontent.com/vtex/node-vtex-api/master/gen/manifest.schema',
  }

  if (builders.includes('node')) {
    manifest.policies = []
  }

  const deps = manifest.dependencies as Record<string, string>

  // Add common dependencies based on builders
  if (builders.includes('store')) {
    deps['vtex.store'] = '2.x'
    deps['vtex.store-header'] = '2.x'
    deps['vtex.product-price'] = '1.x'
  }
  if (builders.includes('react') && !builders.includes('store')) {
    deps['vtex.css-handles'] = '0.x'
  }

  return JSON.stringify(manifest, null, 2)
}

function generateStoreFiles(): Record<string, string> {
  return {
    'store/blocks.jsonc': `// Blocks definitions for your store theme
// See: https://developers.vtex.com/docs/guides/vtex-io-documentation-store-builder
{
  "store.home": {
    "blocks": [
      "rich-text#home-title"
    ]
  },
  "rich-text#home-title": {
    "props": {
      "text": "# Welcome to Our Store",
      "textPosition": "CENTER",
      "textAlignment": "CENTER"
    }
  }
}`,
    'store/interfaces.json': `{}`,
    'store/routes.json': `{}`,
  }
}

function generateReactFiles(vendor: string, appName: string): Record<string, string> {
  const componentName = appName
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join('')

  return {
    [`react/${componentName}.tsx`]: `import React from 'react'
import { useCssHandles } from 'vtex.css-handles'

const CSS_HANDLES = ['container', 'title'] as const

interface Props {
  title?: string
}

const ${componentName}: React.FC<Props> = ({ title = 'Hello VTEX IO' }) => {
  const handles = useCssHandles(CSS_HANDLES)

  return (
    <div className={handles.container}>
      <h1 className={handles.title}>{title}</h1>
    </div>
  )
}

export default ${componentName}
`,
    'react/tsconfig.json': JSON.stringify(
      {
        extends: 'vtex.tsconfig/react',
        include: ['react'],
      },
      null,
      2
    ),
  }
}

function generateNodeFiles(vendor: string, appName: string): Record<string, string> {
  return {
    'node/index.ts': `import { Service, ServiceContext } from '@vtex/api'
import { Clients } from './clients'

declare global {
  type Context = ServiceContext<Clients>
}

export default new Service<Clients>({
  clients: {
    implementation: Clients,
    options: {
      default: {
        retries: 2,
        timeout: 10000,
      },
    },
  },
})
`,
    'node/clients/index.ts': `import { IOClients } from '@vtex/api'

// Extend this class to add custom clients
export class Clients extends IOClients {}
`,
    'node/service.json': JSON.stringify(
      {
        memory: 256,
        timeout: 10,
        minReplicas: 1,
        maxReplicas: 2,
        workers: 1,
        routes: {},
        events: {},
      },
      null,
      2
    ),
    'node/package.json': JSON.stringify(
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
    ),
    'node/tsconfig.json': JSON.stringify(
      {
        extends: 'vtex.tsconfig/node',
        include: ['node'],
      },
      null,
      2
    ),
  }
}

function generateGraphqlFiles(appName: string): Record<string, string> {
  return {
    'graphql/schema.graphql': `# GraphQL schema for ${appName}
type Query {
  # Add your queries here
  hello: String
}

type Mutation {
  # Add your mutations here
}
`,
    'graphql/resolvers/Query/hello.ts': `export const hello = async (_: unknown, __: unknown) => {
  return 'Hello from ${appName}!'
}
`,
  }
}

function generateStylesFiles(): Record<string, string> {
  return {
    'styles/configs/font-faces.json': '{}',
    'styles/configs/style.json': JSON.stringify(
      {
        typography: {
          'font-family': 'sans-serif',
        },
        semanticColors: {
          background: {
            base: '#FFFFFF',
            'base--inverted': '#03044E',
          },
          text: {
            default: '#2E2E2E',
          },
          action: {
            primary: '#F71963',
          },
        },
      },
      null,
      2
    ),
  }
}

function generateMessagesFiles(): Record<string, string> {
  return {
    'messages/en.json': '{}',
    'messages/pt.json': '{}',
    'messages/es.json': '{}',
  }
}

export async function scaffoldVtexApp({
  appName,
  vendor,
  builders,
  version = '0.0.1',
  description,
}: {
  appName: string
  vendor: string
  builders: string[]
  version?: string
  description?: string
}): Promise<{ content: Array<{ type: 'text'; text: string }> }> {
  const files: Record<string, string> = {}

  // manifest.json
  files['manifest.json'] = generateManifest(vendor, appName, version, builders, description)

  // Generate files for each builder
  if (builders.includes('store')) {
    Object.assign(files, generateStoreFiles())
  }
  if (builders.includes('react')) {
    Object.assign(files, generateReactFiles(vendor, appName))
  }
  if (builders.includes('node')) {
    Object.assign(files, generateNodeFiles(vendor, appName))
  }
  if (builders.includes('graphql')) {
    Object.assign(files, generateGraphqlFiles(appName))
  }
  if (builders.includes('styles')) {
    Object.assign(files, generateStylesFiles())
  }
  if (builders.includes('messages')) {
    Object.assign(files, generateMessagesFiles())
  }

  // Build the output
  const sections: string[] = [
    `# VTEX IO App Scaffold: \`${vendor}.${appName}@${version}\``,
    `**Builders:** ${builders.join(', ')}`,
    '',
    '## File Structure',
    '',
    '```',
    `${vendor}.${appName}/`,
    ...Object.keys(files).map((f) => `├── ${f}`),
    '```',
    '',
    '## Files',
    '',
  ]

  for (const [filePath, content] of Object.entries(files)) {
    const ext = filePath.split('.').pop() ?? 'txt'
    const lang =
      ext === 'json'
        ? 'json'
        : ext === 'ts' || ext === 'tsx'
          ? 'typescript'
          : ext === 'jsonc'
            ? 'jsonc'
            : ext === 'graphql'
              ? 'graphql'
              : 'text'
    sections.push(`### \`${filePath}\``)
    sections.push(`\`\`\`${lang}`)
    sections.push(content)
    sections.push('```')
    sections.push('')
  }

  sections.push('## Next Steps')
  sections.push('')
  sections.push('1. Create the directory: `mkdir -p ' + vendor + '.' + appName + '`')
  sections.push('2. Copy each file to the correct path')
  sections.push('3. Install dependencies:')
  if (builders.includes('node')) {
    sections.push('   - In `node/`: `npm install`')
  }
  sections.push('4. Link the app: `vtex link`')
  sections.push('5. Open in browser or use `vtex browse` to see it live')

  return { content: [{ type: 'text', text: sections.join('\n') }] }
}
