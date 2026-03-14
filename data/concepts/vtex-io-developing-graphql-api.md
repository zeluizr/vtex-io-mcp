---
title: "Developing a GraphQL API in service apps"
slug: "developing-a-graphql-api-in-service-apps"
source: "https://developers.vtex.com/docs/guides/developing-a-graphql-api-in-service-apps"
---

When developing a service app, you may need to expose an API so that other systems can interact with it. GraphQL is recommended for interactions with frontend apps and systems; REST is commonly used for interacting with other services and external integrations.

## App behavior overview

1. A requester makes a GraphQL request to an app instantiated in a VTEX store.
2. Upon receiving the request, the app executes it through a resolver function.
3. The resolver uses a VTEX client to call the desired resource (VTEX API, another app, external service).
4. The app receives the response from the resource and continues executing the resolver.
5. The resolver generates the response body based on the received data.
6. The app returns the GraphQL request to the requester with the response body.

## Implementation steps

### 1. Start with a template

```shell
git clone https://github.com/vtex-apps/service-example
# or
git clone https://github.com/vtex-apps/graphql-example
```

### 2. Add the GraphQL builder

In `manifest.json`:

```json
"builders": {
  "node": "7.x",
  "graphql": "1.x"
}
```

### 3. Define the GraphQL schema

In the `graphql` folder:

```graphql
# graphql/types/ProductView.graphql
type ProductView {
  slug: String
  liveUsers: Int
}
```

```graphql
# graphql/schema.graphql
type Query {
  getSku(topN: Int): String
  getProductViews(topN: Int): [ProductView]
}
```

### 4. Set up clients

Register VTEX native clients in `node/clients/index.ts`:

```typescript
import { IOClients } from '@vtex/api'
import { Catalog } from '@vtex/clients'

export class Clients extends IOClients {
  public get catalog() {
    return this.getOrSet('catalog', Catalog)
  }
}
```

Install the package first:
```shell
cd node
yarn add @vtex/clients
```

### 5. Define the resolvers

Create resolver functions in `node/resolvers/`:

```typescript
// node/resolvers/products.ts
export const getSku = async (
  _: any,
  { code }: { code: number },
  { clients: { catalog } }: Context
) =>
  catalog
    .getSkuById(code.toString())
    .then((data) => data.Name)
```

### 6. Instantiate the resolvers

In `node/index.ts`:

```typescript
import type { ClientsConfig, ServiceContext, RecorderState } from '@vtex/api'
import { Service } from '@vtex/api'
import { Clients } from './clients'
import { getSku } from './resolvers/products'

export default new Service({
  clients: { implementation: Clients },
  graphql: {
    resolvers: {
      Query: {
        getSku,
      },
    },
  },
})
```

### 7. Add the policies

If your app accesses external endpoints:

```json
"policies": [
  {
    "name": "outbound-access",
    "attrs": {
      "host": "portal.vtexcommercestable.com.br",
      "path": "/api/catalog/*"
    }
  }
]
```

### 8. Link and test

```shell
vtex link
```

Test with the GraphQL IDE:
1. Install: `vtex install vtex.admin-graphql-ide`
2. Open VTEX Admin → **Store Settings** → **Storefront** → **GraphQL IDE**
3. Select your linked app
4. Write and run queries

## Example with mutation

```graphql
# graphql/schema.graphql
type Query {
  getUser(id: ID!): User
}

type Mutation {
  createUser(name: String!, email: String!): User
}

type User {
  id: ID!
  name: String!
  email: String!
}
```

```typescript
// node/resolvers/user.ts
export const getUser = async (
  _: any,
  { id }: { id: string },
  { clients: { masterData } }: Context
) => masterData.get<User>({ dataEntity: 'CL', id, fields: ['id', 'name', 'email'] })

export const createUser = async (
  _: any,
  { name, email }: { name: string, email: string },
  { clients: { masterData } }: Context
) => masterData.createDocument({ dataEntity: 'CL', fields: { name, email } })
```

```typescript
// node/index.ts
graphql: {
  resolvers: {
    Query: { getUser },
    Mutation: { createUser },
  },
}
```
