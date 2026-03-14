# Tax Services Specification

How to configure VTEX Checkout to use an external tax calculation provider via `orderForm` configuration.

---

## Tax Integration Flow

1. Get current `orderForm` configuration
2. Update `taxConfiguration` with your external provider endpoint
3. Tax integration becomes active in synchronous mode

---

## Step 1 — Get orderForm Configuration

Use the [Get orderForm configuration](https://developers.vtex.com/docs/api-reference/checkout-api#get-/api/checkout/pvt/configuration/orderForm) endpoint:

```
GET /api/checkout/pvt/configuration/orderForm
```

In the response, locate the `taxConfiguration` object:

```json
{
  "taxConfiguration": {
    "url": "https://{accountName}.myvtex.com/tax-service/order-tax",
    "authorizationHeader": "99b9935b048dfd86893d0bf9gas628849",
    "appId": "tradeincart",
    "isMarketplaceResponsibleForTaxes": false
  }
}
```

---

## Step 2 — Update orderForm Configuration

Use the [Update orderForm configuration](https://developers.vtex.com/docs/api-reference/checkout-api#post-/api/checkout/pvt/configuration/orderForm) endpoint:

```
POST /api/checkout/pvt/configuration/orderForm
```

> ⚠️ You must send the **entire** `orderForm` in the request body — not just the `taxConfiguration` object.

### taxConfiguration Fields

| Property | Type | Description |
|---|---|---|
| `url` | string | External API endpoint that Checkout will query to receive calculated taxes |
| `authorizationHeader` | string | Value used in the `Authorization` header of calls to the external tax API — defines access credentials |
| `isMarketplaceResponsibleForTaxes` | boolean | `true` = marketplace calculates taxes; `false` = seller is responsible |

### Example

```json
{
  "taxConfiguration": {
    "url": "https://sandbox-rest.avatax.com/api/v2/transactions/create",
    "authorizationHeader": "99b9935b048dfd86893d0bf9gas628849",
    "appId": "tradeincart",
    "isMarketplaceResponsibleForTaxes": true
  }
}
```

After successfully submitting the request, the Tax API integration becomes **active in synchronous mode**.

---

## Important Constraints

- **Timeout**: 5 seconds — no retry on timeout
- **Scope**: applies to all stores in the account when active
- **White Label Sellers**: each seller needs its own tax configuration — marketplace `taxConfiguration` is not applied to white label seller items
- **Multilevel Omnichannel Inventory**: incompatible with `isMarketplaceResponsibleForTaxes`

---

## Documentation

- [Tax Services Overview](./tax-services-overview.md)
- [Tax Services Request & Response](./tax-services-request-response.md)
- [Tax Services Recipe](./tax-services-recipe.md)
