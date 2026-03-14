# Catalog — Specifications

Specifications are additional properties added to products or SKUs. They are used to create browsing filters and differentiate SKUs within a product page.

---

## Creation Flow

1. Create a Specification Group (mandatory)
2. Create a Specification (mandatory)
3. Create Specification Values (required for Combo, Radio, Checkbox types)
4. Associate the Specification with a Product or SKU (mandatory)

---

## Specification Groups

Specification groups are aggregators for specifications. Example: "Technical Specifications" group containing material, voltage, dimensions.

> ⚠️ Groups and fields created at a category level are valid for that category and all child categories. Fields created at root level are available in ALL store categories.

### Create a Specification Group

**Endpoint:** `POST /api/catalog/pvt/specification/specificationgroup`

```json
{
  "CategoryId": 11,
  "Name": "Features"
}
```

For a global group (valid for all categories):

```json
{
  "CategoryId": null,
  "Name": "Features"
}
```

> ⚠️ Create the specification group in the category associated with the desired product/SKU. If created on a different category, the API returns `200 OK` but it won't be visible in Admin or storefront — only via API.

---

## Specification Types

| Type | ID | Description |
|---|---|---|
| Text | 1 | One-line free text |
| Multi-line Text | 2 | Multi-line free text; suitable for HTML |
| Number | 4 | Integer number |
| Combo | 5 | Dropdown with configurable values |
| Radio | 6 | Radio button with configurable values |
| Checkbox | 7 | Checkbox list with configurable values |
| Indexed Text | 8 | One-line text; value influences search results |
| Indexed Multi-Line Text | 9 | Multi-line text; value influences search results |

> ⚠️ SKU specifications can only use **Combo (5)** or **Radio (6)** types. Other types with `IsStockKeepingUnit: true` return `400 Bad Request`.

---

## Product Specifications

Used to create browsing filters or display additional product information (e.g., fabric type). Accepts strings, numbers; used for frontend customization or external integrations.

## SKU Specifications

Used to differentiate SKUs within the product page (e.g., size: XS, S, M, L, XL). Work as SKU selectors on the product page.

> ⚠️ SKU specifications are **mandatory fields** — if a new SKU specification is added to a category, all SKUs in that category are disabled until the new specification is added to them.

---

## Create a Specification

**Endpoint:** `POST /api/catalog/pvt/specification`

- `IsStockKeepingUnit: true` → SKU specification
- `IsStockKeepingUnit: false` → Product specification
- `CategoryId: null` → created in root category

### Request body example

```json
{
  "FieldTypeId": 1,
  "CategoryId": 11,
  "FieldGroupId": 1,
  "Name": "Fabric",
  "Description": "Fabric of the dress",
  "Position": 1,
  "IsFilter": true,
  "IsRequired": true,
  "IsOnProductDetails": true,
  "IsStockKeepingUnit": false,
  "IsActive": true,
  "IsTopMenuLinkActive": false,
  "IsSideMenuLinkActive": true,
  "DefaultValue": "Cotton"
}
```

---

## Specification Values (for Combo, Radio, Checkbox)

If `FieldTypeId` is `5`, `6`, or `7`, you must register the possible values.

**Endpoint:** `POST /api/catalog/pvt/specification/specificationvalue`

> ⚠️ One request per value — make a separate request for each value.

### Request body example

```json
{
  "FieldId": 193,
  "Name": "Metal",
  "IsActive": true,
  "Position": 1
}
```

> ❗ Activate specification fields, otherwise they will not work.

---

## Associating a Specification with a Product

**Endpoint:** `POST /api/catalog/pvt/product/{productId}/specification`

For Combo and Radio types (use `FieldValueId`):
```json
{ "FieldId": 1, "FieldValueId": 13 }
```

For other types (use `Text`):
```json
{ "FieldId": 1, "Text": "Cotton" }
```

## Associating a Specification with an SKU

**Endpoint:** `POST /api/catalog/pvt/stockkeepingunit/{skuId}/specification`

SKU specs only allow Combo and Radio types:
```json
{ "FieldId": 1, "FieldValueId": 13 }
```

---

## Documentation

- [Catalog Overview](./catalog-overview.md)
- [Catalog — Product Specifications](./catalog-product-specifications.md)
- [Catalog — SKU Specifications](./catalog-sku-specifications.md)
