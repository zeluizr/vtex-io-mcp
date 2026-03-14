# Marketplace Overview

A marketplace is the environment where sellers expose their products and consumers make purchases. Sellers own the products and are responsible for delivery. On VTEX, every store can be both a marketplace and a seller simultaneously.

## Architecture

| Term | Description |
|---|---|
| **VTEX Marketplace** | Store hosted on VTEX responsible for product sales, checkout, and payment |
| **External Marketplace** | Showcase store hosted on non-VTEX platforms, responsible for sales, checkout, and payment |
| **VTEX Seller** | Store hosted on VTEX that owns products and fulfills orders |
| **External Seller** | Store on another platform (or no platform) that owns products; a VTEX marketplace can integrate it to offer its products |

Every VTEX store is automatically a seller in its own marketplace and can connect to other VTEX marketplaces (native) or external certified marketplaces without additional development.

## Configuring a VTEX Marketplace

API-configurable actions:

- Adding sellers (see below)
- Configuring seller selection at checkout
- Configure storefront
- Configure payments

## Integrating External Marketplaces or Sellers

The **Marketplace Protocol** is a set of API definitions for cross-platform integration:

- **External seller protocol** — If you are a VTEX marketplace integrating offers from an external seller → [External Seller Integration Guide](https://developers.vtex.com/docs/guides/external-seller-integration-guide)
- **External marketplace protocol** — If you are an external marketplace integrating with VTEX sellers → [External Marketplace Integration Guide](https://developers.vtex.com/docs/guides/external-marketplace-integration-guide)

## Step 1: Marketplace — Adding Sellers

### Via Seller Portal (VTEX ↔ VTEX)

The [Seller Portal](https://help.vtex.com/en/tutorial/seller-portal-primeiros-passos-para-o-marketplace--6ccErY3mCcfoW0qGXf167) is a VTEX edition for fast marketplace integration. Customized versions can be built using the Seller Portal Edition App.

**Onboarding flow (marketplace actions):**

```
POST /seller-register/pvt/seller-leads           # Invite Seller Lead
PUT  /seller-register/pvt/seller-leads/{id}      # Accept Seller Lead
PUT  /seller-register/pvt/seller-leads/{id}/seller  # Create Seller from Lead
```

Other seller lead endpoints:
- `GET /seller-register/pvt/seller-leads` — List all invited sellers
- `GET /seller-register/pvt/seller-leads/{id}` — Get seller lead data
- `PUT /seller-register/pvt/seller-leads/{id}/status` — Resend invite
- `DELETE /seller-register/pvt/seller-leads/{id}` — Delete invite (if not yet accepted)

### Via VTEX Commerce (account management)

```
POST  /seller-register/pvt/sellers                        # Configure Seller Account
PATCH /seller-register/pvt/sellers/{sellerId}             # Update Seller
PUT   /seller-register/pvt/sellers/{sellerId}/sales-channel/mapping  # Upsert Sales Channel Mapping
GET   /seller-register/pvt/sellers                        # List Sellers
GET   /seller-register/pvt/sellers/{sellerId}             # Get Seller by ID
GET   /seller-register/pvt/sellers/{sellerId}/sales-channel/mapping  # Get Sales Channel Mapping
```

### Seller Commissions

```
PUT    /seller-register/pvt/sellers/{sellerId}/commissions/categories       # Bulk upsert (all categories)
PUT    /seller-register/pvt/sellers/{sellerId}/commissions/{categoryId}     # Upsert by category
GET    /seller-register/pvt/sellers/{sellerId}/commissions                  # List commissions
GET    /seller-register/pvt/sellers/{sellerId}/commissions/{categoryId}     # Get by category
DELETE /seller-register/pvt/sellers/{sellerId}/commissions/{categoryId}     # Remove by category
```

## Step 2: Sending and Managing Suggestions

When a seller suggests their SKU to a marketplace:

```
GET /catalog/pvt/skusellers/{skuId}                      # Check if SKU already exists in marketplace
PUT /suggestions/{sellerId}/{sellerSkuId}                 # Send SKU Suggestion
DELETE /suggestions/{sellerId}/{sellerSkuId}              # Delete SKU Suggestion (marketplace)
```

## Step 3: Marketplace — Cataloging Offers

Suggestions become **offers** after marketplace approval. Cataloging can be:
- **Manual** — via VTEX Admin Received SKUs page
- **Automatic** — via VTEX Matcher (scoring-based) or external matchers

### Matching

```
PUT /suggestions/{sellerId}/{skuId}/versions/{version}/matches/{matchId}   # Match individually
PUT /suggestions/matches/action/{actionName}                                # Match in bulk
```

### autoApprove

```
PUT /suggestions/configuration/autoapproval/toggle                          # Activate autoApprove (all sellers)
GET /suggestions/configuration                                              # Get approval settings
PUT /suggestions/configuration                                              # Save approval settings
GET /suggestions/configuration/autoapproval/toggle                         # Get autoApprove status
PUT /suggestions/configuration/autoapproval/toggle/seller/{sellerId}       # Activate for specific seller
GET /suggestions/configuration/seller/{sellerId}                           # Get seller's approval settings
PUT /suggestions/configuration/seller/{sellerId}                           # Save seller's approval settings
```

## Step 4: Managing Catalog

### Marketplace — Query suggestions and offers

```
GET /suggestions                                                    # Get all suggestions
GET /suggestions/{sellerId}/{sellerSkuId}                          # Get suggestion by ID
GET /suggestions/{sellerId}/{skuId}/versions                       # Get all versions
GET /suggestions/{sellerId}/{skuId}/versions/{version}             # Get version by ID
GET /offer-manager/pvt/offers                                      # Get matched offers list
GET /offer-manager/pvt/product/{productId}/sku/{skuId}            # Offers by SKU ID
GET /offer-manager/pvt/product/{productId}                         # Offers by Product ID
```

### Seller — Notify marketplace of updates

```
POST /notificator/{sellerId}/changenotification/{skuId}/price      # Notify price update
POST /notificator/{sellerId}/changenotification/{skuId}/inventory  # Notify inventory update
```

## Step 5: Seller — Offer Management

[Offer Management](https://help.vtex.com/en/tutorial/offer-management--7MRb9S78aBdZjFGpbuffpE) gives sellers visibility into product submission to external channels, helping identify and resolve errors during the sending process.

For connector implementation, see the [Offer Management Integration Guide](https://developers.vtex.com/docs/guides/sent-offers-integration-guide-connectors).

## Documentation

- [Platform Overview](./platform-overview.md)
- [Catalog Overview](./catalog-overview.md)
- [Authentication](./authentication.md)
- [API Reference List](./api-reference-list.md)
