---
title: 'VTEX DO - Task management interface'
id: helpcenter-vtex-do-interface
status: PUBLISHED
source: vtexdocs/help-center-content
originalPath: docs/en/tutorials/orders/orders-overview/vtex-do-interface.md
---

VTEX DO (VTEX Delivery Operations) is a task management interface integrated into the VTEX Admin for handling pending operational tasks related to orders.

## What is VTEX DO?

VTEX DO is accessed at the top navigation bar in the VTEX Admin. It aggregates pending tasks that require manual attention from store operators, such as:

- **Order authorization**: Orders pending approval based on configured authorization rules.
- **Fraud analysis review**: Transactions flagged by anti-fraud that need manual review.
- **Payment review**: Transactions requiring manual payment confirmation.
- **Gift card activation**: Manual activation of physical gift cards.

## Task types

### Order authorization

When order authorization rules are configured (e.g., orders above a certain value require approval), orders appear in VTEX DO pending approval. Store operators can:

- **Approve**: Release the order for processing.
- **Deny**: Cancel the order and notify the customer.
- View order details before making a decision.

### Fraud analysis

When an anti-fraud provider flags a transaction as suspicious, it appears in VTEX DO for manual review. Operators can:

- **Approve**: Accept the transaction and proceed with the order.
- **Deny**: Reject the transaction and cancel the order.
- View the fraud risk score and details from the anti-fraud provider.

## VTEX DO API

Tasks in VTEX DO can also be managed via the API:

```
GET /api/do/tasks?status=pending
POST /api/do/tasks/{taskId}/approve
POST /api/do/tasks/{taskId}/deny
```

## Integration with order workflows

VTEX IO developers can create custom workflows that interact with VTEX DO:

1. Configure order authorization rules in **Orders > Authorization** to create tasks for specific conditions.
2. Build a Node service that monitors VTEX DO via the API and takes automated actions.
3. Send notifications to store operators when high-value orders require attention.

## Accessing VTEX DO in VTEX IO Admin apps

When building custom Admin apps (`admin` builder), you can read VTEX DO task counts and display them in your app's navigation:

```typescript
const pendingTasks = await ctx.clients.vtexDO.getPendingTasks()
```
