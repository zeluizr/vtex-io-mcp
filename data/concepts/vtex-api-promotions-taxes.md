# VTEX Promotions & Taxes API

## Description

The Promotions & Taxes API allows you to manage and retrieve all promotions, coupons, and tax rules from your VTEX store. Promotions can be percentage discounts, nominal discounts, free shipping, gift items, and more. Tax rules apply additional charges based on product categories or regions.

## Base URL

```
https://{accountName}.vtexcommercestable.com.br
```

## Authentication

| Header | Description |
|--------|-------------|
| `X-VTEX-API-AppKey` | API key identifier. |
| `X-VTEX-API-AppToken` | API key secret token. |

## Endpoints by Tag

### Promotions and Taxes

| Method | Path | Summary |
|--------|------|---------|
| `GET` | `/api/rnb/pvt/benefits/calculatorconfiguration` | Get all promotions |
| `GET` | `/api/rnb/pvt/taxes/calculatorconfiguration` | Get all taxes |
| `GET` | `/api/rnb/pvt/benefits/calculatorconfiguration/search` | Search promotion by name |
| `GET` | `/api/rnb/pvt/calculatorconfiguration/{idCalculatorConfiguration}` | Get promotion or tax by ID |
| `POST` | `/api/rnb/pvt/calculatorconfiguration` | Create or update promotion or tax |
| `POST` | `/api/rnb/pvt/import/calculatorConfiguration` | Create Multiple SKU promotion |
| `PUT` | `/api/rnb/pvt/import/calculatorConfiguration/{promotionId}` | Update Multiple SKU promotion |
| `POST` | `/api/rnb/pvt/archive/calculatorConfiguration/{idCalculatorConfiguration}` | Archive promotion or tax |
| `POST` | `/api/rnb/pvt/unarchive/calculatorConfiguration/{idCalculatorConfiguration}` | Unarchive promotion or tax |
| `GET` | `/api/rnb/pvt/archive/benefits/calculatorConfiguration` | List archived promotions |
| `GET` | `/api/rnb/pvt/archive/taxes/calculatorConfiguration` | List archived taxes |
| `POST` | `/api/rnb/pvt/calculatorconfiguration/{promotionId}/seller-opt` | Seller opt-in or opt-out |

### Coupons

| Method | Path | Summary |
|--------|------|---------|
| `POST` | `/api/rnb/pvt/multiple-coupons` | Create multiple coupons |
| `POST` | `/api/rnb/pvt/coupon` | Create or update coupon |
| `GET` | `/api/rnb/pvt/coupon/{couponCode}` | Get coupon by coupon code |
| `GET` | `/api/rnb/pvt/archive/coupon/{couponCode}` | Get archived coupon by coupon code |
| `POST` | `/api/rnb/pvt/archive/coupon/{couponCode}` | Archive coupon by coupon code |
| `GET` | `/api/rnb/pvt/coupon` | Get all coupons |
| `POST` | `/api/rnb/pvt/coupons` | Generate coupons in bulk |
| `GET` | `/api/rnb/pvt/coupon/usage/{couponCode}` | Get coupon usage |
| `POST` | `/api/rnb/pvt/unarchive/coupon/{couponCode}` | Unarchive coupon by coupon code |

### Campaign Audiences

| Method | Path | Summary |
|--------|------|---------|
| `GET` | `/api/rnb/pvt/campaignConfiguration/{campaignId}` | Get campaign audience configuration |
| `GET` | `/api/rnb/pvt/campaignConfiguration` | Get all campaign audiences |
| `POST` | `/api/rnb/pvt/campaignConfiguration` | Create campaign audience |

### Bundles

| Method | Path | Summary |
|--------|------|---------|
| `POST` | `/pub/bundles` | Calculate discounts and taxes (Bundles) |

### Notifications

| Method | Path | Summary |
|--------|------|---------|
| `POST` | `/api/rnb/pub/notifications` | Usage notification |

### Prices (Legacy v1 — not recommended for new integrations)

| Method | Path | Summary |
|--------|------|---------|
| `GET` | `/price-sheet/{skuId}` | Get Price by SKU ID |
| `DELETE` | `/price-sheet/{skuId}` | Delete Price by SKU ID |
| `GET` | `/price-sheet/all/{page}/{pageSize}` | Get all paged prices |
| `POST` | `/price-sheet/context` | Get Price by context |
| `POST` | `/price-sheet` | Save Price |

## Key Request/Response Models

### Create or Update Promotion (POST /api/rnb/pvt/calculatorconfiguration)

Promotions have many types. Key fields:
- `type` (string) — Promotion type:
  - `"regular"` — Percentage or nominal discount
  - `"buyAndWin"` — Buy X get Y free
  - `"shipping"` — Shipping discount
  - `"giftList"` — Gift with purchase
  - `"tax"` — Tax rule
- `name` (string) — Internal name
- `isActive` (boolean) — Whether promotion is active
- `beginDateUtc` (string) — Start date (ISO 8601)
- `endDateUtc` (string) — End date (ISO 8601, null = no end)
- `percentualDiscount` (number) — Percentage discount (0-100)
- `nominalDiscount` (number) — Fixed amount discount (in cents)
- `percentualShippingDiscount` (number) — Shipping percentage discount
- `freeShipping` (boolean) — Free shipping flag
- `maxNumberOfAffectedItems` (integer) — Max items affected
- `maxNumberOfAffectedItemsGroupKey` (string) — Grouping key for limit
- `slasIds` (array) — Applicable shipping SLA IDs
- `skusGifts` (array) — Gift SKU IDs for buyAndWin promotions
- `idsSalesChannel` (array) — Trade policy IDs (empty = all channels)
- `clusterExpressions` (array) — Customer cluster conditions

### Get Promotion Response (GET /api/rnb/pvt/calculatorconfiguration/{id})

```json
{
  "idCalculatorConfiguration": "abc123",
  "name": "10% off sneakers",
  "type": "regular",
  "isActive": true,
  "isFeatured": false,
  "beginDateUtc": "2023-01-01T00:00:00Z",
  "endDateUtc": null,
  "percentualDiscount": 10.0,
  "nominalDiscount": 0,
  "freeShipping": false,
  "idsSalesChannel": ["1"],
  "restrictionsBins": [],
  "skusLists": [{ "idList": "list-123", "minimumQuantity": 1 }],
  "categories": [{ "id": "5", "name": "Sneakers" }]
}
```

### Create Coupon (POST /api/rnb/pvt/coupon)

Request body:
```json
{
  "utmSource": "SUMMER20",
  "isArchived": false,
  "maxItemsPerClient": 1,
  "expirationInteractionsLimit": null,
  "maxUsage": 1000
}
```

### Generate Coupons in Bulk (POST /api/rnb/pvt/coupons)

Request body:
```json
{
  "quantity": 100,
  "prefix": "SALE",
  "maxUsage": 1,
  "expirationDate": "2024-12-31T23:59:59Z"
}
```

Response: Array of generated coupon codes.

## Promotion Types Reference

| Type | Description |
|------|-------------|
| `regular` | Standard percentage or nominal discount on products |
| `buyAndWin` | Buy N items and get a gift |
| `shipping` | Discount or free shipping |
| `giftList` | Offer from a gift list |
| `forThePriceOf` | "3 for the price of 2" style |
| `progressive` | Progressive discount based on quantity |
| `campaign` | Campaign-audience based promotion |

## Documentation

https://developers.vtex.com/docs/api-reference/promotions-and-taxes-api
