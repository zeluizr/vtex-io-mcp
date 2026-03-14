# reCAPTCHA — Applicable Cases

When reCAPTCHA validation is and is not required in VTEX Checkout.

---

## vtexCriteria Mode

The `vtexCriteria` option uses an algorithm to determine which sessions are trustworthy. This reduces the application of reCAPTCHA validation, improving security with no conversion impact.

Recommended when using **checkbox validation** (equivalent to reCAPTCHA v2).

---

## Cases Where reCAPTCHA is NOT Required

Regardless of the `recaptchaValidation` configuration, reCAPTCHA verification will **not** be required in the following scenarios:

### 1. Fulfillment Orders (Marketplace)

Orders received through a marketplace where your store is responsible only for fulfillment. In this case, reCAPTCHA validation is applied at the **marketplace** according to its own configuration.

### 2. Authenticated Administrator Users

Orders made by authenticated admin users, including **call center / telesales users**.

### 3. Private API Endpoint

Orders placed through the **private (`/pvt`) placeOrder API endpoint**, commonly used by integrations authenticated with `appKey` and `appToken`.

### 4. Non-Card Payments

Orders where the payment method does **not** include a debit or credit card (e.g., bank invoice, Pix, custom payment methods).

---

## When reCAPTCHA IS Required

reCAPTCHA is potentially required when:

- Store uses native VTEX Checkout UI (already supported natively)
- Headless storefronts placing orders via Checkout API
- Mobile apps placing orders via Checkout API
- Customer pays with credit or debit card

---

## Integration Warning

> ❗ If you activate reCAPTCHA for your account, all integrations that place orders must handle reCAPTCHA validation. An order **cannot be placed** without validation if reCAPTCHA is required for it.

> ⚠️ In headless or API-based implementations, reCAPTCHA can only be completed by displaying the reCAPTCHA widget — it cannot be bypassed via API alone.

---

## Documentation

- [reCAPTCHA Overview](./recaptcha-checkout-overview.md)
- [reCAPTCHA Implementation Guide](./recaptcha-implementation.md)
