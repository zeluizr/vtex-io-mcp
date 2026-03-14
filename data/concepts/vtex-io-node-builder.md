---
title: "Node builder"
slug: "vtex-io-documentation-node-builder"
source: "https://developers.vtex.com/docs/guides/vtex-io-documentation-node-builder"
---

The `node` builder is used to develop backend apps with TypeScript code executed by the Node.js runtime. It enables developing custom backend services using Node.js on VTEX infrastructure.

## Versioning

| Builder version | Node.js | TypeScript | Status |
|-|-|-|-|
| `3.x` | 8.x | 3.9.7 | Decommissioned |
| `4.x` | 12.x | 3.9.7 | Decommissioned |
| `6.x` | 16.x | 3.9.7 | Stable until June 2025 |
| `7.x` | 20.x | 5.5.3 | **Stable (current)** |

> ⚠️ Always ensure your external dependencies are compatible with Node.js 16.x, even if using builder 7.x. The build validation uses 16.x compatibility.

## Folder structure

```txt
node
  ┣ 📂 clients
      ┗ 📄 {ClientCodeFileName}.ts
  ┣ 📂 middlewares
      ┗ 📄 {MiddlewareCodeFileName}.ts
  ┣ 📂 event
      ┗ 📄 {EventCodeFileName}.ts
  ┣ 📂 resolvers        (if using GraphQL)
      ┗ 📄 {ResolverFileName}.ts
  ┣ 📄 index.ts
  ┣ 📄 package.json
  ┣ 📄 service.json
  ┗ 📄 tsconfig.json
```

- `clients/`: Directory with Clients code files.
- `middlewares/`: Directory with middleware code files.
- `event/`: Directory with event handler code files.
- `index.ts`: Main entry point — contains the Service class.
- `service.json`: Service configuration (routes, events, memory, timeout).
- `package.json`: Node dependencies (using Yarn).
- `tsconfig.json`: TypeScript configuration.

## Usage

1. **Start with a template:** Download the [`service-example` template](https://github.com/vtex-apps/service-example) or use `vtex init` and choose the `service-example` option.
2. **Configure `service.json`:** Define routes, events, memory, timeout, etc.
3. **Configure permissions:** Add required [policies](https://developers.vtex.com/docs/guides/vtex-io-documentation-policies) in `manifest.json`.
4. **Implement logic:** Add TypeScript files with the app logic.
5. **Test:** Link the app with `vtex link`.

## Declare in manifest.json

```json
"builders": {
  "node": "7.x"
}
```

## Minimal service example

```typescript
// node/index.ts
import type { ClientsConfig, ServiceContext, RecorderState } from '@vtex/api'
import { LRUCache, method, Service } from '@vtex/api'
import { Clients } from './clients'

declare global {
  type Context = ServiceContext<Clients, State>
  interface State extends RecorderState {
    code: number
  }
}

export default new Service({
  clients: {
    implementation: Clients,
    options: {
      default: {
        retries: 2,
        timeout: 10000,
      },
    },
  },
  routes: {
    status: method({ GET: [statusHandler] }),
  },
})
```

## Use case examples

- **Backend service development**: Build REST APIs that run on VTEX infrastructure.
- **Event-driven applications**: Implement event handlers that react to catalog changes, order updates, etc.
- **Integration with external systems**: Create client modules for payment gateways, databases, third-party services.
- **Custom middleware**: Authentication, logging, request processing.

## Example apps using the node builder

- [service-example](https://github.com/vtex-apps/service-example)
- [orders-feed-example](https://github.com/vtex-apps/orders-feed-example)
- [events-example](https://github.com/vtex-apps/events-example)
- [graphql-example](https://github.com/vtex-apps/graphql-example) (node + graphql)
