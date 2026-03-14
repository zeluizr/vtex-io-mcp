# ERP Integration — Ongoing Updates

After initial import, keep your VTEX store in sync with ongoing changes from the ERP.

## Product Updates

Trigger API requests to VTEX whenever the ERP catalog changes. Alternatively, use manual import methods (Google Sheets, Admin).

### New Products or SKUs

Follow the same [product import flow](./erp-integration-import-products.md).

Before importing, verify the catalog structure is ready:
- Category exists
- Brand exists
- Specification groups and fields exist

### Update Existing Products or SKUs

```
PUT /api/catalog/pvt/product/{productId}          # Update product
PUT /api/catalog/pvt/stockkeepingunit/{skuId}     # Update SKU
```

### Deactivate Products or SKUs

To remove a product or SKU from the storefront without deleting it, set `IsActive` to `false`:

```
PUT /api/catalog/pvt/product/{productId}
PUT /api/catalog/pvt/stockkeepingunit/{skuId}
```

```json
{
  "IsActive": false
}
```

## Pricing Updates

Use the same endpoints from the initial import:

```
PUT /api/pricing/prices/{skuId}                                      # Update base price
PUT /api/pricing/prices/{skuId}/fixed/{priceTableIdOrTradePolicy}    # Update fixed price
```

Trigger price update requests whenever prices change in the ERP or PIM.

## Inventory Updates

Use the same endpoint from the initial import:

```
PUT /api/logistics/pvt/inventory/skus/{skuId}/warehouses/{warehouseId}
```

Trigger inventory update requests whenever stock levels change in the WMS.

## Documentation

- [ERP Integration Guide](./erp-integration-guide.md)
- [ERP Integration — Import Products](./erp-integration-import-products.md)
- [ERP Integration — Import Prices](./erp-integration-import-prices.md)
- [ERP Integration — Import Inventory](./erp-integration-import-inventory.md)
