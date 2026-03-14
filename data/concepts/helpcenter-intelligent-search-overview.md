---
title: 'VTEX Intelligent Search - Overview'
id: helpcenter-intelligent-search-overview
status: PUBLISHED
source: vtexdocs/help-center-content
originalPath: docs/en/tutorials/intelligent-search/
---

VTEX Intelligent Search is an AI-powered search engine that enhances the shopping experience by providing relevant search results and product suggestions as customers interact with the search bar.

## Key features

### Autocomplete

Provides real-time product and search term suggestions as customers type, reducing friction and improving conversion rates.

### Relevance Rules

Configure how search results are ranked. You can boost or bury specific products, categories, or brands based on business rules.

### Merchandising Rules

Create manual rules to manipulate search results:

- **Pin**: Force specific products to appear at the top of results.
- **Hide**: Remove specific products from search results.
- **Promote**: Boost products matching specific conditions.
- **Demote**: Bury products matching specific conditions.

### Synonyms

Register synonyms to expand the vocabulary recognized by the search engine:

- **One-way synonyms**: "smartphone" → also shows results for "mobile phone".
- **Two-way synonyms**: "sofa" ↔ "couch" (symmetric).
- **Equivalent terms**: Multiple terms treated as the same.

### Redirects

Create rules to redirect specific search queries to designated pages:

- Redirect "sale" to `/promotion`.
- Redirect "outlet" to a specific category.

### Explained Search

Understand why a search returned specific results. Shows the tokenization and analysis applied to the search query.

### Indexing Status

Monitor the synchronization of your catalog products with the search index. Track which products are pending indexation.

### Analytics

Access data about what customers are searching for:

- Top search terms.
- Searches with no results (zero results).
- Click-through rates by search term.

## Integration with Store Framework

In VTEX IO Store Framework, Intelligent Search is integrated via:

- **`vtex.search-resolver`**: GraphQL schema and resolvers for search queries.
- **`vtex.search-result`**: The search result block that renders PLPs.

Required dependency in `manifest.json`:

```json
{
  "dependencies": {
    "vtex.search-result": "3.x",
    "vtex.search-resolver": "1.x"
  }
}
```

## GraphQL queries

The `vtex.search-resolver` exposes queries like:

```graphql
query productSearch($query: String, $category: String) {
  productSearch(query: $query, category: $category) {
    products {
      productId
      productName
      items {
        name
        images { imageUrl }
      }
    }
  }
}
```

## Configuration in VTEX Admin

Access at **Storefront > Intelligent Search**:

- **Search configuration**: Global settings (minimum characters, search timeout, etc.).
- **Relevance Rules**: Product scoring configuration.
- **Merchandising Rules**: Manual result manipulation.
- **Synonyms**: Vocabulary expansion.
- **Redirects**: Search query routing.
