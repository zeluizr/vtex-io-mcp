# ERP Integration — Import Prices

Send current pricing information for all products to VTEX.

## Overview

It is common for store owners to delegate price calculations to the ERP. In such scenarios, the ERP calculates the price of each SKU and sends it to VTEX.

**Trade Policies** are used in VTEX to differentiate catalog, prices, and logistics settings for each sales channel. Use them when the same SKUs need different prices in different marketplaces.

## Pricing Concepts

| Concept | Description |
|---|---|
| **List price** | Value displayed as the suggested retail price proposed by the supplier |
| **Base price** | Reference value for the computed price of an SKU in all contexts |
| **Computed price** | Retail price after applying the price rules of a specific context |
| **Fixed price** | Fixed value that overrides the computed price for an SKU in a price table |
| **Price Table** | A container storing prices to be applied in a given context |
| **Price Table Context** | Conditions for applying a price table, such as a trade policy |

**Computed price flow:**
```
Base Price → Price Rules → Computed Price
```

**Fixed price overrides computed price:**
```
Fixed Price (highest priority) → overrides → Computed Price
```

> If you don't use price rules, set a **base price** per SKU and **fixed prices** as needed per trade policy.

## Set Base Price

Use the **Create/Edit Price** endpoint:

```
PUT /api/pricing/prices/{itemId}
```

Set a base price for each SKU. Optionally include:
- `listPrice` — the "from" (crossed-out) price shown to customers
- `costPrice` or `markup` — if one is provided, the other is calculated using: `basePrice = costPrice × (1 + markup)`

```json
{
  "basePrice": 99.90,
  "listPrice": 129.90,
  "costPrice": 45.00
}
```

Check progress:
```
GET /api/pricing/prices/{itemId}    # Get price by SKU
```

Or visit **Products > Prices > Price list** in the Admin panel.

## Set Fixed Prices for Specific Contexts

Use the **Create/Edit Fixed Prices** endpoint:

```
POST /api/pricing/prices/{itemId}/fixed/{priceTableId}
```

Set a fixed price for each price table / SKU combination that needs a price different from the base price. The context is represented by either a **Trade Policy** or a custom **Price Table** (which can be associated with a campaign or customer cluster).

```json
{
  "tradePolicyId": "1",
  "value": 89.90,
  "listPrice": 129.90,
  "minQuantity": 1
}
```

> `tradePolicyId` should be filled with the **Price Table name** if setting fixed prices for a custom Price Table not associated with a specific Trade Policy.

Check progress:
```
GET /api/pricing/prices/{itemId}/fixed    # Get fixed prices for SKU
```

Or visit **Products > Prices > Price list** in the Admin panel.

> **Price rules** may be a better option than fixed prices if you are consistently applying the same criteria for SKUs in the same category, brand, or markup range.

## Documentation

- [ERP Integration Guide](./erp-integration-guide.md)
- [Pricing Overview](./pricing-overview.md)
- [Authentication](./authentication.md)
