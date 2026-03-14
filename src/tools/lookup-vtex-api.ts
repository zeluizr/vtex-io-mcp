import { z } from 'zod'
import { listConcepts, loadConcept } from '../knowledge/index.js'

export const lookupVtexApiSchema = {
  api: z
    .string()
    .describe(
      'API name or keyword to look up (e.g. "catalog", "orders", "checkout", "master-data", "logistics", "pricing", "intelligent-search", "session", "headless-cms", "promotions", "payments")'
    ),
}

export async function lookupVtexApi({
  api,
}: {
  api: string
}): Promise<{ content: Array<{ type: 'text'; text: string }> }> {
  const concepts = listConcepts()
  const lowerApi = api.toLowerCase().replace(/\s+/g, '-')

  // Find vtex-api-* files matching the query
  const apiConcepts = concepts.filter((id) => id.startsWith('vtex-api-'))
  const matches = apiConcepts.filter(
    (id) =>
      id.includes(lowerApi) || lowerApi.split('-').some((term) => term.length > 2 && id.includes(term))
  )

  if (matches.length === 0) {
    const available = apiConcepts.map((id) => id.replace('vtex-api-', ''))
    return {
      content: [
        {
          type: 'text',
          text: `No API found matching "${api}".\n\nAvailable APIs:\n${available.map((a) => `  - ${a}`).join('\n')}`,
        },
      ],
    }
  }

  // Return the best match
  const bestMatch = matches[0]
  const content = loadConcept(bestMatch)

  return {
    content: [
      {
        type: 'text',
        text: content ?? `API reference for "${bestMatch}" not found.`,
      },
    ],
  }
}
