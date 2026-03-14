# Pix — Instant Payments in Brazil

Pix is an instant payment ecosystem managed by the Central Bank of Brazil (BCB). Integration guide for VTEX payment connectors.

---

## Overview

- Peer-to-peer instant transfers, 24/7 availability
- No intermediaries, lower processing costs than cards
- Settlement is instant (seconds)
- Registered in VTEX APIs as `"Pix"`

---

## How Pix Works in Checkout

1. Customer selects Pix at checkout
2. VTEX Gateway calls `POST /payments` on the connector
3. Connector creates a Pix charge with the PSP/acquirer
4. Connector returns `status: "undefined"` + `paymentAppData`
5. VTEX Checkout opens the **Payment App** with the QR code
6. Customer scans QR code in their banking app
7. PSP notifies connector of payment confirmation
8. Connector calls VTEX callback URL with `status: "approved"`
9. Payment App triggers `transactionValidation.vtex` event

---

## QR Code via Payment App

Pix is always implemented using the **Payment App** flow (no redirect):

```json
{
  "status": "undefined",
  "paymentAppData": {
    "appName": "vendor.pix-connector",
    "payload": "{\"qrCode\":\"BASE64_QR_IMAGE\",\"copyPasteCode\":\"00020126...\",\"expiresAt\":\"2024-01-01T12:15:00Z\"}"
  }
}
```

### QR Code payload fields

| Field | Description |
|---|---|
| `qrCode` | Base64-encoded QR code image (PNG) |
| `copyPasteCode` | Pix "copia e cola" string for manual payment |
| `expiresAt` | ISO 8601 timestamp for QR code expiry |

---

## QR Code Expiry

| Time limit | Description |
|---|---|
| **15 minutes** | Minimum recommended expiry |
| **60 minutes** | Maximum recommended expiry |

> QR codes that expire too quickly frustrate customers. QR codes that never expire create fraud risk.

The expiry time is controlled by your PSP/acquirer configuration.

---

## Asynchronous Flow

Pix is an **asynchronous** payment method:

- `POST /payments` returns `undefined` immediately
- VTEX retries for up to **7 days** if status remains `undefined`
- Connector must call the `callbackURL` when payment is confirmed by the bank

### Breaking the retry cycle

**Without VTEX IO**: Call `callbackURL` `/notification` endpoint with final status

**With VTEX IO (PPF)**: Call `callbackURL` `/retry` endpoint → triggers a new `POST /payments` with updated status

---

## /manifest Declaration

```json
{
  "paymentMethods": [
    {
      "name": "Pix",
      "allowsSplit": "disabled"
    }
  ]
}
```

> Use `"Pix"` (capital P) — exact match required in VTEX APIs.

---

## Documentation

- [Payments Overview](./payments-overview.md)
- [Payments — Payment App](./payments-payment-app.md)
- [Payments — Purchase Flows](./payments-purchase-flows.md)
- [Payment Methods](./payments-methods.md)
