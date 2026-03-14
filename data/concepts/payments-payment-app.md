# Payment App

VTEX IO React app for custom payment experiences inside the checkout page — no external redirect.

> IO apps do not work in headless environments. For headless, use a checkout webview or direct acquirer integration.

---

## Use Cases

- Custom payment method via PPP without redirect
- 3D Secure 2 (3DS2) challenge
- Pix QR code display
- Physical store POS identification (VTEX Sales App)
- Analytics/conversion measurement for custom flows

---

## How It Works

The connector returns `paymentAppData` in the Create Payment response:

```json
{
  "status": "undefined",
  "paymentAppData": {
    "appName": "{vendor}.{appName}",
    "payload": "{\"key\":\"value\"}"
  }
}
```

Checkout UI instantiates the app with `appPayload` as props. When done, app triggers the `transactionValidation.vtex` browser event to close.

> If `transactionValidation.vtex` is never triggered, the order confirmation email will not be sent. Build a retry flow.

---

## Implementation

### Setup

```sh
git clone https://github.com/vtex-apps/example-payment-authorization-app.git
```

### manifest.json

- `name` — must exactly match `appName` in connector's `paymentAppData` response
- `billingOptions: { type: "free" }` — required

### pages/pages.json

Replace `example-payment-auth-app` with your app name. Path prefix `checkout/transactions/` must remain unchanged.

### Link for development

```sh
vtex link
```

### Deploy

Follow [Making your new app version publicly available](https://developers.vtex.com/docs/guides/vtex-io-documentation-making-your-new-app-version-publicly-available).

---

## Handling appPayload

```typescript
const { appPayload } = this.props // serialized JSON string
const data = JSON.parse(appPayload)
```

Fields in `appPayload` are defined by the associated connector developer.

---

## Closing the App

```javascript
respondTransaction = () => {
  $(window).trigger('transactionValidation.vtex')
}
```

Post-close behavior:
- `approved` or `undefined` → Order Placed screen
- `denied` or `canceled` → warning, back to payment selection

---

## Injecting External Scripts

```javascript
const head = document.getElementsByTagName('head')[0]
const js = document.createElement('script')
js.src = scriptUrl
js.async = true
js.defer = true
js.onload = callback
head.appendChild(js)
```

> For scripts that manipulate the DOM, use React Ref to create a container div.

---

## 3D Secure 2 (3DS2)

3DS2 can **only** be implemented via Payment App on VTEX (redirect URLs not supported for 3DS2).

Flow:
1. Connector returns `undefined` + 3DS2 Payment App data in Create Payment response
2. Checkout opens Payment App
3. App runs risk-based authentication with issuing bank
4. If high fraud risk → bank challenges customer (approve in banking app)
5. App closes → transaction proceeds or shows error

---

## Documentation

- [Payments — Purchase Flows](./payments-purchase-flows.md)
- [Payments — PPF](./payments-provider-framework.md)
- [Payments — PPP for POS](./payments-ppp-pos.md)
