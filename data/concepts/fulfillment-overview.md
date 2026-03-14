# Fulfillment Overview

Fulfillment is the logistic process of storing merchandise and receiving, managing, packing, and shipping orders — from purchase to delivery.

## Fulfillment Process

When a shopper selects an item and proceeds to checkout, VTEX:

1. Checks availability and where the item will be picked up from
2. Selects the place and time for the carrier to collect the item
3. Calculates shipping conditions (SLA) to display to the shopper

The shopper chooses a shipping option and completes payment. Then physical packing and shipping occurs.

## Shipping Strategy (Mandatory Setup)

The **Shipping Strategy** defines the relationship between three entities. Configure them in this order:

### 1. Shipping Policy

Defines shipping conditions offered to shoppers at checkout: carrier working hours, costs, deadlines, capacity.

```
POST /api/logistics/pvt/shipping-policies               # Create
GET  /api/logistics/pvt/shipping-policies               # List all
GET  /api/logistics/pvt/shipping-policies/{id}          # Get by ID
PUT  /api/logistics/pvt/shipping-policies/{id}          # Update
DELETE /api/logistics/pvt/shipping-policies/{id}        # Delete
```

### 2. Loading Dock

Physical location from where products are shipped. Links warehouse to shipping policy.

```
POST /api/logistics/pvt/configuration/docks                        # Create/update
GET  /api/logistics/pvt/configuration/docks                        # List all
GET  /api/logistics/pvt/configuration/docks/{dockId}               # Get by ID
POST /api/logistics/pvt/configuration/docks/{dockId}/activation    # Activate
POST /api/logistics/pvt/configuration/docks/{dockId}/deactivation  # Deactivate
DELETE /api/logistics/pvt/configuration/docks/{dockId}             # Delete
```

### 3. Warehouse

Physical location where products are stored. Items go: warehouse → loading dock → carrier → shopper.

```
POST /api/logistics/pvt/configuration/warehouses                          # Create/update
GET  /api/logistics/pvt/configuration/warehouses                          # List all
GET  /api/logistics/pvt/configuration/warehouses/{warehouseId}             # Get by ID
POST /api/logistics/pvt/configuration/warehouses/{warehouseId}/activation  # Activate
POST /api/logistics/pvt/configuration/warehouses/{warehouseId}/deactivation # Deactivate
DELETE /api/logistics/pvt/configuration/warehouses/{warehouseId}           # Remove
```

## Inventory Management

Inventory = relationship between stored products and their availability for sales.

```
PUT /api/logistics/pvt/inventory/skus/{skuId}/warehouses/{warehouseId}                          # Update inventory
GET /api/logistics/pvt/inventory/skus/{skuId}                                                   # List by SKU
GET /api/logistics/pvt/inventory/items/{skuId}/warehouses/{warehouseId}                         # Per warehouse
GET /api/logistics/pvt/inventory/items/{skuId}/docks/{dockId}                                   # Per dock
GET /api/logistics/pvt/inventory/items/{skuId}/docks/{dockId}/warehouses/{warehouseId}          # Per dock + warehouse
GET /api/logistics/pvt/inventory/items/{itemId}/warehouses/{warehouseId}/dispatched             # With dispatched reservations
```

> **Admin:** Catalog > Inventory > Inventory Management

## Optional Configurations

### Geolocation Shipping (Polygons)

Register shipping areas using geographic polygons — useful for rural and industrial areas.

```
PUT    /api/logistics/pvt/configuration/geoshape                     # Create/update polygon
GET    /api/logistics/pvt/configuration/geoshape                     # List paged polygons
GET    /api/logistics/pvt/configuration/geoshape/{polygonName}       # Get by ID
DELETE /api/logistics/pvt/configuration/geoshape/{polygonName}       # Delete
```

### Reservations

Prevents the same item from being sold twice. After purchase, status changes from `Available` → `Reserved`.

```
POST /api/logistics/pvt/inventory/reservations                            # Create
GET  /api/logistics/pvt/inventory/reservations/{reservationId}            # Get by ID
GET  /api/logistics/pvt/inventory/reservations/{warehouseId}/{skuId}      # By warehouse + SKU
POST /api/logistics/pvt/inventory/reservations/{reservationId}/confirm    # Confirm
POST /api/logistics/pvt/inventory/reservations/{reservationId}/acknowledge # Acknowledge
POST /api/logistics/pvt/inventory/reservations/{reservationId}/cancel     # Cancel
```

### Scheduled Delivery

Lets shoppers choose a delivery day and time window.

```
POST /api/logistics/pvt/configuration/carriers/{carrierId}/adddayofweekblocked    # Block windows
GET  /api/logistics/pvt/configuration/carriers/{carrierId}/getdayofweekblocked    # Get blocked windows
POST /api/logistics/pvt/configuration/carriers/{carrierId}/removedayofweekblocked # Remove blocked windows
GET  /api/logistics-capacity/resources/carrier@{capacityType}@{shippingPolicyId}/time-frames  # Search capacity
```

### Holidays

Configure non-delivery days — VTEX adds these days when calculating shipping estimates.

```
PUT    /api/logistics/pvt/configuration/holidays/{holidayId}    # Create/update
GET    /api/logistics/pvt/configuration/holidays/{holidayId}    # Get by ID
GET    /api/logistics/pvt/configuration/holidays                # List all
DELETE /api/logistics/pvt/configuration/holidays/{holidayId}    # Delete
```

### Pickup Points

Physical locations where shoppers can collect orders.

```
PUT    /api/logistics/pvt/configuration/pickuppoints/{pickupPointId}     # Create/update
GET    /api/logistics/pvt/configuration/pickuppoints                     # List all
GET    /api/logistics/pvt/configuration/pickuppoints/{pickupPointId}     # Get by ID
GET    /api/logistics/pvt/configuration/pickuppoints/_search             # List paged
DELETE /api/logistics/pvt/configuration/pickuppoints/{pickupPointId}     # Delete
```

## SLA Calculation

SLA = fulfillment conditions shown to shoppers (type, cost, deadline).

```
POST /api/logistics/pvt/shipping/calculate    # Calculate SLA
```

## Carriers and Freight

Carriers are configured in shipping policies. Freight rates (ZIP ranges, weight limits) are set via shipping rate templates.

```
POST /api/logistics/pvt/configuration/freights/{carrierId}/values/update    # Create/update freight values
GET  /api/logistics/pvt/configuration/freights/{carrierId}/{cep}/values     # List freight values by ZIP
```

## VTEX Shipping Network (Brazil only)

App that connects stores with carriers for optimized freight costs. Flow:

1. Notify carrier of new package (fiscal info + contact)
2. Issue shipping labels
3. Track shipping until order is fulfilled

```
POST /{app_name}/v{app_version}/{account}/{workspace}/notify    # Notify carrier
POST /{app_name}/v{app_version}/{account}/{workspace}/tracking  # Update tracking events
```

## VTEX Tracking (Brazil only)

Real-time delivery management — driver location, delivery status, shopper visibility.

> Do not call GET endpoints more than once every 6 hours to avoid API overload.

```
POST /auth                                       # Async login
POST /services                                   # Post delivery service
GET  /services                                   # List delivery services
GET  /services/{idDeliveryService}               # Get by ID
POST /services/routes                            # Post with route scheduling
GET  /services/routes                            # Get by route
GET  /services/invoice                           # Get by invoice
```

## ERP Integration Flow

1. Back office (ERP/PIM/WMS) setup
2. Import inventory

## Documentation

- [Platform Overview](./platform-overview.md)
- [Orders Overview](./orders-overview.md)
- [Checkout Overview](./checkout-overview.md)
- [Authentication](./authentication.md)
