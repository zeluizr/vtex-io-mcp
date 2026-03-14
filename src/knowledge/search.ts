import { loadBlock, loadAllBlocks, loadBuilder, loadAllBuilders, type BlockData, type BuilderData } from './loader.js'

export function findBlock(blockName: string): BlockData | null {
  // Try exact match first
  const exact = loadBlock(blockName)
  if (exact) return exact

  // Try fuzzy match: find a block whose blockName includes the query
  const all = loadAllBlocks()
  const lower = blockName.toLowerCase()

  // Check variants too
  for (const block of all) {
    if (block.blockName.toLowerCase().includes(lower)) return block
    if (block.variants) {
      for (const variant of block.variants) {
        if (variant.blockName.toLowerCase().includes(lower)) return block
      }
    }
  }

  return null
}

export function findBuilder(builderName: string): BuilderData | null {
  const exact = loadBuilder(builderName)
  if (exact) return exact

  const all = loadAllBuilders()
  const lower = builderName.toLowerCase()
  return all.find((b) => b.name.toLowerCase().includes(lower)) ?? null
}

export function listAvailableBlocks(): string[] {
  const all = loadAllBlocks()
  const names: string[] = []
  for (const block of all) {
    names.push(block.blockName)
    if (block.variants) {
      for (const v of block.variants) {
        names.push(v.blockName)
      }
    }
  }
  return names
}

export function listAvailableBuilders(): string[] {
  return loadAllBuilders().map((b) => b.name)
}
