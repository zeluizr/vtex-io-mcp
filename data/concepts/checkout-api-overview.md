# Checkout API Overview

The Checkout API allows you to obtain and configure information about the shopping cart, its attachments, custom fields, orderForm structure, fulfillment data, order management, and seller delivery region identification.

> ⚠️ Data modification operations (`POST`, `PATCH`, `PUT`, `DELETE`) must **not** be performed in parallel in the Checkout APIs. They must be enqueued by the client/requester. Otherwise, old values can be overwritten incorrectly or competition errors may occur.

---

## Shopping Cart

Simulate, configure, and customize shopping cart information.

| Method | Endpoint | Description |
|---|---|---|
| `POST` | Cart Simulation | Simulate a cart |
| `GET` | `/api/checkout/pub/orderForm` | Get current or create a new cart |
| `GET` | Get cart information by ID | Retrieve cart by ID |
| `POST` | Remove all items | Clear cart items |
| `GET` | Remove all personal data | Remove PII from cart |
| `POST` | Update cart items | Modify existing items |
| `POST` | Add cart items | Add items to cart |
| `PUT` | Change price | Manually change item price |
| `PATCH` | Ignore profile data | Ignore existing profile |
| `GET` | Cart installments | Get installment options |
| `POST` | Add coupons to the cart | Apply a coupon code |

---

## Cart Attachments

Obtain client profiles and add information to a shopping cart.

| Method | Description |
|---|---|
| `GET` | Get client profile by email |
| `POST` | Add client profile |
| `POST` | Add shipping address and select delivery option |
| `POST` | Add client preferences |
| `POST` | Add marketing data |
| `POST` | Add payment data |
| `POST` | Add merchant context data |

---

## Custom Data

Manage custom fields created by an app in the account.

| Method | Description |
|---|---|
| `PUT` | Set multiple custom field values |
| `PUT` | Set single custom field value |
| `DELETE` | Remove single custom field value |

---

## Configuration

Configure orderForm settings and seller exchange on an order.

| Method | Description |
|---|---|
| `GET` | Get orderForm configuration |
| `POST` | Update orderForm configuration |
| `GET` | Get window to change seller |
| `POST` | Update window to change seller |
| `POST` | Clear orderForm messages |

---

## Fulfillment

Obtain pickup points and address information.

| Method | Description |
|---|---|
| `GET` | List pickup points by location |
| `GET` | Get address by postal code |

---

## Order Placement

Place and process orders.

| Method | Description |
|---|---|
| `POST` | Place order from an existing cart |
| `PUT` | Place order |
| `POST` | Process order |

---

## Region

Obtain a list of sellers serving a specific delivery region.

| Method | Endpoint |
|---|---|
| `GET` | `/api/checkout/pub/regions/{regionId}` |

---

## Documentation

- [Checkout Custom Data](./checkout-custom-data.md)
- [Checkout Customization Guide](./checkout-customization-guide.md)
- [Checkout Manual Price](./checkout-manual-price.md)
- [Checkout Save User Data](./checkout-save-user-data.md)
- [Checkout Region and Global](./checkout-region-and-global.md)
