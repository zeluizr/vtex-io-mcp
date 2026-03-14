# Catalog — SKU Images

Product images in VTEX are associated with SKUs. At least one image is required before an SKU can be activated.

See also: [Best practices with catalog images](https://help.vtex.com/en/tutorial/best-practices-for-using-images-in-the-catalog--738K2yfq5U86kUI2k4AQIk)

---

## Data Model

| Field | Description | Required | Type | Default |
|---|---|---|---|---|
| `Id` | SKU Image ID (`SkuFileId`) — used for delete/update | No | Integer | AutoIncrement |
| `ArchiveId` | Unique identifier of the image file | No | Integer | - |
| `SkuId` | SKU ID | Yes | Integer | null |
| `Name` | Name of the SKU file | No | String | null |
| `IsMain` | Set as the main product image | No | Boolean | null |
| `Label` | Image label | No | String | false |
| `Url` | External image URL — must be hosted with read permissions | Yes | String | - |

---

## Register an SKU Image

**Endpoint:** `POST /api/catalog/pvt/stockkeepingunit/{skuId}/file`

The image must be hosted on an external server with read permissions.

### Request body example

```json
{
  "IsMain": true,
  "Label": "Main",
  "Name": "Nike-Red-Janoski-1",
  "Url": "https://m.media-amazon.com/images/I/610G2-sJx5L._AC_UX695_.jpg"
}
```

### Response body example

```json
{
  "Id": 520,
  "SkuId": 70,
  "ArchiveId": 155467,
  "IsMain": true,
  "Label": "Main"
}
```

---

## Update an SKU Image

**Endpoint:** `PUT /api/catalog/pvt/stockkeepingunit/{skuId}/file/{skuFileId}`

> ⚠️ To update a SKU file, the image must be uploaded again.

### Request body example

```json
{
  "IsMain": true,
  "Label": "Main2",
  "Name": "Nike-Red-Janoski-1",
  "Url": "https://m.media-amazon.com/images/I/610G2-sJx5L._AC_UX695_.jpg"
}
```

---

## Remove an SKU Image

**Endpoint:** `DELETE /api/catalog/pvt/stockkeepingunit/{skuId}/file/{skuFileId}`

Requires the `SkuFileId` (the `Id` field in the image response).

## Remove All SKU Images

**Endpoint:** `DELETE /api/catalog/pvt/stockkeepingunit/{skuId}/file`

---

## Documentation

- [Catalog — SKUs](./catalog-skus.md)
- [Catalog Overview](./catalog-overview.md)
