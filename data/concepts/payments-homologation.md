# Payment Provider Homologation

Final validation step before a connector goes live on VTEX.

---

## Test Suite App

Install from **Admin > Account Settings > Apps > App Store** → search "Payment Provider Test Suite".

### Service Information (fill in to start tests)

- **Service URL** — provider endpoint VTEX will call
- **Connector Name** — case-sensitive, max 16 alphanumeric chars; **cannot be changed after publishing**
- **X-VTEX-API-AppKey** — fill with `X-VTEX-API-AppKey`
- **X-VTEX-API-AppToken** — fill with `X-VTEX-API-AppToken`

Click **Check URL** → calls `GET /manifest` → activates switches for detected payment methods.

### Run Tests

Click **Run Tests**. All operations and errors are logged in the **Logs** box.

> Do **not** open a homologation ticket if Logs show any errors. Fix all issues first.

---

## Homologation Ticket

After clean test results, open a [VTEX Support ticket](https://help.vtex.com/en/tutorial/opening-tickets-to-vtex-support) with:

| Field | Description |
|---|---|
| **Connector Name** | Format: `"vendor.appname"` (e.g., `partnername.connector-partnername`) |
| **Partner contact** | Email for protocol update communications |
| **Production Service Provider Endpoint** | Base path for API calls (must respond at `{{serviceUrl}}/manifest`) |
| **Sandbox Service Provider Endpoint** | Base path for test mode calls |
| **Owner account** | VTEX account name for callback requests |
| **Allowed Accounts** | All accounts or specific accounts |
| **New Payment Method** | Flag if supporting a method not yet in VTEX Admin |
| **New Payment Method purchase flow** | Redirect or Payment App |

> For connectors processing credit/debit/co-branded cards, also attach the **AOC** (Attestation of Compliance — PCI-DSS).

**SLA: 30 days** — begins after MPA (Master Partner Agreement) submission.

---

## Homologation Not Required

A connector is **exempt** only when **all** conditions are met simultaneously:
- It is a PPF connector (VTEX IO)
- Only uses payment methods already on VTEX platform
- Installed locally, restricted to specific accounts
- Target account already uses an IO/PPF connector

---

## Documentation

- [Payments Overview](./payments-overview.md)
- [Integrating a New Payment Provider](./payments-integrating-new-provider.md)
- [Payments — PPF](./payments-provider-framework.md)
