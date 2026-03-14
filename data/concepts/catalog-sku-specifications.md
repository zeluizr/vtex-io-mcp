# Catalog — SKU Specifications

SKU specifications are used to differentiate SKUs on the product page and create browsing filters (e.g., Color, Size, Voltage). They appear as the SKU Selector in search results and on the product page.

> ℹ️ For color variation, do NOT use SKU specifications. See [Catalog — Product Variations](./catalog-product-variations.md) instead.

> ⚠️ If a new SKU Specification field is created, all SKUs associated with the category will be **deactivated** until the new specification is added to them. Products remain active.

---

## Data Model

| Field | Description | Required | Type | Default |
|---|---|---|---|---|
| `Id` | Specification ID (used for delete/update) | No | Integer | AutoIncrement |
| `SkuId` | SKU ID | Yes | Integer | - |
| `FieldId` | Specification field ID | Yes | Integer | - |
| `FieldValueId` | Value ID — required for `FieldTypeId` 5 (Combo) and 6 (Radio) | Yes | Integer | null |
| `Text` | Value — only for `FieldTypeId` other than 5, 6 | No | String | null |

> ⚠️ SKU specifications can only be **Combo (5)** or **Radio (6)** types.

---

## Create SKU Specification

**Endpoint:** `POST /api/catalog/pvt/stockkeepingunit/{skuId}/specification`

```json
{
  "FieldId": 13,
  "FieldValueId": 101
}
```

**Response:**

```json
{
  "Id": 1505,
  "SkuId": 1234568387,
  "FieldId": 193,
  "FieldValueId": 360,
  "Text": "Size 10"
}
```

---

## Get SKU Specifications

**Endpoint:** `GET /api/catalog/pvt/stockkeepingunit/{skuId}/specification`

Returns all specifications indexed on the SKU.

---

## Remove an SKU Specification

**Endpoint:** `DELETE /api/catalog/pvt/stockkeepingunit/{skuId}/specification/{specificationId}`

## Remove All Specifications from an SKU

**Endpoint:** `DELETE /api/catalog/pvt/stockkeepingunit/{skuId}/specification`

---

## Documentation

- [Catalog — Specifications](./catalog-specifications.md)
- [Catalog — SKU Specifications Update](./catalog-sku-specifications-update.md)
- [Catalog — Product Specifications](./catalog-product-specifications.md)
- [Catalog — Product Variations](./catalog-product-variations.md)
