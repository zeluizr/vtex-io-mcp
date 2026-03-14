# Customer Credit Overview

Customer Credit enables credit payments through the VTEX checkout. Stores can control invoices and credit limits per client.

## Key Concepts

- **Credit account** — A credit account is created per customer, with a defined credit limit
- **Invoice** — Each credit purchase generates an invoice tied to the customer's account
- **Credit limit** — The maximum amount a customer can owe at any time

## Managing Customer Credit Accounts

Manage credit accounts via the **Customer Credit API**:

```
POST   /api/creditcontrol/accounts                          # Open a credit account
GET    /api/creditcontrol/accounts/{accountId}              # Get account by ID
GET    /api/creditcontrol/accounts?email={email}            # Get account by email
PATCH  /api/creditcontrol/accounts/{accountId}              # Update account (credit limit, status)
GET    /api/creditcontrol/accounts                          # List all accounts
POST   /api/creditcontrol/accounts/{accountId}/statements   # Add credit statement (manual adjustment)
GET    /api/creditcontrol/accounts/{accountId}/statements   # List statements for account
```

### Credit Account Fields

| Field | Description |
|---|---|
| `email` | Customer email — identifies the account at checkout |
| `creditLimit` | Maximum credit available to the customer |
| `balance` | Current available credit (creditLimit minus outstanding invoices) |
| `status` | `open` or `closed` |

## Managing Customer Credit Invoices

Each credit purchase generates an invoice. Manage invoices via the API:

```
GET    /api/creditcontrol/accounts/{accountId}/invoices                    # List invoices for account
GET    /api/creditcontrol/accounts/{accountId}/invoices/{invoiceId}        # Get invoice by ID
PATCH  /api/creditcontrol/accounts/{accountId}/invoices/{invoiceId}        # Update invoice (settle payment)
POST   /api/creditcontrol/accounts/{accountId}/invoices/{invoiceId}/partial-payments    # Register partial payment
```

### Invoice Lifecycle

```
Invoice created (on purchase)
  └── Outstanding (balance owed)
       └── Partial payment registered (optional)
            └── Settled (fully paid)
```

## Checkout Integration

When a customer with an active Customer Credit account checks out, the credit payment option appears automatically — no additional frontend configuration required.

## Documentation

- [Platform Overview](./platform-overview.md)
- [Checkout Overview](./checkout-overview.md)
- [Authentication](./authentication.md)
