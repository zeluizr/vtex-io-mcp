# VTEX Checkout API

## Description

The Checkout API allows you to obtain and configure information about the shopping cart and its attachments, personalization of custom fields, orderForm structure, fulfillment data, order management, and identification of the sellers delivery region.

**Important:** Data modification operations (`POST`, `PATCH`, `PUT`, `DELETE`) must NOT be performed in parallel. They need to be enqueued by the client/requester to avoid overwriting values or triggering concurrency errors.

**Important:** Endpoints that consult or edit the `orderForm` may require authentication depending on the customer context (complete profile vs. anonymous).

## Base URL

```
https://{accountName}.vtexcommercestable.com.br
```

## Authentication

| Header | Description |
|--------|-------------|
| `X-VTEX-API-AppKey` | API key identifier. |
| `X-VTEX-API-AppToken` | API key secret token. |

## Endpoints by Tag

### Shopping Cart

| Method | Path | Summary |
|--------|------|---------|
| `POST` | `/api/checkout/pub/orderForms/simulation` | Cart simulation |
| `GET` | `/api/checkout/pub/orderForm` | Get current or create a new cart |
| `GET` | `/api/checkout/pub/orderForm/{orderFormId}` | Get cart information by ID |
| `POST` | `/api/checkout/pub/orderForm/{orderFormId}/items` | Add cart items |
| `POST` | `/api/checkout/pub/orderForm/{orderFormId}/items/update` | Update cart items |
| `PATCH` | `/api/checkout/pub/orderForm/{orderFormId}/items` | Handle cart items |
| `POST` | `/api/checkout/pub/orderForm/{orderFormId}/items/removeAll` | Remove all items |
| `PUT` | `/api/checkout/pub/orderForm/{orderFormId}/items/{itemIndex}/price` | Change price |
| `GET` | `/api/checkout/pub/orderForm/{orderFormId}/installments` | Cart installments |

### Cart Attachments

| Method | Path | Summary |
|--------|------|---------|
| `GET` | `/api/checkout/pub/profiles` | Get client profile by email |
| `POST` | `/api/checkout/pub/orderForm/{orderFormId}/attachments/clientProfileData` | Add client profile |
| `PATCH` | `/api/checkout/pub/orderForm/{orderFormId}/profile` | Ignore profile data |
| `GET` | `/checkout/changeToAnonymousUser/{orderFormId}` | Remove all personal data |
| `POST` | `/api/checkout/pub/orderForm/{orderFormId}/attachments/shippingData` | Add shipping address and select delivery option |
| `POST` | `/api/checkout/pub/orderForm/{orderFormId}/attachments/marketingData` | Add marketing data |
| `POST` | `/api/checkout/pub/orderForm/{orderFormId}/attachments/paymentData` | Add payment data |
| `POST` | `/api/checkout/pub/orderForm/{orderFormId}/attachments/merchantContextData` | Add merchant context data |
| `POST` | `/api/checkout/pub/orderForm/{orderFormId}/coupons` | Add coupons to the cart |

### Custom Data

| Method | Path | Summary |
|--------|------|---------|
| `PUT` | `/api/checkout/pub/orderForm/{orderFormId}/customData/{appId}` | Set multiple custom field values |
| `PUT` | `/api/checkout/pub/orderForm/{orderFormId}/customData/{appId}/{appFieldName}` | Set single custom field value |
| `DELETE` | `/api/checkout/pub/orderForm/{orderFormId}/customData/{appId}/{appFieldName}` | Remove single custom field value |
| `PUT` | `/api/checkout/pub/orderForm/{orderFormId}/customFields` | Batch add custom fields |
| `PUT` | `/api/checkout/pub/orderForm/{orderFormId}/customFields/order` | Add order custom field |
| `PUT` | `/api/checkout/pub/orderForm/{orderFormId}/customFields/item/{itemId}` | Add item custom field |
| `DELETE` | `/api/checkout/pub/orderForm/{orderFormId}/customFields/item/{itemId}` | Remove item custom field |

### Configuration

| Method | Path | Summary |
|--------|------|---------|
| `GET` | `/api/checkout/pvt/configuration/orderForm` | Get orderForm configuration |
| `POST` | `/api/checkout/pvt/configuration/orderForm` | Update orderForm configuration |
| `GET` | `/api/checkout/pvt/configuration/window-to-change-seller` | Get window to change seller |
| `POST` | `/api/checkout/pvt/configuration/window-to-change-seller` | Update window to change seller |
| `POST` | `/api/checkout/pub/orderForm/{orderFormId}/messages/clear` | Clear orderForm messages |

### Fulfillment

| Method | Path | Summary |
|--------|------|---------|
| `GET` | `/api/checkout/pub/pickup-points` | List pickup points by location |
| `GET` | `/api/checkout/pub/postal-code/{countryCode}/{postalCode}` | Get address by postal code |

### Order Placement

| Method | Path | Summary |
|--------|------|---------|
| `POST` | `/api/checkout/pub/orderForm/{orderFormId}/transaction` | Place order from an existing cart |
| `PUT` | `/api/checkout/pub/orders` | Place order |
| `POST` | `/api/checkout/pub/gatewayCallback/{orderGroup}` | Process order |

### Region

| Method | Path | Summary |
|--------|------|---------|
| `GET` | `/api/checkout/pub/regions/{regionId}` | Get sellers by region or address |

## Key Request/Response Models

### Cart Simulation (POST /api/checkout/pub/orderForms/simulation)

Request body:
```json
{
  "items": [
    { "id": "12345", "quantity": 2, "seller": "1" }
  ],
  "country": "BRA",
  "postalCode": "12345-000",
  "geoCoordinates": [-47.924747, -15.832582],
  "allowedOutdatedData": ["inventoryData", "promotionData", "paymentData"]
}
```

Response includes: `items[]`, `totalizers[]`, `shippingData`, `paymentData`, `sellers[]`, `logisticsInfo[]`.

### orderForm Structure

The `orderForm` is the main Checkout data object representing the shopping cart. Key fields:
- `orderFormId` (string) — Cart unique identifier
- `items` (array) — Cart items with `id`, `quantity`, `seller`, `price`, `listPrice`
- `clientProfileData` (object) — Customer: `email`, `firstName`, `lastName`, `phone`, `document`
- `shippingData` (object) — Addresses and delivery options
- `paymentData` (object) — Payment methods and installments
- `totalizers` (array) — Order totals (Items, Shipping, Discounts, Tax)
- `value` (integer) — Grand total in cents
- `marketingData` (object) — UTM source/medium/campaign, coupon
- `customData` (object) — Custom app fields
- `messages` (array) — System messages

### Add Items (POST /api/checkout/pub/orderForm/{orderFormId}/items)

Request body:
```json
{
  "orderItems": [
    { "id": "2000177", "quantity": 1, "seller": "1" }
  ]
}
```

### Add Shipping Data

Request body:
```json
{
  "attachmentId": "shippingData",
  "address": {
    "addressType": "residential",
    "receiverName": "John Doe",
    "postalCode": "12345-000",
    "city": "São Paulo",
    "state": "SP",
    "country": "BRA",
    "street": "Av. Paulista",
    "number": "1000"
  },
  "logisticsInfo": [
    { "itemIndex": 0, "selectedSla": "Normal" }
  ]
}
```

## Integration Notes

- `orderFormId` is the cart/session ID — persist it on the client side
- For headless implementations, always pass the `orderFormId` as a cookie or header
- The `sc` query parameter sets the trade policy/sales channel
- Cart simulation does not require authentication (public endpoint)
- Use `allowedOutdatedData` in simulation to skip slow data lookups and improve performance

## Documentation

https://developers.vtex.com/docs/api-reference/checkout-api
