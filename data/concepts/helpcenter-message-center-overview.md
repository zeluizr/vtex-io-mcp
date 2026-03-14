---
title: 'Message Center - Overview'
id: helpcenter-message-center-overview
status: PUBLISHED
source: vtexdocs/help-center-content
originalPath: docs/en/tutorials/message-center/
---

Message Center is the VTEX module responsible for managing transactional email communications with customers and store operators. It allows you to customize email templates for all store events.

## Email triggers

VTEX automatically sends emails for key events:

- **Order placed**: Confirmation email to the customer.
- **Payment confirmed**: Payment approval notification.
- **Order invoiced**: Invoice notification with fiscal document link.
- **Order shipped**: Shipping confirmation with tracking code.
- **Order delivered**: Delivery confirmation.
- **Order cancelled**: Cancellation notification.
- **Abandoned cart**: Reminder email for customers who left items in cart.
- **Welcome email**: New account registration.
- **Password reset**: Password recovery link.
- **Subscription created/renewed/cancelled**: Subscription lifecycle notifications.

## Email templates

Each email trigger has a corresponding template that can be customized in **Message Center > Templates**.

Template structure:

- **Subject**: Email subject line (supports dynamic variables).
- **Body**: HTML email content (supports dynamic variables and VTEX template engine).
- **Sender**: From name and email address.
- **Test**: Send a test email to preview the template.

### Dynamic variables

Templates support variables like:
- `{{order.orderId}}`: The order ID.
- `{{order.clientProfileData.firstName}}`: Customer's first name.
- `{{order.totals.0.value}}`: Order total value.
- `{{order.shippingData.address.city}}`: Delivery city.

### Master Data integration

Message Center templates can be triggered by Master Data triggers. This enables custom email workflows based on data changes in your store.

## VTEX IO email sending

From a Node service, send emails using the `Message Center` API:

```typescript
await ctx.clients.messageCenter.sendEmail({
  templateName: 'my-custom-template',
  jsonData: {
    to: { email: 'customer@example.com', name: 'Customer Name' },
    orderId: 'ORD-12345',
    // other template variables
  }
})
```

Or trigger emails via Master Data triggers:

1. Create a Message Center template.
2. In Master Data trigger, select "Send an email using a VTEX Message Center template".
3. Configure the data mapping between the Master Data record fields and template variables.

## Configuring the sender

1. Go to **Message Center > Senders**.
2. Configure SMTP settings or use VTEX's managed email sending.
3. For custom domains, configure SPF and DKIM DNS records for deliverability.

## Email deliverability best practices

- Use a custom sender domain with SPF/DKIM configured.
- Keep email lists clean (honor unsubscribes).
- Monitor bounce rates and spam complaints.
- Use preview text to complement the subject line.
- Test templates on multiple email clients before activation.
