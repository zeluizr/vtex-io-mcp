# Checkout — Payment Customization

CSS techniques for customizing payment method names, descriptions, and enabling the Observation field.

> ⚠️ Be careful with CSS or JavaScript changes in your store. Improper customization can compromise conversion rate and checkout security.

---

## Change Payment Method Name

Use the CSS [image-replacement](http://css-tricks.com/css-image-replacement/) technique.

---

## Change Payment Method Description

Add to your store's CSS:

```css
.bankInvoicePaymentGroup .payment-description {
  font-size: 0;
}
.bankInvoicePaymentGroup .payment-description:after {
  font-size: 13px;
  content: "{Text here}";
}
```

---

## Change Delivery Phase Name

```css
.shipping-data .accordion-toggle span {
  font-size: 0;
}
.shipping-data .accordion-toggle span:after {
  content: "{Text here}";
}
```

---

## Enable Observation Field

The **Observation** field allows capturing additional order information. Data entered populates the `openTextField` field, retrievable via Admin or Orders API.

Disabled by default. To enable, add this CSS rule via [Checkout UI Settings](https://developers.vtex.com/docs/guides/vtex-checkout-ui-settings) or Admin:

```css
.note {
  display: block;
}
```

The data is sent to the Order Management System and stored in the `openTextField` field.

---

## Set Payment Discount (paymentSystemToCheckFirstInstallment)

To apply a discount for a specific payment method at checkout:

1. Use `POST /api/checkout/pvt/configuration/orderForm` (Update orderForm configuration) to set the `paymentSystemToCheckFirstInstallment` property with the desired payment method ID.

2. To get the payment method ID: in Admin, go to **Payments > Settings > Payment Conditions** — the ID is shown on the right side.

3. After updating, simulate a cart to verify — check `installmentOptions` in `paymentData`:

```json
{
  "paymentData": {
    "installmentOptions": [
      {
        "paymentSystem": "6",
        "paymentName": "Boleto Bancário",
        "paymentGroupName": "bankInvoicePaymentGroup",
        "value": 10000,
        "installments": [
          {
            "count": 1,
            "hasInterestRate": false,
            "interestRate": 0,
            "value": 9000,
            "total": 9000
          }
        ]
      }
    ]
  }
}
```

---

## Documentation

- [Checkout Customization Guide](./checkout-customization-guide.md)
- [Checkout API Overview](./checkout-api-overview.md)
- [reCAPTCHA in VTEX Checkout](./recaptcha-checkout-overview.md)
