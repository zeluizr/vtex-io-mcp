---
title: 'Shipping and Logistics - Overview'
id: helpcenter-shipping-overview
status: PUBLISHED
source: vtexdocs/help-center-content
originalPath: docs/en/tutorials/shipping/
---

VTEX's logistics system manages inventory, warehouses, carriers, and shipping calculations to ensure products reach customers efficiently.

## Key concepts

### Warehouses and inventory

- **Warehouses**: Physical storage locations from which orders are fulfilled.
- **Inventory**: Stock levels per SKU per warehouse, managed via the Inventory module or API.

### Carriers

Carriers (also called shipping providers) handle the physical transportation of packages. VTEX integrates with carriers via:

- Native integrations (major Brazilian carriers like Correios, Jadlog, etc.).
- Custom carrier connectors built using VTEX IO.

### Shipping rates

VTEX calculates shipping based on:

- Weight and dimensions of the order.
- Destination ZIP code.
- Carrier pricing tables.
- Trade policy rules.

### Docks

A dock is the connection point between a warehouse and a carrier. It defines which carriers can pick up from which warehouses.

### Delivery windows

VTEX supports configurable delivery windows, allowing customers to select preferred delivery dates/times.

## Logistics configuration in VTEX Admin

Access at **Shipping > Strategy**:

1. Create warehouses and input inventory.
2. Create carrier configurations with pricing tables.
3. Create docks linking warehouses to carriers.
4. Configure shipping policies (which carriers apply to which trade policies).

## Logistics API

Key endpoints:

```
GET /api/logistics/pvt/inventory/skus/{skuId}
POST /api/logistics/pvt/inventory/skus/{skuId}/warehouses/{warehouseId}
GET /api/logistics/pvt/configuration/warehouses
```

In VTEX IO Node services, use the `Logistics` client or make direct HTTP calls:

```typescript
// Get inventory for a SKU
const inventory = await ctx.clients.logistics.getSkuInventory(skuId)
```

## Omnichannel logistics

VTEX supports omnichannel fulfillment strategies:

- **Ship from store**: Orders fulfilled from physical retail stores.
- **Pick up in store**: Customers collect orders from physical locations.
- **Franchise**: Franchise locations fulfill orders in their region.

In VTEX IO, the `vtex.pickup-points-selector` block adds store pickup to the checkout.

## Tracking

VTEX supports carrier tracking integrations. Once an order is invoiced and shipped:

1. Add the tracking code via the Orders API or Admin.
2. VTEX automatically queries carrier APIs for status updates (for native integrations).
3. Customers receive tracking updates via email (configurable via Message Center).

## Shipping in VTEX IO development

When building custom shipping solutions:

- Use the `ExternalClient` pattern in VTEX IO Node services to communicate with carrier APIs.
- Implement a custom carrier connector using the VTEX Logistics API specification.
- For custom delivery rules, configure policies in `service.json` and call the Logistics API from your middleware.
