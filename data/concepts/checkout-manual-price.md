# Checkout — Manual Price

The **Manual Price** feature allows stores to manually set the price of an SKU in the cart, on the product page in inStore, or for subscription items.

---

## Important Considerations

- Item prices can be modified (increased or decreased) freely with no restriction. However, if the price falls outside the parameters defined in [Order Authorization](https://help.vtex.com/tutorial/how-order-authorization-works--3MBK6CmKHAuUjMBieDU0pn#), the order will not be invoiced.
- Users with the following roles/permissions can modify prices for all items in all stores/sub-accounts:
  - **Roles**: Owner (Admin Super) or Call Center Operator (Telesales)
  - **Permission**: Shopping Cart Full Access

---

## Activation

1. `GET /api/checkout/pvt/configuration/orderForm` — get current config
2. `POST /api/checkout/pvt/configuration/orderForm` — update with same data, changing `allowManualPrice` from `null` to `true`
3. `GET /api/checkout/pvt/configuration/orderForm` — confirm activation

---

## Setting Price Manually

| Context | Method |
|---|---|
| **Cart items** | `PUT` request to [Change Price endpoint](https://developers.vtex.com/vtex-rest-api/reference/pricechange), or directly via Admin cart screen |
| **inStore items** | [Allow manual prices on inStore](https://developers.vtex.com/vtex-rest-api/docs/allow-manual-prices-on-instore#usage) |
| **Subscription items** | [Enabling Manual Prices for Subscriptions v3](https://developers.vtex.com/vtex-rest-api/docs/enabling-manual-prices-for-subscriptions-v3) |

---

## Recording Manual Price Changes

All manual price changes are recorded. To identify who made the change:

1. `GET /api/oms/pvt/orders/{orderId}` — get the order
2. Check the `manualPriceAppliedBy` property — contains the *user ID* or *appKey* used
3. `GET /api/License Manager - Get User` with the user ID or appKey — get the responsible person's data

---

## Documentation

- [Checkout API Overview](./checkout-api-overview.md)
- [Checkout Features Overview](./checkout-features-overview.md)
