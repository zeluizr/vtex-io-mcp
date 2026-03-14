# Managing Tokenized Cards

Guide for merchants and connectors managing card tokens in VTEX's CTV (Card Token Vault).

---

## Overview

VTEX stores card tokens in the CTV (Card Token Vault) linked to customer profiles. Merchants can query, manage, and import tokens via the VTEX Admin or APIs.

---

## Querying Token Data

Use the **Get card data** endpoint to retrieve token information:

```
GET /api/checkout/pvt/cardData/{token}
```

Response includes:
- Masked card number (last 4 digits)
- Card brand (Visa, Mastercard, etc.)
- Expiry date
- Associated customer profile
- Token status (active/inactive)

> Requires `VtexIdclientAutCookie` or appKey/appToken with appropriate permissions.

---

## Importing Tokens in Bulk

Tokens can be imported to the CTV via an `.XLSX` file upload:

1. Navigate to **Admin > Payments > Card Token Vault** (or the equivalent path)
2. Download the template `.XLSX` file
3. Fill in token data (token value, card info, customer association)
4. Upload the completed file
5. VTEX processes and imports the tokens

### Use case

Bulk import is typically used when:
- Migrating from another payment platform that stored tokens
- Importing tokens from a third-party CTV
- Restoring tokens after a platform migration

---

## Token Lifecycle

| Status | Description |
|---|---|
| **Active** | Token can be used for new transactions |
| **Expired** | Token linked to an expired card; cannot be used |
| **Revoked** | Manually or automatically deactivated |

---

## Customer-Facing Management

Customers can manage their saved cards in:
- VTEX Checkout ("My Saved Cards")
- Customer profile area (if implemented by the store)

Actions available to customers:
- View saved cards
- Delete a saved card (revokes the token)

---

## PCI-DSS Compliance

The CTV is PCI-DSS Level 1 certified. Tokens stored in the CTV do not contain raw card data — only the connector-issued token string is stored.

---

## Documentation

- [Payments Overview](./payments-overview.md)
- [Payments — Tokenization](./payments-tokenization.md)
- [Payments — PPP Versioning](./payments-ppp-versioning.md)
- [Payments — PCI-DSS](./payments-pci-dss.md)
