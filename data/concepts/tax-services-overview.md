# Tax Services Overview

Protocol that defines how to build an integration between VTEX and an external tax calculation provider.

---

## When to Use

Selling products online is subject to various types of taxes that can differ based on:

- Inventory location
- Shipping addresses
- Nature of the product

For stores operating in a B2B model, tax calculations can become intricate and require an external tax calculation provider.

---

## How It Works

In synchronous integration, VTEX's Checkout API triggers and sends a request to the external tax service API **whenever there are changes to a shopper's cart** (adding or removing items).

```
Customer cart change → VTEX Checkout → External Tax Provider API → Tax values → Checkout applies taxes
```

> ⚠️ The timeout for the request is **5 seconds**. There is no retry in case of timeout. If the external service times out constantly, the store will not be able to finish the order. If this integration is active, it applies to all stores in that account.

---

## Integration Components

The Tax Service integration involves:

1. **orderForm configuration** — activating the tax integration by registering the external tax endpoint
2. **Tax calculation endpoint** — external provider endpoint that receives cart data and returns tax values
3. **VTEX IO service app** — the connector app built on VTEX IO that implements clients, routes, and parsers

---

## White Label Sellers

When items from White Label Sellers are part of an order, the tax configuration for the marketplace (`seller 1`) is **not** applied to those items. Each seller must have its own tax service configuration for this type of integration to work properly.

---

## isMarketplaceResponsibleForTaxes

The `taxConfiguration` object includes a flag:

- `true` → marketplace is responsible for calculating taxes
- `false` → seller is responsible

> ⚠️ `isMarketplaceResponsibleForTaxes` is **not compatible** with stores that have Multilevel Omnichannel Inventory implemented.

---

## Documentation

- [Tax Services Specification](./tax-services-specification.md)
- [Tax Services Recipe](./tax-services-recipe.md)
- [Tax Services GraphQL Schema](./tax-services-graphql-schema.md)
- [Tax Services Reference Implementation](./tax-services-references.md)
