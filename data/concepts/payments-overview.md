# Payments Integration Overview

VTEX's payment integration is built around the **Payment Provider Protocol (PPP)** — a public contract that defines how payment providers integrate with VTEX SmartCheckout.

## Core Concepts

| Concept | Description |
|---|---|
| **Payment Gateway** | Processes and routes payment transactions |
| **Payment Provider Protocol** | API contract for building payment connectors |
| **Anti-fraud Provider Protocol** | API contract for risk analysis integrations |
| **Giftcard Provider Protocol** | API contract for external gift card providers |
| **Giftcard Hub** | Central hub that connects gift card providers |
| **Purchase Flows** | Different transaction paths (synchronous, redirect, 3DS, etc.) |

## Payment Provider Integration

Payment providers implement a **connector** using the Payment Provider Protocol — a set of endpoints your service must expose so VTEX's Gateway can communicate with it.

### Integration steps

1. Understand the [Payment Provider Protocol](https://developers.vtex.com/docs/guides/payments-integration-payment-provider-protocol)
2. Develop the connector (implement all required endpoints from the Payment Provider Protocol API)
3. Test against VTEX's test suite
4. Ensure required security standards are met
5. Go live — provider becomes available to stores

### Required connector endpoints (Payment Provider Protocol API)

Your service must implement:
- `POST /payments` — Create payment
- `POST /payments/{paymentId}/cancellations` — Cancel payment
- `POST /payments/{paymentId}/refunds` — Refund payment
- `POST /payments/{paymentId}/settlements` — Settle payment
- `POST /payments/{paymentId}/inbound-request/{action}` — Inbound requests

### Payment Methods

VTEX supports:
- Credit card
- Debit card
- Bank invoice (boleto)
- PIX and local payment methods
- Gift cards
- Digital wallets
- Buy now pay later

### Purchase Flows

- **Synchronous** — Response returned immediately
- **Redirect** — Customer redirected to provider page
- **Callback** — Provider calls back asynchronously
- **3DS (3D Secure)** — Additional authentication step

## Anti-Fraud Provider Integration

Anti-fraud solutions perform risk analysis on payment transactions. Integration uses the **Anti-fraud Provider Protocol**.

### Required endpoints (Anti-fraud Provider Protocol API)

Your service must implement a set of endpoints defined in the protocol, enabling VTEX to:
- Send order data for risk analysis
- Receive risk scores and recommendations
- Notify status changes

## External Gift Card Integration

Gift cards are treated as a payment method on VTEX — transactions processed at Checkout. Two options:

| Option | Description |
|---|---|
| **Native VTEX Gift Cards** | Managed via the GiftCard API (`/giftcards`) |
| **External provider** | Implement Giftcard Provider Protocol → connect via Giftcard Hub |

### Giftcard Provider Protocol

Develop a middleware implementing the Giftcard Provider Protocol API endpoints, then register with the Giftcard Hub.

### Managing VTEX Native Gift Cards

```
GET  /api/giftcards/{giftCardId}         # Get gift card
POST /api/giftcards                      # Create gift card
POST /api/giftcards/{giftCardId}/credit  # Add credit
POST /api/giftcards/{giftCardId}/debit   # Debit amount
```

## Payments Configuration

After building an integration, configure it in the VTEX store:

- Create payment conditions (rules for when each provider/method is used)
- Configure payment methods available at checkout
- Set up installment rules
- Configure anti-fraud providers per payment condition

## Documentation

- [Platform Overview](./platform-overview.md)
- [Checkout Overview](./checkout-overview.md)
- [Orders Overview](./orders-overview.md)
- [Authentication](./authentication.md)
