# Payment Provider Protocol — Physical Stores (POS)

PPP requirements and flow for connectors processing payments in physical stores via **VTEX Sales App** and a POS terminal.

---

## Requirements

1. Develop a connector using the **Payment Provider Protocol (PPP)**
2. Include `Venda Direta Credito` and `Venda Direta Debito` in the `/manifest` endpoint
3. Use **asynchronous (callback)** flow for payments
4. Use **Payment Apps** for POS identification and wait-for-confirmation UX
5. Endpoint must respond in **under 20 seconds**

---

## Manifest Configuration

```json
{
  "paymentMethods": [
    { "name": "Venda Direta Debito", "allowsSplit": "onCapture" },
    { "name": "Venda Direta Credito", "allowsSplit": "onCapture" }
  ]
}
```

---

## Payment Flow (Summary)

1. Buyer finishes purchase in VTEX Sales App
2. VTEX Sales App → Gateway: Authorization request
3. Gateway → Connector: `POST /payments` (Create Payment)
4. Connector → Gateway: `undefined` status + `paymentAppData` with `vtex.terminal-connector-app`
5. VTEX Sales App opens Terminal Connector App to scan POS barcode
6. App sends POS serial number to connector → connector updates payment processor
7. App closes → callback triggers new `POST /payments` call
8. Connector → payment processor: start payment on POS
9. Connector → Gateway: `undefined` + `paymentAppData` with `vtex.challenge-wait-for-confirmation`
10. VTEX Sales App opens Wait for Confirmation app → polls for status
11. Buyer inserts card on POS → payment processor handles transaction
12. Payment processor webhooks connector with result
13. Connector → Gateway: **mandatory callback** with `approved`/`denied` + card info (`cardBrand`, `firstDigits`, `lastDigits`)
14. Wait for Confirmation app receives final status → closes
15. VTEX Sales App receives final result → order placed or error shown

---

## Create Payment — Key Fields for POS

| Field | POS Behavior |
|---|---|
| `card` | All fields are `null` (no card data sent for physical payments) |
| `paymentMethod` | `"Venda Direta Debito"` or `"Venda Direta Credito"` |
| `callbackUrl` | Required — URL for connector to notify VTEX of status updates |

### delayToCancel

Set in the Create Payment response body (seconds). If payment stays `undefined` beyond this limit, Gateway automatically calls `POST /payments/{paymentId}/cancellations`.

### paymentAppData

Connector returns this in Create Payment response to trigger a Payment App challenge:

```json
{
  "paymentAppData": {
    "appName": "vtex.terminal-connector-app",
    "payload": "{\"submitUrl\": \"https://connector.com/instore_config/123\"}"
  }
}
```

---

## Payment Apps

### Terminal Connector App — `vtex.terminal-connector-app`

Scans POS barcode with device camera. Sends `{"serialNumber": "12345"}` to `submitUrl`.

```json
"paymentAppData": {
  "appName": "vtex.terminal-connector-app",
  "payload": "{\"submitUrl\": \"https://connector.com/instore_config/123\"}"
}
```

### Wait for Confirmation — `vtex.challenge-wait-for-confirmation`

Keeps VTEX Sales App polling for status update. Times out after `secondsWaiting` seconds.

```json
"paymentAppData": {
  "appName": "vtex.challenge-wait-for-confirmation",
  "payload": "{\"secondsWaiting\": 600}"
}
```

---

## Callback

When POS transaction concludes, connector calls `callbackUrl` with:
- `cardBrand` — card brand
- `firstDigits` — first 6 digits of card number
- `lastDigits` — last 4 digits of card number
- Payment status: `approved` or `denied`

Callback types: `retry` (`/retry` route → Gateway calls Create Payment again) or `notification` (`/notification` endpoint → status update).

---

## Testing Setup

1. Install connector in test store
2. Configure Gateway affiliation with the connector
3. Configure payment conditions: **Venda Direta Crédito** (ID: `45`) and **Venda Direta Débito** (ID: `44`)
4. Make conditions available in VTEX Sales App
5. Install VTEX Sales App on a device
6. Simulate a purchase with the connector

---

## Documentation

- [Payments Overview](./payments-overview.md)
- [Integrating a New Payment Provider](./payments-integrating-new-provider.md)
