# External Marketplace — Initial Product Load

Send all active products to the marketplace after the connector is first configured.

## Flow

```
1. Validate VTEX ↔ Marketplace authentication
2. Get sales channel ID from VTEX seller
3. GET list of SKU IDs for the sales channel
4. For each SKU:
   a. GET SKU details (Get SKU and Context)
   b. Validate SKU is active (isActive / IsProductActive)
   c. Validate SKU belongs to the integration's sales channel (salesChannel)
   d. Validate product is active (optional — Get SKU and Context includes IsProductActive)
   e. Validate SKU conforms to marketplace product registration rules
   f. Validate category is mapped in marketplace → if not, queue for approval
   g. Simulate fulfillment (price + inventory without postal code)
   h. Collect inventory (logisticsStockBalance) and price (price, listPrice)
5. Send to marketplace if all validations pass
6. Log operation result
7. Store VTEX ID ↔ marketplace ID mapping (needed for updates)
```

> **Important:** Run all validations **before** publishing to marketplace. Present sellers with a complete list of errors at once — avoid the correct → publish → correct cycle.

If any item fails steps a, b, or c, log the error and move on to the next SKU.

---

## API Endpoints

```
GET /api/catalog_system/pvt/sku/stockkeepingunitidsbysaleschannel    # List SKU IDs for a sales channel
GET /api/catalog/pvt/stockkeepingunit/{skuId}                        # Get SKU details
GET /api/catalog/pvt/product/{productId}                             # Check product active status
POST /api/checkout/pub/orderForms/simulation                         # Fulfillment simulation (price + inventory)
```

---

## Scenario 1 — First Load After Integration Activation

For every SKU in the sales channel:

1. Validate category mapping
2. Get SKU IDs available in the sales channel
3. Get SKU info (weight, dimensions, images)
4. Run fulfillment simulation to get price and inventory level
5. Send to marketplace
6. Log result (success or error per item)

---

## Scenario 2 — Deactivate Products When Integration Is Disabled

If the integration is deactivated:

1. Get SKU information
2. Send deactivation/block request to marketplace
3. Remove SKUs from state control table

---

## Architecture Recommendations

- Use **async messaging** with individual queues per context and store
- Implement **Circuit Breaker** to respect marketplace API rate limits
- Use **dead letter queues** for communication failures after retry limit
- Be a **TotalReader** — use marketplace standard values when VTEX fields are empty
- For **batch processing** — ensure products exist in marketplace before sending updates
- Maintain a **state control table** tracking: skuId, integration status, last attempt date, response received

---

## VTEX Integration Validation Checklist

To be validated by VTEX, connectors must provide:

1. Step-by-step catalog integration flow documentation
2. Field mapping table (VTEX field → marketplace field, with limitations and transformations)
3. Table of mandatory vs recommended fields for product/SKU registration
4. Table of known error logs with user-actionable resolution steps

### Field Mapping Table Template

| VTEX Field | Where in VTEX | VTEX API | Marketplace Field |
|---|---|---|---|
| Name | Catalog page | `/api/catalog/pvt/stockkeepingunit` | ShortName |
| Image | Catalog page (SKU) | | Images |

---

## Documentation

- [External Marketplace — Catalog Integration](./external-marketplace-catalog-integration.md)
- [External Marketplace — Catalog Logs](./external-marketplace-catalog-logs.md)
- [External Marketplace Integration](./external-marketplace-integration.md)
