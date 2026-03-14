---
title: 'Payments - Overview'
id: helpcenter-payments-overview
status: PUBLISHED
source: vtexdocs/help-center-content
originalPath: docs/en/tutorials/payments/payments-overview/
---

The VTEX Payments module manages all financial transactions in your store. It supports multiple payment methods, payment providers, and anti-fraud integrations.

## Key concepts

### Payment methods

The types of payment a customer can use:

- **Credit card**: Visa, Mastercard, Amex, etc.
- **Debit card**: Direct bank account payment.
- **PIX**: Brazilian instant payment system.
- **Bank slip (boleto)**: Brazilian offline payment method.
- **Digital wallets (e-wallets)**: Apple Pay, Google Pay, etc.
- **Gift cards**: Store credit cards.
- **Promissory notes**: B2B deferred payment.

### Payment conditions

Configurations that define how a payment method is presented to the customer, including:

- Number of installments and interest rates.
- Minimum and maximum order values.
- Applicable trade policies.

### Connectors (payment providers)

A connector is the integration between VTEX and a payment provider (gateway, acquirer, or sub-acquirer). VTEX uses the [Payment Provider Protocol (PPP)](https://developers.vtex.com/docs/guides/payments-integration-payment-provider-protocol) for standardized integration.

### Transaction flow

1. Customer places order and selects payment method.
2. VTEX sends authorization request to the connector.
3. Connector communicates with the payment provider.
4. Provider authorizes (or denies) the transaction.
5. VTEX captures the payment after the order is invoiced.
6. Settlement occurs according to provider terms.

## Payment Provider Protocol (PPP)

VTEX IO developers can build payment connectors using the PPP. A connector implements specific endpoints:

- `POST /manifest`: Declares supported payment methods.
- `POST /payments`: Creates a payment transaction.
- `POST /payments/{paymentId}/cancellations`: Cancels a payment.
- `POST /payments/{paymentId}/settlements`: Settles a payment.
- `POST /payments/{paymentId}/refunds`: Refunds a payment.

In VTEX IO, payment connector apps use the `paymentprovider` builder.

## Anti-fraud

VTEX supports anti-fraud integrations to analyze transactions and flag potential fraud. Anti-fraud providers integrate via a similar protocol and receive order and payment data for analysis.

## 3D Secure

3D Secure (3DS) is an additional security layer for online card payments. VTEX supports 3DS2, which provides frictionless authentication for low-risk transactions.

## PCI compliance

VTEX is a PCI DSS Level 1 certified service provider, meaning cardholder data is processed in a secure environment. Merchant stores do not store raw card data.

## Payments in VTEX IO

In Node service apps, interact with payments via the `@vtex/api` clients or direct API calls. Common use cases:

- Reading transaction data for reporting.
- Creating custom payment method displays via React components.
- Building payment provider connector apps using the `paymentprovider` builder.
