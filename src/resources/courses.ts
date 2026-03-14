import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { listCourses, loadCourseContent } from '../knowledge/index.js'

export function registerCourseResources(server: McpServer) {
  // List all courses as a single resource (index)
  server.resource(
    'vtex-courses-index',
    'vtex://courses',
    {
      description: 'Index of all available VTEX IO courses with title, description, and step count',
      mimeType: 'text/plain',
    },
    async () => {
      const courses = listCourses()
      if (courses.length === 0) {
        return {
          contents: [
            {
              uri: 'vtex://courses',
              mimeType: 'text/plain',
              text: 'No courses available yet. Run the ingest script to populate courses.',
            },
          ],
        }
      }

      const lines = [
        '# VTEX IO Courses',
        '',
        'Available courses (use vtex://courses/{id} to read the full content):',
        '',
        ...courses.map(
          (c) =>
            `- **${c.title}** (\`vtex://courses/${c.id}\`) — ${c.description} [${c.steps} steps]`
        ),
      ]

      return {
        contents: [
          {
            uri: 'vtex://courses',
            mimeType: 'text/plain',
            text: lines.join('\n'),
          },
        ],
      }
    }
  )

  // Register each course as an individual resource
  const courses = listCourses()
  for (const course of courses) {
    const uri = `vtex://courses/${course.id}`
    server.resource(
      `vtex-course-${course.id}`,
      uri,
      {
        description: `Full content of VTEX IO course: ${course.title} — ${course.description}`,
        mimeType: 'text/markdown',
      },
      async () => {
        const content = loadCourseContent(course.id)
        return {
          contents: [
            {
              uri,
              mimeType: 'text/markdown',
              text:
                content ??
                `# ${course.title}\n\nCourse content not available. The file may not have been generated yet.`,
            },
          ],
        }
      }
    )
  }
}
