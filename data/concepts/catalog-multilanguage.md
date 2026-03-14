# Catalog — Multi-language Feature

> ℹ️ Beta feature. Contact [VTEX Support](https://help.vtex.com/en/support) to activate.

The multi-language feature enables managing translations for catalog entities and delivering localized shopping experiences across multiple markets.

---

## Capabilities

- Retrieve and store translations for: Products, SKUs, Categories, Brands, Specifications, Collections, Services, Attachments
- Automated translation workflows via Translation Management System (TMS)
- Works with Store Framework and headless implementations
- Localized experience: translated names, descriptions, specs, meta tags, URL slugs

---

## Use Cases

| Use Case | Description |
|---|---|
| Multilingual storefront | Display translated content based on customer's locale |
| TMS integration | Automatically push/pull translations via Catalog API |
| Business expansion | Adapt catalog for new geographic markets without duplicating products |
| SEO optimization | Localized meta descriptions, keywords, and URL slugs |
| Headless commerce | Fetch translated catalog data for headless storefronts |

---

## How It Works

```
1. Translation ingestion → 2. Indexing (async, minutes) → 3. Storefront display
```

1. Merchant or TMS creates/updates a translation via `PUT` endpoint
2. Intelligent Search indexes the translated content asynchronously
3. Storefront components automatically retrieve and display translations based on locale

---

## Consuming Localized Content

### Option 1 — Intelligent Search (recommended)

Translations are automatically indexed and returned in search results based on the customer's locale. No additional API calls needed.

| Implementation | Support |
|---|---|
| Store Framework | ✅ Yes (default) |
| Headless with IS | ✅ Yes |
| CMS Portal (Legacy) | ⚠️ May need extra config |
| FastStore | ❌ Not available |

```bash
GET https://{accountName}.vtexcommercestable.com.br/api/io/_v/api/intelligent-search/product_search?locale=es-ES&query=camiseta
```

### Option 2 — Catalog API (direct fetch)

Use when:
- You need specific entity translations not available in search results
- Building Admin tools or back-office integrations
- Fetching translations for validation or sync

```bash
GET https://{accountName}.vtexcommercestable.com.br/api/catalog_system/pvt/sku/stockkeepingunitbyid/456
Accept-Language: es-ES
```

---

## Locale Format (IETF BCP 47)

| Locale | Language |
|---|---|
| `en-US` | English (United States) |
| `es-ES` | Spanish (Spain) |
| `pt-BR` | Portuguese (Brazil) |
| `fr-FR` | French (France) |
| `de-DE` | German (Germany) |

---

## API Methods

| Method | Purpose |
|---|---|
| `PUT /api/catalog/pvt/product/{productId}/language` | Create or update translation |
| `GET /api/catalog/pvt/product/{productId}/language?locale=en-US` | Retrieve translations |

Same pattern applies to: SKUs, Categories, Brands, Specifications, Collections, Services

### Create/Update Product Translation

```json
{
  "Locale": "en-US",
  "Name": "Classic Blue T-Shirt",
  "Title": "Classic Blue Tshirt",
  "Description": "A comfortable cotton t-shirt in classic blue color",
  "MetaTagDescription": "Buy the best classic blue t-shirt...",
  "DescriptionShort": "Comfortable cotton t-shirt",
  "Keywords": "t-shirt, blue, cotton, casual",
  "LinkId": "classic-blue-tshirt"
}
```

**Response codes:**
- `201 Created` — translation created or updated
- `400 Bad Request` — invalid body
- `403 Forbidden` — missing permissions
- `404 Not Found` — entity ID does not exist
- `409 Conflict` — translation already exists with same fields

---

## Activation

Submit a [support ticket](https://help.vtex.com/en/support) to request activation.

> ❗ Once activated, you can no longer manage catalog entity translations via GraphQL Messages API. They are mutually exclusive.

---

## Required Permissions

| Product | Category | Resource |
|---|---|---|
| Catalog | Content | Categories Management |

---

## Missing Translation Handling

| System | Fallback behavior |
|---|---|
| Intelligent Search | Returns content in store's default language |
| Catalog API | Returns only entities that have translations in the requested locale |

> ℹ️ Implement fallback logic in headless implementations to handle missing translations gracefully.

---

## Troubleshooting

| Issue | Solution |
|---|---|
| Translations not appearing | Wait a few minutes for IS reindexing; check locale matches store binding |
| `403 Forbidden` | Verify `Categories Management` resource is enabled for user/API key |
| `404 Not Found` | Confirm the entity ID exists in the Catalog |
| `409 Conflict` | Use `GET` to retrieve current translations before updating |

---

## Documentation

- [Catalog Overview](./catalog-overview.md)
- [Catalog — Products](./catalog-products.md)
- [Catalog — Categories](./catalog-categories.md)
