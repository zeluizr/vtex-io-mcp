# Payment Methods

Payment methods supported by VTEX.

---

## Credit Cards

Issued by financial institutions with a credit limit. Processed via card networks (Visa, Mastercard, Amex, Diners, Elo, Hipercard, etc.).

## Debit Cards

Deducts directly from the customer's bank account at purchase time. Also processed via card networks.

## Cash

Available in the VTEX Sales App (physical stores / delivery). Configured as a payment condition in the inStore app.

## Custom Payments

| Type | Description |
|---|---|
| **Promissory** | Seller manually approves each payment. Primarily used to facilitate cash payments. |
| **Private Label** | Credit card exclusive to a specific store, operating under the store's own brand. |
| **Co-Branded** | Store-branded credit card operating in partnership with a major card network (Visa, Mastercard, etc.). |

> In the `/manifest` endpoint, use only the type (`Cobranded`, `Privatelabels`, `Promissories`) — not the specific brand name.

## Regional Payments

### Pix (Brazil)

Instant payment ecosystem managed by the Central Bank of Brazil (BCB). Peer-to-peer transfers, no intermediaries, 24/7 availability, lower costs. Registered as `"Pix"` in VTEX APIs.

### Bank Invoice / Boleto Bancário (Brazil)

Official payment voucher paid at banks, post offices, supermarkets, or via internet banking. Settlement takes ~2 business days. Registered as `"BankInvoice"` in VTEX APIs.

---

## allowsSplit Values (in /manifest)

| Value | Description |
|---|---|
| `"onCapture"` | Split processed at capture time |
| `"onAuthorize"` | Split processed at authorization time |
| `"disabled"` | Split not supported |

---

## Documentation

- [Payments Overview](./payments-overview.md)
- [Payments — Purchase Flows](./payments-purchase-flows.md)
- [Payments — Implementing Middleware](./payments-provider-middleware.md)
