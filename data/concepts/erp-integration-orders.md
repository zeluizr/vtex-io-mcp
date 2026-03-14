# ERP Integration — Orders

Send orders from VTEX to your ERP or WMS using the Orders Feed.

## Overview

After an order is placed, it follows a predefined **order flow** in the OMS (Order Management System). Each status has a meaning and specified behavior.

Two ways to track order status changes:

| Method | Description |
|---|---|
| **Feed** | Endpoint you poll periodically to retrieve status change events |
| **Hook** | VTEX notifies your endpoint whenever an order update occurs (reactive) |

### Order Integration Flow (Feed)

```
1. Configure feed filter
2. Periodically retrieve feed items
3. For each event: determine if action is needed
4. If action needed: get full order details → send to ERP
5. Change order status to start-handling
6. Commit feed items (acknowledge receipt)
```

> Reference implementation: [FeedConsumerCSharp boilerplate](https://github.com/vtex/FeedConsumerCSharp)

---

## Step 1 — Configure the Order Feed

```
POST /api/orders/feed/config    # Update feed configuration
GET  /api/orders/feed/config    # Get current feed configuration
```

### Filter Types

**`"type": "FromWorkflow"`** — Filter by order status changes.

Key statuses for ERP integrations:
- `ready-for-handling` — Order paid, grace period expired → most important for ERP
- `start-handling` — Handling started
- `handling` — In progress
- `cancelation-request` — Relevant for marketplaces with third-party fulfillment
- `waiting-ffmt-authorization` — Relevant for marketplace fulfillment

**`"type": "FromOrders"`** — Filter by any change to the order's JSON document. More customizable — can detect delivered orders, item additions/removals, etc.

> **Important:**
> - Each `appKey`/`appToken` pair has its own independent feed — multiple apps can use feeds without interfering with each other.
> - Feed configuration does not validate inserted values — ensure status strings match the [OMS workflow strings](https://help.vtex.com/en/tutorial/order-flow-and-status--tutorials_196) exactly.

---

## Step 2 — Retrieve Feed Items

```
GET /api/orders/feed
```

Returns a batch of events. Each event includes:

```json
[
  {
    "eventId": "ED423DDED4C1AE580CADAC1A4D02DA3F",
    "handle": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "domain": "Fulfillment",
    "state": "ready-for-handling",
    "lastState": "window-to-cancel",
    "orderId": "953712004126-01",
    "lastChange": "2019-08-12T20:54:01.134057Z",
    "currentChange": "2019-08-12T20:54:23.7153839Z"
  }
]
```

> The feed guarantees delivery of all status changes but **does not ensure uniqueness** — your middleware must handle duplicate events.

---

## Step 3 — Get Order Details

When an action is required (e.g., status is `ready-for-handling`), fetch full order details:

```
GET /api/oms/pvt/orders/{orderId}
```

Returns products, quantities, payments, delivery, and customer information. Use the `orderId` from the feed event.

---

## Step 4 — Start Handling

After successfully submitting order details to the ERP, change the order status to `start-handling`. **Do this only once per order.**

```
POST /api/oms/pvt/orders/{orderId}/start-handling
```

---

## Step 5 — Commit Feed Items

Acknowledge receipt of each event to remove it from the feed. Pass the `handle` values from the retrieved events.

```
POST /api/orders/feed
```

> **Always commit every event**, even if no action was taken. Failing to commit blocks subsequent events in the feed.
>
> All events (committed or not) are automatically removed from the feed after **4 days**. Run your middleware continuously to avoid data loss.

---

## Complete Example

1. `GET /api/orders/feed` → receives event with `state: "ready-for-handling"`, `orderId: "953712004126-01"`
2. `GET /api/oms/pvt/orders/953712004126-01` → fetches order details
3. Sends relevant data (products, quantities) to ERP
4. `POST /api/orders/feed` with the event's `handle` → commits the event
5. `POST /api/oms/pvt/orders/953712004126-01/start-handling` → updates order status

---

## Hook (Alternative)

Instead of polling the feed, configure a **Hook** to have VTEX push notifications to your endpoint whenever an order update occurs. Reactive approach — no polling needed.

See the [Feed v3 API guide](https://developers.vtex.com/docs/guides/orders-feed) to compare Feed vs Hook and choose the best approach for your integration.

## Documentation

- [ERP Integration Guide](./erp-integration-guide.md)
- [Orders Overview](./orders-overview.md)
- [Authentication](./authentication.md)
