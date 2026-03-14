import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { registerCourseResources } from './courses.js'
import { registerConceptResources } from './concepts.js'

export function registerResources(server: McpServer) {
  registerCourseResources(server)
  registerConceptResources(server)
}
