# Checkout — Save User Data Opt-in

The **Save User Data opt-in** allows customers to choose whether the store should save their personal and payment data for future orders. Built for GDPR and LGPD compliance.

> ⚠️ Only available for **Checkout v6**.

---

## Activation

1. `GET /api/checkout/pvt/configuration/orderForm` — get current config
2. `POST /api/checkout/pvt/configuration/orderForm` — update with same data, changing `savePersonalDataAsOptIn` from `null` to `true`
3. `GET /api/checkout/pvt/configuration/orderForm` — confirm activation (look for `savePaymentData` and `savePersonalData` fields under `clientPreferencesData` in the `orderForm`)

> ℹ️ The `saveUserData` field under `storePreferencesData` may show as `true` — this is kept for backwards compatibility only and is ignored.

---

## Checkout Behavior After Activation

Users see checkboxes on the Checkout page:

### Personal Data Checkbox

Appears in the Contact Information section. Customer can choose whether to save personal data.

> ℹ️ Previously, this checkbox was shown by modifying the CSS `.save-data` element's `display` property. With the opt-in enabled, the CSS method is no longer recommended.

### Payment Data Checkbox

Appears in the Payment section. **Only shown if the user has already selected to save personal data.**

### Two-Card Payments

If the customer pays with two cards, selecting "save payment data" saves both cards. There is no option to save only one.

---

## Documentation

- [Checkout API Overview](./checkout-api-overview.md)
- [Checkout Features Overview](./checkout-features-overview.md)
