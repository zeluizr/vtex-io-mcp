# ERP Integration — Import Inventory

Send current stock quantities to VTEX.

## Before You Begin

The **Shipping** module controls inventory and the processes of receiving, managing, packing, and shipping orders. Key concepts:

- **Shipping strategy** — how your store connects to customers
- **Shipping rates** — carrier pricing rules
- **Pickup points** — customer collection locations
- **Inventory management** — stock levels per warehouse

### Logistics Route

For an order to be placed, the desired SKU must have stock in at least one **warehouse**, connected through a **loading dock** to a **carrier** that delivers to the customer's address:

```
Warehouse → Loading Dock → Carrier → Customer
```

## Step 1 — Create Warehouses

Stock availability is stored at the warehouse level. Warehouses must exist before inventory can be updated.

**Via Admin panel:** Shipping > Strategy > Warehouses

**Via API:**

```
POST /api/logistics/pvt/configuration/warehouses    # Create/Update Warehouse
GET  /api/logistics/pvt/configuration/warehouses    # List All Warehouses (to get warehouseId)
```

## Step 2 — Update SKU Inventory

```
PUT /api/logistics/pvt/inventory/skus/{skuId}/warehouses/{warehouseId}
```

Set the total quantity in stock for each SKU per warehouse.

```json
{
  "quantity": 100,
  "unlimitedQuantity": false
}
```

> Use `"unlimitedQuantity": true` for digital goods or items that never go out of stock.

Find the `warehouseId` using:

```
GET /api/logistics/pvt/configuration/warehouses
```

Check progress:

```
GET /api/logistics/pvt/inventory/skus/{skuId}    # List Inventory By SKU
```

Or visit **Shipping > Inventory > Manage inventory** in the Admin panel.

## Documentation

- [ERP Integration Guide](./erp-integration-guide.md)
- [Fulfillment Overview](./fulfillment-overview.md)
- [Authentication](./authentication.md)
