import { z } from 'zod'
import { listCourses, loadCourseContent } from '../knowledge/index.js'

export const searchCoursesSchema = {
  query: z
    .string()
    .describe(
      'Search term to find in VTEX IO courses (e.g. "flex-layout", "CSS handles", "service.json", "GraphQL resolver")'
    ),
  courseId: z
    .string()
    .optional()
    .describe(
      'Optionally restrict search to a specific course ID (e.g. "service-course", "store-block", "basic-blocks")'
    ),
}

export async function searchCourses({
  query,
  courseId,
}: {
  query: string
  courseId?: string
}): Promise<{ content: Array<{ type: 'text'; text: string }> }> {
  const courses = listCourses()

  if (courses.length === 0) {
    return {
      content: [
        {
          type: 'text',
          text: 'No courses available in the knowledge base yet.',
        },
      ],
    }
  }

  const targets = courseId ? courses.filter((c) => c.id === courseId) : courses

  if (targets.length === 0) {
    const available = courses.map((c) => `\`${c.id}\``).join(', ')
    return {
      content: [
        {
          type: 'text',
          text: `Course \`${courseId}\` not found.\n\nAvailable courses: ${available}`,
        },
      ],
    }
  }

  const queryLower = query.toLowerCase()
  const results: Array<{ courseTitle: string; courseId: string; excerpts: string[] }> = []

  for (const course of targets) {
    const content = loadCourseContent(course.id)
    if (!content) continue

    const lines = content.split('\n')
    const excerpts: string[] = []

    // Find lines containing the query and include surrounding context
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].toLowerCase().includes(queryLower)) {
        const start = Math.max(0, i - 2)
        const end = Math.min(lines.length - 1, i + 5)
        const excerpt = lines.slice(start, end + 1).join('\n')

        // Avoid duplicate excerpts that overlap heavily
        const lastExcerpt = excerpts[excerpts.length - 1] ?? ''
        if (!lastExcerpt.includes(lines[i])) {
          excerpts.push(excerpt)
        }

        // Max 5 excerpts per course
        if (excerpts.length >= 5) break
      }
    }

    if (excerpts.length > 0) {
      results.push({
        courseTitle: course.title,
        courseId: course.id,
        excerpts,
      })
    }
  }

  if (results.length === 0) {
    const searched = targets.map((c) => c.title).join(', ')
    return {
      content: [
        {
          type: 'text',
          text: `No results found for \`${query}\` in: ${searched}.\n\nTry a different term or use \`vtex://courses/{id}\` to read a full course.`,
        },
      ],
    }
  }

  const sections: string[] = [
    `# Search Results for \`${query}\``,
    '',
    `Found in **${results.length}** course(s):`,
    '',
  ]

  for (const result of results) {
    sections.push(`## ${result.courseTitle} (\`vtex://courses/${result.courseId}\`)`)
    sections.push('')
    for (const excerpt of result.excerpts) {
      sections.push('```')
      sections.push(excerpt)
      sections.push('```')
      sections.push('')
    }
  }

  sections.push('---')
  sections.push(
    `_To read a full course, use the resource \`vtex://courses/{id}\` or the MCP resource list._`
  )

  return { content: [{ type: 'text', text: sections.join('\n') }] }
}
