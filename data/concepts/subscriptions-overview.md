# Subscriptions Overview

Subscriptions is the VTEX solution for customers to make recurrent purchases on a regular schedule — determining the products and frequency of orders.

## How It Works

- Merchants create **subscription plans** associating products and available frequencies
- Customers subscribe during checkout or via My Account
- The system acts as an automatic scheduler, executing repurchases at the chosen frequency
- Communication uses transactional emails in the Email Templates module

### Subscription Composition

```
Subscription Plan
  └─ Products eligible for subscription
  └─ Available frequencies (weekly, monthly, etc.)

Subscription (per customer)
  └─ Cycle 0 = original order (created by customer)
  └─ Cycle 1 = first subscription order (automatic)
  └─ Cycle 2 = second subscription order
  └─ ...
```

> **Cycle**: execution count of subscription orders — position of an order counting from when the shopper subscribed.

## Setup (Mandatory)

1. Contact VTEX Support to install the Subscriptions module
2. Follow the configuration steps in "How to configure Subscriptions in your store"
3. Create subscription plans in VTEX Admin (recommended) or as catalog attachments

## Subscriptions API

### Settings

```
POST /api/rns/settings    # Edit Subscriptions settings
GET  /api/rns/settings    # Get Subscription settings
```

### Plans

```
GET /api/rns/pvt/plans          # List plans
GET /api/rns/pvt/plans/{id}     # Get plan details
```

### Subscriptions

```
POST   /api/rns/pub/subscriptions                          # Create subscription
PATCH  /api/rns/pub/subscriptions/{id}                     # Update subscription
GET    /api/rns/pub/subscriptions/{id}                     # Get subscription details
GET    /api/rns/pub/subscriptions                          # List subscriptions
PATCH  /api/rns/pub/subscriptions/{id}/items/{itemId}      # Edit item on subscription
POST   /api/rns/pub/subscriptions/{id}/items               # Add item to subscription
DELETE /api/rns/pub/subscriptions/{id}/items/{itemId}      # Remove item from subscription
```

### Cycles

```
GET  /api/rns/pub/cycles/{cycleId}          # Get cycle details
GET  /api/rns/pub/cycles                    # List cycles
POST /api/rns/pub/cycles/{cycleId}/retry    # Retry cycle (reprocess failed orders)
```

### Conversation

```
GET /api/rns/pub/subscriptions/{subscriptionId}/conversation-message    # Get conversation messages
```

### Price Simulation

```
POST /api/rns/pub/subscriptions/{id}/simulate    # Simulate price for a specific subscription
POST /api/rns/pub/subscriptions/simulate         # Simulate price from a subscription template
```

### Reports

```
GET  /api/rns/pvt/reports                                          # List report templates
POST /api/rns/pvt/reports/{reportName}/documents                   # Generate report
GET  /api/rns/pvt/reports/{reportName}/documents/{documentId}      # Get report document details
```

## Manual Prices for Subscriptions

Enable the Manual Price feature for Subscriptions to apply a custom price on each subscription item, overriding the current price and maintaining it for future cycles.

## Pickup Points for Subscription Orders (Beta)

Configure subscription orders to use pickup points instead of delivery. Requirements:

- Subscriptions module installed
- Pickup points configured
- Carriers associated with pickup points must NOT have delivery windows
- Items must have inventory at the subscription cycle date
- Requires Checkout V6

## Subscription Promotions

Create promotions specifically for subscription orders (e.g., discount for recurring customers) in the Promotions module.

## Documentation

- [Platform Overview](./platform-overview.md)
- [Orders Overview](./orders-overview.md)
- [Pricing Overview](./pricing-overview.md)
- [Promotions Overview](./promotions-overview.md)
- [Data Privacy](./data-privacy.md)
