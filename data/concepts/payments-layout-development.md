# Layout Development for Payment Methods

Customizing the visual presentation of payment methods in VTEX Checkout.

---

## Overview

Payment providers can customize the checkout UI for their payment methods — adding logos, input fields, instructional content, or custom interactions.

---

## Technology Stack

| Technology | Version | Usage |
|---|---|---|
| Bootstrap | v2.3.2 | Grid system, base components |
| LESS | — | CSS pre-processor for styles |

> The checkout UI is built on Bootstrap 2.3.2 (not a newer version). Target this specific version when designing layouts.

---

## Payment Mocker Tool

VTEX provides a **Payment Mocker** tool for development and testing of payment layouts. Use it to:

- Preview how a payment method will appear in checkout
- Test form interactions without processing real transactions
- Validate layout across different screen sizes

---

## Internationalization (i18n)

Payment method layouts must support multiple languages. Best practices:

- Never hardcode UI text — use translation keys
- Support at minimum: Portuguese (Brazil), English, Spanish
- Follow VTEX's i18n patterns for checkout customization

---

## Custom Payment Method Layouts

For custom payment methods (Promissory, Private Label, Co-Branded):

1. Define the layout in the payment connector configuration
2. Use Bootstrap grid classes for responsive design
3. Apply LESS stylesheets for custom branding
4. Test with Payment Mocker before homologation

---

## Documentation

- [Payments Overview](./payments-overview.md)
- [Payment Methods](./payments-methods.md)
- [Payments — Payment App](./payments-payment-app.md)
