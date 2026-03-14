# Payment Tokenization

> ⚠️ **Closed Beta** — Payment tokenization requires PPP version `2.0.0`. Contact VTEX to request access.

---

## Overview

Payment tokenization allows connectors to save card data as reusable tokens in VTEX's **CTV (Card Token Vault)**. Customers can then complete future purchases without re-entering card details.

---

## CTV — Card Token Vault

The CTV is VTEX's secure storage system for payment tokens:

- Stores tokens linked to VTEX customer profiles
- Tokens are PCI-DSS compliant (no raw card data stored)
- Tokens can be reused across multiple transactions
- Tokens can be imported in bulk via `.XLSX` file

---

## generatedCardToken

When a connector supports tokenization, the `POST /payments` authorization response can include:

```json
{
  "paymentId": "...",
  "status": "approved",
  "authorizationId": "...",
  "generatedCardToken": "vtex-token-abc123"
}
```

VTEX stores the `generatedCardToken` in the CTV associated with the customer's profile for future use.

---

## Tokenization Scenarios

There are **4 scenarios** for how tokenization can occur:

| Scenario | Description |
|---|---|
| 1. First purchase + save | Customer checks "save my card" — token generated and stored |
| 2. First purchase without save | No token generated; standard flow |
| 3. Recurring/subscription | Token reused automatically; no customer interaction |
| 4. Saved card checkout | Customer selects saved card; token passed instead of card data |

---

## Token Reuse Flow

When a customer uses a saved card:

1. VTEX retrieves the token from CTV
2. Token is sent in `POST /payments` instead of card fields
3. Connector uses the token to authorize with the acquirer
4. Acquirer detokenizes and processes

---

## Enabling Tokenization

Requires:

1. PPP `version: "2.0.0"` in `/manifest` response
2. Closed Beta access from VTEX
3. Connector returns `generatedCardToken` in authorization response

---

## Documentation

- [Payments Overview](./payments-overview.md)
- [Payments — PPP Versioning](./payments-ppp-versioning.md)
- [Payments — Managing Tokenized Cards](./payments-managing-tokens.md)
- [Payments — Secure Proxy](./payments-secure-proxy.md)
