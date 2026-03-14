# ERP Integration — Order Processing

Send order updates from your ERP or WMS back to VTEX (changes, cancellations, invoices, tracking).

## Overview

After orders are received via the order feed and processed in the ERP/WMS, VTEX must be notified of all relevant updates:

```
Order received by ERP
  ├── Item/price change needed → Change Order
  ├── Cancellation needed → Cancel Order
  └── Ready to ship → Invoice Order
       └── Tracking available → Update Tracking
```

---

## Change Order

Modify items or prices of an existing order. Use cases: customer mistakes, product unavailability, applying discounts.

```
POST /api/oms/pvt/orders/{orderId}/changes
```

> Restrictions apply — not all orders can be changed after placement. See [Changing items from a completed order](https://help.vtex.com/en/tutorial/changing-items-from-a-complete-order--tutorials_190).

---

## Change Seller (Marketplace Only)

Reassign which seller fulfills a given order. Required if the original seller cannot fulfill.

```
# See Change Seller integration guide for the specific endpoint and flow
```

---

## Cancel Order

```
POST /api/oms/pvt/orders/{orderId}/cancel
```

Optionally add a note to the order timeline:

```
POST /notes    # VTEX DO API — Create note
```

> **Important:**
> - Orders **cannot be cancelled after invoicing**
> - Order cancellations **cannot be reversed**
> - Confirm cancellation via the orders feed

---

## Invoice Order

Notify VTEX that the order is ready to ship and attach invoice information.

```
POST /api/oms/pvt/orders/{orderId}/invoice
```

```json
{
  "type": "Output",
  "invoiceNumber": "INV-001",
  "invoiceValue": 9990,
  "invoiceDate": "2024-01-15T10:00:00Z",
  "invoiceUrl": "https://example.com/invoices/INV-001",
  "trackingNumber": "BR123456789",
  "trackingUrl": "https://carrier.com/track/BR123456789",
  "courier": "Fedex",
  "items": [
    { "id": "123", "quantity": 1, "price": 9990 }
  ]
}
```

> `trackingNumber` and `trackingUrl` are optional at invoice time — they can be added later.

---

## Order Tracking

Tracking information is tied to the order's invoice.

### Add/Update Tracking on Existing Invoice

```
PATCH /api/oms/pvt/orders/{orderId}/invoice/{invoiceNumber}
```

### Add Tracking Messages (Non-integrated Carriers)

If the freight carrier is **integrated with VTEX**, tracking messages are logged automatically when the tracking number is provided.

If the carrier is **not integrated with VTEX**, push tracking messages manually:

```
PUT /api/oms/pvt/orders/{orderId}/invoice/{invoiceNumber}/tracking
```

```json
{
  "tracking": {
    "number": "BR123456789",
    "url": "https://carrier.com/track/BR123456789",
    "courier": "My Carrier",
    "updates": [
      {
        "date": "2024-01-15T10:00:00Z",
        "description": "Package picked up",
        "city": "São Paulo",
        "state": "SP",
        "country": "BRA"
      }
    ]
  }
}
```

---

## Complete Order Processing Flow

| Event | Trigger | VTEX Action |
|---|---|---|
| Item out of stock | ERP detects unavailability | `POST /orders/{id}/changes` |
| Store needs to cancel | Fulfillment cannot complete | `POST /orders/{id}/cancel` |
| Invoice generated | ERP creates invoice | `POST /orders/{id}/invoice` |
| Carrier picks up | WMS confirms shipment | `PATCH /orders/{id}/invoice/{invoiceNumber}` |
| Tracking update | Carrier scans package | `PUT /orders/{id}/invoice/{invoiceNumber}/tracking` |

## Documentation

- [ERP Integration Guide](./erp-integration-guide.md)
- [ERP Integration — Orders](./erp-integration-orders.md)
- [Orders Overview](./orders-overview.md)
- [Authentication](./authentication.md)
