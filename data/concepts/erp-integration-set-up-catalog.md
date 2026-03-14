# ERP Integration — Set Up Catalog

Before importing products from an ERP or PIM, the catalog structure must exist in VTEX. This guide covers creating the category tree, brands, and specifications.

## Category Tree

VTEX catalog hierarchy: **Department → Category → Subcategory**

### Create Department

```
POST /api/catalog/pvt/category
```

```json
{
  "Name": "Apparel",
  "IsActive": true,
  "FatherCategoryId": null
}
```

### Create Category

```
POST /api/catalog/pvt/category
```

```json
{
  "Name": "T-Shirts",
  "IsActive": true,
  "FatherCategoryId": 1
}
```

### Create Subcategory

```
POST /api/catalog/pvt/category
```

```json
{
  "Name": "Men's T-Shirts",
  "IsActive": true,
  "FatherCategoryId": 12
}
```

### Retrieve Categories

```
GET /api/catalog_system/pub/category/tree/{depth}    # Get full category tree
GET /api/catalog/pvt/category/{categoryId}           # Get category by ID
```

---

## Brands

```
POST /api/catalog/pvt/brand          # Create brand
PUT  /api/catalog/pvt/brand/{id}     # Update brand
GET  /api/catalog/pvt/brand/{id}     # Get brand by ID
GET  /api/catalog_system/pvt/brand/list   # List all brands
```

```json
{
  "Name": "Nike",
  "IsActive": true,
  "Title": "Nike",
  "MetaTagDescription": "Nike products"
}
```

---

## Specification Groups

Specification groups organize specification fields within a category. Each group belongs to a category.

```
POST /api/catalog/pvt/specificationgroup        # Create group
GET  /api/catalog/pvt/specificationgroup/{id}   # Get group by ID
GET  /api/catalog_system/pvt/specification/groupbycategory/{categoryId}  # List groups in category
```

```json
{
  "CategoryId": 12,
  "Name": "Technical Details"
}
```

---

## Specification Fields

Fields define the attributes of a product or SKU within a specification group.

```
POST /api/catalog/pvt/specificationfield        # Create field
PUT  /api/catalog/pvt/specificationfield/{id}   # Update field
GET  /api/catalog/pvt/specificationfield/{id}   # Get field by ID
GET  /api/catalog_system/pvt/specification/fieldlistbycategory/{categoryId}  # List fields in category
```

### Field Types

| FieldTypeId | Type | Description |
|---|---|---|
| 1 | Text | Free text input |
| 2 | Multi-Line Text | Text area |
| 4 | Number | Numeric value |
| 5 | Combo | Dropdown with predefined values |
| 6 | Radio | Radio button with predefined values |
| 7 | Checkbox | Multiple selection with predefined values |
| 8 | Indexed Text | Searchable text (for catalog search) |
| 9 | Indexed Multi-Line Text | Searchable text area |

```json
{
  "FieldGroupId": 5,
  "Name": "Material",
  "CategoryId": 12,
  "FieldTypeId": 5,
  "IsActive": true,
  "IsRequired": false,
  "IsFilter": true,
  "IsOnProductDetails": true,
  "IsStockKeepingUnit": false
}
```

> Set `IsStockKeepingUnit: true` to create an **SKU specification** instead of a product specification.

---

## Specification Values

For Combo, Radio, and Checkbox fields, pre-define the allowed values.

```
POST /api/catalog/pvt/specificationvalue        # Create value
GET  /api/catalog/pvt/specificationvalue/{id}   # Get value by ID
GET  /api/catalog_system/pvt/specification/fieldvalues/{fieldId}  # List values for a field
```

```json
{
  "FieldId": 31,
  "Name": "Cotton",
  "IsActive": true,
  "Position": 1
}
```

---

## Migration Pattern — Mock Integration Category

When migrating from a flat ERP catalog (no category hierarchy), use a **mock "Integration" category** as a staging area:

1. Create a hidden top-level department: `"Integration"` (set `IsActive: false` or restrict to internal trade policy)
2. Import all products into this category initially
3. Run a post-processing step to reassign products to their correct categories
4. Products remain searchable/sellable in their real categories; the mock category is never shown to customers

This avoids blocking the product import flow while the category tree is being finalized.

---

## Required Order

1. Create department
2. Create categories (assign to department)
3. Create subcategories (assign to category)
4. Create brands
5. Create specification groups (assign to category)
6. Create specification fields (assign to group)
7. Create specification values (for Combo/Radio/Checkbox fields)

Only after this structure exists can products and SKUs be imported with their specifications.

## Documentation

- [ERP Integration Guide](./erp-integration-guide.md)
- [Catalog Overview](./catalog-overview.md)
- [Authentication](./authentication.md)
