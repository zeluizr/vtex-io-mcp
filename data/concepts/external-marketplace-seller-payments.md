# External Marketplace — External Seller Processing Payments

By default, payments in a marketplace are processed by the marketplace — no development needed from the seller. However, sellers can also process payments if agreed with the marketplace and payment provider.

## Payment Processing Options

| Option | Development Required |
|---|---|
| **Marketplace processes payments** | None from the seller |
| **External seller processes payments** | Seller follows the setup below |

## Split Payments

Marketplace orders may contain items from multiple sellers, paid in a unified checkout at the marketplace storefront. Two split models:

- **Transaction Split** — external sellers process their portion of the payment
- **Payout Split** — marketplace processes the full payment and transfers the seller's amount (inside or outside VTEX)

---

## Seller Setup (to Process Payments)

### Step 1 — Create a Gateway Account

Sellers need a VTEX **Gateway account** to process payments, even if their store is not hosted on VTEX. The marketplace requests this account on behalf of the seller for a fixed monthly fee (no variable billing).

**Request via email** — include: account name, responsible user name, responsible user email.

| Region | Email | Monthly Fee |
|---|---|---|
| Brazil | `sales-ops-br@vtex.com.br` | R$ 750,00 |
| Europe | `sales-operations@vtex.com` | EUR 250 |
| US and LatAm | `sales-operations@vtex.com` | USD 250 |

---

### Step 2 — Configure Gateway Affiliations

A gateway affiliation represents the seller's contract with a payment gateway. VTEX has native affiliations that can be enabled directly.

**Via Admin** (Gateway account):
1. **Payments > Settings > `+`** to view available affiliations
2. Select an affiliation, enter contract data from the chosen gateway, save

**Via API:**

```
GET /api/pvt/affiliations    # List configured affiliations
POST /api/pvt/affiliations   # Configure affiliation
```

> If native affiliations don't suit the seller's needs, a custom gateway can be developed using the **Payment Provider Protocol**.

---

### Step 3 — Set Up Payment Conditions and Anti-fraud

**Payment conditions** define which payment methods are accepted and under what rules.

**Via Admin:** Payments > Payment Conditions

**Via API:**

```
GET  /api/pvt/rules    # List payment rules
POST /api/pvt/rules    # Create payment rule (include antifraud object for anti-fraud config)
```

**Anti-fraud** can be configured in the Admin (Payments > Anti-fraud) or via the `antifraud` object in the Insert Rule endpoint.

---

## Wrapping Up

After completing these steps, send the **Gateway account name** to the marketplace so it can be linked to the seller's registration in the marketplace connector.

## Documentation

- [External Marketplace — Architecture](./external-marketplace-architecture.md)
- [External Marketplace — VTEX Seller Setup](./external-marketplace-seller-setup.md)
- [External Marketplace — Marketplace Setup](./external-marketplace-marketplace-setup.md)
- [Payments Overview](./payments-overview.md)
