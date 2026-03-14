# Catalog — SKUs

A Stock Keeping Unit (SKU) is the actual item in inventory that customers can purchase — equivalent to a product variation (e.g., "long sleeve gray size S shirt"). SKUs can only be created after the product is defined.

---

## Creating an SKU

**Endpoint:** `POST /api/catalog/pvt/stockkeepingunit`

### Key rules

- Do **not** set `IsActive: true` on creation — this causes `400 Bad Request`. Always set `IsActive: false` at creation.
- Set `ActivateIfPossible: true` unless you need manual activation control.
- You must provide at least one alternate ID: `RefId` or `EAN` (or both).
- To use a custom ID, include `Id` (integer) in the request. Otherwise VTEX generates it automatically.

### Request body example (auto-generated ID)

```json
{
  "ProductId": 310117069,
  "IsActive": false,
  "ActivateIfPossible": true,
  "Name": "sku test",
  "RefId": "125478",
  "Ean": "8949461894984",
  "PackagedHeight": 10,
  "PackagedLength": 10,
  "PackagedWidth": 10,
  "PackagedWeightKg": 10,
  "Height": null,
  "Length": null,
  "Width": null,
  "WeightKg": null,
  "CubicWeight": 0.1667,
  "IsKit": false,
  "CreationDate": null,
  "RewardValue": null,
  "EstimatedDateArrival": null,
  "ManufacturerCode": "123",
  "CommercialConditionId": 1,
  "MeasurementUnit": "un",
  "UnitMultiplier": 2.0000,
  "ModalType": null,
  "KitItensSellApart": false,
  "Videos": ["https://www.youtube.com/"]
}
```

---

## Updating an SKU

**Endpoint:** `PUT /api/catalog/pvt/stockkeepingunit/{skuId}`

Used for changes after creation or for manual activation (set `IsActive: true`).

---

## Activating an SKU

### Prerequisites for activation

- At least one alternate ID: `RefId` or `EAN`
- At least one image associated (use [Create SKU file endpoint](https://developers.vtex.com/docs/api-reference/catalog-api#post-/api/catalog/pvt/stockkeepingunit/-skuId-/file))
- All specifications filled in (if any)
- If `ActivateIfPossible: false`, must be activated manually
- If it's a kit: at least one active component
- Associated with an active product → active brand → active category

> ⚠️ For full store visibility, also configure: price in trade policy, inventory stock, and CMS storefront configuration.

### Manual Activation

1. Create SKU with `IsActive: false` and `ActivateIfPossible: false`
2. If kit: create and associate SKU components
3. Create and associate SKU files (images)
4. Update SKU with `IsActive: true`

### Automatic Activation

1. Create SKU with `IsActive: false` and `ActivateIfPossible: true`
2. If kit: create and associate SKU components
3. Create and associate SKU files (images)

SKU activates automatically once an image or active component is associated.

---

## Update request body example

```json
{
  "Id": 70,
  "ProductId": 42,
  "IsActive": true,
  "Name": "Size 10",
  "RefId": "B096QW8Y8Z",
  "PackagedHeight": 15.0,
  "PackagedLength": 15.0,
  "PackagedWidth": 15.0,
  "PackagedWeightKg": 15.0,
  "CubicWeight": 0.0,
  "IsKit": false,
  "MeasurementUnit": "un",
  "UnitMultiplier": 1.0,
  "KitItensSellApart": false,
  "Videos": []
}
```

---

## Documentation

- [Catalog Overview](./catalog-overview.md)
- [Catalog — Products](./catalog-products.md)
- [Catalog — SKU Specifications](./catalog-sku-specifications.md)
- [Catalog — SKU Images](./catalog-sku-images.md)
