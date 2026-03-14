# Checkout — Custom Data in orderForm

How to add and manage custom information in VTEX orders using the `customData` field in the `orderForm`.

Used when stores need to capture data not part of the default orderForm (e.g., gender, cell phone, age).

---

## Three-Step Flow

1. Create apps and fields via the configuration request
2. Use the API to record/update/query data
3. Find the data in the created order

---

## Step 1 — Create Apps and Fields

Use `POST /api/checkout/pvt/configuration/orderForm` (Update orderForm configuration) to create an app with custom fields.

> ⚠️ This call only needs to happen **once**. From that point, all orders in the account will contain the extra fields.

### Example — apps object in request body

```json
{
  "apps": [
    {
      "fields": ["gender", "age"],
      "id": "profile",
      "major": 1
    },
    {
      "fields": ["street"],
      "id": "address",
      "major": 1
    }
  ]
}
```

This creates:
- App `profile` with fields: `gender`, `age`
- App `address` with field: `street`

---

## Step 2 — Record/Update Data

### Set Single Custom Field Value

**Endpoint:** `PUT /api/checkout/pub/orderForm/{orderFormId}/customData/{appId}/{appFieldName}`

**Path parameters:** `orderFormId`, `appId`, `appFieldName`

**Example URL:** `.../customData/address/street`

**Request body:**
```json
{ "value": "Bourbon Street" }
```

### Set Multiple Custom Field Values

**Endpoint:** `PUT /api/checkout/pub/orderForm/{orderFormId}/customData/{appId}`

**Path parameters:** `orderFormId`, `appId`

**Example URL:** `.../customData/address`

**Request body:**
```json
{
  "street": "Bourbon Street",
  "number": "78",
  "postalCode": "11554"
}
```

### Response — customData object

```json
{
  "customData": {
    "customApps": [
      {
        "fields": {
          "street": "Bourbon Street",
          "number": "78",
          "postalCode": "11554"
        },
        "id": "address",
        "major": 1
      }
    ]
  }
}
```

---

## Step 3 — Find Data in Created Order

Use `GET /api/oms/pvt/orders/{orderId}` (Get Order API). The custom fields are inside the `customData` object of the order.

---

## Remove Single Custom Field Value

**Endpoint:** `DELETE /api/checkout/pub/orderForm/{orderFormId}/customData/{appId}/{appFieldName}`

**Example URL:** `.../customData/address/street`

---

## Error Codes

### Set single / Set multiple endpoints

| Status | Code | Message | Cause |
|---|---|---|---|
| 400 | `ORD002` | Invalid order form | `orderFormId` does not exist or is incorrect |
| 400 | `CHK0121` | Invalid app fields | `value` was not sent in the request |
| 404 | `CHK0090` | App id not found | `appId` does not exist |
| 404 | `CHK0091` | App key not found for id profile | `appFieldName` does not exist (single endpoint only) |

### Update orderForm configuration endpoint

| Status | Code | Message | Cause |
|---|---|---|---|
| 400 | `CHK0288` | Invalid configuration | Mandatory parameters not sent (`paymentConfiguration`, `requiresAuthenticationForPreAuthorizedPaymentOption`, `minimumQuantityAccumulatedForItems`) |

---

## Documentation

- [Checkout API Overview](./checkout-api-overview.md)
- [Checkout B2B Custom Fields](./checkout-b2b-custom-fields.md)
