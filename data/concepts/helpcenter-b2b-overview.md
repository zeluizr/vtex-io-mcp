---
title: 'B2B Commerce - Overview'
id: helpcenter-b2b-overview
status: PUBLISHED
source: vtexdocs/help-center-content
originalPath: docs/en/tutorials/b2b/
---

VTEX B2B (Business-to-Business) commerce features enable stores to support wholesale and corporate purchasing scenarios with features tailored for business customers.

## B2B key concepts

### Organization management

B2B stores often need to manage corporate accounts with multiple buyers:

- **Organizations**: Represent a company that purchases from your store.
- **Cost centers**: Divisions within an organization with their own budget and address.
- **Buyers**: Individual users belonging to an organization.
- **Roles within organizations**: Buyer, Manager, Admin — each with different permissions.

The `vtex.b2b-organizations` app provides this structure.

### Price tables

B2B customers often have negotiated prices different from the public price. VTEX supports:

- **Price tables**: Named sets of prices that override the default price for specific customers.
- **Trade policies**: Combine payment conditions, catalog access, and pricing rules for B2B segments.

### Payment terms

B2B transactions often use payment terms not common in B2C:

- **Promissory notes**: Deferred payment with configurable terms.
- **Purchase orders (POs)**: Corporate payment with PO numbers.
- **Credit lines**: Customer-specific credit limits and terms via `vtex.customer-credit`.

### Order approval

B2B orders may require managerial approval before processing. VTEX supports configurable order authorization rules based on order value, customer, or other criteria.

## B2B setup in VTEX Admin

### Trade policy for B2B

1. Create a separate trade policy for B2B customers.
2. Configure payment conditions applicable to B2B (e.g., promissory notes, invoicing).
3. Optionally restrict the product catalog visible to B2B buyers.

### Customer segments

Use Master Data to create customer profiles with B2B-specific fields:
- Company name and CNPJ/EIN.
- Sales representative assignment.
- Price table assignment.
- Credit limit.

### Access restriction

For private B2B stores:
1. Enable login required for the store (via checkout settings or custom middleware).
2. Use session manager to check customer profile before showing prices.
3. Implement a registration approval flow using Master Data triggers.

## B2B development in VTEX IO

### vtex.b2b-suite

VTEX provides a suite of B2B apps that can be installed and configured:

- `vtex.b2b-organizations`: Organization and cost center management.
- `vtex.b2b-quotes`: Request for Quote (RFQ) functionality.
- `vtex.customer-credit`: Credit limit management.
- `vtex.b2b-checkout-settings`: B2B-specific checkout customizations.

### Custom B2B logic

Build custom B2B features using VTEX IO:

1. **Node service**: Implement price resolution, order validation, and approval workflows.
2. **GraphQL**: Expose B2B-specific queries and mutations.
3. **React components**: Custom B2B UI (organization selector, quick order forms).
4. **Master Data**: Store and manage B2B customer and organization data.

### Session-based pricing

Use `vtex.session` to read the current user's segment and apply the correct price table at checkout:

```typescript
// In a Node middleware:
const session = await ctx.clients.session.getSession(sessionToken, ['store.channel', 'profile.priceTables'])
const priceTables = session.namespaces?.profile?.priceTables?.value
```
