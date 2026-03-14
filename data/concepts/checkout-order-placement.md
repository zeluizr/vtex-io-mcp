# Checkout — Order Placement

How to create and place orders via the VTEX Checkout API.

---

## Two Methods

| Method | Description |
|---|---|
| **From existing cart** | Uses an existing `orderForm` — cart already has items and payment info |
| **Direct order placement** | Creates and places the order in a single request |

---

## Place Order from Existing Cart

**Endpoint:** `POST /api/checkout/pub/orderForm/{orderFormId}/transaction`

Use this when the shopper has an existing shopping cart (`orderForm`) and you want to convert it to an order.

Flow:
1. Cart (`orderForm`) already exists with items
2. Payment method has been selected
3. Call `POST` to create the transaction
4. Call `POST /api/checkout/pub/gatewayCallback/{orderGroup}` to process payment (if needed)

---

## Place Order (Direct)

**Endpoint:** `PUT /api/checkout/pub/orders`

Requires passing all order information in a single request body. Used by integrations that build the full order payload independently.

---

## Process Order

**Endpoint:** `POST /api/checkout/pub/orders/{orderId}/transactions/{transactionId}/payments`

Triggers payment processing for a placed order.

---

## reCAPTCHA Handling

When placing orders via Checkout API, reCAPTCHA validation may be required. If the order requires reCAPTCHA but it is not provided:

- Error `CHK0082` is returned with a `recaptchaKey` in the `fields` object
- Display the reCAPTCHA widget to the user
- Retry the request including `recaptchaKey` and `recaptchaToken`

See [reCAPTCHA Implementation](./recaptcha-implementation.md) for details.

---

## Order Timing Warning

After placing an order, the buyer has **5 minutes** to complete payment. If payment is not completed within this window, the order is automatically canceled as `incomplete`.

---

## Documentation

- [Checkout API Overview](./checkout-api-overview.md)
- [reCAPTCHA Implementation](./recaptcha-implementation.md)
- [Checkout Custom Data](./checkout-custom-data.md)
