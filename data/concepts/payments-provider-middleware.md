# Implementing a Payment Provider — Middleware

How to develop the middleware for the Payment Provider Protocol (PPP).

---

## Middleware Requirements

- Endpoint served over **HTTPS on port 443**, with **TLS 1.2**. HTTP not accepted.
- API must be **publicly accessible** — no restricted APIs in homologation.
- Use a **subdomain or domain name** — IP addresses not accepted.
- Response time: **< 5 seconds** in tests; **< 20 seconds** for any call.

---

## Payment Flow (6 Endpoints)

### 1. GET /manifest

Returns provider metadata: supported payment methods, split configuration, custom fields.

```json
{
  "paymentMethods": [
    { "name": "Visa", "allowsSplit": "onCapture" },
    { "name": "Pix", "allowsSplit": "disabled" },
    { "name": "BankInvoice", "allowsSplit": "onAuthorize" }
  ]
}
```

> For custom payments, use only the method type (`Cobranded`, `Privatelabels`, `Promissories`) — not the specific brand name.

### 2. POST /payments — Create Payment

Receives full cart + payment data. Returns payment status and timing fields.

Key response fields:
- `status` — `approved`, `denied`, or `undefined` (asynchronous)
- `delayToAutoSettle` — seconds until auto-capture (counted from authorization)
- `delayToAutoSettleAfterAntifraud` — seconds until auto-capture after anti-fraud
- `delayToCancel` — seconds until auto-cancellation if still `undefined`
- `paymentUrl` — for redirect flow
- `paymentAppData` — for Payment App flow (`appName` + `payload`)
- `callbackUrl` — URL to notify VTEX of async status updates

> `code` and `message` are optional and will be echoed in subsequent calls.

### 3. POST /payments/{paymentId}/cancellations — Cancel Payment

Idempotent — must handle repeated calls with same `paymentId`.

Request: `{ "paymentId": "...", "requestId": "..." }`
Response: `{ "paymentId": "...", "cancellationId": "...", "message": "...", "requestId": "..." }`

Retried asynchronously for **1 day** if `undefined` is returned.

### 4. POST /payments/{paymentId}/settlements — Capture Payment

Supports **partial capture** — `value` in response can be less than `value` in request.

Triggered when:
- Store invoices the order, OR
- `delayToAutoSettle` / `delayToAutoSettleAfterAntifraud` timeout

Retried asynchronously for **1 day** if not authorized immediately.

### 5. POST /payments/{paymentId}/refunds — Refund Payment

Supports **partial refunds** — `value` in response can be less than requested.

### 6. POST /payments/{paymentId}/inbound-request/{action} — Inbound Request (BETA)

Direct URL between VTEX Gateway and the provider backend. Passes transaction context securely.

---

## Configuration Flow (3 Endpoints — Optional)

Enables merchants to authenticate with your connector via VTEX Admin without copy-pasting credentials.

### 1. POST /authorization/token

VTEX sends `applicationId: "vtex"` + `returnUrl`. Provider returns an auth token to redirect the merchant to the provider login page.

### 2. GET /authorization/redirect

Provider presents login/terms page. Returns `authorizationCode` linked to the `returnUrl`.

### 3. GET /authorization/credentials

Returns the three credentials VTEX will store and use for the merchant's connector activation:
```json
{
  "applicationId": "vtex",
  "appKey": "test_key_...",
  "appToken": "test_token_..."
}
```

---

## Documentation

- [Payments Overview](./payments-overview.md)
- [Payments — Purchase Flows](./payments-purchase-flows.md)
- [Payments — PPF](./payments-provider-framework.md)
- [Payments — Homologation](./payments-homologation.md)
