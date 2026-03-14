# Gift Card Overview

Gift cards in VTEX allow brands to manage loyalty programs, create refund vouchers, and accept physical gift cards in their online storefront.

## Integration Options

| Option | Description |
|---|---|
| **Native gift card provider** | Set up as a payment method in Admin — no development required |
| **External gift card provider** | Develop a middleware following the Gift Card Provider Protocol |

> Stores can activate **multiple gift card providers** simultaneously (e.g., native + two external providers).

---

## Native Gift Cards

- Configured as a payment method in the VTEX Admin
- Gift cards are created and managed in the Admin panel
- Customers can use them at checkout without any additional integration

**GiftCard API:**

```
GET    /api/giftcards                               # List gift cards
POST   /api/giftcards                               # Create gift card
GET    /api/giftcards/{giftCardId}                  # Get gift card by ID
GET    /api/giftcards/_search                       # Search gift cards
POST   /api/giftcards/{giftCardId}/transactions     # Create transaction on gift card
GET    /api/giftcards/{giftCardId}/transactions     # List transactions
GET    /api/giftcards/{giftCardId}/transactions/{transactionId}   # Get transaction
```

---

## External Gift Card Provider Protocol

To integrate a third-party gift card provider, implement the middleware endpoints defined by the **Gift Card Provider Protocol**. The protocol defines how VTEX communicates with the external provider at checkout.

Key operations the provider must support:
- List gift cards available for a customer
- Get gift card balance
- Pre-authorize a gift card payment
- Settle/capture the payment
- Cancel/void a transaction

---

## Documentation

- [Platform Overview](./platform-overview.md)
- [Payments Overview](./payments-overview.md)
- [Checkout Overview](./checkout-overview.md)
- [Authentication](./authentication.md)
