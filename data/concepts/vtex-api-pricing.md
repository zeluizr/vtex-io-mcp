# VTEX Pricing API

## Description

The Pricing API is the VTEX module responsible for the SKU price list. It stores each SKU's base price, optional fixed prices by trade policy, and rules that dynamically generate final prices according to the purchase context and trade policy.

## Base URL

```
https://api.vtex.com/{accountName}
```

Note: This differs from other VTEX APIs — it uses `api.vtex.com` instead of `{accountName}.vtexcommercestable.com.br`.

## Authentication

| Header | Description |
|--------|-------------|
| `X-VTEX-API-AppKey` | API key identifier. |
| `X-VTEX-API-AppToken` | API key secret token. |

## Rate Limits

| Operation | Rate | Burst Credits |
|-----------|------|---------------|
| `GET` | Under review | Under review |
| `POST` and `PUT` | 2,000/min, 33/sec | 500 |
| `DELETE` | 1,000/min, 16/sec | 300 |

Response headers for monitoring: `Ratelimit-Limit`, `Ratelimit-Remaining`, `Ratelimit-Reset`, `Retry-After`.

## Endpoints by Tag

### Prices and Fixed Prices

| Method | Path | Summary |
|--------|------|---------|
| `GET` | `/pricing/prices/{itemId}` | Get price |
| `DELETE` | `/pricing/prices/{itemId}` | Delete price |
| `PUT` | `/pricing/prices/{itemId}` | Create or update base price or fixed prices |
| `PATCH` | `/pricing/prices/{itemId}/fixed` | Create or update base price or fixed prices (partial) |
| `GET` | `/pricing/prices/{itemId}/fixed` | Get fixed prices |
| `POST` | `/pricing/prices/{itemId}/fixed/{priceTableId}` | Create or update fixed prices on a price table or trade policy |
| `GET` | `/pricing/prices/{itemId}/fixed/{priceTableId}` | Get fixed prices on a price table policy |
| `DELETE` | `/pricing/prices/{itemId}/fixed/{priceTableId}` | Delete fixed prices on a price table or trade policy |
| `GET` | `/pricing/prices/{itemId}/computed/{priceTableId}` | Get computed price by price table or trade policy |

### Pricing Configuration

| Method | Path | Summary |
|--------|------|---------|
| `GET` | `/pricing/config` | Get Pricing configuration |
| `GET` | `/pricing/migration` | Get Pricing v2 status |

### Price Tables

| Method | Path | Summary |
|--------|------|---------|
| `GET` | `/pricing/pipeline/catalog/{priceTableId}` | Get rules for a price table |
| `PUT` | `/pricing/pipeline/catalog/{priceTableId}` | Update rules for a price table |
| `GET` | `/pricing/pipeline/catalog` | Get all price tables and their rules |
| `GET` | `/pricing/tables` | List price tables |

## Key Request/Response Models

### Get Price (GET /pricing/prices/{itemId})

`{itemId}` is the SKU ID.

Response example:
```json
{
  "itemId": "2000177",
  "listPrice": 15990,
  "costPrice": 10000,
  "markup": 59.9,
  "basePrice": 15990,
  "fixedPrices": [
    {
      "tradePolicyId": "1",
      "value": 14990,
      "listPrice": null,
      "minQuantity": 1,
      "dateRange": {
        "from": "2023-01-01T00:00:00Z",
        "to": "2023-12-31T23:59:59Z"
      }
    }
  ]
}
```

All price values are in **cents** (integer). Divide by 100 for display.

### Create or Update Price (PUT /pricing/prices/{itemId})

Request body:
```json
{
  "markup": 30,
  "basePrice": 15990,
  "listPrice": 19990,
  "costPrice": 10000,
  "fixedPrices": [
    {
      "tradePolicyId": "1",
      "value": 14990,
      "listPrice": 19990,
      "minQuantity": 1,
      "dateRange": {
        "from": "2023-01-01T00:00:00Z",
        "to": null
      }
    }
  ]
}
```

### Price Concepts

- **basePrice** — The SKU's base price (used as input to pricing rules)
- **listPrice** — The "from" price shown crossed out in the UI
- **costPrice** — Internal cost for markup calculation
- **markup** — Percentage markup over cost price
- **fixedPrices** — Specific prices per trade policy and/or minimum quantity, optionally time-limited
- **computedPrice** — Final price after applying pricing pipeline rules (read-only, derived)

### Price Table Rules (PUT /pricing/pipeline/catalog/{priceTableId})

A price table defines rules applied to the base price. Example rules:
- Percentage discount/markup
- Fixed value adjustment
- Rounding rules

## VTEX IO Integration Notes

- Use the `Pricing` client from `@vtex/clients` in Node services
- The `PricingClient` wraps the Pricing API for use in VTEX IO services
- Fixed prices by trade policy are the most common use case for B2B pricing
- Price tables are used for dynamic pricing scenarios (loyalty tiers, customer segments)

## Documentation

https://developers.vtex.com/docs/api-reference/pricing-api
