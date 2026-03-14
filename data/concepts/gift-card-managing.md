# Managing VTEX Gift Cards

Management of VTEX native gift cards via the **GiftCard API** (`/api/giftcards`).

---

## Creating a Gift Card

**POST** `/api/giftcards`

All gift cards created via API start with **balance = 0**. Balance must be added via transaction.

Request body

```json
{
  "relationName": "loyalty-program-test",
  "expiringDate": "2024-01-01T00:00:00",
  "caption": "Vtex Loyalty Test",
  "profileId": "92de2449-0e02-4ca9-a4aa-a09cc9d8f7ff",
  "restrictedToOwner": false,
  "currencyCode": "BRL",
  "multipleCredits": true,
  "multipleRedemptions": false
}
```

Response includes:
- `id` — gift card ID
- `redemptionToken` / `redemptionCode` — used to redeem the card
- `balance` — starts at 0
- `emissionDate` — creation date
- `transaction.href` — link to transactions endpoint

---

## Checking Gift Card Details

**GET** `/api/giftcards/{giftCardId}`

Returns current balance, redemption code, expiry date, and transaction href.

---

## Creating Transactions (Balance Changes)

**POST** `/api/giftcards/{giftCardId}/transactions`

Use `"operation": "Credit"` to add balance, `"operation": "Debit"` to remove balance.

> **Important:** Each transaction must use a unique `requestId` per gift card. Duplicate `requestId` values are silently ignored.

### Add balance (Credit)

```json
{
  "operation": "Credit",
  "value": 500,
  "description": "Opening balance",
  "redemptionToken": "COCW-OZYZ-BEXN-TIMU",
  "redemptionCode": "COCW-OZYZ-BEXN-TIMU",
  "requestId": "1"
}
```

### Remove balance (Debit)

```json
{
  "operation": "Debit",
  "value": 120,
  "description": "Payment of order 5555",
  "redemptionToken": "COCW-OZYZ-BEXN-TIMU",
  "redemptionCode": "COCW-OZYZ-BEXN-TIMU",
  "requestId": "2"
}
```

Response returns `cardId`, transaction `id`, and `_self.href`.

---

## Checking Transactions

### List all transactions

**GET** `/api/giftcards/{giftCardId}/transactions`

Returns array of transaction references (cardId, id, _self.href). Empty array for cards with no transactions.

### Get transaction details

**GET** `/api/giftcards/{giftCardId}/transactions/{transactionId}`

Returns:

```json
{
  "value": 58.0,
  "description": "Add 58 BRL",
  "date": "2023-08-22T22:16:23.297Z",
  "requestId": "10",
  "settlement": { "href": "..." },
  "cancellation": { "href": "..." },
  "authorization": { "href": "..." },
  "operation": "Credit"
}
```

---

## Cancelling a Transaction

**POST** `/api/giftcards/{giftCardId}/transactions/{transactionId}/cancellations`

Partially or fully cancels a transaction (credit or debit).

```json
{
  "value": 20,
  "requestId": "4"
}
```

Response returns `oid`, `value`, and `date` of the cancellation.

> **Balance effect:**
> - Cancelling a **debit** → amount is **credited** back
> - Cancelling a **credit** → amount is **debited**

---

## API Summary

| Operation | Method | Endpoint |
|---|---|---|
| Create gift card | POST | `/api/giftcards` |
| Get gift card | GET | `/api/giftcards/{giftCardId}` |
| Create transaction | POST | `/api/giftcards/{giftCardId}/transactions` |
| List transactions | GET | `/api/giftcards/{giftCardId}/transactions` |
| Get transaction | GET | `/api/giftcards/{giftCardId}/transactions/{transactionId}` |
| Cancel transaction | POST | `/api/giftcards/{giftCardId}/transactions/{transactionId}/cancellations` |

---

## Documentation

- [Gift Card Overview](./gift-card-overview.md)
- [Gift Card Architecture](./gift-card-architecture.md)
