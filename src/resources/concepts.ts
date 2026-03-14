import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp.js'
import { listConcepts, loadConcept } from '../knowledge/index.js'

export function registerConceptResources(server: McpServer) {
  // Index resource
  server.resource(
    'vtex-concepts-index',
    'vtex://concepts',
    {
      description:
        'Index of all VTEX IO documentation concepts available (391 files covering builders, APIs, Store Framework, services, known issues, and more)',
      mimeType: 'text/plain',
    },
    async () => {
      const concepts = listConcepts()
      const grouped: Record<string, string[]> = {}

      for (const id of concepts) {
        const parts = id.split('-')
        const prefix = parts[0] + '-' + (parts[1] ?? '')
        if (!grouped[prefix]) grouped[prefix] = []
        grouped[prefix].push(id)
      }

      const lines = [
        '# VTEX IO Knowledge Base',
        `${concepts.length} documentation files available via vtex://concepts/{id}`,
        '',
        'Use the `search-concepts` tool to find relevant concepts by keyword.',
        'Use the `explain-concept` tool to read a concept by exact ID.',
        '',
        '## Available concepts (grouped by prefix):',
        '',
      ]

      for (const [prefix, ids] of Object.entries(grouped).sort()) {
        lines.push(`**${prefix}*** (${ids.length} files)`)
        // Show first 3
        for (const id of ids.slice(0, 3)) {
          lines.push(`  - ${id}`)
        }
        if (ids.length > 3) lines.push(`  - ... and ${ids.length - 3} more`)
        lines.push('')
      }

      return {
        contents: [
          {
            uri: 'vtex://concepts',
            mimeType: 'text/plain',
            text: lines.join('\n'),
          },
        ],
      }
    }
  )

  // Template resource for individual concepts
  const conceptTemplate = new ResourceTemplate('vtex://concepts/{conceptId}', {
    list: async () => {
      const concepts = listConcepts()
      return {
        resources: concepts.map((id) => ({
          uri: `vtex://concepts/${id}`,
          name: id,
          description: `VTEX IO documentation: ${id}`,
          mimeType: 'text/plain',
        })),
      }
    },
  })

  server.resource(
    'vtex-concept',
    conceptTemplate,
    {
      description: 'Full content of a specific VTEX IO documentation concept by ID',
      mimeType: 'text/plain',
    },
    async (uri, variables) => {
      const conceptId = Array.isArray(variables.conceptId)
        ? variables.conceptId[0]
        : (variables.conceptId ?? '')
      const content = loadConcept(conceptId)

      return {
        contents: [
          {
            uri: uri.href,
            mimeType: 'text/plain',
            text:
              content ??
              `Concept "${conceptId}" not found. Use vtex://concepts to see all available concepts.`,
          },
        ],
      }
    }
  )
}
