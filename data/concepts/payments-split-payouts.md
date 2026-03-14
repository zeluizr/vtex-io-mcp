# Split Payouts on Payment Provider Protocol

Distributing payment amounts across multiple recipients (seller, marketplace, etc.) within a single transaction.

---

## Overview

Split payouts allow a single payment to be distributed to multiple parties at authorization or capture time. Common use case: marketplace paying the seller while retaining a commission.

The split data is sent via the `recipients` array in both the authorization (`POST /payments`) and capture (`POST /settlements`) requests.

---

## recipients Array

The `recipients` array is included in the `POST /payments` and `POST /settlements` request bodies when split is active.

```json
{
  "recipients": [
    {
      "id": "seller-account",
      "name": "Seller Name",
      "documentType": "CNPJ",
      "document": "00.000.000/0001-00",
      "role": "seller",
      "amount": 8000,
      "chargeProcessingFee": false,
      "chargebackLiable": true,
      "commissionAmount": 2000
    },
    {
      "id": "marketplace-account",
      "name": "Marketplace Name",
      "documentType": "CNPJ",
      "document": "11.111.111/0001-11",
      "role": "marketplace",
      "amount": 2000,
      "chargeProcessingFee": true,
      "chargebackLiable": false,
      "commissionAmount": 0
    }
  ]
}
```

---

## Recipient Fields

| Field | Type | Description |
|---|---|---|
| `id` | string | Recipient account identifier |
| `name` | string | Recipient display name |
| `documentType` | string | `"CPF"` or `"CNPJ"` |
| `document` | string | Tax document number |
| `role` | string | `"seller"` or `"marketplace"` |
| `amount` | number | Amount in cents for this recipient |
| `chargeProcessingFee` | boolean | Whether this recipient pays the processing fee |
| `chargebackLiable` | boolean | Whether this recipient is liable for chargebacks |
| `commissionAmount` | number | Commission amount in cents |

---

## Calculation Breakdown

Example: R$100 total sale, 20% marketplace commission

| Recipient | Total amount | Commission | Net received |
|---|---|---|---|
| Seller | R$100.00 | R$20.00 | R$80.00 |
| Marketplace | — | R$20.00 | R$20.00 |

In the `recipients` array:
- Seller: `amount: 8000`, `commissionAmount: 2000`, `chargeProcessingFee: false`
- Marketplace: `amount: 2000`, `commissionAmount: 0`, `chargeProcessingFee: true`

> All amounts are in **cents** (integer). R$100.00 = `10000`.

---

## allowsSplit in /manifest

The `/manifest` endpoint declares when split is supported:

| Value | Description |
|---|---|
| `"onCapture"` | Split processed at settlement/capture time |
| `"onAuthorize"` | Split processed at authorization time |
| `"disabled"` | Split not supported |

---

## PPF Configuration

In `paymentProvider/configuration.json`:

```json
{
  "paymentMethods": [
    { "name": "Visa", "allowsSplit": "onCapture" }
  ]
}
```

In `PaymentProvider` class options:

```typescript
implementsSplit: true
acceptSplitPartialRefund: true  // optional: allow partial refund on split transactions
```

---

## Documentation

- [Payments Overview](./payments-overview.md)
- [Payments — PPP Middleware](./payments-provider-middleware.md)
- [Payments — PPF](./payments-provider-framework.md)
- [Payment Methods](./payments-methods.md)
