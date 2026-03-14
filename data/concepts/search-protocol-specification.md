# Search Protocol Specification

GraphQL queries that must be implemented for a VTEX Search Protocol-compliant resolver app.

---

## GraphQL Queries to Implement

To implement the protocol, you need to implement resolvers for every GraphQL query on the `vtex.search-graphql` schema (https://github.com/vtex-apps/search-graphql).

The queries that are relevant for an external search provider to implement:

| Query | Description |
|---|---|
| `productSearch` | Main search engine query — returns products matching a search term |
| `facets` | Facets to be used as filters in the search results page |
| `banners` | Banners to retrieve and show in specific sections of the web page |
| `correction` | Corrections for possible typos the user makes when searching |
| `searchSuggestions` | Suggestions of terms based on the search term |
| `topSearches` | Top searches shown when a user focuses on the search bar |
| `autocompleteSearchSuggestions` | Suggestions of products and terms for the search bar |
| `productSuggestions` | Suggestions of products to show in the search result page |
| `searchMetadata` | Metadata for the specific search result page |

---

## GraphQL Queries NOT Needed to Reimplement

The following queries do not need to be reimplemented using the external search provider — they don't add anything potentially beneficial to the UX from an external search provider. However, they are **still needed for the store to work properly**, so implement them using VTEX Catalog APIs:

- `product`
- `products`
- `productsByIdentifier`
- `searchURLsCount`

> Best practice: copy the code for these 4 queries from the [reference implementations](./search-protocol-references.md).

---

## Limitations

- **One search-resolver per workspace**: It is only possible to have one search-resolver service per workspace. If more than one is installed, the workspace will break. To start development of a new search provider:
  1. Create a workspace
  2. Uninstall the old search-resolver (e.g., `vtex.search-resolver`)
  3. Start developing your new `search-resolver`
- The 4 catalog queries listed above still need to be implemented even though they are not part of the external search integration.

---

## Documentation

- [Search Protocol Overview](./search-protocol-overview.md)
- [Search Protocol Recipe](./search-protocol-recipe.md)
- [Search Protocol Reference Implementations](./search-protocol-references.md)
