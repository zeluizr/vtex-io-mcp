# Headless Commerce — Profile Management and Order History

How to implement shopper profile management and order history in a headless VTEX store.

---

## Profile Management

### Accessing Profile Information

**GET** `/api/checkout/pub/profiles?email={email}`

Returns complete profile by default. Use `?ensureComplete=false` to also return incomplete profiles.

A **complete profile** includes: `email`, `firstName`, `lastName`, `phone`, `document`, and an associated address.

### Editing Profile Information

VTEX stores shopper data in **Master Data v1**:
- `CL` entity — customer profiles
- `AD` entity — addresses

Use the **SafeData app** (`vtex.safedata`) as a secure middleware — it validates that the data being queried/modified belongs to the authenticated user.

> Install SafeData in your VTEX account before using it.

SafeData endpoints:

| Operation | Method | Path |
|---|---|---|
| Update partial document | PATCH | `/api/io/safedata/{entity}/documents/{id}` |
| Get document by ID | GET | `/api/io/safedata/{entity}/documents/{id}` |

Example — update user profile (`CL` entity):

```http
PATCH https://{accountName}.vtexcommercestable.com.br/api/io/safedata/CL/documents/{documentId}

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phone": "+5511999999999"
}
```

### Password Reset

Headless frontends **cannot edit passwords directly**. Implement password expiration instead:

- Follow the guide: **Expiring a shopper's password**
- Expiration does **not** send a notification — you must notify the shopper to set a new password at your store URL

### Newsletter Subscription

The opt-in field is `isNewsletterOptIn` (boolean) on the shopper's `CL` profile document. Update it via SafeData PATCH.

---

## Order History

### List User Orders

**GET** `/api/oms/user/orders`

Returns paginated list of the authenticated shopper's orders.

### Get Order Details

**GET** `/api/oms/user/orders/{orderId}`

Returns full order details for the authenticated shopper.

### Actions on Existing Orders

| Action | Method | Endpoint |
|---|---|---|
| Cancel order | POST | `/api/oms/pvt/orders/{orderId}/cancel` |
| Request order change | POST | `/api/oms/pvt/orders/{orderId}/changes` |

---

## Documentation

- [Headless Commerce Overview](./headless-commerce-overview.md)
- [Headless Catalog](./headless-catalog.md)
- [Headless Cart and Checkout](./headless-cart-and-checkout.md)
- [Master Data](./master-data.md)
