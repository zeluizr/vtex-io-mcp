# External Marketplace — Price & Stock Updates

Keep integrated products updated with current price and inventory levels.

## Scope

| Included | Not Included |
|---|---|
| Prices defined in the VTEX main account | Prices defined in third-party sellers or franchise accounts |
| | Prices updated directly to the marketplace integration |
| Inventory levels defined in the main account | Inventory levels defined in third-party sellers or franchise accounts |
| | Inventory levels updated directly to the marketplace integration |

---

## Affiliate Endpoint

The connector must expose:

```
https://{connectorEndpoint}/api/notification/
```

Register this URL in **Orders > Orders management > Settings > Affiliates**.

---

## VTEX Notification Payload

| Field | Description |
|---|---|
| `idSKU` | SKU ID in VTEX |
| `productId` | Product ID in VTEX |
| `an` | Seller's VTEX account name |
| `idAffiliate` | Affiliate ID |
| `DateModified` | Date of the update |
| `isActive` | `false` = deactivated → zero inventory and block (or delete) in marketplace |
| `StockModified` | Inventory changed → run Fulfillment Simulation |
| `PriceModified` | Price changed → run Fulfillment Simulation |
| `HasStockKeepingUnitModified` | Product/SKU data changed (name, description, weight, etc.) |
| `HasStockKeepingUnitRemovedFromAffiliate` | Product no longer in trade policy → block or delete from marketplace |

> Also implement an **independent inventory polling mechanism** as a fallback, so stocks are always current even if a notification is missed.

---

## Price Update Flow

1. Validate VTEX ↔ Marketplace authentication — if expired, refresh; otherwise log error and queue notification
2. After receiving notification:
   - a. Check which store via `an` parameter
   - b. If `HasStockKeepingUnitModified = true` → register or update in marketplace
   - c. Get SKU details: `GET /api/catalog_system/pvt/sku/stockkeepingunitbyid/{skuId}?sc={tradePolicyId}`
   - d. Validate product is active (`isActive` via Get Product by ID)
   - e. Validate product is associated with the integration's trade policy (`salesChannel`)
   - f. Validate SKU conforms to marketplace product registration rules
   - g. Validate category is mapped → if not, queue until mapping is complete
   - h. Run Fulfillment Simulation (without postalCode):
     - `price` — product price
     - `salesprice` — sales price with trade policy promotions/discounts applied
3. Send updated price to marketplace
4. Log operation

---

## Stock Update Flow

Same notification payload and authentication flow as price updates.

After receiving `StockModified = true`:

1. Validate authentication
2. Run Fulfillment Simulation (without postalCode)
   - `logisticsStockBalance` — inventory level per warehouse
3. Send updated inventory to marketplace
4. Log operation

---

## API Reference

```
GET /api/catalog_system/pvt/sku/stockkeepingunitidsbysaleschannel         # List SKU IDs for sales channel
GET /api/catalog_system/pvt/sku/stockkeepingunitbyid/{skuId}?sc={scId}    # Get SKU details with trade policy
GET /api/catalog/pvt/product/{productId}                                  # Check product active status
POST /api/checkout/pub/orderForms/simulation                              # Fulfillment simulation (price + inventory)
```

> All parameters must be declared in POST requests. Send `null` for fields without a value.

---

## Architecture Recommendations

- Use **async messaging** with individual queues per context and store
- Implement **Circuit Breaker** to respect marketplace API rate limits
- Use **dead letter queues** for communication failures after retry limit
- Be a **TotalReader** — use marketplace standard values when VTEX fields are empty
- For **batch processing** — confirm products exist in marketplace before sending updates
- Maintain a **state control table**: skuId, integration status, last attempt date, response received

---

## Field Mapping Table Template

| VTEX Field | Where in VTEX | VTEX API | Marketplace Field | Transformation | Mandatory | BuyBox |
|---|---|---|---|---|---|---|
| Name | Catalog page | `/api/catalog/pvt/stockkeepingunit` | ShortName | Max 50 characters | Yes | Yes |

Include in connector documentation:
- All field mappings with limitations and transformations
- Mandatory vs recommended fields for product/SKU registration
- Known error logs with user-actionable resolution steps

---

## Documentation

- [External Marketplace — Catalog Integration](./external-marketplace-catalog-integration.md)
- [External Marketplace — New Products & Updates](./external-marketplace-new-products.md)
- [External Marketplace — Catalog Logs](./external-marketplace-catalog-logs.md)
- [External Marketplace Integration](./external-marketplace-integration.md)
