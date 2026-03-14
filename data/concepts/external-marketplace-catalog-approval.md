# External Marketplace — Catalog Mapping & SKU Approval

Final configuration steps after building the seller integration connector.

## Step 1 — Map Brands, Categories, and Specifications

For external seller offers to integrate into a VTEX marketplace, its brands, categories, and specifications must be mapped to the marketplace's catalog structure. Without this mapping, the marketplace cannot classify the seller's SKUs.

Performed in the marketplace's management panel: **Catalog > (Received SKUs or Brands/Categories mapping section)**

---

## Step 2 — Approve Seller SKU Offers

Sellers' SKUs are not added directly to the marketplace catalog. Each new SKU goes through an approval step:

1. Seller sends the SKU as a **suggestion** via the `PUT` Send SKU Suggestion endpoint
2. Marketplace reviews suggestions in the **Received SKUs panel**
3. Marketplace approves or denies each suggestion (individually or in bulk)
4. Approved suggestions become registered SKUs in the marketplace catalog

> Denied or pending suggestions can be resubmitted by the seller. Once approved, only the marketplace can edit the resulting SKU registration.

---

## Documentation

- [External Marketplace — Connector](./external-marketplace-connector.md)
- [External Marketplace — Catalog Integration](./external-marketplace-catalog-integration.md)
- [External Marketplace — Catalog Mapping](./external-marketplace-catalog-mapping.md)
- [Catalog Overview](./catalog-overview.md)
