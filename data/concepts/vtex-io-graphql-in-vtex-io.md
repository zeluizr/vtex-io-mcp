---
title: "GraphQL in VTEX IO"
slug: "graphql-in-vtex-io"
source: "https://developers.vtex.com/docs/guides/graphql-in-vtex-io"
---

GraphQL is a query language for APIs that allows clients to request specific data from a server. Unlike REST APIs, which return fixed data structures, GraphQL allows developers to retrieve only the data they need, preventing over- and under-fetching.

GraphQL has the advantage of being self-documenting, making it easier for developers to explore and consume APIs. With introspection queries and GraphQL IDEs such as GraphiQL, consumers can inspect the schema to view available endpoints, arguments, and fields.

## Essential concepts

- **Schema**: The GraphQL schema defines the structure of the API, including types, queries, and mutations. It serves as the blueprint for both the server and the client.
- **Queries** and **mutations**: Queries are used to fetch data, while mutations are used to modify data.
- **Introspection**: GraphQL allows for introspection, meaning you can query the API to understand its structure.

## How GraphQL works in VTEX IO

In VTEX IO, GraphQL APIs are created using:

1. The **GraphQL builder** (`graphql: "1.x"` or `"2.x"`) to define the schema
2. The **Node builder** (`node: "7.x"`) to implement resolvers
3. **IO clients** to make requests to VTEX APIs or external services from within resolvers

## Creating a GraphQL API

See [Developing a GraphQL API in service apps](https://developers.vtex.com/docs/guides/developing-a-graphql-api-in-service-apps) for a complete step-by-step guide.

Key steps:
1. Add `graphql` and `node` builders to `manifest.json`
2. Define types and schema in `graphql/` folder
3. Create resolver functions in `node/resolvers/`
4. Register resolvers in the Service class in `node/index.ts`

## Consuming a GraphQL API from React

Use the `useQuery` and `useMutation` hooks from `react-apollo`:

```tsx
import { useQuery, useMutation } from 'react-apollo'
import MY_QUERY from './graphql/myQuery.graphql'
import MY_MUTATION from './graphql/myMutation.graphql'

const MyComponent = () => {
  const { data, loading } = useQuery(MY_QUERY, {
    variables: { id: '123' },
  })

  const [doMutation] = useMutation(MY_MUTATION)

  if (loading) return null

  return (
    <div>
      <p>{data?.myQuery?.name}</p>
      <button onClick={() => doMutation({ variables: { name: 'new name' } })}>
        Update
      </button>
    </div>
  )
}
```

```graphql
# react/graphql/myQuery.graphql
query MyQuery($id: ID!) {
  myQuery(id: $id) {
    name
    value
  }
}
```

## GraphQL authorization with `@auth` directive

When using `graphql` builder version 2.x, queries and mutations require the `@auth` directive:

```graphql
# graphql/directives.graphql
directive @auth(role: String!) on FIELD_DEFINITION
```

```graphql
# graphql/schema.graphql
type Query {
  getUser(id: ID!): User @auth(role: "admin")
  publicData: Data  # No auth required for public
}
```

## Testing with GraphQL IDE

1. Install: `vtex install vtex.admin-graphql-ide`
2. Open Admin → **Store Settings** → **Storefront** → **GraphQL IDE**
3. Select your linked app
4. Write and run queries with full autocomplete support

## Key resources

| Resource | Description |
| --- | --- |
| [graphql-example](https://github.com/vtex-apps/graphql-example) | Boilerplate for GraphQL + Node service |
| `vtex.search-graphql` | VTEX search GraphQL API for React components |
| `vtex.catalog-graphql` | Catalog GraphQL API |
| `vtex.messages-graphql` | Internationalization via GraphQL |
