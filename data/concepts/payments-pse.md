# PSE — Pagos Seguros en Línea (Colombia)

PSE is a Colombian online bank transfer payment method. Integration guide for VTEX payment connectors.

---

## Overview

- PSE (Pagos Seguros en Línea) = "Secure Online Payments"
- Direct bank transfers in Colombia
- Customer selects their bank and completes payment via bank's interface
- Redirect-based flow (customer leaves checkout temporarily)

---

## bankCode Field

PSE requires the customer to select their bank. The selected bank is passed in the `metadata` field of the payment request:

```json
{
  "metadata": {
    "bankCode": "1022"
  }
}
```

The `bankCode` is the identifier for the customer's bank. Your Payment App or redirect flow must present a bank selector UI and capture this value before proceeding.

---

## Payment App Integration

PSE is typically implemented via **Payment App** to display the bank selector:

```json
{
  "status": "undefined",
  "paymentAppData": {
    "appName": "vendor.pse-connector",
    "payload": "{\"banks\": [{\"code\": \"1022\", \"name\": \"Banco de Bogotá\"}, ...]}"
  }
}
```

The Payment App renders the bank selection UI and then redirects to the bank's authentication page.

---

## Error Code

| Code | Description |
|---|---|
| `PSE_CUSTOM_APP_NOT_FOUND` | The Payment App declared in `paymentAppData.appName` is not installed or not found in the account |

If this error occurs, verify that:
1. The Payment App is published on the VTEX App Store
2. The app is installed on the merchant's account
3. The `appName` in the connector response matches exactly the app's `name` in `manifest.json`

---

## /manifest Declaration

```json
{
  "paymentMethods": [
    {
      "name": "PSE",
      "allowsSplit": "disabled"
    }
  ]
}
```

---

## Documentation

- [Payments Overview](./payments-overview.md)
- [Payments — Payment App](./payments-payment-app.md)
- [Payments — Purchase Flows](./payments-purchase-flows.md)
- [Payment Methods](./payments-methods.md)
