# Custom Auto Capture Feature

Configuring automatic settlement/capture timing for payment connectors.

---

## Overview

By default, VTEX controls when settlements (captures) are triggered after authorization. The **Custom Auto Capture** feature allows connectors to expose capture timing options to store administrators via the Admin panel.

---

## Enabling Auto Capture Options

### PPF (PaymentProvider Framework)

In the `PaymentProvider` class configuration:

```typescript
usesAutoSettleOptions: true
```

This adds an **Auto Capture** dropdown to the Gateway Affiliation settings in Admin.

### manifest.json

The connector's manifest must declare the `autoSettleDelay` field:

```json
{
  "name": "YourConnectorName",
  "autoSettleDelay": {
    "minimum": "0",
    "maximum": "720"
  }
}
```

- `minimum`: Minimum hours before auto-capture (usually `"0"`)
- `maximum`: Maximum hours allowed (up to `"720"` = 30 days)

---

## Admin UI

When `usesAutoSettleOptions: true`, the Gateway Affiliation page shows:

- Dropdown: "Auto Capture"
- Options: Immediate, After anti-fraud analysis, Disabled, or custom delay

The store admin selects the desired capture behavior per payment condition.

---

## autoSettleDelay Field

The `autoSettleDelay` is specified in the connector's manifest and controls the delay (in hours) between payment authorization and automatic settlement.

| Value | Behavior |
|---|---|
| `0` | Capture immediately after authorization |
| `N` (hours) | Capture N hours after authorization |
| Disabled | Manual capture only |

---

## Use Cases

- **Physical goods**: Capture after shipping confirmation
- **Digital goods**: Capture immediately
- **Pre-orders**: Capture on release date
- **Anti-fraud**: Capture only after manual review

---

## Documentation

- [Payments Overview](./payments-overview.md)
- [Payments — PPF](./payments-provider-framework.md)
- [Payments — Purchase Flows](./payments-purchase-flows.md)
