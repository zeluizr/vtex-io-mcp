# Gift Card System Architecture

## Overview

```
External Gift Card Provider
        ↕ (Gift Card Provider Protocol)
     Middleware
        ↕
   Gift Card Hub  ←→  Gift Card Hub API
        ↕
   VTEX Store / Checkout

VTEX Native Gift Card Provider
        ↕ (Gift Card API)
   Gift Card Hub
```

The **Gift Card Hub** manages multiple gift card providers connected to a store — both native and external — through a single interface.

---

## Components

### Gift Card Hub

The system providing a unified interaction layer between gift card providers and VTEX stores. All providers (native and external) are managed through the **Gift Card Hub API**.

```
GET  /giftcardproviders                           # List all connected providers
GET  /giftcardproviders/{giftCardProviderID}      # Get provider details
POST /giftcardproviders/{giftCardProviderID}      # Add/configure provider
DELETE /giftcardproviders/{giftCardProviderID}    # Remove provider

# Operations via Hub (provider-agnostic)
GET  /giftcards                                   # List gift cards across providers
GET  /giftcards/{giftCardID}                      # Get gift card
POST /giftcards/{giftCardID}/credit               # Add credit
POST /giftcards/{giftCardID}/debit                # Debit
```

### Gift Card Provider Protocol

The communication standard that gift card providers must follow to integrate with Gift Card Hub. External providers must expose **11 endpoints** via a middleware:

| Endpoint | Description |
|---|---|
| `GET /giftcards` | List all gift cards for a customer |
| `GET /giftcards/{giftCardID}` | Get a specific gift card |
| `POST /giftcards` | Create a gift card |
| `GET /giftcards/{giftCardID}/transactions` | List transactions |
| `POST /giftcards/{giftCardID}/transactions` | Create a transaction (pre-auth) |
| `GET /giftcards/{giftCardID}/transactions/{transactionID}` | Get transaction details |
| `POST /giftcards/{giftCardID}/transactions/{transactionID}/cancellations` | Cancel transaction |
| `POST /giftcards/{giftCardID}/transactions/{transactionID}/settlements` | Settle/capture transaction |
| `GET /giftcards/_search` | Search gift cards |

### VTEX Native Gift Card Provider

The native provider bundled with every VTEX store. The **Gift Card API** is its implementation of the Gift Card Provider Protocol.

> **Note:** The `VtexGiftCard` provider predates the Gift Card Hub architecture and should **not** be used as a reference implementation of the Gift Card Provider Protocol.

---

## API Comparison

| API | Purpose |
|---|---|
| **Gift Card API** | Manage VTEX native gift cards directly |
| **Gift Card Hub API** | Provider-agnostic interface — manages any connected provider (native or external) |
| **Gift Card Provider Protocol** | Standard that external provider middlewares must implement |

For most operations, prefer the **Gift Card Hub API** as it works across all providers without being tied to the native implementation.

## Documentation

- [Gift Card Overview](./gift-card-overview.md)
- [Payments Overview](./payments-overview.md)
- [Authentication](./authentication.md)
