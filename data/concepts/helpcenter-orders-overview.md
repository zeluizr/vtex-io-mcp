---
title: 'Orders - Overview'
id: helpcenter-orders-overview
status: PUBLISHED
source: vtexdocs/help-center-content
originalPath: docs/en/tutorials/orders/orders-overview/orders-overview.md
---

The VTEX Orders module is responsible for managing the complete lifecycle of customer orders, from placement to delivery and returns.

## Order lifecycle

A VTEX order goes through the following statuses:

1. **payment-pending**: Order placed, waiting for payment confirmation.
2. **payment-approved** (or **invoiced**): Payment confirmed.
3. **ready-for-handling**: Order ready to be processed by the warehouse.
4. **handling**: Order is being packed/prepared.
5. **invoiced**: Order has been invoiced (fiscal document issued).
6. **shipped**: Order has been shipped.
7. **delivered**: Order has been delivered to the customer.
8. **canceled**: Order was canceled at any stage.

## Orders management in VTEX Admin

Access the Orders module at **Orders > All Orders** in the VTEX Admin.

Key operations:

- **View order details**: Click on an order to see complete information (customer, items, payment, shipping, invoices).
- **Cancel an order**: Available for orders that have not yet been shipped.
- **Change order**: Modify items, quantities, or discounts (subject to payment conditions).
- **Invoice an order**: Manually add fiscal invoice data.
- **Track delivery**: Update or view tracking information.

## Orders API

The Orders API enables programmatic order management:

```
GET /api/oms/pvt/orders/{orderId}
GET /api/oms/pvt/orders?q={queryString}
POST /api/oms/pvt/orders/{orderId}/cancel
POST /api/oms/pvt/orders/{orderId}/invoice
```

In VTEX IO Node services, use the `OMS` client from `@vtex/clients`:

```typescript
import { OMS } from '@vtex/clients'
// Access orders programmatically:
const order = await ctx.clients.oms.order(orderId)
```

## Order events in VTEX IO

Subscribe to order events in your Node service to react to order status changes:

```json
{
  "events": {
    "onAppInstalled": {
      "sender": "vtex.orders-broadcast",
      "keys": ["order-status-updated"]
    }
  }
}
```

Then handle the event in your middleware:

```typescript
export const orderStatusUpdated = async (ctx: EventContext<Clients>) => {
  const { body } = ctx
  // body contains order status change data
}
```

## Order feed and hook

For high-volume order processing, use the Order Feed or Order Hook APIs to receive real-time notifications of order changes without polling.

## Returns and refunds

The VTEX platform supports:

- **Order return**: Customer returns items after delivery.
- **Partial cancellation**: Cancel specific items from an order.
- **Refunds**: Initiated after cancellation or return approval.

Learn more: [How to return order items](https://help.vtex.com/en/tutorial/how-to-return-order-items).
