# VTEX IO MCP Server

A Model Context Protocol (MCP) server that acts as the ultimate copilot for VTEX IO development. Install it once and get expert help with Store Framework, React components, Node.js services, GraphQL, Admin apps, Pixel apps, and everything else in the VTEX IO ecosystem — directly inside Claude Desktop, Claude Code, Cursor, or any MCP-compatible client.

## Quick Start

```bash
npx vtex-io-mcp
```

Or install globally:

```bash
npm install -g vtex-io-mcp
vtex-io-mcp
```

## Setup with Claude Desktop

Add the following to your Claude Desktop configuration file:

- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "vtex-io": {
      "command": "npx",
      "args": ["-y", "vtex-io-mcp"]
    }
  }
}
```

Restart Claude Desktop after saving the file.

## Setup with Claude Code

Add to your project's `.mcp.json` or run:

```bash
claude mcp add vtex-io -- npx -y vtex-io-mcp
```

## Available Tools

| Tool | Description |
|------|-------------|
| `lookup-block-props` | Look up props, description, and usage examples for any VTEX IO Store Framework block (e.g. `rich-text`, `flex-layout.row`, `shelf`, `image`, `info-card`) |
| `add-block` | Generate a ready-to-use JSONC snippet for a VTEX IO block to paste into `blocks.jsonc`. Validates props against the block schema. |
| `scaffold-vtex-app` | Generate a complete VTEX IO app scaffold with `manifest.json` and all folder structures for the selected builders (`store`, `react`, `node`, `graphql`, `styles`, `messages`, `admin`, `pixel`) |
| `scaffold-node-service` | Generate a complete Node.js service scaffold for VTEX IO including `index.ts`, `service.json`, clients, and middleware handlers |
| `scaffold-graphql` | Generate a GraphQL schema and resolver files for a VTEX IO app, including `schema.graphql` and TypeScript resolver stubs |
| `search-courses` | Search across all VTEX IO official courses (basic-blocks, layout-blocks, styles-course, store-block, service-course, admin, calling-commerce-apis, content-workflow, store-performance) |
| `explain-concept` | Get full documentation for a VTEX concept by exact ID (e.g. `vtex-io-builders`, `vtex-io-css-handles`). Use `search-concepts` to find the right ID first. |
| `search-concepts` | Search across 391 VTEX documentation files by keywords. Returns ranked results with excerpts. Best first step when exploring any VTEX topic. |
| `lookup-vtex-api` | Look up VTEX REST API reference for any VTEX API: `catalog`, `orders`, `checkout`, `master-data`, `logistics`, `pricing`, `intelligent-search`, `session`, `headless-cms`, `promotions`, `payments-gateway` |

## Available Resources

Resources can be accessed by MCP clients that support resource reading:

| URI | Description |
|-----|-------------|
| `vtex://concepts` | Index of all 391 VTEX IO documentation files, grouped by topic area |
| `vtex://concepts/{id}` | Full content of a specific VTEX documentation concept by ID |
| `vtex://courses` | Index of all available VTEX IO official courses |
| `vtex://courses/{id}` | Full content of a VTEX IO course (e.g. `vtex://courses/service-course`) |

## Example Usage

Once connected, you can ask questions like:

- "Create a complete Store Theme from scratch for vendor `mystore`"
- "What props does the `flex-layout.row` block accept?"
- "Generate a Node.js service with a REST endpoint to fetch product recommendations"
- "Create a GraphQL schema for a wishlist feature with add, remove, and list operations"
- "Scaffold an Admin app that shows order analytics"
- "How do CSS Handles work in VTEX IO?"
- "Show me the VTEX Catalog API endpoints"

## Knowledge Base

This server ships with an embedded knowledge base of 391 documentation files covering:

- All VTEX IO builders (`store`, `react`, `node`, `graphql`, `styles`, `messages`, `admin`, `pixel`, `docs`)
- VTEX REST APIs (Catalog, Orders, Checkout, Master Data, Logistics, Pricing, and more)
- Store Framework blocks with full prop schemas and usage examples
- VTEX IO concepts: workspaces, CSS Handles, events, clients, service.json, interfaces
- Official VTEX IO courses content
- Known issues and troubleshooting guides

## Builders Covered

| Builder | Version | Purpose |
|---------|---------|---------|
| `store` | 0.x | Storefront blocks, interfaces, routes, templates |
| `react` | 3.x | Custom React components with CSS Handles |
| `node` | 6.x | Node.js backend services, middlewares, clients |
| `graphql` | 1.x | GraphQL schema and resolvers |
| `styles` | 2.x | CSS customization via JSON (typography, colors, spacing) |
| `messages` | 1.x | i18n/internationalization |
| `admin` | 0.x | VTEX Admin panel apps |
| `pixel` | 0.x | Tracking and analytics scripts |
| `docs` | 0.x | App documentation |

## Development

```bash
# Clone and install
git clone https://github.com/zeluizr/vtex-io-mcp
cd vtex-io-mcp
npm install

# Build
npm run build

# Test with MCP Inspector
npm run inspect
```

## Contributing / Issues

Found a bug or missing VTEX feature? Open an issue on [GitHub](https://github.com/zeluizr/vtex-io-mcp/issues).

## License

MIT
