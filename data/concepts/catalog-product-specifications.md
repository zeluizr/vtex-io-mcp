# Catalog — Product Specifications

Product specifications are used to create browsing filters and display additional product information (e.g., fabric type, material).

---

## Data Model

| Field | Description | Required | Format | Default |
|---|---|---|---|---|
| `Id` | Specification ID (used for delete/update) | No | Integer | AutoIncrement |
| `ProductId` | Product ID | Yes | Integer | - |
| `FieldId` | Specification field ID | Yes | Integer | - |
| `FieldValueId` | Value ID — **only** for `FieldTypeId` 5, 6, 7 (Combo, Radio, Checkbox) | Mandatory for 5,6,7; must NOT be used for other types | Integer | null |
| `Text` | Value — only for `FieldTypeId` **other than** 5, 6, 7 | Mandatory for all except 5,6,7 | String | null |

---

## Create a Product Specification

**Endpoint:** `POST /api/catalog/pvt/product/{productId}/specification`

### Example 1 — Text field

```json
{
  "FieldId": 21,
  "Text": "This is a test for specification field type text"
}
```

**Response:**

```json
{
  "Id": 39,
  "ProductId": 42,
  "FieldId": 21,
  "FieldValueId": null,
  "Text": "This is a test for specification field type text"
}
```

### Example 2 — Combo/Radio/Checkbox field

```json
{
  "FieldId": 22,
  "FieldValueId": 65
}
```

**Response:**

```json
{
  "Id": 38,
  "ProductId": 42,
  "FieldId": 22,
  "FieldValueId": 65,
  "Text": "Metal"
}
```

---

## Get All Specifications from a Product

**Endpoint:** `GET /api/catalog/pvt/product/{productId}/specification`

```json
[
  {
    "Id": 38,
    "ProductId": 42,
    "FieldId": 22,
    "FieldValueId": 65,
    "Text": "Metal"
  },
  {
    "Id": 39,
    "ProductId": 42,
    "FieldId": 21,
    "FieldValueId": null,
    "Text": "This is a test for specification field type text"
  }
]
```

---

## Update Product Specifications (Bulk)

**Endpoint:** `POST /api/catalog_system/pvt/products/{productId}/specification`

> ⚠️ Updating product specification by `fieldName` does not work — use `Id`.

```json
[
  {
    "value": ["Metal"],
    "Id": 22
  },
  {
    "value": ["This is the second test for specification field type text"],
    "Id": 21
  }
]
```

---

## Remove a Product Specification

**Endpoint:** `DELETE /api/catalog/pvt/product/{productId}/specification/{specificationId}`

## Remove All Product Specifications

**Endpoint:** `DELETE /api/catalog/pvt/product/{productId}/specification`

---

## Documentation

- [Catalog — Specifications](./catalog-specifications.md)
- [Catalog — SKU Specifications](./catalog-sku-specifications.md)
- [Catalog — Products](./catalog-products.md)
