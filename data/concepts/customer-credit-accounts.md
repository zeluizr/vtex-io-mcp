# Customer Credit — Managing Accounts

Manage Customer Credit accounts via the Customer Credit API.

## Account Fields

| Field | Description |
|---|---|
| `id` | Account identifier (e.g., `55555555555_CPF` for API-created, UUID for Admin-created) |
| `email` | Customer email — used to identify account at checkout |
| `document` / `documentType` | Customer document (CPF, CNPJ, etc.) |
| `creditLimit` | Maximum credit amount |
| `tolerance` | Extra credit allowed above limit (decimal — `0.30` = 30%) |
| `balance` | Current balance (negative = debit) |
| `availableCredit` | Credit available to use |
| `preAuthorizedCredit` | Credit reserved for pre-authorized transactions |
| `availableBalance` | Available balance |
| `status` | `Open` or `Closed` |

> **Account ID format:** Created via API → `{document}_{documentType}` (e.g., `55555555555_CPF`). Created via Admin → random UUID.

---

## Create Account

```
POST /api/creditcontrol/accounts
```

```json
{
  "document": "55555555555",
  "documentType": "CPF",
  "email": "customer@test.com",
  "creditLimit": "3000",
  "tolerance": "0.05"
}
```

All accounts are created with `status: "Open"`.

---

## Get Account

```
GET /api/creditcontrol/accounts/{creditAccountId}    # By ID
GET /api/creditcontrol/accounts?email={email}        # By email
```

---

## Search All Accounts

```
GET /api/creditcontrol/accounts
GET /api/creditcontrol/accounts?from={int}&to={int}      # Pagination
GET /api/creditcontrol/accounts?status={Open|Closed|Cancelled}
GET /api/creditcontrol/accounts?email={string}
```

> Returns only the first 20 records if no query params are used and the store has more than 20 accounts.

---

## Update Account

### Update email, document, or documentType

```
PUT /api/creditcontrol/accounts/{creditAccountId}
```

```json
{
  "email": "newemail@test.com",
  "document": "44444444",
  "documentType": "CPF"
}
```

> **Warning:** Always include `id`, `document`, and `documentType` — omitting them removes those fields from the account. This endpoint can also update `creditLimit` and `tolerance`.

### Change Credit Limit

```
PUT /api/creditcontrol/accounts/{creditAccountId}/creditlimit
```

```json
{ "value": 5300 }
```

### Change Tolerance

```
PUT /api/creditcontrol/accounts/{creditAccountId}/tolerance
```

```json
{ "value": 0.15 }
```

`0.15` = 15% tolerance above the credit limit.

---

## Account Statements

Track all operations on an account (credit limit changes, tolerance changes, invoice creation, invoice payment).

```
GET /api/creditcontrol/accounts/{creditAccountId}/statements
```

### Statement Origins

| `origin` | Description |
|---|---|
| `Credit` | Credit limit or tolerance modification |
| `Invoice` | Purchase made with customer credit |
| `Payment` | Invoice settled by customer |

### Statement Value Calculation

- **Credit limit change:** `value` = (amount changed) × (1 + tolerance). Example: reducing by 1000 with 10% tolerance → `value: -1100`
- **Tolerance change:** `value` = (new % - old %) × creditLimit. Example: increasing from 0% to 25% on 5000 limit → `value: 1250`
- **Invoice:** `value` = negative purchase amount; `metadata.orderId`, `metadata.transactionId`, `metadata.numberOfInstallments`
- **Payment:** `value` = positive settled amount; `metadata.transactionId`, `metadata.installment`

---

## Account Holders (Credit Sharing)

Share the credit of one account among multiple customers (dependents). All holders share the same credit pool — combined purchases cannot exceed the account's available credit.

### Add Holder

```
POST /api/creditcontrol/accounts/{creditAccountId}/holders
```

```json
{
  "claims": {
    "email": "dependent@test.com"
  }
}
```

Returns `level: 2` for dependents (level 1 = account owner).

### Remove Holder

```
DELETE /api/creditcontrol/accounts/{creditAccountId}/holders/{holderId}
```

---

## Close Account

```
DELETE /api/creditcontrol/accounts/{creditAccountId}
```

Returns the account with `status: "Closed"`.

> **Warning:** Closing an account is **irreversible** — all invoices, statements, and holder data are deleted. A new account can be opened for the same email afterward.

---

## Documentation

- [Customer Credit Overview](./customer-credit-overview.md)
- [Customer Credit — Managing Invoices](./customer-credit-invoices.md)
- [Authentication](./authentication.md)
