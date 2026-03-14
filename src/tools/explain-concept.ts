import { z } from 'zod'
import { loadConcept, listConcepts } from '../knowledge/index.js'

export const explainConceptSchema = {
  concept: z
    .string()
    .describe(
      'ID of the VTEX IO concept to explain (e.g. "workspaces", "css-handles", "builders", "events", "clients", "master-data", "vtex-cli", "service-json", "interfaces")'
    ),
}

export async function explainConcept({
  concept,
}: {
  concept: string
}): Promise<{ content: Array<{ type: 'text'; text: string }> }> {
  const content = loadConcept(concept)

  if (!content) {
    const available = listConcepts()

    if (available.length === 0) {
      return {
        content: [
          {
            type: 'text',
            text: `Concept "${concept}" not found and no concepts are available in the knowledge base yet.\n\nThe data/concepts/ directory is empty. Add Markdown files named after concept IDs (e.g. workspaces.md) to populate the knowledge base.`,
          },
        ],
      }
    }

    return {
      content: [
        {
          type: 'text',
          text: `Concept "${concept}" not found in the knowledge base.\n\nAvailable concepts:\n${available.map((c) => `  - ${c}`).join('\n')}\n\nTip: use the exact concept ID shown above (e.g. "css-handles" not "CSS Handles").`,
        },
      ],
    }
  }

  return { content: [{ type: 'text', text: content }] }
}
