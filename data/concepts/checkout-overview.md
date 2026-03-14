# Checkout Overview

VTEX stores include a native Checkout UI out of the box. The platform supports extensive customization and integration options for the checkout experience.

## Customizing the Checkout UI

| Resource | Description |
|---|---|
| Checkout UI Custom app | `vtex.checkout-ui-custom` — visual customization |
| Checkout UI Settings app | `vtex.checkout-ui-settings` — configuration-based customization |
| Checkout Settings (B2B) | `vtex.b2b-checkout-settings` |
| vtex.js for Checkout | Client-side checkout data and interactions |

Key customization options:
- Custom header/footer blocks by page
- Checkout confirmation pages
- Observation field on checkout page
- Payment method names and layout
- Smart Checkout payment layout (supports animated GIF-based custom layouts)

## The `orderForm` Object

The `orderForm` is the central data structure in VTEX Checkout — it stores all cart and order context and is present in most OMS API calls.

```
GET  /api/checkout/pub/orderForm           # Get current cart or create new
GET  /api/checkout/pub/orderForm/{id}      # Get cart by ID
POST /api/checkout/pub/orderForm/{id}/formFields   # Clear orderForm messages
GET  /api/checkout/pvt/configuration/orderForm     # Get orderForm configuration
POST /api/checkout/pvt/configuration/orderForm     # Update orderForm configuration
```

Reference: [OrderForm fields overview](https://developers.vtex.com/docs/guides/orderform-fields)

## Custom Customer Information

Stores can create `custom fields` to collect additional information beyond standard `orderForm` fields.

```
PUT    /api/checkout/pub/orderForm/{id}/customData/{appId}/{appFieldName}    # Set single custom field
PUT    /api/checkout/pub/orderForm/{id}/customData/{appId}                   # Set multiple custom fields
DELETE /api/checkout/pub/orderForm/{id}/customData/{appId}/{appFieldName}    # Remove custom field
```

## Accessing Customer Information

```
GET  /api/checkout/pub/profiles?email={email}    # Get customer profile by email
POST /api/checkout/pub/orderForm/{id}/attachments/clientProfileData     # Add customer profile
POST /api/checkout/pub/orderForm/{id}/attachments/clientPreferencesData # Add preferences
POST /api/checkout/pub/orderForm/{id}/attachments/shippingData          # Add shipping address
```

## Accessing Seller Information

```
GET  /api/checkout/pub/regions/{regionId}                             # Get sellers by region/address
GET  /api/checkout/pvt/configuration/window-to-change-seller          # Get seller change window
POST /api/checkout/pvt/configuration/window-to-change-seller          # Update seller change window
```

## Shopping Cart Operations

```
GET   /api/checkout/pub/orderForm                                   # Get/create cart
POST  /api/checkout/pub/orderForm/{id}/items/removeAll              # Remove all items
PATCH /api/checkout/pub/orderForm/{id}/items                        # Update cart items
PUT   /api/checkout/pub/orderForm/{id}/items/{itemIndex}/price      # Change price (manual price)
PATCH /api/checkout/pub/orderForm/{id}/attachments/ignore-profile   # Ignore profile data
GET   /api/checkout/pub/orderForm/{id}/installments                 # Cart installments
POST  /api/checkout/pub/orderForm/{id}/attachments/marketingData    # Add marketing data (UTMs)
POST  /api/checkout/pub/orderForm/{id}/attachments/paymentData      # Add payment data
POST  /api/checkout/pub/orderForm/{id}/coupons                      # Add coupon
POST  /api/checkout/pub/orderForms/simulation                       # Cart simulation
```

Key features:
- **reCAPTCHA** — bot protection, requires implementation in integrations
- **Manual Price** — must be enabled per store configuration
- **Marketing UTMs** — tracked in `marketingData` attachment

## Shipping and Logistics

```
POST /api/checkout/pub/fulfillment/simulation    # Fulfillment simulation
GET  /api/checkout/pub/pickup-points             # List pickup points by location
GET  /api/checkout/pub/postal-code/{countryCode}/{postalCode}   # Get address by postal code
POST /api/checkout/pub/orderForm/{id}/sla        # Calculate SLA
```

Supports Global Checkout for cross-border shipping to other countries.

## Creating Orders via API

```
PUT  /api/checkout/pub/orders                              # Place order (no cart)
POST /api/checkout/pub/orderForm/{id}/transaction          # Place order from existing cart
POST /api/checkout/pub/gatewayCallback/{orderGroup}        # Process order (gateway callback)
```

Guides:
- Creating a regular order using the Checkout API
- Creating a regular order from an existing cart

## Tax Customization

Integrate an external tax calculation provider for region-specific or multi-inventory tax scenarios:

1. **Tax service overview** — understand the integration architecture
2. **Tax service specification** — configure checkout to use external tax service
3. **Tax service recipe** — step-by-step implementation
4. **Tax service reference implementation** — example implementation

## Integrating Apps with Checkout

| App | Purpose |
|---|---|
| Google Tag Manager (`vtex.google-tag-manager`) | Analytics and conversion tracking |
| Hotjar | Heatmaps and behavior analytics |
| PowerReviews | User-generated ratings and reviews |

## VTEX IO Storefront Components

Key blocks for checkout-adjacent functionality:
- `vtex.minicart` — mini shopping cart overlay
- `vtex.add-to-cart-button` — configurable add-to-cart action

## Documentation

- [Orders Overview](./orders-overview.md)
- [Platform Overview](./platform-overview.md)
- [Authentication](./authentication.md)
- [Data Privacy](./data-privacy.md)
