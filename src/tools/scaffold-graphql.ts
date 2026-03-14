import { z } from 'zod'

export const scaffoldGraphqlSchema = {
  appName: z.string().describe('App name in kebab-case'),
  vendor: z.string().describe('VTEX account vendor name'),
  queries: z
    .array(
      z.object({
        name: z.string().describe('Query name (camelCase, e.g. "getProduct")'),
        args: z
          .array(
            z.object({
              name: z.string(),
              type: z
                .string()
                .describe('GraphQL type (e.g. "String!", "Int", "ID!")'),
            })
          )
          .optional()
          .describe('Query arguments'),
        returnType: z
          .string()
          .describe(
            'GraphQL return type (e.g. "Product", "[Product!]!", "String")'
          ),
        description: z
          .string()
          .optional()
          .describe('Query description for schema documentation'),
      })
    )
    .optional()
    .describe('GraphQL queries to generate'),
  mutations: z
    .array(
      z.object({
        name: z.string().describe('Mutation name (camelCase, e.g. "createOrder")'),
        args: z
          .array(
            z.object({
              name: z.string(),
              type: z.string(),
            })
          )
          .optional()
          .describe('Mutation arguments'),
        returnType: z.string().describe('GraphQL return type'),
        description: z.string().optional().describe('Mutation description'),
      })
    )
    .optional()
    .describe('GraphQL mutations to generate'),
}

export async function scaffoldGraphql({
  appName,
  vendor,
  queries = [],
  mutations = [],
}: {
  appName: string
  vendor: string
  queries?: Array<{
    name: string
    args?: Array<{ name: string; type: string }>
    returnType: string
    description?: string
  }>
  mutations?: Array<{
    name: string
    args?: Array<{ name: string; type: string }>
    returnType: string
    description?: string
  }>
}): Promise<{ content: Array<{ type: 'text'; text: string }> }> {
  const files: Record<string, string> = {}

  // Collect unique return types to generate type stubs
  const returnTypes = new Set<string>()
  for (const q of queries) {
    const clean = q.returnType.replace(/[!\[\]]/g, '')
    if (!['String', 'Int', 'Float', 'Boolean', 'ID'].includes(clean)) {
      returnTypes.add(clean)
    }
  }
  for (const m of mutations) {
    const clean = m.returnType.replace(/[!\[\]]/g, '')
    if (!['String', 'Int', 'Float', 'Boolean', 'ID'].includes(clean)) {
      returnTypes.add(clean)
    }
  }

  // schema.graphql
  const queryLines: string[] = []
  for (const q of queries) {
    if (q.description) queryLines.push(`  """${q.description}"""`)
    const args =
      q.args && q.args.length > 0
        ? `(${q.args.map((a) => `${a.name}: ${a.type}`).join(', ')})`
        : ''
    queryLines.push(`  ${q.name}${args}: ${q.returnType}`)
  }
  if (queryLines.length === 0) {
    queryLines.push('  # Add your queries here')
    queryLines.push('  hello: String')
  }

  const mutationLines: string[] = []
  for (const m of mutations) {
    if (m.description) mutationLines.push(`  """${m.description}"""`)
    const args =
      m.args && m.args.length > 0
        ? `(${m.args.map((a) => `${a.name}: ${a.type}`).join(', ')})`
        : ''
    mutationLines.push(`  ${m.name}${args}: ${m.returnType}`)
  }
  if (mutationLines.length === 0) {
    mutationLines.push('  # Add your mutations here')
  }

  const typeStubs =
    returnTypes.size > 0
      ? '\n' +
        [...returnTypes]
          .map((t) => `type ${t} {\n  id: ID!\n  # Add fields here\n}`)
          .join('\n\n')
      : ''

  files['graphql/schema.graphql'] = `# GraphQL Schema for ${vendor}.${appName}
# See: https://developers.vtex.com/docs/guides/graphql-in-vtex-io
${typeStubs}

type Query {
${queryLines.join('\n')}
}

type Mutation {
${mutationLines.join('\n')}
}
`

  // Generate resolver files
  const hasQueries = queries.length > 0
  const hasMutations = mutations.length > 0

  if (hasQueries) {
    for (const q of queries) {
      const argTypes = (q.args ?? [])
        .map((a) => `\n    ${a.name}: ${a.type.replace('!', '')}`)
        .join(',')
      const cleanReturnType = q.returnType.replace(/[!\[\]]/g, '')
      files[`graphql/resolvers/Query/${q.name}.ts`] = `// Resolver for Query.${q.name}
import type { Context } from '@vtex/api'

export const ${q.name} = async (
  _: unknown,
  args: {${argTypes}
  },
  ctx: Context
): Promise<${cleanReturnType} | null> => {
  // TODO: implement resolver
  // const { clients } = ctx
  throw new Error('Not implemented: ${q.name}')
}
`
    }
  } else {
    files['graphql/resolvers/Query/hello.ts'] = `// Example resolver for Query.hello
export const hello = async () => {
  return 'Hello from ${vendor}.${appName}!'
}
`
  }

  if (hasMutations) {
    for (const m of mutations) {
      const argTypes = (m.args ?? [])
        .map((a) => `\n    ${a.name}: ${a.type.replace('!', '')}`)
        .join(',')
      const cleanReturnType = m.returnType.replace(/[!\[\]]/g, '')
      files[`graphql/resolvers/Mutation/${m.name}.ts`] = `// Resolver for Mutation.${m.name}
import type { Context } from '@vtex/api'

export const ${m.name} = async (
  _: unknown,
  args: {${argTypes}
  },
  ctx: Context
): Promise<${cleanReturnType} | null> => {
  // TODO: implement mutation
  throw new Error('Not implemented: ${m.name}')
}
`
    }
  }

  // resolvers/index.ts
  const defaultQueries = hasQueries ? queries : [{ name: 'hello' }]
  const queryResolverImports = defaultQueries
    .map((q) => `import { ${q.name} } from './Query/${q.name}'`)
    .join('\n')

  const mutationResolverImports = hasMutations
    ? mutations.map((m) => `import { ${m.name} } from './Mutation/${m.name}'`).join('\n')
    : ''

  const mutationBlock = hasMutations
    ? `  Mutation: {\n${mutations.map((m) => `    ${m.name},`).join('\n')}\n  },`
    : ''

  files['graphql/resolvers/index.ts'] = `${queryResolverImports}
${mutationResolverImports}

export const resolvers = {
  Query: {
${defaultQueries.map((q) => `    ${q.name},`).join('\n')}
  },
${mutationBlock}
}
`

  // Build output
  const sections = [
    `# GraphQL Scaffold: \`${vendor}.${appName}\``,
    '',
    '## Files Generated',
    '',
  ]

  for (const [filePath, content] of Object.entries(files)) {
    const ext = filePath.split('.').pop() ?? 'txt'
    const lang = ext === 'graphql' ? 'graphql' : ext === 'ts' ? 'typescript' : 'json'
    sections.push(`### \`${filePath}\``)
    sections.push(`\`\`\`${lang}`)
    sections.push(content)
    sections.push('```')
    sections.push('')
  }

  sections.push('## Setup Instructions')
  sections.push('')
  sections.push('1. Make sure your `manifest.json` includes the `graphql` builder:')
  sections.push('   ```json')
  sections.push('   { "builders": { "graphql": "1.x" } }')
  sections.push('   ```')
  sections.push('2. If using with a Node service, also include `"node": "6.x"` in builders')
  sections.push('3. Link the app: `vtex link`')
  sections.push('4. The GraphQL playground will be available at: `/_v/graphql-ide`')

  return { content: [{ type: 'text', text: sections.join('\n') }] }
}
