# Tax Services Recipe

Step-by-step guide for implementing a VTEX IO tax service integration app.

---

## Architecture Overview

A tax integration app on VTEX IO consists of three main layers:

1. **Clients** — abstract API connections (Checkout, Logistics, external Tax Provider)
2. **Routes** — endpoints defined in `service.json` with handlers
3. **Parsers** — transform payload formats between VTEX and the external provider

---

## Clients

Clients are abstractions for connecting to VTEX APIs or external APIs, agnostic to the application's purpose. Client methods accept parameters needed for API calls (e.g., a body for `POST` requests).

### Required Connections

| Client | Purpose |
|---|---|
| `Checkout` | Configure the tax service in the `orderForm` (activate/deactivate) |
| `Logistics` | Fetch dock information by ID (dock address for tax calculation) |
| `TaxProvider` | Connect to the external tax provider's API |
| `VtexCommerce` | Base external client — can be inherited for other VTEX API clients |

### Reference Implementation

See the [tax-protocol-example](https://github.com/vtex-apps/tax-protocol-example) for a complete client implementation.

---

## Routes

Routes are endpoints defined in `service.json` with handlers in the `/node` folder.

### Three Required Routes

| Route | Visibility | Purpose |
|---|---|---|
| **Configure** | Private | Activate or deactivate the tax integration for a specific account |
| **Simulate** | Public | Receive cart data from Checkout, call tax provider, return calculated taxes |
| **Commit** | Public | Commit order taxes based on order status changes |

> The **Simulate** route URL is what gets registered in the `orderForm` `taxConfiguration.url`.
> The **Commit** route URL is the same as the `hooks` object in the provider's response to Checkout.

> ⚠️ The Simulate and Commit routes only work if the tax service has been configured in the account first (via the Configure route).

### Implementation Steps

1. Define routes in `service.json`
2. Create handlers for each route
3. Register handlers in `node/index.ts`

---

## Parsers

Parsers simplify the handler logic by encapsulating payload transformation between VTEX and the external provider.

### Parsing VTEX → Provider

VTEX Checkout sends a specifically formatted `POST` body. If the external provider expects a different format, implement a parser function to transform it.

### Parsing Provider → VTEX

The Checkout API also expects a specific response format (array of items with taxes). Implement a parser to convert the provider's response into the VTEX-expected format.

---

## service.json Structure

```json
{
  "memory": 256,
  "timeout": 10,
  "minReplicas": 1,
  "maxReplicas": 3,
  "routes": {
    "configureTax": {
      "path": "/_v/tax-service/configure",
      "public": false
    },
    "calculateTax": {
      "path": "/_v/tax-service/order-tax",
      "public": true
    },
    "commitTax": {
      "path": "/_v/tax-service/commit",
      "public": true
    }
  }
}
```

---

## node/index.ts Structure

```typescript
import { Service } from '@vtex/api'
import { configureTax } from './handlers/configureTax'
import { calculateTax } from './handlers/calculateTax'
import { commitTax } from './handlers/commitTax'

export default new Service({
  clients: { /* your clients */ },
  routes: {
    configureTax,
    calculateTax,
    commitTax,
  },
})
```

---

## Documentation

- [Tax Services Overview](./tax-services-overview.md)
- [Tax Services Specification](./tax-services-specification.md)
- [Tax Services Request & Response](./tax-services-request-response.md)
- [Tax Services Reference Implementation](./tax-services-references.md)
