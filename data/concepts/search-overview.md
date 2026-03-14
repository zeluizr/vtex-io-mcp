# Search Overview

VTEX offers two search solutions: **Intelligent Search** (VTEX IO, recommended) and **Legacy Search** (older CMS-based stores).

## Intelligent Search

Intelligent Search is the recommended VTEX IO alternative to Legacy Search. Features:

- Results from the first keystroke
- Search and product suggestions
- Automatic spell correction
- Understands words not in product data

### Key Apps (Store Framework)

| App | Description |
|---|---|
| `vtex.search` | Core Intelligent Search integration — provides UI components, handles autocomplete |
| `vtex.search-result` | Fetches results from Intelligent Search API and displays filters + product gallery |
| `vtex.store-components/SearchBar` | Search bar component with autocomplete and matching products |
| `vtex.search/Autocomplete` | Alternative autocomplete showing past searches across 4 configurable lists |
| `vtex.search/Banner` | Displays promotional banners based on search words and filters |
| `vtex.search/Suggestions` | Suggests similar search terms to current query |
| `vtex.search/DidYouMean` | Suggests spelling corrections for the current query |

### Intelligent Search API

Query search data, terms, banners, facets, and suggestions:

```
GET /api/io/_v/api/intelligent-search/product_search/...    # Full-text product search
GET /api/io/_v/api/intelligent-search/facets/...            # Facets for a query
GET /api/io/_v/api/intelligent-search/search_suggestions    # Search term suggestions
GET /api/io/_v/api/intelligent-search/banners               # Banners for a query
GET /api/io/_v/api/intelligent-search/correction_search     # Spelling correction
GET /api/io/_v/api/intelligent-search/top_searches          # Top search terms
```

## Customizing the Search Experience

### Custom Search Results Pages

- **Segmenting results** — Present different results per customer segment
- **Multiple layouts** — Build search pages with list/grid toggle
- **Custom results page** — Full custom search results template

### Search Control (Legacy CMS)

Renders a search box with optional department restriction combo.

## Integrating an External Search Provider

The **Search Protocol** defines the contract between an external provider and a VTEX IO store. A compliant provider can fully replace VTEX's native search — no frontend implementation required.

Steps:
1. **Overview** — understand the protocol architecture
2. **Specification** — implement required endpoints
3. **Recipe** — step-by-step integration guide
4. **Reference Implementations** — example connectors

## Integrating with Google Services

| Integration | Description |
|---|---|
| **Google Search Console** (`vtex.google-search-console`) | Connect store search to Google Search Console |
| **Google Analytics search tracking** | Track search terms and measure store queries |
| **Speech to Text Search** (`vtexarg.speech-to-text`) | Google Chrome language processing for voice search |

## Legacy Search

Queries catalog using full-text, category, and brand terms. Use for older CMS Portal stores or when Intelligent Search is not applicable.

```
GET /api/catalog_system/pub/products/search/{searchQuery}    # Full-text search
GET /api/catalog_system/pub/products/search/                 # Browse by category
```

Key concepts:
- `ft` — full-text search parameter
- `fq` — filter query (category, brand, specification)
- `O` — sort order
- `_from` / `_to` — pagination

## Documentation

- [Platform Overview](./platform-overview.md)
- [Catalog Overview](./catalog-overview.md)
- [Authentication](./authentication.md)
