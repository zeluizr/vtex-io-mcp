# External Marketplace — Catalog Integration

Overview of integrating the VTEX Catalog with external marketplaces or connector hubs.

## Scope

### Included in the Catalog Flow

- Products and SKUs in the **VTEX main account**
- Inventory and prices defined in the **main account**
- Products/SKUs that belong to both the **sales channel** and the **affiliate** configured for the marketplace integration

### NOT Included

- Products/SKUs in **third-party sellers or franchise accounts**
- Inventory/prices defined in third-party sellers or franchise accounts
- Products/SKUs not configured in the integration's sales channel and affiliate
- Products added directly to the marketplace integration
- Products with specifications and attributes (handled separately)

---

## Glossary

| Term | Description |
|---|---|
| **Seller** | Owns the product and is responsible for fulfillment/SKU delivery |
| **Marketplace / Affiliate** | Owns the storefront, responsible for selling the SKU |
| **SKU** | The item exchanged and sold between seller and marketplace |
| **Sales channel / Trade policy** | Product assortment, prices, and logistics configuration for a sales channel |
| **Connector** | Party responsible for the integration — either the marketplace itself or a hub |

---

## Catalog Integration Steps

| Step | Description |
|---|---|
| **Logs** | Logs made available for users to monitor integration activity |
| **Initial product load** | Get the full product list for the first load |
| **New products** | How to get new products to offer in the marketplace |
| **Product updates** | How to receive and process product updates |
| **Catalog mapping** | Product and category mapping between VTEX and marketplace |
| **Price updates** | How to keep prices in sync |
| **Stock updates** | How to keep inventory levels in sync |

---

## Integration Flow Summary

```
Initial Load
  └── GET full product list → send to marketplace

Ongoing Sync
  ├── Catalog notification received (affiliate)
  │     ├── New product → validate → send to marketplace
  │     └── Product update → send updated data
  ├── Price change notification → update marketplace listing
  └── Inventory change notification → update marketplace stock
```

## Documentation

- [External Marketplace Integration](./external-marketplace-integration.md)
- [External Marketplace — VTEX Seller Setup](./external-marketplace-seller-setup.md)
- [External Marketplace — Architecture](./external-marketplace-architecture.md)
- [Catalog Overview](./catalog-overview.md)
- [Pricing Overview](./pricing-overview.md)
- [Fulfillment Overview](./fulfillment-overview.md)
