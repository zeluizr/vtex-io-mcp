---
title: "Developing services on VTEX IO"
slug: "developing-services-on-vtex-io"
source: "https://developers.vtex.com/docs/guides/developing-services-on-vtex-io"
---

The VTEX IO platform allows developers to create unique commerce experiences using Web technologies. It's possible to create frontend blocks for Store Framework, backend services exposing REST or GraphQL APIs, and combine a series of VTEX modules into a complete solution.

**Services** are how we run **Node.js** or **.NET** code on VTEX IO infrastructure, backed by API abstractions to improve developer experience.

Services in VTEX IO support one-command rollbacks and continuous integration. They can export internal and external routes and run on top of Kubernetes. VTEX IO manages the scalability of your services.

## Service anatomy

A Service must be exported from a VTEX IO app using `node` or `dotnet` builders. The `/node` folder contains:

```txt
node/
  ├── clients/       → Custom clients (extend @vtex/api client types)
  │   └── index.ts   → Exports Clients class extending IOClients
  ├── middlewares/   → Route handler functions
  ├── resolvers/     → GraphQL resolver functions (if using GraphQL)
  ├── index.ts       → Service entry point, exports the Service class
  ├── service.json   → Routes, events, memory, timeout config
  ├── package.json   → Node dependencies
  └── tsconfig.json  → TypeScript config
```

## Boilerplate templates

| Template | Description |
| --- | --- |
| [service-example](https://github.com/vtex-apps/service-example) | Basic Node.js service with REST route |
| [graphql-example](https://github.com/vtex-apps/graphql-example) | Service with GraphQL API |
| [events-example](https://github.com/vtex-apps/events-example) | Service that handles events |

## Minimal REST service

**manifest.json:**
```json
{
  "name": "my-service",
  "vendor": "mystore",
  "version": "0.1.0",
  "builders": {
    "node": "7.x"
  }
}
```

**node/service.json:**
```json
{
  "memory": 256,
  "ttl": 10,
  "timeout": 2,
  "minReplicas": 2,
  "maxReplicas": 4,
  "routes": {
    "status": {
      "path": "/_v/status/:code",
      "public": true
    }
  }
}
```

**node/index.ts:**
```typescript
import type { ClientsConfig, ServiceContext, RecorderState } from '@vtex/api'
import { method, Service } from '@vtex/api'
import { Clients } from './clients'

declare global {
  type Context = ServiceContext<Clients, State>
  interface State extends RecorderState {
    code: number
  }
}

export default new Service({
  clients: { implementation: Clients },
  routes: {
    status: method({ GET: [statusHandler] }),
  },
})
```

**node/middlewares/status.ts:**
```typescript
export async function statusHandler(ctx: Context, next: () => Promise<any>) {
  const { code } = ctx.vtex.route.params
  ctx.status = parseInt(code as string, 10)
  ctx.body = `Status code: ${code}`
  await next()
}
```

## Event handling

```json
// node/service.json
{
  "events": {
    "skuChange": {
      "keys": ["broadcaster.notification"]
    }
  }
}
```

```typescript
// node/index.ts
export default new Service({
  events: {
    skuChange: async (ctx: Context) => {
      console.log('SKU changed:', ctx.body)
    },
  },
})
```

## Service with all features

```typescript
export default new Service({
  clients: { implementation: Clients },
  routes: {
    getUser: method({ GET: [authenticate, getUser] }),
    createUser: method({ POST: [authenticate, createUser] }),
  },
  events: {
    catalogChange: catalogChangeHandler,
  },
  graphql: {
    resolvers: {
      Query: { user: resolveUser },
      Mutation: { createUser: resolveCreateUser },
    },
  },
})
```

## Accessing route params and query strings

```typescript
export async function myHandler(ctx: Context, next: () => Promise<any>) {
  // Route params (e.g., path: "/_v/app/data/:id")
  const { id } = ctx.vtex.route.params

  // Query strings (e.g., ?limit=10&offset=0)
  const { limit, offset } = ctx.query

  // Request body (for POST/PUT)
  const body = ctx.request.body

  // Set response
  ctx.status = 200
  ctx.body = { message: 'success', id }
  await next()
}
```

## Service URL patterns

When an app is deployed, its routes are accessible at:
- **Public routes:** `https://{account}.myvtex.com/_v/{your-path}`
- **Private routes:** `https://app.io.vtex.com/{vendor}.{appName}/v{major}/{account}/{workspace}`
