# External Marketplace — Architecture & Responsibilities

Mapping of responsibilities between marketplace and seller for external marketplace integrations.

## Business Agreements

The starting point for any marketplace is defining policies governing the business relationship:

- Commission fees and receipt of sales proceeds
- Criteria for product selection and exposure
- Customer support requirements
- Delivery time and cost requirements

**Core technical responsibilities:**

| Who | What |
|---|---|
| **Marketplace** | Owns the storefront and is responsible for the checkout process |
| **Seller** | Owns the product and is responsible for the fulfillment process |

---

## Catalog Management

Interaction between marketplaces and sellers is based on **offers** — product information + price + quantity in stock.

| Who | What |
|---|---|
| **Marketplace** | Receive and manage offers, incorporate them via SKU matching and binding |
| **Seller** | Send offers with product information, price, and inventory |

---

## Pricing & Promotions

Each business defines its own pricing strategy. Sellers define order authorization rules to handle price divergence.

| Who | What |
|---|---|
| **Marketplace** | Receive price change notifications, update price records |
| **Seller** | Define prices/promotions for the marketplace, define price divergence rules, send price change notifications |

---

## Inventory & Shipping

Sellers manage their shipping strategy unless the marketplace requires adherence to its fulfillment services.

| Who | What |
|---|---|
| **Marketplace** | Receive inventory change notifications, update stock records |
| **Seller** | Define inventory/shipping policies per sales channel, send inventory change notifications, expose freight costs and delivery times |

---

## Storefront & Checkout

The marketplace owns the purchase flow and places orders to the seller. To avoid price divergence and stockouts, the storefront must perform **cart simulations** at multiple stages.

| Who | What |
|---|---|
| **Marketplace** | Display products, perform cart simulations, place orders to sellers |
| **Seller** | Receive orders placed by the marketplace |

---

## Order Fulfillment

Each stakeholder handles a portion of the order flow. Changes and cancellations are allowed within a configurable window set by the marketplace.

---

## Payment & Commissioning

The marketplace usually processes payments and defines commission fees. If agreed, sellers may include their own payment methods. Brazilian sellers may also process payments independently if agreed with the marketplace.

| Who | What |
|---|---|
| **Marketplace** | Usually processes payments and defines commissions |
| **Seller** | May add payment methods not covered by the marketplace; Brazilian sellers may process payments if agreed with the marketplace |

## Documentation

- [External Marketplace Integration](./external-marketplace-integration.md)
- [External Marketplace — VTEX Seller Setup](./external-marketplace-seller-setup.md)
- [Marketplace Overview](./marketplace-overview.md)
