# ERP Integration — FAQ

Frequently asked questions about VTEX ERP integrations.

## 1. How should order cancellations be handled in the integration?

Monitor feed/hook events with status `cancelation-request`. When triggered, check whether the order has already been sent to the carrier or can still be cancelled.

VTEX's order flow includes a **`window-to-cancel`** period — a configurable time window before the order goes to handling during which the customer may cancel with minimal consequence to the store.

You can also configure the integration to check cancellation status again before shipping. If the order has not been cancelled by that point, invoice and ship it normally.

## 2. Why doesn't the feed always return all available messages?

VTEX uses a distributed data structure to allow different processes to run in parallel (high-performance system). For performance reasons, VTEX uses **AWS SQS Standard Queues**, which do not guarantee that all messages are returned in a single request.

**Solution:** Poll the feed continuously and process all returned events each time.

## 3. Why does the feed send duplicate events?

Two reasons:

1. VTEX's distributed architecture can generate duplicate messages as a side effect of parallel processing.

2. An order can legitimately receive the same status twice for different events. Example: an order split between two marketplace sellers generates **two separate `invoiced` events** — one per seller.

**Solution:** Your middleware must be idempotent — handle duplicate events gracefully without processing them twice.

## 4. Feed or Hook — which should I use?

| | Feed | Hook |
|---|---|---|
| **Pattern** | Pull (you poll) | Push (VTEX notifies you) |
| **Guarantee** | At-least-once delivery | At-least-once delivery |
| **Duplicates** | Possible | Possible |
| **Best for** | Reliable batch processing | Low-latency reactive integrations |

See the [Feed v3 API guide](https://developers.vtex.com/docs/guides/orders-feed) for a detailed comparison.

## 5. Order is stuck in `Ready for Handling` — what should I do?

Common causes:
- The `start-handling` call was never made after receiving the order in the ERP
- A feed event was never committed, blocking subsequent events
- Payment confirmation is still pending

Check the VTEX Help Center article: [Why has my order stopped on "Ready for Handling"?](https://help.vtex.com/faq/why-has-my-order-stopped-on-ready-for-handling)

## Documentation

- [ERP Integration Guide](./erp-integration-guide.md)
- [ERP Integration — Orders](./erp-integration-orders.md)
- [Orders Overview](./orders-overview.md)
