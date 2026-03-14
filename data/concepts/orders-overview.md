# Orders Overview (OMS)

The VTEX Order Management System (OMS) covers the full lifecycle of an order — from placement to invoicing and tracking.

## Order Flow Types

| Flow | Visible to | Description |
|---|---|---|
| **Marketplace flow** | Marketplace store | Responsible for the sale |
| **Seller flow** | Seller store | Responsible for handling/delivery |
| **Complete flow** | Single store | Store acts as both marketplace and seller |
| **Chain flow** | Intermediary store | Between marketplace and seller; payment goes only to marketplace (used in Multilevel Omnichannel Inventory) |

## Order Lifecycle — Stages and Statuses

### Stage 1 — Order Creation

| Trigger | My Account Status |
|---|---|
| `order.progress.confirmOrder` | Place order |
| `order.progress.confirmingOrder` | Placing order |
| `order.progress.orderConfirmed` | Order placed |

API statuses: `order-created`, `order-completed`, `on-order-completed`

### Stage 2 — Payment Approval

| Trigger | My Account Status |
|---|---|
| `order.progress.approvePayment` | Approve payment |
| `order.progress.approvingPayment` | Approving payment |
| `order.progress.paymentApproved` | Payment approved |

API statuses: `payment-pending`, `approve-payment`

### Stage 3 — Handling

| Trigger | My Account Status |
|---|---|
| `order.progress.handleShipping` | Handle order |
| `order.progress.handlingShipping` | Handling order |
| `order.progress.shippingHandled` | Package handled |

API statuses: `window-to-cancel`, `payment-approved`, `ready-for-handling`, `authorize-fulfillment`, `release-to-fulfillment`, `handling`, `invoice`

### Stage 4 — Shipping/Pickup Dispatch

**Pickup orders:**

| Trigger | My Account Status |
|---|---|
| `order.progress.deliverToPickup` | Ship to pickup point |
| `order.progress.deliveringToPickup` | Shipping to pickup point |
| `order.progress.deliveredToPickup` | Shipped to pickup point |

**Delivery orders:**

| Trigger | My Account Status |
|---|---|
| `order.progress.deliverToCarrier` | Deliver to carrier |
| `order.progress.delivering` | Delivering to carrier |
| `order.progress.delivered` | Delivered to carrier |

API status at this stage: `invoiced`

> An order is pickup when `selectedDeliveryChannel` = `"pickup-in-point"`.

### Stage 5 — Final

**Pickup orders:**

| Trigger | Condition | My Account Status |
|---|---|---|
| `order.progress.pickup` | `shippingEstimateDate` is a future date | Pickup |
| `order.state.ready-for-pickup` | `shippingEstimateDate` is empty or past | Ready for pickup |
| `order.state.pickedUp` | `courierStatus.finished = true` | Picked up |

**Delivery orders:**

| Trigger | Condition | My Account Status |
|---|---|---|
| `order.progress.ship` | `courierStatus.Data` array is empty | Ship order |
| `order.progress.shipping` | `courierStatus.Data` has been filled | Shipping order |
| `order.progress.shipped` | `courierStatus.Data` is `true` | Order shipped |

## Order Integration (Feed v3 — Recommended)

> Use **Orders Feed v3** instead of polling List orders API or external services.

### Feed v3

A list of order updates — each status change is a new feed item.

```
GET  /api/orders/feed/config      # Get feed configuration
POST /api/orders/feed/config      # Create or update feed configuration
GET  /api/orders/feed             # Retrieve feed items
POST /api/orders/feed             # Commit feed items (acknowledge processed items)
POST /api/orders/expressions/jsonata  # Test JSONata expression
```

### Hook

Sends order updates to a URL you configure (complements Feed).

```
GET    /api/orders/hook/config    # Get hook configuration
POST   /api/orders/hook/config    # Create or update hook configuration
DELETE /api/orders/hook/config    # Delete hook configuration
```

## Managing Orders

### Placing an Order

The `orderForm` is the central object — it stores all cart/order context.

```
PUT  /api/checkout/pub/orders                          # Place order
POST /api/checkout/pub/gatewayCallback/{orderGroup}    # Process order
```

### Retrieving Order Details

> Orders are accessible for up to 2 years after creation.

```
GET /api/oms/pvt/orders/{orderId}    # Get order
GET /api/oms/pvt/orders              # List orders
```

### Changing Order Status

```
POST /api/oms/pvt/orders/{orderId}/start-handling    # Start handling
POST /api/oms/pvt/orders/{orderId}/cancel            # Cancel order
```

### Changing Order Items or Prices

```
POST /api/oms/pvt/orders/{orderId}/changes    # Register change on order
```

### Changing Seller

After original seller cancels, another seller can be assigned within the change seller window.

```
GET  /api/checkout/pvt/configuration/window-to-change-seller    # Get window
POST /api/checkout/pvt/configuration/window-to-change-seller    # Update window
```

### Sending Payment Notification

Required when payments are received outside VTEX (cash, notes payable).

> Call only **after** payment is confirmed — settlement issues after calling this endpoint may prevent receiving payment.

```
POST /api/oms/pvt/orders/{orderId}/payments/{paymentId}/payment-notification
```

### Invoicing an Order

Invoicing changes order status to `Invoiced` — no further status changes allowed (except return invoices with `type: "Input"`).

```
POST  /api/oms/pvt/orders/{orderId}/invoice                          # Invoice notification
PATCH /api/oms/pvt/orders/{orderId}/invoice/{invoiceNumber}          # Update partial invoice (tracking)
```

### Tracking

Use the partial invoice update endpoint to add a tracking number and URL, or to send tracking events.

## ERP / Back-Office Integration Flow

1. Back office (ERP/PIM/WMS) setup
2. Set up order integration
3. Set up order processing
4. Change order (handle edits)

## Multilevel Omnichannel Inventory

Allows inventory from franchise accounts or white-label sellers to be sold in marketplaces the main account is connected to — without requiring each franchise to set up separate marketplace integrations.

## External Marketplace Order Integration

For external marketplaces connecting to VTEX sellers:

- Order Integration overview
- New Order Integration (collect orders)
- Update Order Status
- Handle canceled orders

## Optional Configurations

| Feature | Description |
|---|---|
| **VTEX Sales App** | Enable partial cancellation for direct sales |
| **VTEX DO** | Notes and tasks on orders (CRM-like workflow) |
| **B2B Suite** | B2B order management extensions |
| **Master Data triggers** | Automate actions on order events via MD v2 |

## Documentation

- [Platform Overview](./platform-overview.md)
- [Marketplace Overview](./marketplace-overview.md)
- [Catalog Overview](./catalog-overview.md)
- [Authentication](./authentication.md)
