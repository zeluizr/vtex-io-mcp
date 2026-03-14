# Store Architecture

Store architecture diagrams represent the fundamental structure of a particular project, providing a unified vision for all stakeholders and translating business needs into software components and project requirements.

Store architectures define roles and responsibilities among all stakeholders and explain how different systems interoperate and how data is transmitted between them.

> Except for the Headless architecture, the following models consider Store Framework as the storefront solution.

## Business-to-customer (B2C)

The most common business model among VTEX clients and serves as a foundation for other models.

Main characteristics:
- Pink-highlighted components are offered out-of-the-box (OOTB) by VTEX
- Also includes integrations from client's internal back-office systems or third-party providers
- **Asynchronous calls** (black arrows): not real-time, e.g., stock update from ERP to Inventory module
- **Synchronous calls** (blue arrows): real-time, e.g., payment rates update during checkout

## Business-to-business (B2B) with B2B Suite

Main characteristic: transactions occur between two or more legal entities.

The main account acts as a marketplace for other VTEX sellers.

**B2B Suite** is a set of VTEX IO apps for B2B store management:
- Manage organizations (companies enabled to purchase in the store)
- Offer specific price tables, collections, and custom payment methods per organization
- Different user roles within organizations
- Real-time synchronous communication between B2B Suite and sellers (for surcharge and tax calculations at checkout)

**Module ownership in B2B:**
- Main account has access to more modules than sellers
- Shared modules: OMS, Catalog
- Master Data stays with sellers (customer approvals handled at seller level)

### Why choose B2B architecture?
- Streamlined organization management from a centralized platform
- Customized user experience per organization (pricing, payment methods, product catalogs)
- Enhanced security with roles and permissions (Storefront Permissions app)
- Optimized quoting system (B2B Quotes app)
- Efficient order processing with shared shipping addresses for cost centers

## Franchise accounts (omnichannel)

Integrates physical stores with online stores as franchise accounts on VTEX.

**Franchise account characteristics:**
- **No separate website**: Operates within the main account's ecommerce site as part of a marketplace
- **Customer data**: Stored in the main account's Master Data
- **Seller type**: Automatically operates as a white-label seller within the main account
- **Catalog**: Inherited from the main account
- **Logistics and OMS**: Each franchise has its own logistics settings and order management
- **Prices and payments**: Can have its own or inherit from the main account
- **Promotions**: Can be created for each franchise and for the main account

**Best for:** Brands with multiple physical stores, franchises, or representatives.

### Why choose franchise/omnichannel architecture?
- Reduces out-of-stock percentage
- More shipping options, potentially lower logistics costs
- Physical stores can be configured as pickup points
- Physical stores can operate as small warehouses (ship-from-store strategy)
- Supports Endless Aisle strategy through VTEX Sales App

## Multi-language and multi-currency

### Single account, multi-binding

A single VTEX account configured to support multiple languages and currencies using a multi-domain approach.

**Characteristics:**
- Single account, each store with its own domain bound to different trade policies via bindings
- Same search settings for all websites
- Shared CMS across websites
- Single Master Data for all stores
- Single catalog segmented by trade policies
- Each store manages logistics through different warehouses in the same panel
- Unified OMS panel for all stores
- Shared payment settings
- Different prices/promotions per trade policy, managed in the same panel
- Single Message Center for all stores

**Best for:** Operations across multiple countries managed by a single, centralized team that need different languages and currencies but not data segregation.

> Product names are NOT translated on Checkout and My Account pages (these modules call the Catalog API directly, bypassing the Messages API).

### Multi-account

A brand operates multiple VTEX accounts, typically one per country or market. Each can be localized and managed independently.

**Best for:** Businesses in multiple countries needing different languages and currencies with different teams managing each store.

**Advantages over single account:**
- Supports single-fulfillment and multi-fulfillment
- Facilitates multi-language/multi-currency by using the main account as catalog owner and country accounts as marketplaces
- Supports independent catalog translations without relying on Messages or Catalog translation app

#### Multi-account, shared back-office systems

Main account acts as a seller in secondary accounts that act as marketplaces.

**Characteristics:**
- Separate VTEX account per store
- Separate website per store
- Customer data segregated by marketplace account (not stored in main account's Master Data)
- Promotions: limited in main account (no access to marketplace customer data)
- Checkout, OMS, Payments, Message Center: managed independently per store
- Catalog, Pricing, Logistics: main account is source of truth, but management is independent

> Assembly options and services are not supported. Attachments only work if configured in the seller account.

#### Multi-account, independent back-office systems

Each country/region operates with its own back-office for greater operational and integration autonomy.

**Characteristics:**
- Separate VTEX account per store
- Separate website per store
- Customer data segregated by account (not shared between accounts)
- Different promotions per store
- All modules (Checkout, OMS, Payments, Catalog, Pricing, Logistics) managed independently per account
- Integrations not shared between accounts

## Headless

Frontend (head) is decoupled from the backend. The UI can be built with any technology while the backend supplies data and functionality.

- **Frontend layer**: Font type, colors, styles, images, buttons, UI components
- **Backend layer**: Pricing, infrastructure, security, checkout, commerce functionality

VTEX's native headless solution: **FastStore** (Jamstack-based).

For stores using a third-party CMS, VTEX APIs can be used to build a headless shopping experience.

### Why choose headless architecture?
- **Flexibility**: Complete ownership of website architecture
- **Faster websites**: Content delivered via APIs, faster than traditional ecommerce architecture
- **Personalized experiences**: Fully customizable look and feel
- **Low-risk experimentation**: Frontend changes don't impact backend architecture
- **Seamless integration**: Integrate existing systems (ERP, PIM, OMS) with any programming language

---

Source: https://developers.vtex.com/docs/guides/store-architecture
