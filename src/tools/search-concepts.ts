import { z } from 'zod'
import { listConcepts, loadConcept } from '../knowledge/index.js'

export const searchConceptsSchema = {
  query: z
    .string()
    .describe(
      'Search query — keywords to find in VTEX documentation (e.g. "css handles", "master data triggers", "node builder routes", "catalog API", "checkout orderform")'
    ),
  maxResults: z
    .number()
    .optional()
    .describe('Max number of results to return (default: 5, max: 10)'),
}

export async function searchConcepts({
  query,
  maxResults = 5,
}: {
  query: string
  maxResults?: number
}): Promise<{ content: Array<{ type: 'text'; text: string }> }> {
  const concepts = listConcepts()
  const lowerQuery = query.toLowerCase()
  const terms = lowerQuery.split(/\s+/).filter(Boolean)

  // Score each concept
  const scored: Array<{ id: string; score: number; excerpt: string }> = []

  for (const id of concepts) {
    const content = loadConcept(id)
    if (!content) continue
    const lowerContent = content.toLowerCase()
    const lowerID = id.toLowerCase()

    let score = 0
    // ID match is worth more
    for (const term of terms) {
      if (lowerID.includes(term)) score += 10
      // Count occurrences in content
      let idx = 0
      while ((idx = lowerContent.indexOf(term, idx)) !== -1) {
        score++
        idx++
      }
    }

    if (score === 0) continue

    // Extract relevant excerpt (first 500 chars around first match)
    let excerpt = ''
    const firstMatch = lowerContent.indexOf(terms[0])
    if (firstMatch >= 0) {
      const start = Math.max(0, firstMatch - 100)
      const end = Math.min(content.length, firstMatch + 400)
      excerpt = content.slice(start, end).trim()
      if (start > 0) excerpt = '...' + excerpt
      if (end < content.length) excerpt = excerpt + '...'
    } else {
      excerpt = content.slice(0, 300) + '...'
    }

    scored.push({ id, score, excerpt })
  }

  scored.sort((a, b) => b.score - a.score)
  const top = scored.slice(0, Math.min(maxResults, 10))

  if (top.length === 0) {
    return {
      content: [
        {
          type: 'text',
          text: `No concepts found matching "${query}".\n\nTry different keywords. Available topic areas include: vtex-io, store-framework, builders, css-handles, master-data, catalog, orders, checkout, graphql, react, node-service, known-issues, helpcenter, education, content-portal.`,
        },
      ],
    }
  }

  const lines = [
    `# Search Results for "${query}"`,
    `Found ${scored.length} matching concepts. Showing top ${top.length}:`,
    '',
  ]

  for (const result of top) {
    lines.push(`## \`${result.id}\` (score: ${result.score})`)
    lines.push('')
    lines.push(result.excerpt)
    lines.push('')
    lines.push(`> To read full content: use \`explain-concept\` with id \`${result.id}\``)
    lines.push('')
  }

  return { content: [{ type: 'text', text: lines.join('\n') }] }
}
