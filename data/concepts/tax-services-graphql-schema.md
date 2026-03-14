# Tax Services — GraphQL Schema

GraphQL API for setting and retrieving Tax Configuration as part of the `orderForm` configuration.

---

## Query

### getTaxConfiguration

Returns the tax configuration of an account from the `orderForm` using the Checkout API.

```graphql
query {
  getTaxConfiguration {
    allowExecutionAfterErrors
    authorizationHeader
    integratedAuthentication
    url
  }
}
```

---

## Mutation

### setTaxConfiguration

Activates or deactivates the tax service in the `orderForm` configuration.

```graphql
mutation {
  setTaxConfiguration(operation: "activate") {
    taxConfiguration {
      url
      authorizationHeader
    }
  }
}
```

| Argument | Type | Description |
|---|---|---|
| `operation` | String | `"activate"` or `"deactivate"` |

---

## Types

### TaxConfiguration

| Field | Type | Description |
|---|---|---|
| `allowExecutionAfterErrors` | Boolean | Allow proceeding with purchase even when there's a tax system problem |
| `authorizationHeader` | String | Value used in the `Authorization` header of calls to the external tax API |
| `integratedAuthentication` | Boolean | `true` = use VTEX auth; `false` = use `authorizationHeader` |
| `url` | String | External tax provider endpoint URL |

### OrderFormConfiguration

| Field | Type | Description |
|---|---|---|
| `paymentConfiguration` | PaymentConfiguration | Payment configuration information |
| `taxConfiguration` | TaxConfiguration | External tax service configuration |
| `minimumQuantityAccumulatedForItems` | Int | Minimum SKU quantity per cart — **mandatory in all requests** |
| `decimalDigitsPrecision` | Int | Number of decimal price digits |
| `minimumValueAccumulated` | Int | Minimum cart total |
| `apps` | [App] | List of app configuration objects |
| `allowMultipleDeliveries` | Boolean | Enables multiple delivery options in a single purchase |
| `allowManualPrice` | Boolean | Allows editing SKU prices directly in the cart |
| `maxIntOfWhiteLabelSellers` | Int | Maximum number of white label sellers allowed in the cart |
| `maskFirstPurchaseData` | Boolean | Masks customer data for first-time purchases (useful for shared carts) |
| `recaptchaValidation` | Boolean | Configures reCAPTCHA validation for the account |

### App

| Field | Type | Description |
|---|---|---|
| `fields` | [String] | List of fields available to the app |
| `id` | String | App ID |
| `major` | Int | App major version |

### PaymentConfiguration

| Field | Type | Description |
|---|---|---|
| `requiresAuthenticationForPreAuthorizedPaymentOption` | Boolean | Determines whether pre-authorized payments require authentication — **mandatory** |
| `allowInstallmentsMerge` | Boolean | When `true`, allows flexible installment options across multi-seller purchases |
| `blockPaymentSession` | Boolean | Controls whether shoppers can add credit cards in My Account |
| `paymentSystemToCheckFirstInstallment` | Boolean | Payment system ID for first-installment discount |

---

## Documentation

- [Tax Services Overview](./tax-services-overview.md)
- [Tax Services Specification](./tax-services-specification.md)
- [Tax Services Recipe](./tax-services-recipe.md)
- [Tax Services Reference Implementation](./tax-services-references.md)
