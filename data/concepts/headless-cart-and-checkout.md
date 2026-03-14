# Headless Commerce — Cart and Checkout

Complete checkout flow for headless stores using the Checkout API.

> ⚠️ New fields can be added in the Checkout API payload without previous warning.

---

## Shopping Cart (orderForm)

The `orderForm` is the central object for all cart/checkout operations. Key sections:
- `items` — SKUs in the cart
- attachments — profile, shipping, payment, marketing data

### Get or Create Cart

**GET** `/api/checkout/pub/orderForm`

Returns an `orderFormId`. In non-browser contexts (native app), save this ID and use it explicitly in all requests.

**GET** `/api/checkout/pub/orderForm/{orderFormId}` — Retrieve abandoned cart by ID.

### Cart Items

```json
"items": [
  {
    "id": "123",
    "quantity": 2,
    "seller": "1",
    "price": 10000
  }
]
```

### Cart Attachments

Attachments contain all non-item order data:

| Attachment | Description |
|---|---|
| `clientProfileData` | Customer name, email, document, phone |
| `shippingData` | Delivery address and selected SLA |
| `marketingData` | UTM, coupon codes |
| `paymentData` | Payment method and installments |
| `merchantContextData` | Merchant-specific context |

---

## Place Order

### Option 1 — Place New Order (all data in one request)

**PUT** `/api/checkout/pub/orders`

Send all `orderForm` data in a single request. Higher complexity — must manage all cart data client-side.

### Option 2 — Place Order from Existing Cart (recommended)

**POST** `/api/checkout/pub/orderForm/{orderFormId}/transaction`

Use a cart already built up in VTEX. Generally simpler and recommended.

---

## Order Privacy

When a cart is created, VTEX sets two cookies:
- `checkout.vtex.com` — contains `orderFormId`
- `CheckoutOrderFormOwnership` — starts empty; set after client profile data is added

Without `CheckoutOrderFormOwnership`, personal data (`clientProfileData`, `shippingData`) is **masked**.

### Add Client Profile

**POST** `/api/checkout/pub/orderForm/{orderFormId}/attachments/clientProfileData`

```json
{
  "email": "customer@example.com",
  "firstName": "Clark",
  "lastName": "Kent",
  "documentType": "cpf",
  "document": "123456789",
  "phone": "+55110988887777",
  "isCorporate": false
}
```

Sets `CheckoutOrderFormOwnership` cookie with encrypted profile data.

### Add Shipping Address

**POST** `/api/checkout/pub/orderForm/{orderFormId}/attachments/shippingData`

```json
{
  "selectedAddresses": [
    {
      "addressType": "residential",
      "postalCode": "12345-000",
      "city": "Rio de Janeiro",
      "state": "RJ",
      "country": "BRA",
      "street": "Praia de Botafogo",
      "number": "300"
    }
  ],
  "logisticsInfo": [
    {
      "itemIndex": 0,
      "selectedSla": "normal",
      "selectedDeliveryChannel": "delivery"
    }
  ]
}
```

---

## Complete Order (after placing)

After placing an order, you receive `orderId` and `transactionId`. You have **5 minutes** to complete the purchase or the order is auto-canceled as `incomplete`.

### 1. Send Payment Information

**POST** `/api/payments/transactions/{transactionId}/payments`

```json
[
  {
    "paymentSystem": 2,
    "installments": 1,
    "currencyCode": "BRL",
    "value": 75000,
    "referenceValue": 75000,
    "transaction": {
      "id": "72E84719BDF14B2FB170B38AD12598C9",
      "merchantName": "paymentsptas"
    }
  }
]
```

#### Retrieve Saved Credit Cards

**GET** `/api/checkout/pub/profiles?email={email}`

Returns `availableAccounts` array with masked card numbers (last 4 digits only).

### 2. Process Order

**POST** `/api/checkout/pub/gatewayCallback/{orderGroup}`

Call after payment is approved. Returns `500` if payment not yet approved.

---

## Verify Order Status

- **GET** `/api/oms/pvt/orders/{orderId}` — Get specific order
- **GET** `/api/oms/pvt/orders` — List orders
- Feed v3 / Hook — Subscribe to order updates

---

## Checkout UI Features

### Address Autofill

**GET** `/api/checkout/pub/postal-code/{countryCode}/{postalCode}`

### Pickup Points

**GET** `/api/checkout/pub/pickup-points` — List nearby pickup points by location

> ⚠️ reCAPTCHA does not work with headless checkout (only with Checkout v6).

---

## Documentation

- [Headless Commerce Overview](./headless-commerce-overview.md)
- [Headless Catalog](./headless-catalog.md)
- [Headless Profile Management](./headless-profile-management.md)
- [Checkout Overview](./checkout-overview.md)
