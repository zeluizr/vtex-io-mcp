# VTEX Intelligent Search API

## Description

VTEX Intelligent Search is a search solution for digital commerce that displays relevant results based on the catalog from the user's first interaction with the store. It supports autocomplete, search suggestions, product browsing by category/facets, spell correction, and banner management.

This API is an alternative to the legacy VTEX search and is designed for VTEX IO storefronts.

## Base URLs

- **VTEX IO:** `https://{accountName}.{environment}.com.br/api/io/_v/api/intelligent-search`
- **Custom domain:** `https://{storeDomain}/api/io/_v/api/intelligent-search`

Note: The API runs on the VTEX IO infrastructure. No authentication headers are needed for public endpoints.

## Endpoints by Tag

### Autocomplete

| Method | Path | Summary |
|--------|------|---------|
| `GET` | `/top_searches` | Get list of the 10 most searched terms |
| `GET` | `/autocomplete_suggestions` | Get list of suggested terms and attributes similar to the search term |
| `GET` | `/search_suggestions` | Get list of suggested terms similar to the search term |

### Product List Page

| Method | Path | Summary |
|--------|------|---------|
| `GET` | `/correction_search` | Get attempt of correction of a misspelled term |
| `GET` | `/banners/{facets}` | Get list of banners registered for query |
| `GET` | `/product_search/{facets}` | Get list of products for a query |
| `GET` | `/facets/{facets}` | Get list of the possible facets for a given query |

### Delivery Promise

| Method | Path | Summary |
|--------|------|---------|
| `GET` | `/pickup-point-availability/productClusterIds/{productClusterIds}/trade-policy/{tradePolicy}` | Get pickup point availability for Delivery Promise |

## Key Query Parameters

### Product Search (GET /product_search/{facets})

The `{facets}` path segment contains URL-encoded category/facet path (e.g., `department/electronics`).

Common query parameters:
- `query` (string) — Search query term
- `page` (integer) — Current page number (1-based)
- `count` (integer) — Number of products per page
- `sort` (string) — Sort order: `"price:asc"`, `"price:desc"`, `"orders:desc"`, `"release:desc"`, `"discount:desc"`, `"score:desc"` (relevance)
- `operator` (string) — `"and"` or `"or"` — how terms are combined
- `fuzzy` (string) — Fuzzy matching level: `"0"`, `"1"`, `"auto"`
- `locale` (string) — Language locale (e.g., `"en-US"`, `"pt-BR"`)
- `hideUnavailableItems` (boolean) — Exclude out-of-stock items
- `selectedFacets` (array) — Applied facet filters

Response includes:
- `products` (array) — Product list with `productId`, `productName`, `brand`, `categories`, `items` (SKUs with prices/images)
- `recordsFiltered` (integer) — Total matching products count
- `correction` (object) — Spell correction if applied
- `operator` (string) — Operator used in search

### Autocomplete Suggestions (GET /autocomplete_suggestions)

Query params:
- `query` (string, required) — Partial search term
- `locale` (string) — Language locale
- `count` (integer) — Number of suggestions to return

Response includes:
- `searches` (array) — `{ term: string, count: integer }` items
- `products` (array) — Product suggestions with basic data

### Top Searches (GET /top_searches)

Returns top 10 most searched terms:
```json
{
  "searches": [
    { "term": "sneakers", "count": 1500 },
    { "term": "t-shirt", "count": 1200 }
  ]
}
```

### Facets (GET /facets/{facets})

Returns available filter facets for the query:
```json
{
  "facets": [
    {
      "key": "brand",
      "name": "Brand",
      "type": "TEXT",
      "values": [
        { "key": "nike", "name": "Nike", "quantity": 45, "selected": false }
      ]
    },
    {
      "key": "price",
      "name": "Price",
      "type": "PRICERANGE",
      "values": [
        { "range": { "from": 0, "to": 100 }, "quantity": 20 }
      ]
    }
  ]
}
```

### Banners (GET /banners/{facets})

Returns banners configured in the Intelligent Search admin for the given query/category:
```json
{
  "banners": [
    {
      "id": "summer-sale",
      "name": "Summer Sale",
      "area": "G",
      "html": "<a href='/summer'>...</a>"
    }
  ]
}
```

## VTEX IO Store Framework Integration

In Store Framework (VTEX IO), Intelligent Search is used through:
- `vtex.search-resolver` — The GraphQL resolver that queries this API
- `vtex.search-result` — The search results page block
- `vtex.search-bar` — The search bar with autocomplete

When using the React builder with custom components, query Intelligent Search via GraphQL:
```graphql
query productSearch($query: String, $map: String, $from: Int, $to: Int) {
  productSearch(query: $query, map: $map, from: $from, to: $to) {
    products { productId productName ... }
    recordsFiltered
  }
}
```

## Documentation

https://developers.vtex.com/docs/api-reference/intelligent-search-api
