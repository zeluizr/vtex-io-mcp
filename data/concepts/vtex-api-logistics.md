# VTEX Logistics API

## Description

Logistics (fulfillment) is the process of planning and executing the transportation, storage of merchandise, and shipping orders to customers. The VTEX Logistics API allows you to manage your inventory, shipping rates, pickup points, warehouses, docks, and more.

## Base URL

```
https://{accountName}.vtexcommercestable.com.br
```

## Authentication

| Header | Description |
|--------|-------------|
| `X-VTEX-API-AppKey` | API key identifier. Use together with `X-VTEX-API-AppToken`. |
| `X-VTEX-API-AppToken` | API key secret token. |
| `VtexIdclientAutCookie` | User token (valid 24h). Alternative to AppKey/AppToken. |

## Endpoints by Tag

### Shipping Policies

| Method | Path | Summary |
|--------|------|---------|
| `GET` | `/api/logistics/pvt/shipping-policies/{id}` | Retrieve shipping policy by ID |
| `DELETE` | `/api/logistics/pvt/shipping-policies/{id}` | Delete shipping policy by ID |
| `PUT` | `/api/logistics/pvt/shipping-policies/{id}` | Update shipping policy |
| `GET` | `/api/logistics/pvt/shipping-policies` | List shipping policies |
| `POST` | `/api/logistics/pvt/shipping-policies` | Create shipping policy |

### Freight Values

| Method | Path | Summary |
|--------|------|---------|
| `POST` | `/api/logistics/pvt/configuration/freights/{carrierId}/values/update` | Create/update freight values |
| `GET` | `/api/logistics/pvt/configuration/freights/{carrierId}/{cep}/values` | List freight values |

### Scheduled Delivery

| Method | Path | Summary |
|--------|------|---------|
| `GET` | `/api/logistics/pvt/configuration/carriers/{carrierId}/getdayofweekblocked` | Retrieve blocked delivery windows |
| `POST` | `/api/logistics/pvt/configuration/carriers/{carrierId}/adddayofweekblocked` | Add blocked delivery windows |
| `POST` | `/api/logistics/pvt/configuration/carriers/{carrierId}/removedayofweekblocked` | Remove blocked delivery windows |
| `GET` | `/api/logistics-capacity/resources/carrier@{capacityType}@{shippingPolicyId}/time-frames` | Search capacity reservations in time range |
| `GET` | `/api/logistics-capacity/resources/carrier@{capacityType}@{shippingPolicyId}/time-frames/{window}` | Get capacity reservation usage by window |

### Docks

| Method | Path | Summary |
|--------|------|---------|
| `POST` | `/api/logistics/pvt/configuration/docks` | Create/update dock |
| `GET` | `/api/logistics/pvt/configuration/docks` | List all docks |
| `GET` | `/api/logistics/pvt/configuration/docks/{dockId}` | List dock by ID |
| `DELETE` | `/api/logistics/pvt/configuration/docks/{dockId}` | Delete dock |
| `POST` | `/api/logistics/pvt/configuration/docks/{dockId}/activation` | Activate dock |
| `POST` | `/api/logistics/pvt/configuration/docks/{dockId}/deactivation` | Deactivate dock |

### Warehouses

| Method | Path | Summary |
|--------|------|---------|
| `POST` | `/api/logistics/pvt/configuration/warehouses` | Create/update warehouse |
| `GET` | `/api/logistics/pvt/configuration/warehouses` | List all warehouses |
| `GET` | `/api/logistics/pvt/configuration/warehouses/{warehouseId}` | List warehouse by ID |
| `DELETE` | `/api/logistics/pvt/configuration/warehouses/{warehouseId}` | Remove warehouse |
| `POST` | `/api/logistics/pvt/configuration/warehouses/{warehouseId}/activation` | Activate warehouse |
| `POST` | `/api/logistics/pvt/configuration/warehouses/{warehouseId}/deactivation` | Deactivate warehouse |

### Inventory

| Method | Path | Summary |
|--------|------|---------|
| `GET` | `/api/logistics/pvt/inventory/skus/{skuId}` | List inventory by SKU |
| `GET` | `/api/logistics/pvt/inventory/items/{skuId}/warehouses/{warehouseId}` | List inventory per warehouse |
| `PUT` | `/api/logistics/pvt/inventory/skus/{skuId}/warehouses/{warehouseId}` | Update inventory by SKU and warehouse |
| `PATCH` | `/api/logistics/pvt/inventory/skus/{skuId}/warehouses/{warehouseId}/quantity` | Update inventory quantity by SKU and warehouse |
| `PATCH` | `/api/logistics/pvt/inventory/skus/{skuId}/warehouses/{warehouseId}/lead-time` | Update inventory lead time by SKU and warehouse |
| `GET` | `/api/logistics/pvt/inventory/items/{skuId}/docks/{dockId}` | List inventory per dock |
| `GET` | `/api/logistics/pvt/inventory/items/{skuId}/docks/{dockId}/warehouses/{warehouseId}` | List inventory per dock and warehouse |
| `GET` | `/api/logistics/pvt/inventory/items/{itemId}/warehouses/{warehouseId}/dispatched` | List inventory with dispatched reservations |
| `GET` | `/api/logistics/pvt/inventory/items/{skuId}/warehouses/{warehouseId}/supplyLots` | List supply lots |
| `PUT` | `/api/logistics/pvt/inventory/items/{skuId}/warehouses/{warehouseId}/supplyLots/{supplyLotId}` | Save supply lot |

### Holidays

| Method | Path | Summary |
|--------|------|---------|
| `PUT` | `/api/logistics/pvt/configuration/holidays/{holidayId}` | Create/update holiday |
| `GET` | `/api/logistics/pvt/configuration/holidays/{holidayId}` | List holiday by ID |
| `DELETE` | `/api/logistics/pvt/configuration/holidays/{holidayId}` | Delete holiday |
| `GET` | `/api/logistics/pvt/configuration/holidays` | List all holidays |

### Reservations

| Method | Path | Summary |
|--------|------|---------|
| `POST` | `/api/logistics/pvt/inventory/reservations` | Create reservation |
| `GET` | `/api/logistics/pvt/inventory/reservations/{reservationId}` | List reservation by ID |
| `POST` | `/api/logistics/pvt/inventory/reservations/{reservationId}/confirm` | Confirm reservation |
| `POST` | `/api/logistics/pvt/inventory/reservations/{reservationId}/acknowledge` | Acknowledgment reservation |
| `POST` | `/api/logistics/pvt/inventory/reservations/{reservationId}/cancel` | Cancel reservation |
| `GET` | `/api/logistics/pvt/inventory/reservations/{warehouseId}/{skuId}` | List reservation by warehouse and SKU |

### SLA

| Method | Path | Summary |
|--------|------|---------|
| `POST` | `/api/logistics/pvt/shipping/calculate` | Calculate SLA |

### Pickup Points

| Method | Path | Summary |
|--------|------|---------|
| `GET` | `/api/logistics/pvt/configuration/pickuppoints` | List pickup points |
| `PUT` | `/api/logistics/pvt/configuration/pickuppoints/{pickupPointId}` | Create/Update pickup point |
| `GET` | `/api/logistics/pvt/configuration/pickuppoints/{pickupPointId}` | List pickup point by ID |
| `DELETE` | `/api/logistics/pvt/configuration/pickuppoints/{pickupPointId}` | Delete pickup point |
| `GET` | `/api/logistics/pvt/configuration/pickuppoints/_search` | List paged pickup points |

### Polygons

| Method | Path | Summary |
|--------|------|---------|
| `GET` | `/api/logistics/pvt/configuration/geoshape` | List paged polygons |
| `PUT` | `/api/logistics/pvt/configuration/geoshape` | Create/update polygon |
| `GET` | `/api/logistics/pvt/configuration/geoshape/{polygonName}` | List polygon by ID |
| `DELETE` | `/api/logistics/pvt/configuration/geoshape/{polygonName}` | Delete polygon |

## Key Request/Response Models

### Update Inventory (PUT /api/logistics/pvt/inventory/skus/{skuId}/warehouses/{warehouseId})

Request body:
```json
{
  "unlimitedQuantity": false,
  "quantity": 100,
  "dateUtcOnBalanceSystem": null
}
```

### Create/Update Warehouse (POST /api/logistics/pvt/configuration/warehouses)

Request body fields:
- `id` (string) — Warehouse ID
- `name` (string) — Warehouse name
- `warehouseDocks` (array) — Array of dock connections: `{ "dockId": "...", "time": "00:30:00", "cost": 0 }`
- `pickupPointIds` (array) — Associated pickup point IDs
- `isActive` (boolean) — Whether the warehouse is active

### Create Pickup Point (PUT /api/logistics/pvt/configuration/pickuppoints/{pickupPointId})

Request body fields:
- `id` (string) — Pickup point ID
- `name` (string) — Display name
- `address` (object) — Address with `postalCode`, `city`, `state`, `country`, `street`, `number`
- `geoCoordinates` (array) — `[longitude, latitude]`
- `businessHours` (array) — Opening hours per day
- `isActive` (boolean)

### Calculate SLA (POST /api/logistics/pvt/shipping/calculate)

Request body:
```json
{
  "items": [{ "id": "1", "quantity": 1, "groupItemsKey": "" }],
  "origin": { "country": "BRA", "postalCode": "12345-000" },
  "destination": { "country": "BRA", "postalCode": "04538-133" }
}
```

## VTEX IO Integration Notes

- Use the `LogisticsClient` from `@vtex/clients` in Node services to query logistics data
- The Logistics API is commonly used to:
  - Sync inventory from ERP systems
  - Display pickup points on the storefront
  - Calculate shipping costs programmatically

## Documentation

https://developers.vtex.com/docs/api-reference/logistics-api
