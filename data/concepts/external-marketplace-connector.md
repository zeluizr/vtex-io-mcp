# External Marketplace — Seller Integration Connector

The seller integration flow comprises 12 API requests. Overview of direction:

- **Seller → Marketplace (4):** Change Notification, Send SKU Suggestion, Order Invoice Notification, Cancel Order
- **Marketplace → Seller (7):** Fulfillment Simulation, Order Placement, Authorize Fulfillment, Marketplace Order Cancellation, Send Invoice, Send Tracking, Update Tracking Status
- **Both directions (1):** Send Agreement for Order Modifications

---

## Integration Flow

| Step | API Request | Direction |
|---|---|---|
| Catalog Notification | `POST` Change Notification | Seller → Marketplace |
| Catalog Registration | `PUT` Send SKU Suggestion | Seller → Marketplace |
| Catalog & Storefront Update | `POST` Fulfillment Simulation | Marketplace → Seller |
| Order Placement | `POST` Order Placement | Marketplace → Seller |
| Order Dispatching | `POST` Authorize Fulfillment | Marketplace → Seller |
| Order Invoicing & Tracking | `POST` Order Invoice Notification | Seller → Marketplace |
| Cancellation by Marketplace | `POST` Marketplace Order Cancellation | Marketplace → Seller |
| Cancellation by Seller | `POST` Cancel Order | Seller → Marketplace |
| Order Invoicing | `POST` Send Invoice | Seller → Marketplace |
| Send Tracking | `POST` Send Tracking Information | Seller → Marketplace |
| Update Tracking Status | `POST` Update Tracking Status | Seller → Marketplace |
| Order Modifications | `POST` Send Agreement for Order Modifications | Both |

---

## Step 1 — Catalog Notification

**Seller calls:** `POST /api/catalog_system/pvt/skuseller/changenotification/{skuId}`

Use for catalog changes: name, description, images, EAN, specifications.

Possible responses:
- `200 OK` → SKU exists in marketplace → proceed to **update** catalog info
- `404 Not Found` → SKU doesn't exist in marketplace → proceed to **register** the SKU offer

> For price and inventory changes, use the Catalog Update step instead.

---

## Step 2 — Catalog Registration (SKU Offer)

When marketplace responds with `404`, the seller must send an SKU offer.

**Seller calls:** `PUT` Send SKU Suggestion (Marketplace Suggestions API)

The seller sends: product/SKU name, seller ID, image URL, and other mandatory fields.

> The marketplace owns the catalog. All SKUs from sellers are submitted as offers and must be approved before becoming catalog entries.

> An offer update only works if the original offer has not yet been approved or disapproved. Once approved, only the marketplace can edit the resulting SKU registration.

---

## Step 3 — Catalog & Storefront Update

**Seller implements endpoint:** `POST /pvt/orderForms/simulation`

Triggered by the marketplace after receiving price or inventory change notifications:
- `POST /notificator/{sellerId}/changenotification/{skuId}/price`
- `POST /notificator/{sellerId}/changenotification/{skuId}/inventory`

The marketplace sends an array of items; the seller responds with updated price and inventory data.

> **Performance requirement:** Response time must be under **2.5 seconds**. After that, the product is considered unavailable. This endpoint directly impacts checkout.

> For Storefront simulation (during checkout flow), the marketplace does **not** send `country` or `postalCode` in the request.

---

## Step 4 — Seller Processing Payments (Optional)

If the seller processes payments, they must send their VTEX Gateway **account name** to the marketplace.

The marketplace adds it to the `merchantName` field in Fulfillment Simulation and Order Placement requests:

```json
"merchantName": "sellerAccountName"
```

---

## Step 5 — Order Placement

**Seller implements endpoint:** `POST /pvt/orders`

The marketplace calls this endpoint after the customer completes checkout, sending:
- Cart items
- Client profile data
- Shipping data
- Payment data

The seller uses this to create the order in their own system.

---

## Step 6 — Order Dispatching (Authorize Fulfillment)

**Seller implements endpoint:** `POST /pvt/orders/{sellerOrderId}/fulfill`

Called by the marketplace after payment is approved. Body contains only `marketplaceOrderId`. The seller uses it to trigger the fulfillment process.

---

## Step 7 — Order Invoicing & Tracking

**Seller calls:** `POST /api/oms/pvt/orders/{orderId}/invoice`

After invoicing, the seller calls this endpoint to send invoice data to the marketplace. When the package is delivered to the carrier and tracking data is available, the same endpoint is called again with tracking fields:
- `courier`
- `trackingNumber`
- `trackingUrl`

---

## Step 8 — Order Modifications

**Seller implements endpoint:** `POST /api/order-system/orders/{participantOrderId}/changes/{changeRequestId}/send-agreement`

The `agreementType` field has two values:
- `"Acknowledgment"` — seller recognizes the modification request
- `"Confirmation"` — seller has applied modifications and flow can proceed

Related endpoints for full order modification support:
```
PATCH /api/order-system/orders/{changeOrderId}/changes              # Create order modifications
POST  /api/order-system/orders/{changeOrderId}/changes/preview      # Preview order modifications
POST  /api/order-system/orders/{changeOrderId}/changes/{changeRequestId}/cancel   # Cancel modifications
```

---

## Step 9 — Cancellation by the Marketplace

**Seller implements endpoint:** `POST /pvt/orders/{orderId}/cancel`

Called twice:

1. **Evaluate** — seller responds with empty body (evaluating)
2. **Confirm** — seller responds with `marketplaceOrderId`, `orderId`, notification date, and protocol code
3. **Refuse** — seller sends an invoice instead (cancellation denied → flow continues to invoicing)

---

## Step 10 — Cancellation by the Seller

**Seller calls:** `POST /pvt/orders/{marketplaceOrderId}/cancel`

> If the order status is `Invoiced`, first send a **return invoice** using the Order Invoice Notification endpoint with `"type": "input"`. Then proceed with the cancellation.

---

## API Reference

```
# Seller → Marketplace
POST /api/catalog_system/pvt/skuseller/changenotification/{skuId}     # Change Notification
PUT  (Marketplace Suggestions API)                                     # Send SKU Suggestion
POST /notificator/{sellerId}/changenotification/{skuId}/price          # Notify price update
POST /notificator/{sellerId}/changenotification/{skuId}/inventory      # Notify inventory update
POST /api/oms/pvt/orders/{orderId}/invoice                             # Order Invoice Notification
POST /pvt/orders/{marketplaceOrderId}/cancel                          # Cancel Order (by seller)
POST /pvt/orders/{marketplaceOrderId}/invoice                         # Send Invoice
POST /pvt/orders/{marketplaceOrderId}/invoice/{invoiceNumber}         # Send Tracking
POST /pvt/orders/{marketplaceOrderId}/invoice/{invoiceNumber}/tracking # Update Tracking Status

# Marketplace → Seller (implement these endpoints)
POST /pvt/orderForms/simulation                                        # Fulfillment Simulation
POST /pvt/orders                                                       # Order Placement
POST /pvt/orders/{sellerOrderId}/fulfill                               # Authorize Fulfillment
POST /pvt/orders/{orderId}/cancel                                      # Marketplace Order Cancellation

# Both directions
POST /api/order-system/orders/{participantOrderId}/changes/{changeRequestId}/send-agreement
```

## Documentation

- [External Marketplace Integration](./external-marketplace-integration.md)
- [External Marketplace — Architecture](./external-marketplace-architecture.md)
- [External Marketplace — VTEX Seller Setup](./external-marketplace-seller-setup.md)
- [External Marketplace — Marketplace Setup](./external-marketplace-marketplace-setup.md)
- [External Marketplace — Seller Payments](./external-marketplace-seller-payments.md)
- [Orders Overview](./orders-overview.md)
