---
title: 'Checkout - Overview'
id: helpcenter-checkout-overview
status: PUBLISHED
source: vtexdocs/help-center-content
originalPath: docs/en/tutorials/checkout/
---

The VTEX Checkout module handles the entire purchase flow from cart to order completion, including address entry, shipping selection, and payment processing.

## Checkout architecture

VTEX Checkout is a JavaScript application served at `/{account}.myvtex.com/checkout` (or your store domain at `/checkout`). It communicates with the Checkout API to manage the `orderForm` — the data structure containing all information about the current shopping session.

### OrderForm

The orderForm is the central data structure of checkout. It contains:

- **Items**: List of products in the cart with quantities and prices.
- **Client profile data**: Customer name, email, document number.
- **Shipping data**: Selected address and delivery method.
- **Payment data**: Selected payment methods and conditions.
- **Custom data**: Additional data attached by apps via the Checkout API.
- **Messages**: Validation messages from promotions and rules.

## Checkout customization in VTEX IO

### Using checkout-ui-custom

Install `vtex.checkout-ui-custom` to add custom CSS and JavaScript to the checkout without modifying core code:

```bash
vtex install vtex.checkout-ui-custom
```

### Custom checkout apps (checkout6-kuikpay)

For deeper customization, build a checkout app:

- Use the `react` builder with checkout-specific components.
- Extend the `vtex.checkout-ui-custom` interface.
- Use the Checkout API to modify orderForm data.

### Custom payment forms

Use the `vtex.payment-flags` or custom payment connector apps to display custom payment UI.

## Checkout API

The Checkout API manages the orderForm through a series of REST endpoints:

```
GET  /api/checkout/pub/orderForm/{orderFormId}
POST /api/checkout/pub/orderForm/{orderFormId}/items
POST /api/checkout/pub/orderForm/{orderFormId}/clientProfileData
POST /api/checkout/pub/orderForm/{orderFormId}/shippingData
POST /api/checkout/pub/orderForm/{orderFormId}/paymentData
POST /api/checkout/pub/orderForm/{orderFormId}/simulation
```

### Custom data in orderForm

Apps can store custom data in the orderForm using `customData`:

```
POST /api/checkout/pub/orderForm/{orderFormId}/customData/{appId}/{field}
```

## B2B checkout customization

For B2B scenarios:

- Use custom data fields to store purchase order numbers.
- Implement buyer-specific payment terms via custom payment conditions.
- Use session variables to pre-fill customer data from CRM/ERP systems.
- Restrict payment methods based on customer profiles from Master Data.

## Checkout settings in VTEX Admin

Access at **Store Settings > Checkout**:

- **Order authorization**: Configure rules requiring manual approval for specific orders.
- **Minimum order value**: Set minimum cart value.
- **Save user data opt-in**: Require customers to opt-in before saving card/address data.
- **reCAPTCHA**: Enable bot protection.
