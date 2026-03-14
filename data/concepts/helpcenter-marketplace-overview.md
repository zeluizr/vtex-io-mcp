---
title: 'Marketplace - Overview'
id: helpcenter-marketplace-overview
status: PUBLISHED
source: vtexdocs/help-center-content
originalPath: docs/en/tutorials/sellers/
---

VTEX supports multi-seller marketplace architecture, allowing stores to act as marketplaces hosting third-party sellers, or as sellers operating in external marketplaces.

## VTEX marketplace model

### Roles

- **Marketplace**: The store that hosts third-party sellers, manages the storefront, and handles payments. The marketplace receives a commission on each sale.
- **Seller**: The merchant that provides products and fulfills orders. Sellers can be VTEX stores (native sellers) or external systems (external sellers).

### Native vs. external sellers

- **Native seller**: Another VTEX store acting as a seller in the marketplace. Integration happens automatically within the VTEX platform.
- **External seller**: A non-VTEX system integrated via the [External Seller API](https://developers.vtex.com/docs/guides/external-marketplace-integration).

## Marketplace setup

### In the marketplace account

1. Go to **Marketplace > Sellers > Management**.
2. Add a new seller account (VTEX account name for native sellers, or configure external seller integration).
3. Define seller commission rates.
4. Map seller categories and collections to the marketplace catalog.

### Offer management

Sellers submit product offers that the marketplace reviews and approves or rejects. This includes:

- Product data validation.
- Price and availability approval.
- Category mapping.

Access at **Marketplace > Offers**.

## External marketplace integration

VTEX IO apps can integrate with external marketplaces (Amazon, Mercado Livre, etc.) using:

- The [External Marketplace App Template](https://developers.vtex.com/docs/guides/external-marketplace-app-template).
- The External Seller API for bidirectional catalog and order sync.

Key operations:

- **Catalog sync**: Send VTEX products to the external marketplace.
- **Order sync**: Receive orders from the external marketplace into VTEX.
- **Price and inventory updates**: Keep external listings in sync.

## Seller portal

The Seller Portal is a dedicated interface for sellers to manage their operations within a VTEX marketplace:

- View and manage their products (offers).
- Track orders.
- Configure their account settings.

## VTEX IO development for marketplaces

### Order routing

When an order is placed in the marketplace, VTEX routes it to the appropriate seller based on inventory availability and shipping rules.

### Custom seller integration

Build a Node service that:

1. Subscribes to catalog change events to push updates to the external marketplace.
2. Implements a REST endpoint to receive order notifications from the external marketplace.
3. Calls the VTEX Orders API to create orders from external marketplace sales.

Required policies in `manifest.json`:
```json
{
  "policies": [
    {
      "name": "outbound-access",
      "attrs": {
        "host": "marketplace-api.example.com",
        "path": "/*"
      }
    },
    { "name": "vtex.oms:new-order" }
  ]
}
```
