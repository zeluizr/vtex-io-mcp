# reCAPTCHA — Implementation Guide

How to implement reCAPTCHA validation in headless storefronts and mobile apps that place orders via VTEX Checkout API.

---

## Implementation Flow

1. Obtain the appropriate reCAPTCHA key
2. Display the reCAPTCHA widget to the shopper using the key
3. Receive the token after the shopper solves the challenge
4. Send the token + key in the order placement request

---

## Step 1 — Getting the reCAPTCHA Key

### For Mobile Apps

1. Create a Google Cloud project
2. Create a Google Cloud API key ([Google docs](https://cloud.google.com/docs/authentication/api-keys))
3. Create a reCAPTCHA Enterprise key ([Google docs](https://cloud.google.com/recaptcha-enterprise/docs/create-key))
4. Get current Checkout settings: `GET /api/checkout/pvt/configuration/orderForm`
5. Register the key: `POST /api/checkout/pvt/configuration/orderForm` — add to `recaptchaKeys` array:

```json
{
  "recaptchaKeys": [
    {
      "clientId": "{id-of-your-recaptcha-key}",
      "clientSecret": "{your-google-cloud-api-key}",
      "projectId": "{id-of-your-google-cloud-project}",
      "label": "android-001",
      "score": "{recaptcha-score}"
    }
  ]
}
```

| Field | Description |
|---|---|
| `clientId` | ID of your reCAPTCHA key |
| `clientSecret` | Your Google Cloud API key |
| `projectId` | ID of your Google Cloud project |
| `label` | Human-readable name (e.g., `android-001`, `ios-001`) |
| `score` | Minimum reCAPTCHA score (optional) |

> ⚠️ For multiple platforms (Android + iOS), create one key per platform and register each as a separate object in `recaptchaKeys`.

**Finding your reCAPTCHA key**: `https://console.cloud.google.com/security/recaptcha?project={projectId}`

**Finding your Google Cloud API key**: `https://console.cloud.google.com/apis/credentials?project={projectId}`

### For Web-Based Storefronts

The key is returned by the Checkout API itself.

**Key types to use:**

| Key field | reCAPTCHA version |
|---|---|
| `recaptchaKey` | Checkbox (equivalent to v2) |
| `recaptchaKeyV3` | Score-based (equivalent to v3) |

#### orderForm Transaction Method

When reCAPTCHA is required, the Checkout API response includes:

```json
{
  "recaptchaKey": "5Lc5UOBTRDBDBLNo2iOCPG0q7JCUgHUerDIJEHR-",
  "recaptchaKeyV3": "6LfnCR8mAAAAAGfsca_MuJ4oXTWJWOJ4TkPFOXzT"
}
```

#### Place Order Method

If reCAPTCHA is required but not provided, you receive error `CHK0082`:

```json
{
  "fields": {
    "recaptchaKey": "5Lc5UOBTRDBDBLNo2iOCPG0q7JCUgHUerDIJEHR-",
    "recaptchaKeyV3": "6LfnCR8mAAAAAGfsca_MuJ4oXTWJWOJ4TkPFOXzT"
  },
  "error": {
    "code": "CHK0082",
    "message": "ReCAPTCHA necessário. Tente novamente passando o token reCAPTCHA junto com a chave fornecida."
  }
}
```

---

## Step 2 — Integrating reCAPTCHA on the Storefront

### Mobile Apps

- Android: [Google reCAPTCHA Enterprise for Android](https://cloud.google.com/recaptcha-enterprise/docs/instrument-android-apps)
- iOS: [Google reCAPTCHA Enterprise for iOS](https://cloud.google.com/recaptcha-enterprise/docs/instrument-ios-apps)

### Web-Based Storefronts

- **Checkbox (v2)**: use `recaptchaKey` as the `siteKey` when displaying the widget — [reCAPTCHA v2 docs](https://developers.google.com/recaptcha/docs/display)
- **Score-based (v3)**: integrate according to [reCAPTCHA v3 docs](https://developers.google.com/recaptcha/docs/v3)

> Recommendation: apply validation **after the payment selection step**, since reCAPTCHA requirement varies by payment method.

---

## Step 3 — Final Validation (Placing the Order)

After the shopper solves the challenge, include the token in the order placement request:

```json
{
  "recaptchaKey": "5Lc5UOBTRDBDBLNo2iOCPG0q7JCUgHUerDIJEHR-",
  "recaptchaToken": "03AERD8Xp5arKO6-vS76sxlAFIMqCQwHOp2XTKO..."
}
```

> ❗ Always send the **key that was used to display the solved challenge** in `recaptchaKey`, regardless of the reCAPTCHA version.

Works for both:
- `POST /api/checkout/pub/orderForm/{orderFormId}/transaction`
- `PUT /api/checkout/pub/orders`

---

## Handling Errors

The reCAPTCHA token is **valid for one attempt only**. On error, display the widget again to get a new token.

### orderForm Transaction Errors

| Status | Action |
|---|---|
| `500` (internal error) | Display widget again using `recaptchaKey` from latest updated `orderForm` |
| `403` (validation failed) | Error `CHK0082` returned — use the **new** `recaptchaKey` from the error response |

### Place Order Errors

| Status | Action |
|---|---|
| `500` (internal error) | Display widget again — reuse the same `recaptchaKey` |
| `403` (validation failed) | Error `CHK0082` returned — use the **new** `recaptchaKey` from the error response |

> Always use the **latest** `recaptchaKey` received — it may change between attempts.

---

## Documentation

- [reCAPTCHA Overview](./recaptcha-checkout-overview.md)
- [reCAPTCHA Applicable Cases](./recaptcha-applicable-cases.md)
