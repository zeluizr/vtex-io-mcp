---
title: 'Subscriptions - Overview'
id: helpcenter-subscriptions-overview
status: PUBLISHED
source: vtexdocs/help-center-content
originalPath: docs/en/tutorials/subscriptions/
---

VTEX Subscriptions is a feature that enables customers to set up recurring purchases for products they buy regularly, such as pet food, cosmetics, or cleaning supplies.

## How subscriptions work

1. The customer selects a product and chooses a subscription frequency (weekly, monthly, etc.).
2. At the defined frequency, VTEX automatically creates a new order using the customer's saved payment method and delivery address.
3. The customer receives email notifications before each automatic order.
4. The customer can pause, modify, or cancel the subscription at any time through **My Account**.

## Subscription configuration

### Enabling subscriptions

In VTEX Admin, go to **Subscription > Settings**:

1. Enable the subscriptions feature for your store.
2. Configure allowed frequencies (e.g., weekly, every 15 days, monthly).
3. Configure the discount percentage for subscription orders (optional).
4. Set how many days in advance customers are notified.

### Product-level configuration

Mark specific products as eligible for subscriptions:

1. In the product registration, enable the subscription option.
2. Configure which frequencies are available for each product.

## Subscription management

### Customer view

Customers manage their subscriptions in **My Account > Subscriptions**:

- View all active subscriptions.
- Change frequency.
- Change the quantity per order.
- Pause or resume subscriptions.
- Cancel subscriptions.
- Update payment method.
- Update delivery address.

### Admin view

In VTEX Admin, **Subscription > Subscriptions**, you can:

- View all customer subscriptions.
- Manage subscription status.
- Retry failed subscription orders.
- View subscription order history.

## Subscriptions in VTEX IO

### Storefront integration

The `vtex.store-subscriptions` app adds subscription UI to the product page:

```json
{
  "dependencies": {
    "vtex.store-subscriptions": "1.x"
  }
}
```

Add the `subscription-attachment` block to your product page template to display the subscription frequency selector.

### Subscription events

Subscribe to subscription events in your Node service to implement custom logic:

```json
{
  "events": {
    "onSubscriptionCreated": {
      "sender": "vtex.subscriptions-v3",
      "keys": ["subscription-created"]
    }
  }
}
```

### Subscription API

```
GET /api/subscriptions/v3/subscriptions
GET /api/subscriptions/v3/subscriptions/{subscriptionId}
POST /api/subscriptions/v3/subscriptions/{subscriptionId}/cancel
```

Use the Subscriptions API in your Node service to:
- Query subscription status for a customer.
- Programmatically manage subscriptions.
- Create custom subscription reporting.
