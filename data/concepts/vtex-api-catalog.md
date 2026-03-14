# VTEX Catalog API

## Description

The Catalog API empowers merchants to seamlessly manage their product information. It enables the creation, modification, and deletion of product details, including attributes like images and specifications. SKU management covers product variations. This API also supports organizing products into categories, collections, and managing brands.

**Rate limit:** 45,000 requests per minute per account; 15,000 requests per minute per endpoint.

## Base URL

```
https://{accountName}.vtexcommercestable.com.br
```

## Authentication

| Header | Description |
|--------|-------------|
| `X-VTEX-API-AppKey` | API key identifier. Use together with `X-VTEX-API-AppToken`. |
| `X-VTEX-API-AppToken` | API key secret token. |
| `VtexIdclientAutCookie` | User token (valid 24h). Alternative to AppKey/AppToken. |

## Endpoints by Tag

### Category

| Method | Path | Summary |
|--------|------|---------|
| `GET` | `/api/catalog_system/pub/category/tree/{categoryLevels}` | Get category tree |
| `GET` | `/api/catalog/pvt/category/{categoryId}` | Get category by ID |
| `PUT` | `/api/catalog/pvt/category/{categoryId}` | Update category |
| `POST` | `/api/catalog/pvt/category` | Create category |
| `GET` | `/api/catalog/pvt/category/{categoryId}/language` | Get category translation |
| `PUT` | `/api/catalog/pvt/category/{categoryId}/language` | Create or update category translation |

### Category Specification

| Method | Path | Summary |
|--------|------|---------|
| `GET` | `/api/catalog_system/pub/specification/field/listByCategoryId/{categoryId}` | Get specifications by category ID |
| `GET` | `/api/catalog_system/pub/specification/field/listTreeByCategoryId/{categoryId}` | Get specifications tree by category ID |

### Brand

| Method | Path | Summary |
|--------|------|---------|
| `GET` | `/api/catalog_system/pvt/brand/list` | Get brand list |
| `GET` | `/api/catalog_system/pvt/brand/pagedlist` | Get brand list per page |
| `GET` | `/api/catalog_system/pvt/brand/{brandId}` | Get brand |
| `POST` | `/api/catalog/pvt/brand` | Create brand |
| `GET` | `/api/catalog/pvt/brand/{brandId}` | Get brand and context |
| `PUT` | `/api/catalog/pvt/brand/{brandId}` | Update brand |
| `DELETE` | `/api/catalog/pvt/brand/{brandId}` | Delete brand |

### Specification Group

| Method | Path | Summary |
|--------|------|---------|
| `GET` | `/api/catalog_system/pvt/specification/groupbycategory/{categoryId}` | List specification group by category |
| `GET` | `/api/catalog_system/pub/specification/groupGet/{groupId}` | Get specification group |
| `POST` | `/api/catalog/pvt/specificationgroup` | Create specification group |
| `PUT` | `/api/catalog/pvt/specificationgroup/{groupId}` | Update specification group |

### Specification

| Method | Path | Summary |
|--------|------|---------|
| `GET` | `/api/catalog/pvt/specification/{specificationId}` | Get specification |
| `PUT` | `/api/catalog/pvt/specification/{specificationId}` | Update specification |
| `POST` | `/api/catalog/pvt/specification` | Create specification |

### Product

| Method | Path | Summary |
|--------|------|---------|
| `GET` | `/api/catalog_system/pvt/products/GetProductAndSkuIds` | Get product and SKU IDs |
| `GET` | `/api/catalog/pvt/product/{productId}` | Get product by ID |
| `PUT` | `/api/catalog/pvt/product/{productId}` | Update product |
| `POST` | `/api/catalog/pvt/product` | Create product with category and brand |
| `GET` | `/api/catalog_system/pvt/products/productget/{productId}` | Get product and its general context |
| `GET` | `/api/catalog_system/pvt/products/productgetbyrefid/{refId}` | Get product by reference ID |
| `GET` | `/api/catalog_system/pub/products/variations/{productId}` | Get product's SKUs by product ID |

### Product Specification

| Method | Path | Summary |
|--------|------|---------|
| `GET` | `/api/catalog_system/pvt/products/{productId}/specification` | Get product specifications by product ID |
| `POST` | `/api/catalog_system/pvt/products/{productId}/specification` | Update product specification by product ID |
| `GET` | `/api/catalog/pvt/product/{productId}/specification` | Get product specification and its information |
| `POST` | `/api/catalog/pvt/product/{productId}/specification` | Associate product specification |
| `DELETE` | `/api/catalog/pvt/product/{productId}/specification` | Delete all product specifications |
| `DELETE` | `/api/catalog/pvt/product/{productId}/specification/{specificationId}` | Delete a product specification |

### SKU

| Method | Path | Summary |
|--------|------|---------|
| `GET` | `/api/catalog_system/pvt/sku/stockkeepingunitids` | List all SKU IDs |
| `GET` | `/api/catalog_system/pvt/sku/stockkeepingunitbyid/{skuId}` | SKU and context |
| `GET` | `/api/catalog/pvt/stockkeepingunit` | Get SKU by reference ID |
| `POST` | `/api/catalog/pvt/stockkeepingunit` | Create SKU |
| `GET` | `/api/catalog/pvt/stockkeepingunit/{skuId}` | Get SKU |
| `PUT` | `/api/catalog/pvt/stockkeepingunit/{skuId}` | Update SKU |
| `GET` | `/api/catalog_system/pvt/sku/stockkeepingunitidbyrefid/{refId}` | Get SKU ID by reference ID |
| `GET` | `/api/catalog_system/pvt/sku/stockkeepingunitByProductId/{productId}` | Get SKU list by product ID |
| `POST` | `/api/catalog_system/pub/sku/stockkeepingunitidsbyrefids` | Retrieve SKU ID list by reference ID list |

### SKU Specification

| Method | Path | Summary |
|--------|------|---------|
| `GET` | `/api/catalog/pvt/stockkeepingunit/{skuId}/specification` | Get SKU specifications |
| `POST` | `/api/catalog/pvt/stockkeepingunit/{skuId}/specification` | Associate SKU specification |
| `PUT` | `/api/catalog/pvt/stockkeepingunit/{skuId}/specification` | Update SKU specification |
| `DELETE` | `/api/catalog/pvt/stockkeepingunit/{skuId}/specification` | Delete all SKU specifications |
| `DELETE` | `/api/catalog/pvt/stockkeepingunit/{skuId}/specification/{specificationId}` | Delete SKU specification |

### SKU File (Images)

| Method | Path | Summary |
|--------|------|---------|
| `GET` | `/api/catalog/pvt/stockkeepingunit/{skuId}/file` | Get SKU files |
| `POST` | `/api/catalog/pvt/stockkeepingunit/{skuId}/file` | Create SKU file |
| `PUT` | `/api/catalog/pvt/stockkeepingunit/{skuId}/file/{skuFileId}` | Update SKU file |
| `DELETE` | `/api/catalog/pvt/stockkeepingunit/{skuId}/file` | Delete all SKU files |
| `DELETE` | `/api/catalog/pvt/stockkeepingunit/{skuId}/file/{skuFileId}` | Delete SKU image file |

### SKU EAN

| Method | Path | Summary |
|--------|------|---------|
| `GET` | `/api/catalog_system/pvt/sku/stockkeepingunitbyean/{ean}` | Get SKU by EAN |
| `GET` | `/api/catalog/pvt/stockkeepingunit/{skuId}/ean` | Get EAN by SKU ID |
| `POST` | `/api/catalog/pvt/stockkeepingunit/{skuId}/ean/{ean}` | Create SKU EAN |
| `DELETE` | `/api/catalog/pvt/stockkeepingunit/{skuId}/ean/{ean}` | Delete SKU EAN |

### Attachment

| Method | Path | Summary |
|--------|------|---------|
| `GET` | `/api/catalog/pvt/attachment/{attachmentid}` | Get attachment |
| `PUT` | `/api/catalog/pvt/attachment/{attachmentid}` | Update attachment |
| `DELETE` | `/api/catalog/pvt/attachment/{attachmentid}` | Delete attachment |
| `POST` | `/api/catalog/pvt/attachment` | Create attachment |
| `GET` | `/api/catalog/pvt/attachments` | Get all attachments |

### Collection

| Method | Path | Summary |
|--------|------|---------|
| `GET` | `/api/catalog/pvt/collection/inactive` | Get all inactive collections |
| `POST` | `/api/catalog/pvt/collection` | Create collection |
| `GET` | `/api/catalog/pvt/collection/{collectionId}` | Get collection by ID |
| `PUT` | `/api/catalog/pvt/collection/{collectionId}` | Update collection |
| `DELETE` | `/api/catalog/pvt/collection/{collectionId}` | Delete collection |
| `GET` | `/api/catalog/pvt/collection/{collectionId}/products` | Get products from a collection |

### Seller

| Method | Path | Summary |
|--------|------|---------|
| `GET` | `/api/catalog_system/pvt/seller/list` | Get seller list |
| `GET` | `/api/catalog_system/pvt/seller/{sellerId}` | Get seller by ID |
| `PUT` | `/api/catalog_system/pvt/seller` | Update seller |
| `POST` | `/api/catalog_system/pvt/seller` | Create seller |

### Trade Policy / Sales Channel

| Method | Path | Summary |
|--------|------|---------|
| `GET` | `/api/catalog/pvt/product/{productId}/salespolicy` | Get trade policies by product ID |
| `POST` | `/api/catalog/pvt/product/{productId}/salespolicy/{tradepolicyId}` | Associate product with trade policy |
| `DELETE` | `/api/catalog/pvt/product/{productId}/salespolicy/{tradepolicyId}` | Remove product from trade policy |
| `GET` | `/api/catalog_system/pvt/saleschannel/list` | Get sales channel list |
| `GET` | `/api/catalog_system/pub/saleschannel/{salesChannelId}` | Get sales channel by ID |

### Product Indexing

| Method | Path | Summary |
|--------|------|---------|
| `GET` | `/api/catalog_system/pvt/products/GetIndexedInfo/{productId}` | Get product indexed information |

## Key Request/Response Models

### Create Product (POST /api/catalog/pvt/product)

Request body fields:
- `Name` (string, required) — Product name
- `CategoryId` (integer) — Category ID
- `BrandId` (integer) — Brand ID
- `RefId` (string) — Reference ID (external identifier)
- `Title` (string) — Page title (SEO)
- `Description` (string) — Product description
- `IsActive` (boolean) — Whether the product is active
- `IsVisible` (boolean) — Whether the product is visible
- `MetaTagDescription` (string) — Meta description (SEO)

### Create SKU (POST /api/catalog/pvt/stockkeepingunit)

Request body fields:
- `ProductId` (integer, required) — Parent product ID
- `Name` (string, required) — SKU name
- `RefId` (string) — Reference ID
- `IsActive` (boolean) — Whether the SKU is active
- `Height`, `Width`, `Length`, `WeightKg` (number) — Dimensions
- `CommercialConditionId` (integer) — Commercial condition

### Get Product and SKU IDs Response

```json
{
  "data": {
    "3": [5],
    "8": [310118453, 310118459, 310118463]
  },
  "range": {
    "total": 4,
    "from": 1,
    "to": 4
  }
}
```

## Documentation

https://developers.vtex.com/docs/api-reference/catalog-api
