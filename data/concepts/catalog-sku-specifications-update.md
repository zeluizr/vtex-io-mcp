# Catalog — Updating SKU Specifications

Step-by-step guide for updating the value of an SKU Specification.

Specifications are created at category level and inherited by products and SKUs. You can only update the `FieldValueId` of an SKU Specification — the `Text` field is automatically updated after changing `FieldValueId`.

> ⚠️ SKU Specifications can only have `FieldType` 5 (Combo) or 6 (Radio). You cannot change the `Text` field directly.

---

## Step 1 — Get Current SKU Specifications

**Endpoint:** `GET /api/catalog/pvt/stockkeepingunit/{skuId}/specification`

Example response (SKU with two specifications):

```json
[
  {
    "Id": 472,
    "SkuId": 17784,
    "FieldId": 271,
    "FieldValueId": null,
    "Text": ""
  },
  {
    "Id": 528,
    "SkuId": 17784,
    "FieldId": 40,
    "FieldValueId": 147,
    "Text": "L"
  }
]
```

> ⚠️ You can only update **one** SKU Specification at a time — not all at once.

To get more details about a specific specification, use `GET /api/catalog_system/pub/specification/fieldGet/{fieldId}`.

---

## Step 2 — Get Possible FieldValueIds

**Endpoint:** `GET /api/catalog_system/pub/specification/fieldvalue/{fieldId}`

Example response for a Size specification with three possible values:

```json
[
  { "FieldValueId": 144, "Value": "S", "IsActive": true, "Position": 1 },
  { "FieldValueId": 145, "Value": "M", "IsActive": true, "Position": 2 },
  { "FieldValueId": 147, "Value": "L", "IsActive": true, "Position": 3 }
]
```

---

## Step 3 — Update the SKU Specification

**Endpoint:** `PUT /api/catalog/pvt/stockkeepingunit/{skuId}/specification`

Send the specification `Id` and the new `FieldValueId`:

```json
{
  "Id": 528,
  "SkuId": 17784,
  "FieldId": 40,
  "FieldValueId": 145
}
```

After the update, `Text` will automatically change from `"L"` to `"M"`.

---

## Documentation

- [Catalog — SKU Specifications](./catalog-sku-specifications.md)
- [Catalog — Specifications](./catalog-specifications.md)
- [Catalog — SKUs](./catalog-skus.md)
