import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { registerTools } from './tools/index.js'
import { registerResources } from './resources/index.js'

export function createServer(): McpServer {
  const server = new McpServer({
    name: 'vtex-io-mcp',
    version: '0.1.0',
  })

  registerTools(server)
  registerResources(server)

  return server
}
