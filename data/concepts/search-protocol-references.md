# Search Protocol Reference Implementations

Production apps and templates implementing the VTEX Search Protocol.

---

## Reference Implementations

| Name | Type | Repository |
|---|---|---|
| **VTEX Intelligent Search** | Production app | https://github.com/vtex-apps/search-resolver/tree/v1.x |
| **VTEX Default Search** | Production app | https://github.com/vtex-apps/search-resolver |
| **Search Engine Example** | Template | https://github.com/vtex-apps/search-engine-example |

---

## VTEX Intelligent Search

The primary production search resolver. Built on VTEX's own Intelligent Search engine (powered by Biggy).

- Uses `BiggySearchClient` as the search client
- Implements all required Search Protocol queries
- Good reference for production-quality implementation

Clone for starting point:

```sh
git clone https://github.com/vtex-apps/search-resolver/tree/v1.x
```

---

## Search Engine Example

A template app for building a custom search resolver from scratch. Use this as a starting point if you want a cleaner base without Biggy-specific code.

Repository: `https://github.com/vtex-apps/search-engine-example`

---

## vtex.search-graphql Schema

The GraphQL schema all resolvers must implement:

- Repository: `https://github.com/vtex-apps/search-graphql`
- Schema file: `graphql/schema.graphql`

> Always check the [latest version](https://github.com/vtex-apps/search-graphql/blob/master/manifest.json#L4) and keep `vtex.search-graphql` up to date in `node/package.json`.

---

## Documentation

- [Search Protocol Overview](./search-protocol-overview.md)
- [Search Protocol Specification](./search-protocol-specification.md)
- [Search Protocol Recipe](./search-protocol-recipe.md)
- [Search Protocol Indexing & Onboarding](./search-protocol-indexing.md)
