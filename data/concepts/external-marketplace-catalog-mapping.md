# External Marketplace — Catalog & Category Mapping

How connectors maintain ID mappings between VTEX and the marketplace.

## Product (SKU) Mapping

Marketplaces typically assign their own unique ID to each SKU. When this differs from the VTEX SKU ID, the connector must maintain a mapping table:

```
VTEX skuId ↔ Marketplace skuId
```

This mapping is required for update, block, and delete operations. Implement a routine to clean the mapping when an SKU is blocked or deleted in VTEX.

If the marketplace uses the same ID as VTEX, no mapping is needed.

---

## Category Mapping

VTEX and the marketplace have independent category trees. The connector must map VTEX categories to marketplace categories so products are published in the correct section.

**VTEX Mapper** is the built-in tool for this. It allows sellers to visually map their VTEX categories to marketplace categories.

---

## VTEX Mapper Integration

### Step 1 — Register the Connector

```
POST /api/mkp-category-mapper/connector/register
```

On success, VTEX Mapper returns:
- A unique connector ID (store it — needed for category tree updates)
- An endpoint for the connector

Required properties:
- `categoryTreeEndPoint` — connector endpoint that provides the marketplace category tree
- `mappingEndPoint` — connector endpoint that receives the confirmed category mapping from VTEX Mapper

### Step 2 — Send Category Tree to VTEX Mapper

```
POST /api/mkp-category-mapper/categories/marketplace/{id}
```

Flow:
1. Collect current marketplace category tree
2. Check if tree is already stored in connector's repository
   - Not stored → store tree and send to VTEX Mapper
   - Already stored → check for updates; if changed, send full updated tree
3. Assemble full category tree as JSON, compressed in `.gzip` format
4. Send to VTEX Mapper → response `204` on success
5. Log the response

> Category tree processing is **asynchronous**. VTEX Mapper sends confirmation to the connector's `connectorEndpoint` when complete.

### Step 3 — Receive Category Mapping

VTEX Mapper sends the confirmed category mapping to the connector's `mappingEndPoint`. Store this mapping — it's used during every product registration to translate VTEX category IDs to marketplace category IDs.

### Step 4 — Use Mapping in Product Registration Flow

When receiving a VTEX notification to register an SKU:

1. Get SKU information → extract `categoryId`
2. Look up `categoryId` in stored VTEX Mapper mapping
   - **Found** → use corresponding marketplace category ID
   - **Not found** → log error, alert seller to complete category mapping in VTEX, queue SKU for retry

---

## API Reference

```
POST /api/mkp-category-mapper/connector/register              # Register connector in VTEX Mapper
POST /api/mkp-category-mapper/categories/marketplace/{id}     # Send category tree to VTEX Mapper
GET  /api/catalog_system/pvt/sku/stockkeepingunitbyid/{skuId} # Get SKU (includes categoryId)
```

## Documentation

- [External Marketplace — Catalog Integration](./external-marketplace-catalog-integration.md)
- [External Marketplace — New Products & Updates](./external-marketplace-new-products.md)
- [External Marketplace — Product Load](./external-marketplace-product-load.md)
