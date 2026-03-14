# VTEX Payments Gateway API

## Description

The Payments Gateway API allows you to get payment data and process your store's transactions. It handles payment processing including authorization, settlement, refunds, and cancellations. It also manages payment affiliations (connections to payment providers) and payment rules (conditions for applying payment methods).

## Base URLs

- **Main gateway:** `https://{accountName}.vtexpayments.com.br`
- **Vault (tokenization):** `https://api.vtexvault.com`

Note: This API uses `vtexpayments.com.br` domain, different from most VTEX APIs.

## Authentication

Uses standard VTEX API key authentication:

| Header | Description |
|--------|-------------|
| `X-VTEX-API-AppKey` | API key identifier. |
| `X-VTEX-API-AppToken` | API key secret token. |

## Endpoints by Tag

### Installments

| Method | Path | Summary |
|--------|------|---------|
| `GET` | `/api/pvt/installments` | Get installments options |

### Configuration

| Method | Path | Summary |
|--------|------|---------|
| `GET` | `/api/pvt/affiliations` | List all affiliations |
| `POST` | `/api/pvt/affiliations` | Insert a new affiliation |
| `PUT` | `/api/pvt/affiliations/{affiliationId}` | Update affiliation by ID |
| `GET` | `/api/pvt/affiliations/{affiliationId}` | Get affiliation by ID |
| `GET` | `/api/pvt/rules` | List all payment rules |
| `POST` | `/api/pvt/rules` | Insert a new payment rule |
| `GET` | `/api/pvt/rules/{ruleId}` | Get payment rule by ID |
| `PUT` | `/api/pvt/rules/{ruleId}` | Update payment rule by ID |
| `DELETE` | `/api/pvt/rules/{ruleId}` | Delete payment rule by ID |
| `GET` | `/api/pvt/merchants/payment-systems` | List all available payment methods |
| `GET` | `/api/payments/pvt/account/{cardId}` | Get card data |

### Transaction Process

| Method | Path | Summary |
|--------|------|---------|
| `POST` | `/api/pvt/transactions` | Starts a new transaction |
| `POST` | `/api/pub/transactions/{transactionId}/payments` | Send payments information |
| `POST` | `/api/pvt/transactions/{transactionId}/additional-data` | Send additional data |
| `PATCH` | `/api/pvt/transactions/{transactionId}/additional-data` | Update additional data (optional) |
| `POST` | `/api/pvt/transactions/{transactionId}/authorization-request` | Authorize new transaction |
| `GET` | `/api/pvt/transactions/{transactionId}` | Get transaction details |
| `GET` | `/api/pvt/transactions/{transactionId}/payments/{paymentId}` | Get payment details |
| `GET` | `/api/pvt/transactions/{transactionId}/settlements` | Get transaction settlement details |

### Transaction Flow

| Method | Path | Summary |
|--------|------|---------|
| `POST` | `/api/pvt/transactions/{transactionId}/settlement-request` | Settle the transaction |
| `POST` | `/api/pvt/transactions/{transactionId}/refunding-request` | Refund the transaction |
| `POST` | `/api/pvt/transactions/{transactionId}/cancellation-request` | Cancel the transaction |

### Payment Notification

| Method | Path | Summary |
|--------|------|---------|
| `GET` | `/api/payments/pvt/payments/{paymentId}/payment-notification` | Send payment notification with payment ID |
| `POST` | `/api/payments/pvt/payments/{paymentId}/payment-notification` | Send payment notification with payment ID, date, and value paid |

## Key Request/Response Models

### Start Transaction (POST /api/pvt/transactions)

Request body:
```json
{
  "referenceId": "order-id-123",
  "softDescriptor": "My Store",
  "value": 15990,
  "currency": "BRL",
  "paymentSystemId": 6,
  "installments": 1,
  "paymentSystemName": "Visa"
}
```

### Send Payments Information (POST /api/pub/transactions/{transactionId}/payments)

Request body:
```json
[
  {
    "paymentSystem": 6,
    "paymentSystemName": "Visa",
    "installments": 3,
    "installmentsInterestRate": 0,
    "installmentsValue": 5330,
    "value": 15990,
    "referenceValue": 15990,
    "fields": {
      "holderName": "John Doe",
      "cardNumber": "4111111111111111",
      "validationCode": "123",
      "dueDate": "12/25"
    }
  }
]
```

### Get Transaction Details (GET /api/pvt/transactions/{transactionId})

Response includes:
- `id` (string) — Transaction ID
- `status` (string) — `"started"`, `"authorizing"`, `"authorized"`, `"settling"`, `"settled"`, `"refunding"`, `"refunded"`, `"cancelling"`, `"cancelled"`, `"voided"`, `"undefined"`
- `value` (integer) — Transaction value in cents
- `currency` (string) — Currency code
- `payments` (array) — Payment details
- `bankIssuedInvoice` (object) — Boleto data if applicable

### Installment Options (GET /api/pvt/installments)

Query params:
- `paymentSystem` — Payment system ID
- `value` — Order value in cents

Response:
```json
{
  "PaymentSystems": [
    {
      "Id": 6,
      "Name": "Visa",
      "GroupName": "creditCard",
      "Installments": [
        { "Count": 1, "InterestRate": 0, "Value": 15990, "Total": 15990 },
        { "Count": 3, "InterestRate": 0, "Value": 5330, "Total": 15990 },
        { "Count": 6, "InterestRate": 200, "Value": 2700, "Total": 16200 }
      ]
    }
  ]
}
```

## Payment System IDs (Common)

| ID | Name | Group |
|----|------|-------|
| 6 | Visa | creditCard |
| 3 | Amex | creditCard |
| 8 | Diners | creditCard |
| 2 | Mastercard | creditCard |
| 4 | Elo | creditCard |
| 202 | Boleto Bancário | bankInvoice |
| 125 | Pix | pix |

## VTEX IO Integration Notes

- In VTEX IO, payments are handled by the Checkout API during the cart → order flow
- Directly calling the Payments Gateway API from custom apps is uncommon
- For custom payment integrations, use the **Payment Provider Protocol** (separate API)
- When building checkout customizations, use the Checkout API's payment data attachment endpoint instead
- For reading transaction data in Node services, use the `VtexCommerce` client or the `PaymentsGateway` client from `@vtex/clients`

## Documentation

https://developers.vtex.com/docs/api-reference/payments-gateway-api
