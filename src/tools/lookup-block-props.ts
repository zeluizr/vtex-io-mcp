import { z } from 'zod'
import { findBlock, listAvailableBlocks } from '../knowledge/index.js'

export const lookupBlockPropsSchema = {
  blockName: z
    .string()
    .describe(
      'Name of the VTEX IO block to look up (e.g. "rich-text", "flex-layout.row", "shelf", "image")'
    ),
}

export async function lookupBlockProps({
  blockName,
}: {
  blockName: string
}): Promise<{ content: Array<{ type: 'text'; text: string }> }> {
  const block = findBlock(blockName)

  if (!block) {
    const available = listAvailableBlocks()
    return {
      content: [
        {
          type: 'text',
          text: `Block "${blockName}" not found in the knowledge base.\n\nAvailable blocks:\n${available.map((b) => `  - ${b}`).join('\n')}\n\nTip: try the exact block name (e.g. "flex-layout.row" instead of "flex-layout").`,
        },
      ],
    }
  }

  const propsTable = block.props
    .map((p) => {
      const req = p.required ? '**required**' : 'optional'
      const def = p.default !== null ? ` (default: \`${JSON.stringify(p.default)}\`)` : ''
      const enumVals = p.enum
        ? `\n    Allowed values: ${p.enum.map((v) => `\`${v}\``).join(', ')}`
        : ''
      return `- **${p.name}** \`${p.type}\` — ${req}${def}\n  ${p.description}${enumVals}`
    })
    .join('\n\n')

  const examplesText = block.examples
    .map((ex) => {
      return `#### ${ex.description}\n\`\`\`jsonc\n${JSON.stringify(ex.code, null, 2)}\n\`\`\``
    })
    .join('\n\n')

  const children =
    block.allowedChildren.length > 0 ? block.allowedChildren.join(', ') : 'none (leaf block)'

  let variantsText = ''
  if (block.variants && block.variants.length > 0) {
    variantsText =
      '\n\n## Variants\n' +
      block.variants.map((v) => `### \`${v.blockName}\`\n${v.description}`).join('\n\n')
  }

  const text = `# Block: \`${block.blockName}\`

**App:** \`${block.app}@${block.version}\`
**Category:** ${block.category}
**Description:** ${block.description}

**Allowed children:** ${children}

## Props

${propsTable}
${variantsText}

## Examples

${examplesText}

## Documentation
${block.documentation}`

  return { content: [{ type: 'text', text }] }
}
