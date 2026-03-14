# Checkout Features Overview

Summary of configurable features available in VTEX Checkout.

---

## Feature Index

| Feature | Description | Key Config |
|---|---|---|
| **Manual Price** | Manually set the price of items in the cart | `allowManualPrice: true` in orderForm config |
| **Save User Data Opt-in** | Let customers choose whether to save personal/payment data | `savePersonalDataAsOptIn: true` in orderForm config |
| **Region for SKUs** | Show prices/availability based on buyer's region | Session update with postalCode or geoCoordinates |
| **Global Checkout** | Sell to multiple countries | CSS + carrier configuration |
| **reCAPTCHA** | Fraud prevention for checkout orders | `recaptchaValidation` in orderForm config |
| **Observation Field** | Capture additional order notes | `.note { display: block; }` in CSS |
| **Payment Discount** | Discount for paying with a specific payment method | `paymentSystemToCheckFirstInstallment` |
| **Custom Data** | Extra custom fields in orderForm | Apps configured via orderForm config |

---

## Enabling Features via orderForm Configuration

Most features are enabled via the same two-step flow:

1. `GET /api/checkout/pvt/configuration/orderForm` — retrieve current configuration
2. `POST /api/checkout/pvt/configuration/orderForm` — update with same body + desired changes

> ⚠️ Always send the **complete** orderForm configuration object in the POST request. Partial updates may overwrite existing settings.

---

## Documentation

- [Checkout API Overview](./checkout-api-overview.md)
- [Checkout Manual Price](./checkout-manual-price.md)
- [Checkout Save User Data](./checkout-save-user-data.md)
- [Checkout Region and Global](./checkout-region-and-global.md)
- [Checkout Payment Customization](./checkout-payment-customization.md)
- [reCAPTCHA in VTEX Checkout](./recaptcha-checkout-overview.md)
