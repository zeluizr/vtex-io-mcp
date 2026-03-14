# External Marketplace — New Products & Product Updates

How connectors handle VTEX catalog notifications for new and updated products/SKUs.

## Affiliate Endpoint

The connector must expose an endpoint to receive VTEX catalog notifications:

```
https://{connectorEndpoint}/api/notification/
```

Register this URL in the VTEX affiliate configuration: **Orders > Orders management > Settings > Affiliates**.

---

## VTEX Notification Payload

| Field | Description |
|---|---|
| `idSKU` | SKU ID in VTEX |
| `productId` | Product ID in VTEX |
| `an` | Seller's VTEX account name |
| `idAffiliate` | Affiliate ID (3 consonants) |
| `DateModified` | Date of the update |
| `isActive` | `false` = product deactivated in VTEX → zero inventory and block in marketplace (or delete if blocking not supported) |
| `StockModified` | Inventory changed → run Fulfillment Simulation to get updated stock |
| `PriceModified` | Price changed → run Fulfillment Simulation to get updated price |
| `HasStockKeepingUnitModified` | Product/SKU registration data changed (name, description, weight, etc.) |
| `HasStockKeepingUnitRemovedFromAffiliate` | Product no longer associated with the trade policy → block or delete from marketplace |

---

## Integration Flow (New Products & Updates)

1. Validate VTEX ↔ Marketplace authentication — if expired, refresh; otherwise log error and queue notification
2. Check which store via `an` parameter
3. If `HasStockKeepingUnitModified = true` → register or update in marketplace:
   - a. Get SKU details (Get SKU and Context)
   - b. Validate `isActive`
   - c. Validate `salesChannel` matches integration's trade policy
   - d. Validate marketplace product registration rules
   - e. Validate category is mapped → if not, queue SKU until mapping is complete
   - f. Run Fulfillment Simulation (without postalCode) → get price and inventory
4. Send to marketplace if all validations pass
5. Store VTEX ID ↔ marketplace ID mapping
6. Log all operations

> **Run all validations before publishing.** Present a complete error list at once — avoid the correct → publish → correct cycle.

---

## Scenario 1 — Register New SKU

Triggered by: notification with `HasStockKeepingUnitModified = true` and SKU not yet published.

1. Verify VTEX `idSKU` and marketplace `idSkuMarketplace` are not yet mapped
2. Get SKU details (weight, dimensions)
3. Run Fulfillment Simulation for price and inventory
4. Apply data transformations
5. Run VTEX Mapper category mapping → if missing, log error and queue
6. Send to marketplace
7. On success: create VTEX SkuId ↔ Marketplace SkuId mapping

---

## Scenario 2 — Update Published SKU

Triggered by: notification with `HasStockKeepingUnitModified = true` and SKU already published.

1. Validate `isActive = true` (if false → Scenario 3 or 4)
2. Confirm VTEX ↔ marketplace ID mapping exists
3. Get product details and SKU details
4. Run Fulfillment Simulation (price + inventory)
5. Run VTEX Mapper category mapping
6. Apply data transformations
7. Send updated data to marketplace
8. Log operation

---

## Scenario 3 — Deactivate SKU

Triggered by: `isActive = false`.

1. Get SKU information
2. Confirm VTEX ↔ marketplace ID mapping
3. Send block/deactivation request to marketplace
4. If marketplace doesn't support deactivation → Scenario 4
5. Log operation

---

## Scenario 4 — Delete SKU

Only when marketplace does not support block/deactivation.

1. Validate `isActive = false`
2. Get SKU information
3. Confirm VTEX ↔ marketplace ID mapping
4. Send delete request to marketplace
5. Clean SKU mapping in connector's database
6. Log operation

---

## Scenario 5 — Activate SKU

Triggered by: `isActive = true` on a previously deactivated SKU.

1. Get SKU information
2. Confirm VTEX ↔ marketplace ID mapping
3. Send activation request to marketplace
4. Log operation

---

## API Reference

```
GET /api/catalog_system/pvt/sku/stockkeepingunitidsbysaleschannel    # List SKU IDs for sales channel
GET /api/catalog/pvt/stockkeepingunit/{skuId}                        # Get SKU details
GET /api/catalog/pvt/product/{productId}                             # Check product active status
POST /api/checkout/pub/orderForms/simulation                         # Fulfillment simulation
```

## Documentation

- [External Marketplace — Catalog Integration](./external-marketplace-catalog-integration.md)
- [External Marketplace — Catalog Logs](./external-marketplace-catalog-logs.md)
- [External Marketplace — Product Load](./external-marketplace-product-load.md)
- [External Marketplace — Catalog Mapping](./external-marketplace-catalog-mapping.md)
