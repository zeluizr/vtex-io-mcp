# External Marketplace — VTEX Seller Setup

For a VTEX store to act as a seller in an external marketplace, three steps are required:

1. Define channel settings (Trade Policy)
2. Set up catalog notifications (Affiliate)
3. Set up API authentication credentials

At the end, share these four pieces of information with the external marketplace connector:

- **Account Name**
- **Affiliate ID**
- **API Credentials** (appKey / appToken)
- **Trade Policy ID**

---

## Step 1 — Define Channel Settings (Trade Policy)

[Trade policies](https://help.vtex.com/en/tutorial/creating-a-trade-policy--563tbcL0TYKEKeOY4IAgAE) group catalog, pricing, promotions, inventory, shipping, and payment settings for a specific sales channel.

Create or identify the trade policy that will represent this external marketplace. Note the **Trade Policy ID**.

### Catalog

Products can be restricted to specific trade policies. If no restriction is set, the product is available in all channels.

### Pricing

Each trade policy has its own price table. Differentiate prices using:
- **Price rules** — apply a different markup per category or brand
- **Fixed prices** — set a specific price per SKU for this trade policy

### Promotions

Promotions for a seller must have origin set to **Fulfillment / Delivered by me**. They can be restricted to specific trade policies.

### Inventory

Warehouses connect to loading docks. Loading docks are linked to trade policies. Inventory is available in a trade policy only when the warehouse → loading dock → trade policy chain is complete.

### Shipping

Shipping policies connect to loading docks. Loading docks are linked to trade policies. Carriers and pickup points are available in a trade policy only when the shipping policy → loading dock → trade policy chain is complete.

### Payment

Payment conditions can be restricted to specific trade policies via special conditions.

---

## Step 2 — Set Up Catalog Notifications (Affiliate)

**Affiliates** broadcast catalog change notifications (product info, price, inventory) to external marketplaces.

Create an affiliate: **Orders > Orders management > Settings > Affiliates > New affiliate**

| Field | Description |
|---|---|
| **Name** | Marketplace display name in orders management |
| **ID** | 3-consonant identifier used in marketplace order IDs |
| **Trade Policy** | ID of the trade policy configured in Step 1 |
| **E-mail for notifications** | Email to receive error notifications |
| **Search Endpoint** | URL of the marketplace endpoint that receives catalog notifications |

> The **Search Endpoint** can be filled in later if the connector is still under development.

Note the **Affiliate ID** after creation.

---

## Step 3 — Set Up API Authentication Credentials

Create an **appKey / appToken** pair with the **IntegrationProfile - Fulfillment Gateway Oms** role (or equivalent).

Path: **Account Settings > Application Keys > New application key**

> The appToken is shown **only once** at creation. Save it securely and share only with the external marketplace.

---

## Documentation

- [External Marketplace Integration](./external-marketplace-integration.md)
- [External Marketplace — Architecture](./external-marketplace-architecture.md)
- [Authentication](./authentication.md)
- [Marketplace Overview](./marketplace-overview.md)
