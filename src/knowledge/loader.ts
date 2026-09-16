import { readFileSync, readdirSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const DATA_DIR = join(__dirname, '..', '..', 'data')

// O ID vira nome de arquivo, então só aceita nomes simples: sem pontos nem separadores de caminho
const SAFE_ID = /^[A-Za-z0-9_-]+$/

export interface BlockData {
  blockName: string
  app: string
  version: string
  description: string
  category: string
  props: Array<{
    name: string
    type: string
    description: string
    required: boolean
    default: unknown
    enum?: string[]
  }>
  allowedChildren: string[]
  interface: { component: string; composition: string }
  examples: Array<{ description: string; code: Record<string, unknown> }>
  documentation: string
  variants?: Array<{ blockName: string; description: string; props: unknown[] }>
}

export interface BuilderData {
  name: string
  version: string
  description: string
  folder: string
  requiredFiles: Array<{ path: string; description: string }>
  optionalFiles: Array<{ path: string; description: string }>
  keyPackages: Array<{ name: string; description: string }>
  examples: Record<string, unknown>
  relatedBuilders: string[]
  documentation: string
}

let blockIndex: Record<string, string> | null = null
const blockCache: Map<string, BlockData> = new Map()
const builderCache: Map<string, BuilderData> = new Map()

export function loadBlockIndex(): Record<string, string> {
  if (blockIndex) return blockIndex
  const indexPath = join(DATA_DIR, 'blocks', '_index.json')
  const raw = readFileSync(indexPath, 'utf-8')
  blockIndex = JSON.parse(raw) as Record<string, string>
  return blockIndex
}

export function loadBlock(blockName: string): BlockData | null {
  const index = loadBlockIndex()
  const fileName = index[blockName]
  if (!fileName) return null

  if (blockCache.has(fileName)) return blockCache.get(fileName)!

  const blockPath = join(DATA_DIR, 'blocks', fileName)
  const raw = readFileSync(blockPath, 'utf-8')
  const data = JSON.parse(raw) as BlockData
  blockCache.set(fileName, data)
  return data
}

export function loadAllBlocks(): BlockData[] {
  const index = loadBlockIndex()
  const uniqueFiles = [...new Set(Object.values(index))]
  return uniqueFiles.map((fileName) => {
    if (blockCache.has(fileName)) return blockCache.get(fileName)!
    const blockPath = join(DATA_DIR, 'blocks', fileName)
    const raw = readFileSync(blockPath, 'utf-8')
    const data = JSON.parse(raw) as BlockData
    blockCache.set(fileName, data)
    return data
  })
}

export function loadBuilder(builderName: string): BuilderData | null {
  if (builderCache.has(builderName)) return builderCache.get(builderName)!
  if (!SAFE_ID.test(builderName)) return null

  const builderPath = join(DATA_DIR, 'builders', `${builderName}.json`)
  try {
    const raw = readFileSync(builderPath, 'utf-8')
    const data = JSON.parse(raw) as BuilderData
    builderCache.set(builderName, data)
    return data
  } catch {
    return null
  }
}

export function loadAllBuilders(): BuilderData[] {
  const buildersDir = join(DATA_DIR, 'builders')
  const files = readdirSync(buildersDir).filter((f) => f.endsWith('.json'))
  return files.map((fileName) => {
    const builderName = fileName.replace('.json', '')
    return loadBuilder(builderName)!
  })
}

// ─── Courses ────────────────────────────────────────────────────────────────

export interface CourseEntry {
  id: string
  title: string
  description: string
  file: string
  steps: number
}

export interface CourseIndex {
  courses: CourseEntry[]
}

let courseIndex: CourseIndex | null = null
const courseContentCache: Map<string, string> = new Map()

export function loadCourseIndex(): CourseIndex {
  if (courseIndex) return courseIndex
  const indexPath = join(DATA_DIR, 'courses', '_index.json')
  try {
    const raw = readFileSync(indexPath, 'utf-8')
    courseIndex = JSON.parse(raw) as CourseIndex
  } catch {
    courseIndex = { courses: [] }
  }
  return courseIndex
}

export function loadCourseContent(courseId: string): string | null {
  if (courseContentCache.has(courseId)) return courseContentCache.get(courseId)!

  const index = loadCourseIndex()
  const entry = index.courses.find((c) => c.id === courseId)
  if (!entry) return null

  const coursePath = join(DATA_DIR, 'courses', entry.file)
  try {
    const content = readFileSync(coursePath, 'utf-8')
    courseContentCache.set(courseId, content)
    return content
  } catch {
    return null
  }
}

export function listCourses(): CourseEntry[] {
  return loadCourseIndex().courses
}

// ─── Concepts ────────────────────────────────────────────────────────────────

const conceptContentCache: Map<string, string> = new Map()

export function loadConcept(conceptId: string): string | null {
  if (conceptContentCache.has(conceptId)) return conceptContentCache.get(conceptId)!
  if (!SAFE_ID.test(conceptId)) return null

  const conceptPath = join(DATA_DIR, 'concepts', `${conceptId}.md`)
  try {
    const content = readFileSync(conceptPath, 'utf-8')
    conceptContentCache.set(conceptId, content)
    return content
  } catch {
    return null
  }
}

export function listConcepts(): string[] {
  const conceptsDir = join(DATA_DIR, 'concepts')
  try {
    return readdirSync(conceptsDir)
      .filter((f) => f.endsWith('.md'))
      .map((f) => f.replace('.md', ''))
      .sort()
  } catch {
    return []
  }
}
