# VTEX Orders API

## Description

Each purchase a customer makes in your store generates an order on VTEX. With the Orders API, you can view order statuses and manage multiple aspects involved in order fulfillment, such as financial transactions, invoicing, shipping, and subscriptions. You can also modify orders and make configurations to allow or forbid marketplaces and sellers to change or cancel orders.

**Rate limit:** 6,000 requests per minute per account.

**Note:** You can only access information from orders created in the last two years.

## Base URL

```
https://{accountName}.vtexcommercestable.com.br
```

## Authentication

| Header | Description |
|--------|-------------|
| `X-VTEX-API-AppKey` | API key identifier. Use together with `X-VTEX-API-AppToken`. |
| `X-VTEX-API-AppToken` | API key secret token. |
| `VtexIdclientAutCookie` | User token (valid 24h). Alternative to AppKey/AppToken. |

## Endpoints by Tag

### Orders

| Method | Path | Summary |
|--------|------|---------|
| `GET` | `/api/oms/pvt/orders/{orderId}` | Get order |
| `GET` | `/api/oms/pvt/orders/order-group/{orderGroup}` | Get orders by order group ID |
| `GET` | `/api/oms/pvt/orders` | List orders |
| `POST` | `/api/oms/pvt/orders/{orderId}/start-handling` | Start handling order |
| `POST` | `/api/oms/pvt/orders/{orderId}/cancel` | Cancel order |
| `POST` | `/api/oms/pvt/orders/{orderId}/changes` | Register modifications on order |

### Order Modifications

| Method | Path | Summary |
|--------|------|---------|
| `PATCH` | `/api/order-system/orders/{changeOrderId}/changes` | Create order modifications |
| `POST` | `/api/order-system/orders/{changeOrderId}/changes/preview` | Preview order modifications |
| `GET` | `/api/order-system/orders/{changeOrderId}/changes/{changeRequestId}` | Get order modifications details |
| `GET` | `/api/order-system/orders/{changeOrderId}/changes` | Get order modifications history |
| `GET` | `/api/orders/pvt/document/{changeOrderId}/change-summary` | Get order modifications summary |
| `POST` | `/api/order-system/orders/{changeOrderId}/changes/{changeRequestId}/retry` | Retry order modifications |
| `POST` | `/api/order-system/orders/{changeOrderId}/changes/{changeRequestId}/cancel` | Cancel order modifications |
| `PUT` | `/api/order-system/orders/changes/settings` | Update order modifications settings |
| `GET` | `/api/order-system/orders/changes/settings` | Get order modifications settings |

### Invoice

| Method | Path | Summary |
|--------|------|---------|
| `POST` | `/api/oms/pvt/orders/{orderId}/invoice` | Order invoice notification |
| `PATCH` | `/api/oms/pvt/orders/{orderId}/invoice/{invoiceNumber}` | Update order's partial invoice (send tracking number) |

### Tracking

| Method | Path | Summary |
|--------|------|---------|
| `PUT` | `/api/oms/pvt/orders/{orderId}/invoice/{invoiceNumber}/tracking` | Update order tracking status |

### Conversation

| Method | Path | Summary |
|--------|------|---------|
| `GET` | `/api/oms/pvt/orders/{orderId}/conversation-message` | Retrieve order conversation |

### Payment

| Method | Path | Summary |
|--------|------|---------|
| `GET` | `/api/oms/pvt/orders/{orderId}/payment-transaction` | Retrieve payment transaction |
| `POST` | `/api/oms/pvt/orders/{orderId}/payments/{paymentId}/payment-notification` | Send payment notification |

### Feed v3

| Method | Path | Summary |
|--------|------|---------|
| `GET` | `/api/orders/feed/config` | Get feed configuration |
| `POST` | `/api/orders/feed/config` | Create or update feed configuration |
| `DELETE` | `/api/orders/feed/config` | Delete feed configuration |
| `GET` | `/api/orders/feed` | Retrieve feed items |
| `POST` | `/api/orders/feed` | Commit feed items |
| `POST` | `/api/orders/expressions/jsonata` | Test JSONata expression |

### Order Hook

| Method | Path | Summary |
|--------|------|---------|
| `GET` | `/api/orders/hook/config` | Get hook configuration |
| `POST` | `/api/orders/hook/config` | Create or update hook configuration |
| `DELETE` | `/api/orders/hook/config` | Delete hook configuration |

### User Orders

| Method | Path | Summary |
|--------|------|---------|
| `GET` | `/api/oms/user/orders` | Retrieve user's orders |
| `GET` | `/api/oms/user/orders/{orderId}` | Retrieve user order details |

### Change Seller

| Method | Path | Summary |
|--------|------|---------|
| `GET` | `/api/checkout/pvt/configuration/window-to-change-seller` | Get window to change seller |
| `POST` | `/api/checkout/pvt/configuration/window-to-change-seller` | Update window to change seller |

## Key Response Models

### Get Order Response (GET /api/oms/pvt/orders/{orderId})

Key fields returned:
- `orderId` (string) — Unique order identifier (e.g., `1268540501456-01`)
- `sequence` (string) — 6-digit sequence number (e.g., `501456`)
- `status` (string) — Order status in workflow
- `statusDescription` (string) — Human-readable status
- `value` (integer) — Order total value in cents
- `creationDate` (string) — ISO 8601 creation date
- `lastChange` (string) — ISO 8601 last change date
- `orderGroup` (string) — Order group ID
- `origin` (string) — `"Marketplace"`, `"Fulfillment"`, or `"Chain"`
- `affiliateId` (string) — 3-letter affiliate/marketplace code
- `salesChannel` (string) — Trade policy ID
- `marketplaceOrderId` (string) — External marketplace order ID
- `items` (array) — Cart items
- `clientProfileData` (object) — Customer profile data
- `shippingData` (object) — Shipping and delivery data
- `paymentData` (object) — Payment transaction data

### List Orders (GET /api/oms/pvt/orders)

Query parameters:
- `f_status` — Filter by status
- `f_creationDate` — Filter by creation date range
- `f_invoicedDate` — Filter by invoiced date
- `orderBy` — Field to sort by
- `page`, `per_page` — Pagination

### Invoice Notification (POST /api/oms/pvt/orders/{orderId}/invoice)

Request body:
- `type` (string) — `"Output"` or `"Input"`
- `issuanceDate` (string) — Invoice date
- `invoiceNumber` (string) — Invoice number
- `invoiceValue` (integer) — Invoice value in cents
- `invoiceKey` (string) — Access key (NF-e)
- `invoiceUrl` (string) — URL to download invoice PDF
- `courier` (string) — Carrier/courier name
- `trackingNumber` (string) — Tracking code
- `trackingUrl` (string) — Tracking URL
- `items` (array) — Invoiced items with `id`, `quantity`, `price`

## Order Status Values

Common order statuses in the workflow:
- `payment-pending` — Awaiting payment
- `payment-approved` — Payment approved
- `ready-for-handling` — Ready to be handled by warehouse
- `handling` — Being prepared for shipping
- `invoiced` — Invoice issued, order shipped
- `canceled` — Order canceled

## Integration Notes

- Use **Feed v3** or **Order Hook** for real-time order event integration with ERP/WMS systems
- Feed v3 requires committing items after processing to advance the cursor
- Order Hook pushes events to a configured endpoint URL
- Rate limit is 6,000 requests/minute per account; use feed/hook instead of polling

## Documentation

https://developers.vtex.com/docs/api-reference/orders-api
