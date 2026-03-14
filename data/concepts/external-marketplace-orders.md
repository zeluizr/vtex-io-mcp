# External Marketplace — Order Integration

Integrate orders from external marketplaces into the VTEX main account.

## Scope

| Included | Not Included |
|---|---|
| All valid orders from the external marketplace integrated in the main account | Orders integrated in third-party sellers or franchise accounts |
| SKUs associated with the integration's trade policy | SKUs not in the configured trade policy |
| SKUs with valid inventory | SKUs without stock |
| SKUs with prices within VTEX store rules | SKUs without prices set |
| Carriers configured to attend the order's address | Carriers not configured in the main account |
| | Invalid orders from the external marketplace |

## Glossary

| Term | Description |
|---|---|
| **Seller** | Owns the product and is responsible for fulfillment/SKU delivery |
| **Marketplace / Affiliate** | Owns the storefront, responsible for selling the SKU |
| **SKU** | Item exchanged and sold between seller and marketplace |
| **Sales channel / Trade policy** | Product assortment, prices, and logistics configuration for a channel |
| **Connector** | Party responsible for the integration — marketplace itself or a hub |
| **Order Authorization** | Rules defined by the seller to handle price divergence scenarios |
| **MarketplaceServicesEndpoint** | Endpoint sent by the marketplace to the seller for receiving invoice and tracking notifications back |

---

## Authentication

Include in all API requests: `X-VTEX-API-AppKey` + `X-VTEX-API-AppToken` headers (or `VtexIdclientAutCookie` if using the App Template).

---

## Step 1 — Validate Item Availability

Before placing the order, validate all items are available:

```
POST /api/checkout/pub/orderForms/simulation
```

Validate:
- SKU is active (`isActive`)
- SKU is in the integration's trade policy (`salesChannel`)
- Freight option exists in the Shipping strategy (`logistics`)
- SKU has stock (`StockBalance`)

> If the SKU is not returned in the simulation response, **zero out its stock** to avoid orders for nonexistent SKUs.

---

## Step 2 — Place Order

```
POST /api/order-integration/orders
```

Key fields:

| Field | Description |
|---|---|
| `marketplaceOrderId` | Order ID in the marketplace |
| `connectorName` | Connector identifier |
| `connectorEndpoint` | Base URL for receiving order processing notifications |
| `marketplaceOrderStatus` | `"NEW"` for pending payment; `"approved"` for pre-approved orders |
| `marketplacePaymentValue` | Total payment value (integer, in cents) |
| `marketplaceInterestValue` | Interest value if applicable |
| `priceDivergenceAllowanceRate` | Accepted price divergence tolerance (decimal) |
| `allowFranchises` | `true` to enable Multilevel Omnichannel Inventory (franchise fulfillment) |
| `pickupAccountName` | Account name for franchise pickup point orders |
| `isFob` | `true` if marketplace handles delivery |
| `isMarketplaceFulfillment` | `true` if marketplace also holds the stock |
| `taxData` | List of taxes per SKU |
| `trackingHints` | Pre-filled tracking/label information |

### Discount Handling

Apply discounts **directly to item prices** before sending — VTEX does not handle discount fields separately:
- Per-item discount: reduce `price` of each SKU in `items`
- Shipping discount: reduce `price` in `logisticsInfo`
- Global discount: split proportionally across all items

### Response Codes

| Code | Meaning |
|---|---|
| SOI001 | Order integrated successfully |
| SOI002 | Order approved successfully |
| SOI003 | Order enqueued for processing |
| EOI002 | No SLAs/items available (no stock, inactive SKU, or no carrier) |
| EOI003 | Price divergence — no Order Authorization rules configured |
| EOI004 | Invalid cart (item doesn't exist or store minimum not reached) |
| EOI005 | Validation error — invalid field/value |
| EOI006 | VTEX internal service error — retry later |
| EOI007 | Duplicate order — already exists in VTEX |
| EOI011 | Waiting for seller manual authorization (price divergence) |

### Notification Endpoint

The connector must implement:

```
POST {connectorEndpoint}/order-integration/notification/processing-result?an={accountName}
```

---

## Step 3 — Approve Order (Update Status)

```
PUT /api/order-integration/orders/status
```

```json
{
  "marketplaceOrderId": "123456789",
  "connectorName": "my-connector",
  "connectorEndpoint": "https://connector.example.com",
  "marketplaceOrderStatus": "approved"
}
```

> If the order is in `waiting-for-manual-authorization` status, approval will fail with `EOI011`. Retry after the seller takes action, or monitor via Orders Feed/Hook.

---

## Order Scenarios by Fulfillment Type

| Scenario | `selectedDeliveryChannel` | `isFob` | `isMarketplaceFulfillment` | `allowFranchises` |
|---|---|---|---|---|
| Seller delivers | `delivery` | false | — | false |
| Seller's franchise delivers (MOI) | `delivery` | false | — | true |
| Marketplace delivers, stock at seller | `delivery` | true | false | false |
| Marketplace delivers, stock at marketplace | `delivery` | true | true | false |
| Pickup at seller's point | `pickup-in-point` | false | — | false |
| Pickup at franchise point (MOI) | `pickup-in-point` | false | — | true |

For `pickup-in-point`:
- `selectedAddresses[].addressType` = `"pickup"`
- `selectedAddresses[].addressId` = pickup point ID in VTEX logistics
- `geoCoordinates` required
- `selectedSla` = leave empty

---

## Invoice & Tracking

VTEX notifies the connector via `marketplaceServicesEndpoint`:

```
POST http://{marketplaceServicesEndpoint}/pub/orders/{orderId}/invoice
```

Collect from notification:
- **Invoice:** `invoiceNumber`, `invoiceUrl`, `embeddedInvoice`, `invoiceValue`, `invoiceKey`
- **Tracking:** `courier`, `trackingNumber`, `trackingUrl`

Notes:
- An order can have **multiple partial invoices**
- Tracking and invoice can be sent at different times
- Once invoiced, the order **cannot be cancelled** without first sending a return invoice (`type: "input"`)

---

## Cancellations

### Cancel Order (by marketplace)

```
POST /api/oms/pvt/orders/{orderId}/cancel
```

**If order status is `invoiced`** — send return invoice first:

```
POST /api/oms/pvt/orders/{orderId}/invoice
{ "type": "input", ... }
```

Connector must respond to VTEX's cancel notification with `200` and:

```json
{
  "orderId": "string",
  "receipt": "string",
  "date": "string"
}
```

### Cancellation Scenarios

| Scenario | Trigger | Action |
|---|---|---|
| Customer cancels in marketplace | Marketplace sends cancel to connector | Validate status → call Cancel Order API |
| VTEX cancels the order | VTEX OMS sends cancel notification | Update marketplace, respond 200 |
| Already-integrated order found canceled in marketplace | Connector detects on polling | Validate status → call Cancel Order API |

---

## API Reference

```
POST /api/order-integration/orders                         # Place new order
PUT  /api/order-integration/orders/status                  # Update order status (approve)
POST /api/checkout/pub/orderForms/simulation               # Fulfillment simulation
POST /api/fulfillment/pvt/orders                           # Place fulfillment order (legacy)
POST /api/fulfillment/pvt/orders/{orderId}/fulfill         # Authorize dispatch
GET  /api/oms/pvt/orders/{orderId}                         # Get order details
POST /api/oms/pvt/orders/{orderId}/cancel                  # Cancel order
POST /api/oms/pvt/orders/{orderId}/invoice                 # Send invoice / return invoice
```

## Documentation

- [External Marketplace Integration](./external-marketplace-integration.md)
- [External Marketplace — Catalog Integration](./external-marketplace-catalog-integration.md)
- [Orders Overview](./orders-overview.md)
- [ERP Integration — Orders](./erp-integration-orders.md)
- [Authentication](./authentication.md)
