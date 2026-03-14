# External Marketplace — Catalog Integration Logs

Connectors must expose a logs endpoint and follow standard log message codes for all catalog integration steps.

## Log Statuses

| Status | Description |
|---|---|
| **Success** | Exchange of messages between VTEX, connector, and marketplace completed successfully |
| **Error** | Communication error (500) or business error (400). For 500s: use contingency/reprocessing queue with at least 10 attempts; after limit exceeded, use DEADLETTER queue for infinite retrials |
| **Alert/Warning** | Exchange was processed but requires action from one of the systems involved |
| **Pending** | Exchange is in progress (SKUs in processing queue or awaiting async marketplace response) |

## Log Endpoint

Connectors must expose:

```
GET {urlBase}/{vtexaccount}/logs/
GET {urlBase}/logs/?DateAt=yyyy-mm-dd&status=all
GET {urlBase}/logs/?DateAt=yyyy-mm-dd&status=success,error
```

Response payload:

```json
{
  "Messages": [
    {
      "id": "13",
      "Operation": "",
      "Direction": "",
      "ContentSource": "",
      "ContentTranslated": "",
      "ContentDestination": "",
      "BusinessMessage": "",
      "Status": ""
    }
  ]
}
```

## Message Fields

| Field | Description |
|---|---|
| `id` | Unique operation log identifier |
| `Operation` | Type: Catalog change, Offer creation, Price update, Inventory update, Order status update, Invoice sending, Tracking code sending |
| `Direction` | Origin → destination (e.g., VTEX to Marketplace) |
| `ContentSource` | Original payload from the origin system |
| `ContentTranslated` | Connector's transformed/enriched message |
| `ContentDestination` | Original payload returned by the destination after processing |
| `BusinessMessage` | Human-readable error explanation and guidance on how to resolve |
| `Status` | `success`, `error`, `warning`, `pending` |

## Standard Log Message Codes

| Code | Event | User Message | Status | HTTP |
|---|---|---|---|---|
| **S1** | SKU registration sent to marketplace | SKU `{VTEXId + name}` was created with marketplace code `{marketplaceId}`. Link to SKU in marketplace. | Success | 201 |
| **A1** | SKU not returned in fulfillment simulation items | Check: trade policy association, carrier configuration, price associated with trade policy | Warning | 400 |
| **A2** | SKU is inactive in VTEX | Check: "Activate SKU" field in Catalog, image uploaded, carrier configuration, price for trade policy | Warning | 400 |
| **A3** | Missing field — standard value used | Standard values inserted for: `{list of FIELD and VALUE}` | Warning | 200 |
| **E1** | Data transformation error for marketplace format | Could not prepare SKU registration due to: `{list all errors}` | Error | 400 |
| **E2** | Marketplace API unavailable (registration) | `{marketplace name}` is unavailable. Will retry in a few minutes. | Error | 500 |
| **E3** | Marketplace rejected the registration (incorrect data) | Could not complete SKU registration due to: `{list all errors}` | Error | 400 |
| **E4** | Category mapping not found in mapper | Category `{name}` of SKU `{name + ID}` is not mapped. Access mapper to complete mapping: `{link}` | Error | 400 |
| **E5** | Mapper API unavailable | VTEX category mapping is unavailable. Will retry in a few minutes. | Error | 500 |

## Which Codes Apply to Each Step

| Integration Step | Log Codes |
|---|---|
| Initial product load | S1, A1, A2, A3, E1, E2, E3, E4, E5 |
| New product notification | S1, A1, A2, A3, E1, E2, E3, E4, E5 |
| Product updates | S1, A1, A2, A3, E1, E2, E3, E4, E5 |
| Price updates | S1, A1, A2, E1, E2, E3 |
| Stock updates | S1, A1, A2, A3, E1, E2, E3, E4, E5 |

## Documentation

- [External Marketplace — Catalog Integration](./external-marketplace-catalog-integration.md)
- [External Marketplace Integration](./external-marketplace-integration.md)
