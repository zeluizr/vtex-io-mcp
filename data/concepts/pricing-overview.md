# Pricing Overview

The Prices module manages SKU pricing data — creation, editing, and storage. Prices are stored in **price tables** which are applied to specific **contexts** (like trade policies).

> Note: Pricing v2 is the only active version (v1 was discontinued in 2020).

## Pricing Architecture

```
SKU → Base Price (reference for all price tables)
    → Price Tables → Applied to contexts (trade policies, customer clusters via Master Data)
        → Fixed Prices (override all other pricing — highest priority)
        → Computed Price (resolved price after all rules are applied)
```

## Price Types

| Type | Description |
|---|---|
| **Base Price** | Reference price for all price tables. Calculated as: `Cost Price × Markup`. Used when no other price is defined. |
| **Fixed Price** | SKU price for a specific price table. **Overrides** all other pricing types. |
| **Computed Price** | The final resolved price for a SKU in a given price table context. |
| **Price Table** | A set of SKU prices applied to a specific context (trade policy, customer cluster, etc.). |

## Managing Prices — Pricing API

> Rate limits apply. See the Pricing API Overview before use.

### Create and Update

```
PUT /api/pricing/prices/{skuId}                                      # Create or update base price / fixed prices
PUT /api/pricing/pipeline/catalog/{priceTableId}                     # Update rules for a price table
PUT /api/pricing/prices/{skuId}/fixed/{priceTableIdOrTradePolicy}    # Create/update fixed prices on price table or trade policy
DELETE /api/pricing/prices/{skuId}/fixed/{priceTableIdOrTradePolicy} # Delete fixed prices on price table or trade policy
DELETE /api/pricing/prices/{skuId}                                   # Delete price by SKU
```

> To delete an entire price table: remove all prices in it, then contact VTEX Support.

### Retrieve

```
GET /api/pricing/prices/{skuId}                                      # Get price by SKU
GET /api/pricing/prices/{skuId}/fixed                                # Get fixed prices
GET /api/pricing/pipeline/catalog/{priceTableId}                     # Get rules for a price table
GET /api/pricing/pipeline/catalog                                    # Get all price tables and their rules
GET /api/pricing/priceTables                                         # List price tables
GET /api/pricing/prices/{skuId}/fixed/{priceTableIdOrTradePolicy}    # Get fixed prices on price table or trade policy
GET /api/pricing/pipeline/catalog/{priceTableId}/{skuId}             # Get computed price by price table
GET /api/pricing/config                                              # Get pricing configuration
GET /api/pricing/status                                              # Get pricing status
```

## Scheduling Prices

Fixed prices can be scheduled for a specific time range using `dateRange` fields:

```json
{
  "fixedPrices": [
    {
      "tradePolicyId": "1",
      "value": 99.90,
      "minQuantity": 1,
      "dateRange": {
        "from": "2024-01-01T00:00:00Z",
        "to": "2024-01-31T23:59:59Z"
      }
    }
  ]
}
```

## Price Tables and Contexts

A price table is connected to a context via Master Data (e.g., a customer cluster). Use cases:
- Different prices per trade policy / sales channel (marketplace, B2B, wholesale)
- Customer segment pricing (VIP, wholesale, retail)
- Promotional time windows

## Optional Settings

### Storefront (VTEX IO)

- `vtex.product-price` — Store Framework block for displaying prices
- Asynchronous prices — Display prices loaded after initial render
- Internationalized prices — Currency/locale formatting
- Manual price — Allow store operators to set price manually in cart

### Pricing Simulation (B2B)

The Price Simulations API configures custom price selectors for B2B stores based on context set by the Orders Configuration app.

```
GET  /v/custom-prices/rules/{priceAssociationId}    # Get custom prices schema / price association
POST /v/custom-prices/session/schema                # Create or update custom prices schema
POST /sessions                                      # Update Order Configuration
PUT  /v/custom-prices/rules/{priceAssociationId}    # Update price association
DELETE /v/custom-prices/rules/{priceAssociationId}  # Disassociate price association
```

### External Marketplace

For external marketplaces integrating with VTEX sellers:
- Understand the marketplace/seller pricing architecture
- Keep prices updated via change notifications

## ERP Integration Flow

1. Back office (ERP/PIM/WMS) setup
2. Import prices

## Documentation

- [Platform Overview](./platform-overview.md)
- [Catalog Overview](./catalog-overview.md)
- [Promotions Overview](./promotions-overview.md)
- [Authentication](./authentication.md)
