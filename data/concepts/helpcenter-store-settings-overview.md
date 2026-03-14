---
title: 'Store Settings - Overview'
id: helpcenter-store-settings-overview
status: PUBLISHED
source: vtexdocs/help-center-content
originalPath: docs/en/tutorials/store-settings/
---

Store Settings in VTEX Admin allows merchants to configure fundamental aspects of their store operations, including storefront behavior, checkout, order management, and integrations.

## Key store settings areas

### Storefront settings

Access at **Store Settings > Storefront**:

- **Checkout**: Configure checkout behavior, minimum order values, and payment settings.
- **My Account**: Customize the customer account portal.
- **Site Editor**: Configure storefront block behavior and defaults.
- **Master Data**: Access the database for customer and store data management.

### Channel settings

Access at **Store Settings > Channels**:

- **Trade Policies**: Configure different catalogs, prices, and payment conditions for different channels (B2C, B2B, marketplace, etc.).
- **Sales Channels**: Associate trade policies with specific storefronts or integrations.

### Order settings

Access at **Store Settings > Orders**:

- **Order Authorization**: Configure rules for manual order approval.
- **Order Change Settings**: Enable/disable order modification after placement.

### Email settings

Access at **Store Settings > Email Templates**:

- Configure transactional email templates via Message Center.
- Manage email senders and authentication.

## Trade Policies

Trade policies (also called sales channels) define a set of rules combining:

- **Catalog**: Which products are available.
- **Price**: Which price table applies.
- **Logistics**: Which shipping options are available.
- **Payment**: Which payment methods and conditions are available.
- **Promotions**: Which promotions apply.

### Creating a trade policy

1. Go to **Store Settings > Channels > Trade Policies**.
2. Click `New Trade Policy`.
3. Configure the policy settings.
4. Associate the trade policy with a binding (website URL).

### Trade policy in VTEX IO development

When developing with VTEX IO, reference trade policies in:

- `service.json`: Configure route policies.
- GraphQL queries: Filter products by trade policy.
- Checkout customization: Apply trade policy-specific discounts.

```typescript
// In a Node service, get the current trade policy:
const { sc } = ctx.query
const tradePolicySalesChannel = sc ?? '1' // '1' is the default trade policy
```

## Binding (multidomain/multilanguage)

A binding connects a trade policy to a specific domain or locale. Stores can have multiple bindings for:

- Different languages/countries.
- Different B2B/B2C experiences.
- Different regional storefronts.

Configure bindings in **Store Settings > Channels > Trade Policies > Bindings**.
