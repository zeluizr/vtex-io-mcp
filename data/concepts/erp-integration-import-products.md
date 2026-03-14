# ERP Integration — Import Products

Send all product information from your ERP or PIM to VTEX.

## Before You Begin

**Key decisions before importing:**

- **Product vs SKU grouping** — A **Product** is the abstract unit shown on shelves; an **SKU** is the concrete unit with variations (color, size) shown on product pages. Plan how to group variations.
- **Image quality** — High-quality images improve conversions but can impact page load time. Organize product assets before importing.
- **Trade Policies** — Add all products to the main trade policy (ID: `1`). Optionally add products to other trade policies for specific marketplaces.

> Product information from ERPs often needs an **enrichment process** before it's suitable for ecommerce display (better descriptions, category restructuring, etc.).

## Import Methods

| Method | Best For |
|---|---|
| **API Integration** | Large catalogs, frequent updates, technical teams |
| **Google Drive Import** | Non-technical teams, infrequent catalog changes |
| **Manual Admin input** | Small catalogs, one-time setup |

A combination of API integration and Google Drive Import often works best.

---

## Import Scenarios by Data Availability

### Scenario A — Basic Information Only (no category)

ERP provides: name, reference code, brand, no category.

1. Create product associated with a mock **"Integration"** category (inactive — not shown to customers)
2. Optionally use a mock **"Integration"** brand if brands are unavailable
3. Store team enriches catalog manually via Google Sheets or Admin (assigns correct categories)

### Scenario B — Categories Available

ERP provides: name, reference code, brand, category, dimensions, images, price, inventory.

1. Create product → `POST /api/catalog/pvt/product`
2. Upload SKU image → `POST /api/catalog/pvt/stockkeepingunit/{skuId}/file`
3. Send price → `PUT /api/pricing/prices/{skuId}`
4. Send inventory → `PUT /api/logistics/pvt/inventory/skus/{skuId}/warehouses/{warehouseId}`

### Scenario C — Enriched Information

ERP/PIM provides: all of the above + product/SKU specifications.

1. Create product → `POST /api/catalog/pvt/product`
2. Upload SKU image → `POST /api/catalog/pvt/stockkeepingunit/{skuId}/file`
3. Send specifications → `POST /api/catalog/pvt/product/{productId}/specification`
4. Send price → `PUT /api/pricing/prices/{skuId}`
5. Send inventory → `PUT /api/logistics/pvt/inventory/skus/{skuId}/warehouses/{warehouseId}`

---

## API Integration Steps

### 1. Create Product

```
POST /api/catalog/pvt/product
GET  /api/catalog/pvt/product/{productId}    # Verify
```

> **Save the `id` returned by VTEX.** You will need it for all subsequent operations on this product. Associate it with your internal REFID in your database.

### 2. Create Product Specifications

```
POST /api/catalog/pvt/product/{productId}/specification
GET  /api/catalog_system/pvt/products/{productId}/specification    # Verify
```

### 3. Associate Product with Trade Policy

All products must be linked to the main trade policy (ID: `1`) to appear in your store.

```
POST   /api/catalog/pvt/product/{productId}/salespolicy/{tradepolicyId}    # Add
DELETE /api/catalog/pvt/product/{productId}/salespolicy/{tradepolicyId}    # Remove
GET    /api/catalog_system/pvt/saleschannel/list                           # List available trade policies
```

### 4. Create SKU

```
POST /api/catalog/pvt/stockkeepingunit
GET  /api/catalog_system/pvt/sku/stockkeepingunitByProductId/{productId}    # Verify
```

### 5. Create SKU Specifications

```
POST /api/catalog/pvt/stockkeepingunit/{skuId}/specification
GET  /api/catalog/pvt/stockkeepingunit/{skuId}/specification    # Verify
```

### 6. Upload SKU Image

An image is required to activate an SKU.

```
POST /api/catalog/pvt/stockkeepingunit/{skuId}/file
GET  /api/catalog/pvt/stockkeepingunit/{skuId}/file    # Verify
```

---

## Error Handling — Timeout

When registering products via ERP integration, the API may return a `Timeout` error. This is expected behavior within the integration flow — the system took longer than expected for that request. **Your code must implement retries.** Repeat the product registration request normally.

If the error persists after retries, contact VTEX Support.

## Documentation

- [ERP Integration Guide](./erp-integration-guide.md)
- [Catalog Overview](./catalog-overview.md)
- [ERP Integration — Set Up Catalog](./erp-integration-set-up-catalog.md)
- [ERP Integration — Import Prices](./erp-integration-import-prices.md)
- [ERP Integration — Import Inventory](./erp-integration-import-inventory.md)
- [Authentication](./authentication.md)
