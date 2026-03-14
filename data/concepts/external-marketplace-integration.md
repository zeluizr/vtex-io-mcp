# External Marketplace Integration

Guide for developing a custom connector to sell VTEX products in an external marketplace.

## VTEX Native Multi-Seller Architecture

VTEX stores decouple marketplace and seller responsibilities into separate subsystems:

```
VTEX Store
  ├── Marketplace subsystem — manages sellers, orders, commissions
  └── Seller subsystem — manages catalog, fulfillment, inventory
```

This allows any VTEX store to:
- Become a **marketplace** — sell products from multiple sellers (including its own)
- Become a **seller** — distribute products to other VTEX marketplaces

No additional development is required for VTEX-to-VTEX connections — store settings connect the marketplace subsystem of one store to the seller subsystem of another.

## Collaborative Commerce Network

VTEX accounts can participate in the collaborative commerce network in endless combinations:
- Act as marketplace + seller simultaneously
- Sell products from external sellers through your storefront
- Distribute your products to multiple other marketplaces

## External Marketplace Integration

When a strategic partner operates **outside** the VTEX collaborative commerce network, a **custom connector** must be developed to:

1. Export VTEX seller catalog to the external marketplace
2. Keep prices and inventory in sync
3. Receive orders from the external marketplace into VTEX OMS
4. Send order updates (invoices, tracking) back to the marketplace

## Integration Architecture

```
VTEX Seller ←→ Custom Connector ←→ External Marketplace
     │                                      │
  Catalog                              Product Listings
  Pricing                              Order Notifications
  Inventory                            Commission Settlement
  OMS
```

## Key Integration Areas

| Area | Direction | Description |
|---|---|---|
| Catalog sync | VTEX → Marketplace | Send products, SKUs, images, specs |
| Price sync | VTEX → Marketplace | Keep prices updated |
| Inventory sync | VTEX → Marketplace | Keep stock levels updated |
| Order receipt | Marketplace → VTEX | Create orders in VTEX OMS |
| Order updates | VTEX → Marketplace | Send invoices and tracking |

## Documentation

- [Marketplace Overview](./marketplace-overview.md)
- [Catalog Overview](./catalog-overview.md)
- [Orders Overview](./orders-overview.md)
- [Fulfillment Overview](./fulfillment-overview.md)
- [Authentication](./authentication.md)
