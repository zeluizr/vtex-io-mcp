# ERP / Back-office Integration Guide

This guide covers integrating ERP, WMS, and PIM systems with VTEX. The same principles apply to all three system types.

**Scope:** Products, Pricing, Inventory (ERP/PIM → VTEX) and Orders (VTEX → ERP).

## Common Systems

- **ERP/WMS:** SAP, Oracle NetSuite, Microsoft, Sage, Brightpearl, IBM Sterling WMS, Manhattan
- **PIM:** Akeneo, Informatica, inRiver, IBM Product Master, Simplus, Widen Collective

## Initial Setup

### Configuration — Required Order

1. **Set up catalog**
   - Category tree
   - Brands
   - Specification groups, fields, and values

2. **Import products**
   - Import product + product specifications
   - Add product to trade policy
   - Import SKU + SKU specifications
   - Import SKU image

3. **Import prices**
   - Set base price
   - Set fixed prices for specific contexts (trade policies, price tables)

4. **Import inventory**
   - Create warehouses
   - Update SKU inventory

### Import Customer Data (optional, any order)

Import existing customer data from CRM systems using **Master Data v2**.

### Middleware Setup

After configuration, set up middleware to handle the ongoing integration flow.

**Two approaches:**
- **Integration platforms** — Third-party PaaS companies offering pre-built VTEX connectors (minimal dev effort)
- **In-house development** — Build and maintain custom middleware; must handle scalability (e.g., Black Friday peaks)

**Middleware must configure:**
1. Set up order integration — configure Feed or Hook to receive order notifications
2. Set up order processing — handle change, cancellation, invoicing, and tracking

## Ongoing Middleware Flow

```
Store backoffice (ERP/PIM/WMS)  ←→  VTEX (Catalog, Pricing, Orders, Logistics)
```

### ERP/PIM → VTEX (outbound)

| Data | Trigger | VTEX Module |
|---|---|---|
| Product updates | Product changes in ERP/PIM | Catalog |
| Pricing updates | Price changes in ERP/PIM | Pricing |
| Invoice information | Invoice generated in ERP | Orders |
| Tracking information | Carrier makes tracking available | Orders |
| Order changes | Item/value change needed (e.g., out of stock) | Orders |
| Order cancellations | Store needs to cancel an order | Orders |
| Inventory updates | Stock changes in WMS | Logistics |

### VTEX → ERP (inbound)

| Data | Trigger | VTEX Module |
|---|---|---|
| Order flow notification | Order reaches a configured status | OMS |
| Order information | Store needs to take action on specific order | OMS |

## Ongoing Flow Details

### Send Product Updates

**Trigger:** Product changes in ERP or PIM.

Automatically pick up product updates (new SKUs, edits, removals) and push them to VTEX Catalog APIs.

### Send Pricing Updates

**Trigger:** Price changes in ERP or PIM.

Automatically send price updates from ERP to VTEX Pricing API.

### Receive Order Flow Notifications (Feed/Hook)

**Trigger:** Order reaches a predetermined status.

Key statuses to monitor:
- `ready-for-handling` — Order paid, grace period expired → time to pick and pack
- `request-cancel` — Customer requested cancellation → assess and act
- `invoiced` — Order invoiced and completed

Configure using **Orders Feed v3** (recommended) or Hook.

### Get Order Information

**Trigger:** Notification received for an order that requires action.

Fetch full order details to process the required action (e.g., fulfill, cancel, change).

### Send Invoice Information

**Trigger:** ERP generates invoice for the order.

Call the Order Invoice Notification endpoint with the invoice data and `type: "Output"`.

### Send Tracking Information

**Trigger:** Carrier makes tracking data available.

Tracking is tied to the order's invoice. Update the partial invoice with tracking number and URL.

### Send Order Changes

**Trigger:** Items or values need to change in an existing order (e.g., item out of stock).

Use the Register Change on Order endpoint. For marketplaces: may also require seller change.

### Send Order Cancellations

**Trigger:** Store needs to cancel an order.

Call the Cancel Order endpoint.

### Send Inventory Updates

**Trigger:** Stock levels change in WMS.

Update SKU inventory per warehouse using the Logistics API.

## Authentication Setup

Before integrating, create an appKey and appToken for the system:

1. Click your profile avatar (initial from your email)
2. Go to **Account Settings > Application Keys**
3. Create a key with the required permissions

See [Authentication](./authentication.md) and [API Authentication Using API Keys](./api-authentication-using-api-keys.md) for details.

## Documentation

- [Catalog Overview](./catalog-overview.md)
- [Orders Overview](./orders-overview.md)
- [Pricing Overview](./pricing-overview.md)
- [Fulfillment Overview](./fulfillment-overview.md)
- [Authentication](./authentication.md)
- [Platform Overview](./platform-overview.md)
