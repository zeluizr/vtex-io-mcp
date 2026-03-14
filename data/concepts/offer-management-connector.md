# Offer Management — Connector Integration Guide

> ⚠️ **Discontinued.** Offer Management has been replaced by [Offer Status](https://help.vtex.com/en/tutorial/status-de-anuncios-beta--2OE87wU26F7lApl99OdwvJ). This documentation is preserved for reference only.

Gives sellers visibility into the offer sending process to external channels (marketplaces). Connectors integrate with Offer Management to surface errors and sync status to sellers.

---

## Integration Steps

### 1. Create Channel

**POST** `/api/sent-offers/channels`

Called **once per marketplace** by the connector. Returns a `feedId` used in all subsequent calls.

> No public GET/PUT/DELETE endpoints — changes require a VTEX Support ticket.

### 2. Activate Feed

**POST** `/api/sent-offers/feeds`

Links a channel to a seller account. Called once per seller-channel pair (can be reactivated if deleted).

**`feedId` naming pattern:** `"seller" + "." + "channel's name"`

Examples: `vtex.netshoes`, `vtex.meli-premium`, `vtex.meli-classic`, `anymarket.b2w`

Available channels:
- Mercado Livre Classic
- Mercado Livre Premium
- Netshoes
- VTEX marketplaces

### 3. Open Interaction

**POST** `/api/sent-offers/feeds/{feedId}/skus/{skuId}/interactions`

Interactions represent processes around an offer. Lifecycle:

1. **Open** → start the process
2. **Create logs** → record all steps
3. **Close** → conclude (produces a result)

**Interaction origins:** `Catalog`, `Price`, `Inventory`

**Interaction results:**

| Result | Offer Status | Condition |
|---|---|---|
| `success` | `Synced` | No active errors on offer |
| `success` | `Unavailable` | Offer removed from trade policy |
| `failure` | `Error` | At least one failure interaction |
| `notification` | `Unavailable` | Offer discarded (inactive / not in trade policy) — send `"status":"unavailable"` |
| `processing` | `Sending` | Interaction open with `"context":"setup"` |

### 4. Create Logs

**POST** `/api/sent-offers/feeds/{feedId}/skus/{skuId}/interactions/{interactionId}/logs`

Granular steps within an interaction. Log types:

| Type | When to use |
|---|---|
| `success` | Concludes the interaction's goal (price/inventory/catalog update completed) |
| `information` | Visibility into intermediate steps (queue placement, API calls, requests/responses) |
| `warning` | Communication failures with retry (throttling, service unavailable) |
| `failure` | Errors that prevent offer from being sent/synced |

### 5. Close Interaction

**POST** `/api/sent-offers/feeds/{feedId}/skus/{skuId}/interactions/{interactionId}/close`

Finalizes the interaction. Result becomes `success`, `failure`, or `notification`.

---

## Error Handling

### Error Codes

Use **GET** `/api/sent-offers/search/errors` — the single source of truth for all error codes.

### External Codes (Connector-specific)

Extend base codes with a connector suffix:

```
internalCode + connectorCode
```

Example: base code `CTLG-005` (description error)
- `CTLG-005-001` — HTML not allowed in description
- `CTLG-005-002` — Description exceeds character limit

### Unmapped Errors

Use code `NTMAP-001` for unrecognized errors. Add the raw API response in the `evidence` field. Use hash-based deduplication to identify frequent unmapped errors for future codification.

---

## Feed Management

- **PUT** `/api/sent-offers/feeds/{feedId}` — Update feed (only trade policy and affiliate ID)
- **DELETE** `/api/sent-offers/feeds/{feedId}` — Deactivate feed (removes channel from UI; logs history preserved but offer data deleted from UI)

> When a channel integration is uninstalled, the connector must delete the feed. Reinstalling requires restarting the full integration from scratch.

---

## API Reference

| Endpoint | Method | Path |
|---|---|---|
| Create Channel | POST | `/api/sent-offers/channels` |
| Activate Feed | POST | `/api/sent-offers/feeds` |
| List Feeds | GET | `/api/sent-offers/feeds` |
| Update Feed | PUT | `/api/sent-offers/feeds/{feedId}` |
| Get Feed | GET | `/api/sent-offers/feeds/{feedId}` |
| Deactivate Feed | DELETE | `/api/sent-offers/feeds/{feedId}` |
| Open Interaction | POST | `/api/sent-offers/feeds/{feedId}/skus/{skuId}/interactions` |
| Get Interaction | GET | `/api/sent-offers/feeds/{feedId}/skus/{skuId}/interactions/{interactionId}` |
| Close Interaction | POST | `/api/sent-offers/feeds/{feedId}/skus/{skuId}/interactions/{interactionId}/close` |
| Create Log | POST | `/api/sent-offers/feeds/{feedId}/skus/{skuId}/interactions/{interactionId}/logs` |
| Get Log | GET | `/api/sent-offers/feeds/{feedId}/skus/{skuId}/interactions/{interactionId}/logs/{logId}` |
| Search Interactions | GET | `/api/sent-offers/search/interactions` |
| Search Errors | GET | `/api/sent-offers/search/errors` |
| Get Error Code | GET | `/api/sent-offers/error-codes/{errorCodeId}` |

---

## Documentation

- [External Marketplace Integration](./external-marketplace-integration.md)
- [External Marketplace Connector](./external-marketplace-connector.md)
