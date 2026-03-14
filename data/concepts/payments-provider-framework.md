# Payment Provider Framework (PPF)

VTEX IO-based alternative for developing payment connectors. Handles API routes, request/response types, Secure Proxy, and hosting automatically.

---

## Setup

### Clone boilerplate

```sh
git clone https://github.com/vtex-apps/payment-provider-example
```

### Install dependencies

```sh
# In /node folder:
yarn add @vtex/payment-provider     # "1.x" in package.json
yarn add -D @vtex/api               # "6.x" in devDependencies
```

### manifest.json builders

```json
"builders": {
  "node": "6.x",
  "paymentProvider": "1.x"
}
```

The `paymentProvider` builder adds Gateway callback policies and exposes PPP routes automatically.

---

## Payment Provider Class

Extend `PaymentProvider` and implement a function for each PPP route:

```typescript
import { PaymentProvider } from '@vtex/payment-provider'

class YourPaymentConnector extends PaymentProvider {
  // implement route functions
}
```

---

## paymentProvider/configuration.json

Create `paymentProvider/configuration.json` to declare payment methods (auto-implements `/manifest` route):

```json
{
  "name": "YourConnectorName",
  "paymentMethods": [
    { "name": "Visa", "allowsSplit": "onCapture" },
    { "name": "Mastercard", "allowsSplit": "onCapture" },
    { "name": "BankInvoice", "allowsSplit": "onAuthorize" }
  ],
  "customFields": [
    { "name": "Company account", "type": "text" },
    { "name": "Client key", "type": "password" },
    { "name": "Auto Capture Settings", "type": "select", "options": [...] }
  ]
}
```

`customFields` types: `text` (non-sensitive), `password` (sensitive), `select` (grouped options).

---

## Configurable Options

| Parameter | Default | Description |
|---|---|---|
| `implementsOAuth` | `false` | OAuth config flow support |
| `implementsSplit` | `false` | Payment split flow |
| `usesProviderHeadersName` | `true` | Receive appKey/appToken as `x-provider-api-appKey/appToken` |
| `useAntifraud` | `false` | Allow anti-fraud providers |
| `usesBankInvoiceEnglishName` | `false` | Use "Bank Invoice" vs "Boleto Bancário" |
| `usesSecureProxy` | `true` | PCI-DSS exemption via Secure Proxy; if `false`, must provide AOC |
| `requiresDocument` | `false` | Show cardholder document field in Checkout |
| `acceptSplitPartialRefund` | `false` | Allow partial refund on payment split |
| `usesAutoSettleOptions` | `false` | Show auto-settlement dropdown in Admin |

---

## PaymentProviderService

```typescript
import { PaymentProviderService } from '@vtex/payment-provider'

new PaymentProviderService({
  connector: YourPaymentConnector,
  routes: newRoutes,   // optional extra routes
  clients: NewClients, // optional extra clients
})
```

Default routes exposed: `/manifest`, `/payments`, `/settlements`, `/refunds`, `/cancellations`, `/inbound`.

---

## Secure Proxy (for card payments)

Extend `SecureExternalClient` and set `secureProxy` on the request config:

```typescript
import { SecureExternalClient, CardAuthorization } from '@vtex/payment-provider'

export class MyPCIClient extends SecureExternalClient {
  constructor(context, options) {
    super('http://my-pci-certified-domain.com', context, options)
  }

  myEndpoint = (cardRequest: CardAuthorization) =>
    this.http.post('my-endpoint',
      { number: cardRequest.numberToken, csc: cardRequest.cscToken },
      { secureProxy: cardRequest.secureProxyUrl } as RequestConfig
    )
}
```

> Secure Proxy only accepts `application/json` or `application/x-www-form-urlencoded`. Endpoint must be pre-approved by VTEX via support ticket.

---

## Testing

1. Launch beta version: `vtex.payment-provider-test@0.1.0-beta`
2. Install on `master` workspace (wait ~1 hour)
3. Configure Gateway affiliation via Admin
4. Enable test mode + set workspace in affiliation settings
5. Configure payment condition with your connector
6. Simulate a purchase

---

## Go-Live Checklist

- `billingOptions: { type: "free" }` in manifest (required)
- Publish on VTEX App Store
- Open support ticket with: Connector App Name, partner email, Production Endpoint, Allowed Accounts, new payment methods (if any)
- SLA: **30 days** after Master Partner Agreement (MPA) submission

---

## Documentation

- [Payments Overview](./payments-overview.md)
- [Payments — Implementing Middleware](./payments-provider-middleware.md)
- [Payments — Homologation](./payments-homologation.md)
