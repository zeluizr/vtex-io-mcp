# Checkout — B2B Custom Fields

> ⚠️ Only available for stores using **B2B Buyer Portal** (currently available to select accounts).

The Custom Fields integration enables B2B stores to capture additional business-specific information during checkout, such as Cost Center, PO Number, or Location.

---

## Three Operations

1. **Custom field settings** — Define structure and behavior of custom fields for a contract
2. **Custom field values** — Create predefined values for fields of type `option`
3. **OrderForm application** — Apply custom field values to shopping carts during checkout

---

## Integration Flow

```
POST /customFieldSettings/documents   →  Define field (name, type, level, required)
POST /customFieldValues/documents     →  Create values (if type = option)
PUT  /orderForm/{id}/customFields/{entityType}/{entityId}  →  Apply to cart
```

---

## Create Custom Field Settings

**Endpoint:** `POST /api/dataentities/customFieldSettings/documents?_schema=v2`

```json
{
  "contractId": "2da4e9ab-050b-11f0-b37f-f4b136dbcce1",
  "name": "Cost Center",
  "enabled": true,
  "required": true,
  "level": "item",
  "type": "option"
}
```

**Response:**
```json
{
  "DocumentId": "89f1da93-6917-4cbf-894e-1f1399682826c"
}
```

---

## Get Custom Field Settings

**Endpoint:** `GET /api/dataentities/customFieldSettings/search?_schema=v2&_fields=_all&_where=contractId={contractId}`

---

## Create Custom Field Value

**Endpoint:** `POST /api/dataentities/customFieldValues/documents?_schema=v2`

```json
{
  "contractId": "2da4e9ab-050b-11f0-b37f-f4b136dbcce1",
  "customFieldId": "89f1da93-6917-4cbf-894e-1f1399682826c",
  "value": "CC1",
  "description": "Cost Center 1 - Marketing Department"
}
```

---

## Apply Custom Field to orderForm

**Endpoint:** `PUT /api/checkout/pub/orderForm/{orderFormId}/customFields/{linkedEntityType}/{linkedEntityId}`

```json
{
  "name": "Cost Center",
  "value": "CC3",
  "refId": "1dd9eeb8-23ed-42b3-8028-dc7745c01ada"
}
```

**Response:**
```json
{
  "customData": {
    "customFields": [
      {
        "linkedEntity": { "type": "item", "id": "B2949D0A45244825B177D2F9F96DC711" },
        "fields": [{ "name": "Cost Center", "value": "CC3", "refId": "..." }]
      }
    ]
  }
}
```

---

## Apply Custom Fields in Batch

**Endpoint:** `PUT /api/checkout/pub/orderForm/{orderFormId}/customFields`

```json
[
  {
    "linkedEntity": { "type": "order" },
    "fields": [{ "name": "PO Number", "value": "PO-2025-001" }]
  },
  {
    "linkedEntity": { "type": "item", "id": "B2949D0A45244825B177D2F9F96DC711" },
    "fields": [{ "name": "Cost Center", "value": "CC3" }]
  }
]
```

---

## Delete Custom Field from orderForm

**Endpoint:** `DELETE /api/checkout/pub/orderForm/{orderFormId}/customFields/{linkedEntityType}/{linkedEntityId}/{fieldName}`

---

## Field Levels and Types

| Level | Description | Examples |
|---|---|---|
| `order` | Entire order | PO Number, Project Code |
| `item` | Individual cart items | Cost Center, Budget Code |
| `address` | Specific shipping addresses | Delivery Instructions, Dock ID |

| Type | Description | Examples |
|---|---|---|
| `text` | Free-form text | Notes, reference numbers |
| `number` | Numeric values only | Quantities, numeric codes |
| `option` | Predefined list of values | Cost centers, departments |

> ⚠️ For **Budgets** integration, only `option` type is supported — the value ID is used for matching, so values can be renamed without breaking budget configurations.

---

## Required Permissions

| Operation | Required Resources |
|---|---|
| Create/Update settings or values | Insert or update documents (not remove), Full access, or Master Data administrator |
| Read settings or values | Read-only, Insert/update (not remove), Full access, or Master Data administrator |
| Delete | Full access or Master Data administrator |
| OrderForm operations | Read Shopping Cart (Checkout product) |

---

## Documentation

- [Checkout B2B Default Values](./checkout-b2b-default-values.md)
- [Checkout Custom Data](./checkout-custom-data.md)
- [Checkout API Overview](./checkout-api-overview.md)
