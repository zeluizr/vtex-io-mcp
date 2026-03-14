# Services

**Course ID:** service-course
**Description:** Learn how to build VTEX IO backend services using the Node.js builder.

## Overview

This course covers the full lifecycle of a VTEX IO service: from the `node` builder and `service.json` configuration to event handling, custom API clients, Master Data integration, and GraphQL resolvers. You will build a service that tracks live users and exposes the data via GraphQL.

---

## Step 01 — Services in VTEX IO

### Concept

VTEX IO services run as Node.js applications on VTEX's infrastructure. They are defined using the `node` builder.

Key features:
- **HTTP routes** — RESTful endpoints accessible from other VTEX apps or external clients
- **Event handlers** — React to VTEX platform events (e.g., order placed, product updated)
- **Scheduled tasks** — Cron-like scheduled execution
- **Clients** — Typed HTTP clients for VTEX and external APIs

The `service.json` file configures the service behavior:

```json
// node/service.json
{
  "memory": 256,
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

---

## Step 02 — Boilerplate Overview

### Directory structure

```
node/
├── clients/
│   └── index.ts          # IOClients class — registers all custom clients
├── handlers/
│   └── validate.ts       # Route and event middleware functions
├── index.ts              # Service entry point
├── service.json          # Routes, events, memory, timeout config
├── package.json
└── tsconfig.json
```

The `graphql` builder (when present) adds:
```
graphql/
├── schema.graphql        # GraphQL type definitions
└── resolvers/
    └── index.ts          # Resolver implementations
```

### Service entry point pattern

```typescript
// node/index.ts
import {
  LRUCache,
  Service,
  ServiceContext,
  ParamsContext,
  RecorderState,
} from '@vtex/api'

import { Clients } from './clients/index'
import { status } from './handlers/status'

const TREE_SECONDS_MS = 3 * 1000

const memoryCache = new LRUCache<string, any>({ max: 5000 })
metrics.trackCache('status', memoryCache)

export default new Service<Clients, RecorderState, ParamsContext>({
  clients: {
    implementation: Clients,
    options: {
      default: {
        retries: 2,
        timeout: TREE_SECONDS_MS,
      },
      status: {
        memoryCache,
      },
    },
  },
  routes: {
    status,
  },
})
```

---

## Step 03 — Event Handling

### Concept

VTEX IO services can listen to events fired by other services. Events are declared in `service.json` under the `events` key.

Each event handler is a middleware function that receives a `Context` with event data.

### Activity

Add a `liveUsersUpdate` event handler:

```json
// node/service.json
{
  "memory": 256,
  "timeout": 2,
  "minReplicas": 2,
  "maxReplicas": 4,
  "events": {
    "liveUsersUpdate": {
      "sender": "vtex.pixel-manager@1.x",
      "keys": ["pixel:pageView"]
    }
  },
  "routes": {
    "status": {
      "path": "/_v/status/:code",
      "public": true
    }
  }
}
```

```typescript
// node/handlers/liveUsersUpdate.ts
export async function updateLiveUsers(ctx: EventContext<Clients>) {
  const liveUsersCount = await ctx.clients.analytics.getLiveUsers()
  console.log('Live users count:', liveUsersCount)
  return true
}
```

```typescript
// node/index.ts
import { Service } from '@vtex/api'
import { Clients } from './clients/index'
import { updateLiveUsers } from './handlers/liveUsersUpdate'

export default new Service<Clients>({
  clients: {
    implementation: Clients,
  },
  events: {
    liveUsersUpdate: updateLiveUsers,
  },
})
```

**Answer sheet:**

```typescript
// node/index.ts
import {
  LRUCache,
  Service,
  ServiceContext,
  ParamsContext,
  RecorderState,
} from '@vtex/api'

import { Clients } from './clients/index'
import { updateLiveUsers } from './handlers/liveUsersUpdate'
import { status } from './handlers/status'

const TREE_SECONDS_MS = 3 * 1000

const memoryCache = new LRUCache<string, any>({ max: 5000 })

export default new Service<Clients, RecorderState, ParamsContext>({
  clients: {
    implementation: Clients,
    options: {
      default: {
        retries: 2,
        timeout: TREE_SECONDS_MS,
      },
      status: {
        memoryCache,
      },
    },
  },
  events: {
    liveUsersUpdate: updateLiveUsers,
  },
  routes: {
    status,
  },
})
```

```typescript
// node/handlers/liveUsersUpdate.ts
export async function updateLiveUsers(ctx: EventContext<Clients>) {
  const liveUsersCount = await ctx.clients.analytics.getLiveUsers()
  console.log('Live users: ', liveUsersCount)
  return true
}
```

---

## Step 04 — Custom Clients (Analytics)

### Concept

Custom API clients extend the `@vtex/api` base client classes:
- `ExternalClient` — for external HTTP APIs
- `AppClient` — for calling other VTEX IO apps
- `JanusClient` — for VTEX internal platform APIs

Clients are registered in the `IOClients` class in `node/clients/index.ts`.

The `getOrSet` pattern caches client instances for reuse.

### Activity

Create an `Analytics` client that fetches live user counts:

```typescript
// node/clients/analyticsClient.ts
import { AppClient, InstanceOptions, IOContext } from '@vtex/api'

const routes = {
  getLiveUsers: () => '/live-users',
}

export default class Analytics extends AppClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super('vtex.pixel-manager@1.x', context, options)
  }

  getLiveUsers = () =>
    this.http.get<LiveUsersData>(routes.getLiveUsers(), {
      metric: 'get-live-users',
    })
}
```

```typescript
// node/clients/index.ts
import { IOClients } from '@vtex/api'
import Analytics from './analyticsClient'

export class Clients extends IOClients {
  public get analytics() {
    return this.getOrSet('analytics', Analytics)
  }
}
```

**Answer sheet:**

```typescript
// node/clients/analyticsClient.ts
import { AppClient, InstanceOptions, IOContext } from '@vtex/api'

interface LiveUsersData {
  slug: string
  liveUsers: number
}

const routes = {
  getLiveUsers: () => '/_v/live-users',
}

export default class Analytics extends AppClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super('vtex.pixel-manager@1.x', context, options)
  }

  public getLiveUsers = () =>
    this.http.get<LiveUsersData[]>(routes.getLiveUsers(), {
      metric: 'analytics-get-live-users',
    })
}
```

```typescript
// node/clients/index.ts
import { IOClients } from '@vtex/api'
import Analytics from './analyticsClient'

export class Clients extends IOClients {
  public get analytics() {
    return this.getOrSet('analytics', Analytics)
  }
}
```

---

## Step 05 — Using Clients in Event Handlers

### Concept

Inside event handlers, clients are accessed via `ctx.clients`. The `EventContext<Clients>` type provides full typing for the context object.

### Activity

Use the Analytics client in the `liveUsersUpdate` handler:

```typescript
// node/handlers/liveUsersUpdate.ts
import { EventContext } from '@vtex/api'
import { Clients } from '../clients/index'

export async function updateLiveUsers(ctx: EventContext<Clients>) {
  const liveUsersCount = await ctx.clients.analytics.getLiveUsers()
  console.log('Live users: ', liveUsersCount)
  return true
}
```

---

## Step 06 — Master Data Client

### Concept

Master Data is VTEX's no-SQL database. In VTEX IO services, it is available via `ctx.clients.masterdata`.

Key operations:
- `searchDocuments` — query documents with filters
- `createDocument` — create a new document
- `createOrUpdateEntireDocument` — upsert by a unique field
- `updatePartialDocument` — partial update by document ID

To use Master Data from a service, add the `ADMIN_DS` policy to `manifest.json`:

```json
{
  "policies": [
    { "name": "ADMIN_DS" }
  ]
}
```

### Activity

Save live user data to Master Data:

```typescript
// node/handlers/liveUsersUpdate.ts
import { EventContext } from '@vtex/api'
import { Clients } from '../clients/index'

interface LiveUsersData {
  slug: string
  liveUsers: number
}

export async function updateLiveUsers(ctx: EventContext<Clients>) {
  const liveUsersData = await ctx.clients.analytics.getLiveUsers()

  const savePromises = liveUsersData.map(({ slug, liveUsers }: LiveUsersData) =>
    ctx.clients.masterdata.createOrUpdateEntireDocument({
      dataEntity: 'liveUsers',
      fields: { slug, liveUsers },
      schema: 'v1',
    })
  )

  await Promise.all(savePromises)
  return true
}
```

```json
// manifest.json (add to policies array)
{
  "policies": [
    {
      "name": "ADMIN_DS"
    }
  ]
}
```

---

## Step 07 — GraphQL Implementation

### Concept

To expose service data via GraphQL, use the `graphql` builder. Define the schema in `graphql/schema.graphql` and implement resolvers that use the `node` clients.

GraphQL resolvers in VTEX IO receive a `Context` object that includes `ctx.clients`.

### Activity

Implement a GraphQL query to fetch live users from Master Data:

```graphql
# graphql/schema.graphql
type LiveUser {
  slug: String
  liveUsers: Int
}

type Query {
  getLiveUsers: [LiveUser]
}
```

```typescript
// graphql/resolvers/index.ts
import { getLiveUsers } from './products'

export const resolvers = {
  Query: {
    getLiveUsers,
  },
}
```

```typescript
// graphql/resolvers/products.ts
export const getLiveUsers = async (_: unknown, __: unknown, ctx: Context) => {
  const { masterdata } = ctx.clients
  const data = await masterdata.scrollDocuments({
    dataEntity: 'liveUsers',
    fields: ['slug', 'liveUsers'],
    schema: 'v1',
    size: 10,
    sort: 'liveUsers DESC',
  })
  return data.data
}
```

```typescript
// node/index.ts — add graphql resolvers
import { resolvers } from '../graphql/resolvers/index'

export default new Service<Clients>({
  clients: {
    implementation: Clients,
  },
  events: {
    liveUsersUpdate: updateLiveUsers,
  },
  graphql: {
    resolvers,
  },
})
```

**Answer sheet:**

```typescript
// node/index.ts
import {
  LRUCache,
  Service,
  ServiceContext,
  ParamsContext,
  RecorderState,
} from '@vtex/api'

import { Clients } from './clients/index'
import { updateLiveUsers } from './handlers/liveUsersUpdate'
import { status } from './handlers/status'
import { resolvers } from '../graphql/resolvers/index'

const TREE_SECONDS_MS = 3 * 1000

const memoryCache = new LRUCache<string, any>({ max: 5000 })

export default new Service<Clients, RecorderState, ParamsContext>({
  clients: {
    implementation: Clients,
    options: {
      default: {
        retries: 2,
        timeout: TREE_SECONDS_MS,
      },
      status: {
        memoryCache,
      },
    },
  },
  events: {
    liveUsersUpdate: updateLiveUsers,
  },
  routes: {
    status,
  },
  graphql: {
    resolvers,
  },
})
```

```graphql
# graphql/schema.graphql
type LiveUser {
  slug: String
  liveUsers: Int
}

type Query {
  getLiveUsers: [LiveUser]
}
```

```typescript
// graphql/resolvers/products.ts
export const getLiveUsers = async (_: unknown, __: unknown, ctx: Context) => {
  const {
    clients: { masterdata },
  } = ctx

  const { data } = await masterdata.scrollDocuments({
    dataEntity: 'liveUsers',
    fields: ['slug', 'liveUsers'],
    schema: 'v1',
    size: 10,
    sort: 'liveUsers DESC',
  })

  return data
}
```

---

## Step 08 — Testing with GraphiQL

### Concept

VTEX IO provides a GraphiQL IDE accessible at:
`https://{workspace}--{account}.myvtex.com/_v/private/graphql/v1`

Use it to test your GraphQL queries interactively after running `vtex link`.

### Example query

```graphql
query {
  getLiveUsers {
    slug
    liveUsers
  }
}
```

The IDE provides schema introspection, autocomplete, and real-time query execution.
