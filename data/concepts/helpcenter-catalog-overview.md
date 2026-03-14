---
title: 'Catalog - Overview'
id: helpcenter-catalog-overview
status: PUBLISHED
source: vtexdocs/help-center-content
originalPath: docs/en/tutorials/catalog/catalog-overview/catalog-overview.md
---

The VTEX Catalog is the module responsible for managing all products, SKUs, categories, and brands in your store. It is the backbone of the VTEX commerce platform, providing the data that feeds your storefront, search engine, and order management systems.

## Key concepts

### Categories

Categories organize the products in your store hierarchically. VTEX supports up to three levels:

- **Department** (Level 1): Top-level category (e.g., Electronics).
- **Category** (Level 2): Sub-category (e.g., Smartphones).
- **Subcategory** (Level 3): Further subdivision (e.g., Android Phones).

Each category can have associated **specifications** (attributes) that apply to all products within it.

### Products

A product represents a real-world item you sell (e.g., "Blue T-Shirt"). Products belong to categories and have:

- **Product specifications**: Attributes specific to the product (e.g., material, country of origin).
- **SKUs**: Variations of the product (e.g., size S, size M, size L).

### SKUs (Stock Keeping Units)

A SKU is a specific, purchasable version of a product. Each SKU has:

- A unique identifier
- Images
- **SKU specifications**: Variation-specific attributes (e.g., color, size)
- Price (configured in the Pricing module)
- Inventory (configured in Logistics)

### Brands

Brands are associated with products and help customers filter by manufacturer or brand name.

### Specifications

Specifications are attributes used to describe products and SKUs in detail. Types:

- **Product specifications**: Apply to all SKUs of a product (e.g., Material: Cotton).
- **SKU specifications**: Differentiate SKUs within a product (e.g., Size: S/M/L, Color: Red/Blue).

## Catalog in VTEX IO

When building Store Framework storefronts, the catalog is accessed through:

- **`vtex.search-resolver`**: GraphQL resolver that queries the catalog for search and PLP results.
- **`vtex.catalog-api-proxy`**: Proxies catalog API calls from the frontend.
- **Product context**: Blocks like `product-name`, `product-price`, `sku-selector` read from the catalog product context.

## Catalog API

The Catalog API allows programmatic management of the catalog:

```
GET /api/catalog/pvt/product/{productId}
GET /api/catalog/pvt/stockkeepingunit/{skuId}
GET /api/catalog_system/pvt/products/search
```

In VTEX IO Node services, use the `Catalog` client from `@vtex/clients`:

```typescript
import { Catalog } from '@vtex/clients'
// In your IOClients class:
catalog = this.createClient<Catalog>(Catalog)
```

## Indexation

Products go through an indexation process before appearing in search results. Indexation updates occur when:

- A product is created or updated.
- A price changes.
- Inventory availability changes.

Monitor indexation status in the VTEX Admin under **Catalog > Reports > Indexing Status** or using the [Intelligent Search indexing endpoint](https://developers.vtex.com/docs/api-reference/search-api).
