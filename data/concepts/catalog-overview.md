# Catalog Overview

VTEX Catalog architecture is based on five fundamental concepts: Category, Brand, Product, SKU, and Specification.

---

## Core Concepts

| Concept | Description |
|---|---|
| **Category** | Hierarchical classification of products — department, category, subcategory |
| **Brand** | Product attribute for brand identification; used as search filter |
| **Product** | Generic definition of an item (e.g., a shirt) |
| **SKU** | Stock Keeping Unit — the actual variation customers can purchase (e.g., gray size S shirt) |
| **Specification** | Additional properties (attributes) registered at category level, inherited by products and SKUs |

---

## Category Tree

The category tree is the backbone of the Catalog. Products are organized hierarchically, usually in up to three levels:

```
Department → Category → Subcategory
```

- VTEX Intelligent Search has no limit on category levels (category works as an attribute)
- Classic CMS: maximum 3 levels strongly recommended
- Products must be associated with the most specific category level

---

## Requirements for a Product to be Available in Store

A product must:
- Be part of a brand and a category
- Have at least one active SKU
- Have a price registered in the associated trade policy (sales channel)
- Have at least one unit in stock

---

## Integration Flow

Catalog integration must follow this specific order:

1. Departments and Categories
2. Specification Fields
3. Brands
4. Products
5. SKUs
6. Product/SKU Specifications

---

## Registration Methods

| Method | Description |
|---|---|
| **API Integration** | Full [Catalog API](https://developers.vtex.com/docs/api-reference/catalog-api#overview) — recommended for bulk/automated imports |
| **Google Drive Import** | Import from a single Google Drive file via [google-import app](https://github.com/vtex-apps/google-import) |
| **Classic Spreadsheet** | Import using multiple files (product, SKU, specification, image) |
| **Manual input** | Fill fields manually in VTEX Admin |

---

## SKU and Product Relationship

- A product is a generic item definition
- An SKU is a specific variation (physical unit in inventory)
- An SKU can only be created after the product is defined
- Example: Product = "Shirt" → SKU = "Long sleeve gray size S shirt"

---

## Documentation

- [Catalog — Categories](./catalog-categories.md)
- [Catalog — Brands](./catalog-brands.md)
- [Catalog — Products](./catalog-products.md)
- [Catalog — SKUs](./catalog-skus.md)
- [Catalog — Specifications](./catalog-specifications.md)
