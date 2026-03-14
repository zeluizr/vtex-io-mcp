# Tax Services — Reference Implementation

Example implementation of the Tax Protocol on VTEX IO.

---

## Reference

| Name | Type | Repository |
|---|---|---|
| **Tax Protocol Example** | Template | https://github.com/vtex-apps/tax-protocol-example |

---

## What the Example Implements

The [tax-protocol-example](https://github.com/vtex-apps/tax-protocol-example) demonstrates a complete tax service integration with:

### Clients

| Client | Description |
|---|---|
| `Checkout` | Configures the tax service in Checkout (`orderForm` activation/deactivation) |
| `Logistics` | Fetches dock information by ID (used to resolve shipping origin address for tax calculation) |
| `TaxProvider` | Connects to the external provider's API |
| `VtexCommerce` | Base class for VTEX API clients — can be inherited for other connections |

### Routes

| Route | Type | Description |
|---|---|---|
| Configure | Private | Activates or deactivates tax service for the account |
| Simulate | Public | Receives cart data from Checkout, calls tax provider, returns taxes |
| Commit | Public | Commits order taxes based on order status changes |

### Parsers

| Parser | Direction | Description |
|---|---|---|
| VTEX → Provider | Outbound | Transforms Checkout's request body into the format expected by the external provider |
| Provider → VTEX | Inbound | Transforms the provider's response into the format expected by VTEX Checkout |

---

## Getting Started

```sh
git clone https://github.com/vtex-apps/tax-protocol-example
cd tax-protocol-example
```

Steps to adapt:
1. Change `vendor` in `manifest.json` to your account
2. Update `TaxProvider` client to point to your tax provider API
3. Implement parsers for your provider's request/response format
4. Register the `calculateTax` route URL in `orderForm` `taxConfiguration.url`
5. Test with `vtex link`

---

## Integration Checklist

- [ ] `Checkout` client implemented (activate/deactivate)
- [ ] `TaxProvider` client implemented
- [ ] Simulate route registered and matching `taxConfiguration.url`
- [ ] Commit route registered and matching `hooks` URL in provider response
- [ ] Request parser: VTEX format → provider format
- [ ] Response parser: provider format → VTEX format (`[{ id, taxes: [{ name, description, value }] }]`)
- [ ] Tax service activated via Configure route
- [ ] Tested with 5-second timeout budget in mind

---

## Documentation

- [Tax Services Overview](./tax-services-overview.md)
- [Tax Services Specification](./tax-services-specification.md)
- [Tax Services Request & Response](./tax-services-request-response.md)
- [Tax Services Recipe](./tax-services-recipe.md)
- [Tax Services GraphQL Schema](./tax-services-graphql-schema.md)
