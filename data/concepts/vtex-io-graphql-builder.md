---
title: "GraphQL Builder"
slug: "vtex-io-documentation-graphql-builder"
source: "https://developers.vtex.com/docs/guides/vtex-io-documentation-graphql-builder"
---

The `graphql` builder handles the GraphQL app schema and serves as an interface between frontend applications and backend services. It processes GraphQL APIs and schemas by interpreting `.graphql` and `.gql` files in the app's `/graphql` directory.

> ℹ️ The `graphql` builder is used only when **developing** an app's GraphQL API. You don't need this builder to **consume** GraphQL APIs in IO apps.

## Versioning

| Builder version | Mandatory `@auth` directive | Status |
| :- | :- | :- |
| `1.x` | No | Deprecated |
| `2.x` | Yes | Stable |

The `@auth` directive adds an authorization step to GraphQL queries and mutations.

## Folder structure

```txt
graphql
┣ 📂 types
    ┣ 📄 a_type.graphql
    ┗ 📄 b_type.graphql
┣ 📄 directives.graphql
┗ 📄 schema.graphql
```

Recommendations:
- Define only endpoints (queries, mutations, subscriptions) in `schema.graphql`
- Handle directives separately in `directives.graphql`
- Define additional types in separate files inside the `types` subfolder

## Usage

To develop an app using the `graphql` builder:

1. **Start with a template:** Download [`graphql-example`](https://github.com/vtex-apps/graphql-example) or create a new project with `vtex init` and select the `graphql-example` option.
2. **Add to manifest.json:**
   ```json
   "builders": {
     "node": "7.x",
     "graphql": "1.x"
   }
   ```
3. **Define schema files:** Add `.graphql` files with type definitions and endpoints.
4. **Create resolvers:** Add TypeScript code in `node/resolvers/` folder.
5. **Instantiate resolvers:** In `node/index.ts`, add a `graphql` field to the Service class.
6. **Test:** Link the app and use the GraphQL IDE.

## Full implementation example

### Schema definition

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

### Resolver

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

### Service registration

```typescript
// node/index.ts
import { getSku } from './resolvers/products'

export default new Service({
  clients,
  graphql: {
    resolvers: {
      Query: {
        getSku,
      },
    },
  },
})
```

## Testing with GraphQL IDE

1. Install the GraphQL IDE app:
   ```shell
   vtex install vtex.admin-graphql-ide
   ```
2. Open the VTEX Admin in your workspace.
3. Go to **Store Settings** > **Storefront** > **GraphQL IDE**.
4. Select your linked app.
5. Write and run your query.

## App examples using the graphql builder

- [graphql-example](https://github.com/vtex-apps/graphql-example)
- [b2b-organizations-graphql](https://github.com/vtex-apps/b2b-organizations-graphql)
- [my-account](https://github.com/vtex-apps/my-account)
