---
title: 'Promotions and Taxes - Overview'
id: helpcenter-promotions-overview
status: PUBLISHED
source: vtexdocs/help-center-content
originalPath: docs/en/tutorials/promotions-and-taxes/
---

The VTEX Promotions module allows you to configure discounts, coupons, and promotional rules to incentivize purchases.

## Types of promotions

### Regular promotions

Percentage or fixed-value discounts on products, categories, or the entire cart:

- **Percentage discount**: e.g., 10% off the entire cart.
- **Nominal discount**: e.g., $20 off orders over $100.
- **Free shipping**: Remove shipping costs for qualifying orders.
- **Gift**: Add a free product to the cart.
- **Price discount**: Set a specific price for promotional items.

### Progressive discount

Rewards customers based on the number of units purchased. For example:
- Buy 2, get 5% off.
- Buy 4, get 10% off.
- Buy 6, get 15% off.

### Buy and win (combo)

"Buy product X and get product Y for free (or at a discount)."

### Campaign audiences (target marketing)

Restrict promotions to specific audiences:
- Logged-in users.
- Users with specific UTM parameters.
- Users who came from specific referrer URLs.
- First-time buyers.
- Users with specific clusters (via Master Data).

## Coupons

Coupons are promotional codes customers enter at checkout to receive a discount. They work in conjunction with promotions and can be restricted by:

- Maximum number of uses (total or per customer).
- Expiration date.
- Minimum order value.

## Taxes

VTEX supports configurable tax rules:

- **Tax rates**: Fixed percentage applied to products in specific categories or regions.
- **Tax exemptions**: Products exempt from certain taxes.
- **External tax services**: Integrate with external tax calculation services (e.g., Avalara) via the [Tax Service protocol](https://developers.vtex.com/docs/guides/tax-services-overview).

In VTEX IO, custom tax services use the `external-tax-service-example` pattern with a Node service that implements the tax calculation endpoint.

## Promotions in VTEX IO development

Custom promotion logic can be implemented using:

- **Order Form customization**: Add custom business logic at checkout using the Checkout API.
- **Session manager**: Use `vtex.session` to read user segment data and apply custom pricing.
- **Price builder integration**: Custom prices via the Pricing Hub.

Common use case: Building a B2B pricing app that reads a customer's price table from Master Data and applies it at checkout using session data and the price override API.
