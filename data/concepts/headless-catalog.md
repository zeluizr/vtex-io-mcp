# Headless Commerce — Catalog

APIs for browsing products, searching, and displaying product details in a headless storefront.

> Filter results by trade policy with query param `sc={tradePolicy}`.

---

## Categories

**GET** `/api/catalog_system/pub/category/tree/{categoryLevels}`

Returns the category tree for building navigation menus.

---

## Search

### Intelligent Search (Recommended)

| Endpoint | Description |
|---|---|
| `GET /product_search/{facets}` | List products for a query |
| `GET /facets/{facets}` | Get facets for a given query |
| `GET /correction_search` | Spelling correction for misspelled terms |
| `GET /search_suggestions` | Suggested terms similar to search term |
| `GET /autocomplete_suggestions` | Suggested terms and attributes (autocomplete) |
| `GET /top_searches` | Top 10 most searched terms |
| `GET /banners/{facets}` | Banners registered for a query |

### Legacy Search

**GET** `/api/catalog_system/pub/products/search`

Supports filtering and sorting:

- **By category:** `/{department}/{category}/{subcategory}` in path
- **By collection:** `?fq=productClusterIds:{collectionId}`
- **By product ID:** `?fq=productId:{productId}`
- **By SKU ID:** `?fq=skuId:{skuId}`
- **Sort by best discount:** `?O=OrderByBestDiscountDESC`

#### Legacy Autocomplete

**GET** `/buscaautocomplete` — Autocomplete suggestions for Legacy Search

---

## Product Details

| Use Case | Endpoint |
|---|---|
| Get by URL slug | `GET /api/catalog_system/pub/products/search/{product-text-link}/p` |
| Get by product ID | `GET /api/catalog_system/pub/products/search?fq=productId:{id}` |
| Get by SKU ID | `GET /api/catalog_system/pub/products/search?fq=skuId:{id}` |

---

## Cross Selling

| Endpoint | Type |
|---|---|
| `/api/catalog_system/pub/products/crossselling/showtogether/{productId}` | Show Together |
| `/api/catalog_system/pub/products/crossselling/accessories/{productId}` | Accessories |
| `/api/catalog_system/pub/products/crossselling/similars/{productId}` | Similars |
| `/api/catalog_system/pub/products/crossselling/suggestions/{productId}` | Suggestions |

---

## Documentation

- [Headless Commerce Overview](./headless-commerce-overview.md)
- [Headless Cart and Checkout](./headless-cart-and-checkout.md)
- [Headless Profile Management](./headless-profile-management.md)
