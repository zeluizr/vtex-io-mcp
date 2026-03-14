# PPP Versioning

> ⚠️ **Closed Beta** — PPP versioning is currently available only to select partners. Contact VTEX to request access.

---

## Overview

PPP (Payment Provider Protocol) versioning allows connectors to declare which version of the protocol they implement. Versioned connectors unlock advanced features not available in the base protocol.

---

## version Field in /manifest

To use a versioned protocol, declare the version in your `/manifest` response:

```json
{
  "paymentMethods": [...],
  "version": "2.0.0"
}
```

| Version | Features |
|---|---|
| (no version / default) | Standard PPP |
| `"2.0.0"` | Enables **payment tokenization** |

---

## Why Versioning

The versioning system allows VTEX to introduce breaking changes to the protocol while maintaining backward compatibility for existing connectors. Connectors opt in to new protocol versions explicitly.

---

## Protocol Version 2.0.0

`version: "2.0.0"` unlocks:

- **Payment tokenization** — ability to save and reuse card tokens across transactions
- **CTV (Card Token Vault)** integration
- `generatedCardToken` field in authorization responses

See [Payment Tokenization](./payments-tokenization.md) for implementation details.

---

## Closed Beta Access

To participate in the PPP versioning beta:

1. Open a VTEX Support ticket
2. Provide your connector name and use case
3. VTEX evaluates and grants access

---

## Documentation

- [Payments Overview](./payments-overview.md)
- [Payments — Tokenization](./payments-tokenization.md)
- [Payments — PPP Middleware](./payments-provider-middleware.md)
- [Payments — Homologation](./payments-homologation.md)
