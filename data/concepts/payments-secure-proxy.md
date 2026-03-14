# Secure Proxy

VTEX infrastructure that tokenizes sensitive card data so payment connectors never handle raw card numbers.

---

## How It Works

1. Customer enters card data in VTEX Checkout
2. VTEX Secure Proxy intercepts raw card fields and replaces them with tokens
3. Connector receives tokenized fields instead of raw card data
4. Connector forwards tokens + `secureProxyUrl` to the acquirer/processor
5. VTEX Secure Proxy detokenizes the data and forwards to the actual endpoint

```
Customer → Checkout → Secure Proxy (tokenize) → Connector → Secure Proxy (detokenize) → Acquirer
```

---

## Tokenized Card Fields

| Original field | Token field in connector |
|---|---|
| Card number | `numberToken` |
| Cardholder name | `holderToken` |
| CVV / CSC | `cscToken` |
| Expiry month | Passed as-is |
| Expiry year | Passed as-is |

---

## secureProxyUrl

The `secureProxyUrl` is sent in the `POST /payments` request body. It contains the VTEX Secure Proxy endpoint that the connector must use when forwarding card data.

> Use the `secureProxyUrl` exactly as received — do not modify it.

---

## Implementation with PPF (PaymentProvider Framework)

```typescript
import { SecureExternalClient, CardAuthorization } from '@vtex/payment-provider'

export class MyPCIClient extends SecureExternalClient {
  constructor(context, options) {
    super('http://my-pci-certified-domain.com', context, options)
  }

  authorizeCard = (cardRequest: CardAuthorization) =>
    this.http.post(
      'my-endpoint',
      {
        number: cardRequest.numberToken,
        csc: cardRequest.cscToken,
      },
      { secureProxy: cardRequest.secureProxyUrl } as RequestConfig
    )
}
```

> Secure Proxy only accepts `application/json` or `application/x-www-form-urlencoded`.

---

## X-PROVIDER-Forward-To Header

When using Secure Proxy without PPF (raw middleware implementation), include:

```
X-PROVIDER-Forward-To: https://your-acquirer-endpoint.com/authorize
```

VTEX Secure Proxy reads this header to know where to forward the detokenized request.

---

## Custom Token Mapping with JsonLogic

For acquirers that require a different field structure, you can define custom token mapping using **JsonLogic operators**. This allows:

- Renaming token fields to match acquirer expectations
- Combining fields
- Applying transformations before forwarding

The mapping is defined in the connector configuration and submitted to VTEX via support ticket for approval.

---

## Pre-approval Required

Before using Secure Proxy, your acquirer endpoint must be approved by VTEX:

1. Open a support ticket requesting Secure Proxy endpoint approval
2. Provide: acquirer domain, endpoint path, expected request format
3. VTEX allowlists the endpoint on Secure Proxy infrastructure

> Secure Proxy only works with pre-approved endpoints.

---

## Accepted Content Types

- `application/json`
- `application/x-www-form-urlencoded`

Other content types are **not supported**.

---

## Documentation

- [Payments Overview](./payments-overview.md)
- [Payments — PCI-DSS](./payments-pci-dss.md)
- [Payments — PPF](./payments-provider-framework.md)
- [Payments — PPP Middleware](./payments-provider-middleware.md)
