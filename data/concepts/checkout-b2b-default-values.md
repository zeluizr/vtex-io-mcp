# Checkout — B2B Default Values

> ⚠️ Only available for stores using **B2B Buyer Portal** (currently available to select accounts).

Default values are purchase details (shipping addresses, billing addresses, credit cards, and B2B custom fields) pre-configured for an organizational unit so that checkout forms are completed automatically.

---

## How It Works

Two phases:

1. **Configuration phase** — Org admin defines which entities should be selected by default for each organizational unit (org unit, contract, or user)
2. **Consumption phase** — At buyer login, the shopper-session app fetches and resolves defaults, writes them to the shopper session, and checkout is pre-filled automatically

---

## Configuration Flow

### Create Default Values Document

**Endpoint:** `POST /api/dataentities/defaultValues/documents`

```json
{
  "id": "orgUnitId-123",
  "defaultValues": [
    { "entity": "address/shipping", "entityValueId": "ed30b8d1-3128-4b0c-be56-f55b79592248" },
    { "entity": "address/billing", "entityValueId": "230e441e-07b6-4740-9f7c-74666da3f682" },
    { "entity": "creditCard", "entityValueId": "EDE0B17747B24EFC9650B6C6B3E06C5F" },
    { "entity": "customFieldValues/poNumberFieldId", "entityValueId": "4498bd3d-7eaf-11f0-b37f-cc2298c87c12" }
  ]
}
```

**Response:**
```json
{
  "Id": "orgUnitId-123",
  "Href": "https://{accountName}.{environment}.com.br/api/dataentities/defaultValues/documents/orgUnitId-123",
  "DocumentId": "orgUnitId-123"
}
```

### Update Default Values

**Endpoint:** `PATCH /api/dataentities/defaultValues/documents/{unitId}`

### Custom Field Default Value Format

```json
{
  "entity": "customFieldValues/{customFieldSettingId}",
  "entityValueId": "{customFieldValueDocumentId}"
}
```

- `entity`: `customFieldValues/` + ID of the custom field setting
- `entityValueId`: DocumentId of the specific value to use as default

---

## Cleanup Flow

### Delete Default Values

**Endpoint:** `DELETE /api/dataentities/defaultValues/documents/{unitId}`

Use when:
- An organizational unit is removed
- Resetting all defaults for testing or reconfiguration
- Cleaning up deprecated data

---

## Permissions

| Endpoint | Required Resources |
|---|---|
| POST Create | Insert/update (not remove), Full access, or Master Data administrator |
| GET Get | Read-only, Insert/update (not remove), Full access, or Master Data administrator |
| PATCH Update | Insert/update (not remove), Full access, or Master Data administrator |
| DELETE Delete | Full access or Master Data administrator |

---

## Integration Notes

- Custom fields changes (name or value) after an order is placed are **not** reflected in existing orders
- Only custom fields of type `option` are supported for default value configuration — ensures value ID is used for matching
- Default values are consumed by the **shopper-session app** at buyer login

---

## Documentation

- [Checkout B2B Custom Fields](./checkout-b2b-custom-fields.md)
- [Checkout API Overview](./checkout-api-overview.md)
