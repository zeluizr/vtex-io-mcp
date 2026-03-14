# Payment Purchase Flows

Three purchase flow types available on VTEX.

---

## Transparent

Customer fills in payment data directly in SmartCheckout without leaving the store. Most common flow — best conversion.

---

## Redirect

Customer confirms payment in VTEX Checkout → redirected to `paymentURL` (external page) → fills in payment info → redirected back to `returnURL` (order confirmation).

Flow:
1. Customer clicks Finish Payment
2. Checkout → Gateway: Start Transaction
3. Gateway → Provider: `POST /payments`
4. Provider returns `status: "undefined"` + `paymentURL`
5. Checkout redirects customer to `paymentURL`
6. Customer interacts with provider's page
7. Provider captures input → calls `callbackURL` with `approved`/`denied`
8. Provider redirects customer to `returnURL`

> `paymentURL` must be a complete URL including endpoint path and payment-specific code.
> Least recommended — highest friction and lowest conversion.

---

## Payment App

Custom payment experience rendered inside the checkout page (no external redirect). Built with VTEX IO React.

Used for: Pix QR codes, 3D Secure 2 challenges, custom authorization flows, physical store POS interactions.

Flow (after standard checkout steps):
1. Gateway → Connector: `POST /payments`
2. Connector returns `status: "undefined"` + `paymentAppData: { appName, payload }`
3. Checkout UI instantiates the Payment App with `appPayload`
4. Customer interacts with the app
5. App triggers `transactionValidation.vtex` browser event to close
6. Checkout checks transaction status → Order Placed (if `approved`/`undefined`) or warning (if `denied`/`canceled`)

> Physical store connectors (VTEX Sales App) **must** use Payment App.
> IO apps do not work in headless environments.

---

## Operations in the Payment Flow

### Authorization

Gateway sends `POST /payments`. If provider can't process immediately, returns `undefined`. System retries asynchronously for **7 days**.

Breaking the retry cycle:
- **Without VTEX IO**: Provider calls `callbackURL` `/notification` endpoint with final status
- **With VTEX IO**: Provider calls `callbackURL` `/retry` endpoint → Gateway makes a new `POST /payments` to get updated status

#### Callback URL

Contains `X-VTEX-signature` parameter (max 32 chars) as a security token to verify the request originated from VTEX. Use the callback URL exactly as received.

#### Mode-Off

Activates when VTEX detects >5 errors in 5 minutes from a provider. Retains async transactions in `authorizing` status for ~2 hours / up to 2000 requests. Automatically deactivates when provider recovers.

### Cancellation / Refund

| Scenario | VTEX calls |
|---|---|
| Payment approved + settled, then canceled | `POST /refunds` (partial refunds supported) |
| Payment approved, not yet settled, canceled | `POST /cancellations` |
| Payment not approved | `POST /cancellations` |

If provider returns `undefined` on cancellation, retried for **1 day**.

### Settlement (Capture)

Gateway calls `POST /settlements` after authorization. Retried for **1 day** if not immediately authorized. Failure after 1 day → payment canceled.

---

## Communication Types

| Type | Description | Examples |
|---|---|---|
| Synchronous | Response returned immediately | Credit card |
| Asynchronous | VTEX waits days for approval | Boleto, Pix, physical POS |

Providers must handle **multiple repeated requests** to `/payments`, `/cancellations`, and `/settlements`.

---

## Documentation

- [Payments Overview](./payments-overview.md)
- [Payments — Payment App](./payments-payment-app.md)
- [Payments — PPP for POS](./payments-ppp-pos.md)
