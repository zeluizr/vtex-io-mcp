# Promotions Overview

The Promotions module manages discounts, taxes/surcharges, coupons, and campaign audiences for your VTEX store.

## Promotion Types

| Type | Description |
|---|---|
| **Regular** | General discount based on configurable conditions |
| **Buy Together** | Discount when buying specific product combinations |
| **More For Less** | Buy more units, pay less |
| **Progressive Discount** | Discount increases as quantity increases |
| **Buy One Get One** | Free item when buying a qualifying product |
| **Campaign Benefit** | Discount tied to a Campaign Audience |

## Key Concepts

- **Promotion** — Discount granted to customer; can be associated with products, shipping, or trade policy
- **Coupon** — Code entered at cart by customer; must be associated with a promotion; limited active coupons
- **Campaign Audience** — Segmentation criteria for targeting specific customers; must be associated with a Campaign Benefit promotion
- **Surcharge** — The opposite of a promotion — adds a percentage to product price (shown as "Tax" in cart)
- **Policy Engine** — Creates promotion alarms when products are sold at undesired prices

## Managing Promotions

### Promotions API

```
GET  /api/rnb/pvt/benefits/calculatorconfiguration             # Get all promotions
GET  /api/rnb/pvt/calculatorconfiguration/{promotionId}        # Get promotion or tax by ID
GET  /api/rnb/pvt/archive/calculatorconfiguration              # List archived promotions
POST /api/rnb/pvt/calculatorconfiguration                      # Create or update promotion or tax
PUT  /api/rnb/pvt/import/calculatorconfiguration/{promotionId} # Update multiple SKU promotion
POST /api/rnb/pvt/archive/calculatorconfiguration/{promotionId} # Archive promotion or tax
```

> Promotions cannot be deleted — only archived.

## Coupons

Key rules:
- Cannot be deleted — only archived/unarchived
- Coupon code cannot be modified after creation
- Creating a coupon with an existing code updates the existing coupon
- High number of active coupons may degrade Promotions & Taxes performance — reuse is recommended
- A single coupon can be associated with multiple promotions

### Coupons API

```
POST /api/rnb/pvt/coupon                          # Create coupon
POST /api/rnb/pvt/multiple-coupons                # Create multiple coupons
POST /api/rnb/pvt/massgeneration                  # Coupon massive generation
GET  /api/rnb/pvt/coupon/{couponCode}             # Get coupon by code
GET  /api/rnb/pvt/archive/coupon/{couponCode}     # Get archived coupon by code
GET  /api/rnb/pvt/coupon/{couponCode}/usage       # Get coupon usage
GET  /api/rnb/pvt/coupon                          # Get all coupons
PUT  /api/rnb/pvt/coupon/{couponCode}             # Update coupon
POST /api/rnb/pvt/archive/coupon/{couponCode}     # Archive coupon
DELETE /api/rnb/pvt/archive/coupon/{couponCode}   # Unarchive coupon
```

## Campaign Audiences

Define segmentation criteria for targeting customers in Campaign Benefit promotions. Must be associated with a promotion to be active.

```
POST /api/rnb/pvt/campaignconfiguration             # Create campaign audience
GET  /api/rnb/pvt/campaignconfiguration/{id}        # Get campaign audience configuration
GET  /api/rnb/pvt/campaignconfiguration             # Get all campaign audiences
```

## Policy Engine (Promotion Alerts)

Creates conditions to check if prices and promotions are correct. Sends email alerts when products are sold at unexpected prices.

```
POST   /api/policy-engine/policies           # Create policy (promotion alert)
GET    /api/policy-engine/policies/{id}      # Get policy by ID
GET    /api/policy-engine/policies           # Get policy list
PUT    /api/policy-engine/policies/{id}      # Update policy
DELETE /api/policy-engine/policies/{id}      # Delete policy by ID
POST   /api/policy-engine/policies/evaluate  # Evaluate policies (check which conditions are met)
```

## Surcharges / Taxes

A surcharge adds a percentage to the product price (shown as "Tax" in cart). Configured in Promotions, based on conditions like:
- Postal code range
- Department
- Brand
- Customer cluster

> Surcharges apply per seller. If the cart contains another seller's product, that seller's surcharge applies — not the marketplace's.

```
GET /api/rnb/pvt/taxes                         # Get all taxes/surcharges
GET /api/rnb/pvt/archive/taxes                 # List archived taxes
```

## Documentation

- [Platform Overview](./platform-overview.md)
- [Pricing Overview](./pricing-overview.md)
- [Checkout Overview](./checkout-overview.md)
- [Authentication](./authentication.md)
