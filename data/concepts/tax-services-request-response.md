# Tax Services — Request and Response

Format of the request sent by VTEX Checkout to the external tax provider, and the expected response format.

---

## Tax Calculation Request

VTEX Checkout sends a `POST` request to the configured `taxConfiguration.url` endpoint whenever the cart changes.

The request `Content-Type` must be: `application/vnd.vtex.checkout.minicart.v1+json`

### Request Body Fields

| Field | Type | Description |
|---|---|---|
| `orderFormId` | string | `orderForm` ID |
| `salesChannel` | string | Trade policy ID |
| `items` | array | List of order products; `dockId` refers to the Logistics dock ID (contains address info) |
| `totals` | array | Total `orderForm` amounts divided into taxes, shipping, discounts, and item prices |
| `clientEmail` | string | Client's email address |
| `shippingDestinations` | array of objects | List of shipping information — **mandatory** |
| `clientData` | object | Client information (email, document, documentType, stateInscription) |
| `paymentData` | object | Payment info array (paymentSystem, bin, referenceValue, value, installments) |
| `taxApp` | object | Custom fields specific to the tax application (`id`, `major`, `fields`) |

### Request Body Example

```json
{
  "orderFormId": "e5098ad8c4jk490bb2f6f03400ac1413",
  "salesChannel": "1",
  "items": [
    {
      "id": "0",
      "sku": "26",
      "productId": "12",
      "ean": "12345678909123",
      "refId": "3432",
      "categoryId": "3",
      "unitMultiplier": 1,
      "measurementUnit": "un",
      "targetPrice": 8.2,
      "itemPrice": 8.2,
      "quantity": 1,
      "discountPrice": 0,
      "dockId": "1125a08",
      "freightPrice": 0,
      "brandId": "2000002",
      "taxCode": "PC040210",
      "sellerId": "1",
      "shippingDestinationId": 1
    }
  ],
  "totals": [
    { "id": "Items", "name": "Items Total", "value": 820 },
    { "id": "Discounts", "name": "Discounts Total", "value": 0 },
    { "id": "Shipping", "name": "Shipping Total", "value": 0 },
    { "id": "Tax", "name": "Tax Total", "value": 0 }
  ],
  "clientEmail": "client@email.com",
  "shippingDestinations": [
    {
      "id": 1,
      "country": "BRA",
      "state": "RJ",
      "city": "Rio de Janeiro",
      "neighborhood": "Botafogo",
      "postalCode": "22250-905",
      "street": "Praia Botafogo"
    }
  ],
  "clientData": {
    "email": "client@email.com",
    "document": "12345678909",
    "documentType": "cpf",
    "clientProfileData": "12345678000100",
    "stateInscription": "12345678"
  },
  "paymentData": {
    "payments": [
      {
        "paymentSystem": "2",
        "bin": null,
        "referenceValue": 820,
        "value": 820,
        "installments": null
      }
    ]
  },
  "taxApp": {
    "fields": {
      "isTradeIn": "Yes",
      "productuid": "15216842581",
      "taxBase": "1399.99"
    },
    "id": "tradeincart",
    "major": 1
  }
}
```

---

## Tax Provider Response

The external tax provider must return an **array of products**, each with its own array of taxes.

### Response Fields

| Field | Type | Description |
|---|---|---|
| `id` | string | Request item index — the SKU's position in the `items` array sent in the request |
| `taxes` | array | List of all tax types for the SKU |
| `name` | string | Tax name that will appear in checkout |
| `description` | string | Informative field — does not appear on the storefront |
| `value` | number | Absolute numeric value added to the original price |

### Response Example

```json
[
  {
    "id": "0",
    "taxes": [
      {
        "name": "TAX 1",
        "description": "Standard sales tax applied to the item.",
        "value": 3.48
      },
      {
        "name": "TAX 2",
        "description": "Special surcharge for environmental conservation.",
        "value": 22
      }
    ]
  }
]
```

In this example: item costs `10`, plus taxes `3.48 + 22 = 25.48`, total = **`35.48`**.

> If no taxes apply, return an empty array: `[]`

---

## Jurisdiction Fields (Avalara)

If using [Avalara](https://www.avalara.com) as the tax provider, response bodies can also include jurisdiction fields:

| Field | Type | Description |
|---|---|---|
| `jurisType` | string | Type of jurisdiction (State, County, City, etc.) |
| `jurisCode` | string | Unique code identifying the jurisdiction |
| `jurisName` | string | Name of the jurisdiction |

These fields are read by Checkout and added to the `priceTag`.

### Avalara Response Example

```json
{
  "id": "0",
  "taxes": [
    {
      "name": "NY STATE TAX: NEW YORK",
      "description": "Srixon Q-Star Tour Golf Balls - Dozen Yellow",
      "rate": 0.04,
      "value": 1.4,
      "jurisCode": "36",
      "jurisType": "State",
      "jurisName": "NEW YORK"
    },
    {
      "name": "NY COUNTY TAX: ERIE",
      "description": "Srixon Q-Star Tour Golf Balls - Dozen Yellow",
      "rate": 0.0475,
      "value": 1.66,
      "jurisCode": "029",
      "jurisType": "County",
      "jurisName": "ERIE"
    }
  ]
}
```

---

## Documentation

- [Tax Services Overview](./tax-services-overview.md)
- [Tax Services Specification](./tax-services-specification.md)
- [Tax Services Recipe](./tax-services-recipe.md)
