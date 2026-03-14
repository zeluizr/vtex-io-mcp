# Anti-fraud Provider Protocol

Integration protocol between VTEX and companies that provide anti-fraud services.

**Features:**
- Processing of synchronous and asynchronous risk analysis
- Webhook for status notification

---

## Endpoints

The anti-fraud provider must implement these endpoints:

| Endpoint | Description |
|---|---|
| `GET /manifest` | Returns connector capabilities and payment methods |
| `POST /pre-analysis` | Pre-authorization fraud analysis (optional) |
| `POST /transactions` | Main fraud analysis request |
| `GET /transactions/{id}` | Get transaction status |

---

## Transaction Flow

1. VTEX Gateway calls `POST /transactions` after payment authorization
2. Provider returns `status: "approved"`, `"denied"`, or `"undefined"` (async)
3. For async: provider calls webhook to notify final status

---

## Test Types

The Payment Provider Test Suite includes 6 anti-fraud test scenarios:

| Test | Description |
|---|---|
| `Authorize` | Synchronous approval |
| `Denied` | Synchronous denial |
| `AsyncApproved` | Asynchronous approval via webhook |
| `AsyncDenied` | Asynchronous denial via webhook |
| `HookApproved` | Approval via notification hook |
| `HookDenied` | Denial via notification hook |

### ID Suffix Pattern for Test Routing

VTEX routes test transactions to specific flows based on a suffix appended to the transaction ID. The suffix pattern determines which test scenario is triggered during homologation.

---

## Manifest

The `/manifest` endpoint must declare anti-fraud capabilities:

```json
{
  "paymentMethods": [...],
  "customFields": [...],
  "timing": {
    "hasSynchronousApproval": true
  }
}
```

---

## Documentation

- [Payments Overview](./payments-overview.md)
- [Payments — Homologation](./payments-homologation.md)
- [Payments — PPP Middleware](./payments-provider-middleware.md)
