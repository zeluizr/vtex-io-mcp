import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { lookupBlockPropsSchema, lookupBlockProps } from './lookup-block-props.js'
import { addBlockSchema, addBlock } from './add-block.js'
import { scaffoldVtexAppSchema, scaffoldVtexApp } from './scaffold-vtex-app.js'
import { scaffoldNodeServiceSchema, scaffoldNodeService } from './scaffold-node-service.js'
import { scaffoldGraphqlSchema, scaffoldGraphql } from './scaffold-graphql.js'
import { searchCoursesSchema, searchCourses } from './search-courses.js'
import { explainConceptSchema, explainConcept } from './explain-concept.js'
import { searchConceptsSchema, searchConcepts } from './search-concepts.js'
import { lookupVtexApiSchema, lookupVtexApi } from './lookup-vtex-api.js'

export function registerTools(server: McpServer) {
  server.tool(
    'lookup-block-props',
    'Look up the props, description, and usage examples for any VTEX IO Store Framework block (e.g. rich-text, flex-layout.row, shelf, image, info-card)',
    lookupBlockPropsSchema,
    lookupBlockProps
  )

  server.tool(
    'add-block',
    'Generate a JSONC snippet for a VTEX IO block ready to paste into blocks.jsonc. Validates props against the block schema.',
    addBlockSchema,
    addBlock
  )

  server.tool(
    'scaffold-vtex-app',
    'Generate a complete VTEX IO app scaffold with manifest.json and all folder structures for the selected builders (store, react, node, graphql, styles, messages, admin, pixel)',
    scaffoldVtexAppSchema,
    scaffoldVtexApp
  )

  server.tool(
    'scaffold-node-service',
    'Generate a complete Node.js service scaffold for VTEX IO including index.ts, service.json, clients, and middleware handlers for specified routes and events',
    scaffoldNodeServiceSchema,
    scaffoldNodeService
  )

  server.tool(
    'scaffold-graphql',
    'Generate a GraphQL schema and resolver files for a VTEX IO app, including schema.graphql and TypeScript resolver stubs for queries and mutations',
    scaffoldGraphqlSchema,
    scaffoldGraphql
  )

  server.tool(
    'search-courses',
    'Search for a term across all VTEX IO official courses (basic-blocks, layout-blocks, styles-course, store-block, service-course, admin, calling-commerce-apis, content-workflow, store-performance). Returns excerpts with surrounding context.',
    searchCoursesSchema,
    searchCourses
  )

  server.tool(
    'explain-concept',
    'Get full documentation for a VTEX concept by exact ID (e.g. "vtex-io-builders", "vtex-io-css-handles", "vtex-io-service-json"). Use search-concepts to find the right ID first.',
    explainConceptSchema,
    explainConcept
  )

  server.tool(
    'search-concepts',
    'Search across 391 VTEX documentation files by keywords. Returns ranked results with excerpts. Use this to find concepts before calling explain-concept.',
    searchConceptsSchema,
    searchConcepts
  )

  server.tool(
    'lookup-vtex-api',
    'Look up VTEX REST API reference (endpoints, auth, request/response models) for any VTEX API: catalog, orders, checkout, master-data, logistics, pricing, intelligent-search, session, headless-cms, promotions, payments-gateway, license-manager',
    lookupVtexApiSchema,
    lookupVtexApi
  )
}
