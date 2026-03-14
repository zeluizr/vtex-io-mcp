# VTEX Composable Components

Various components are available in a VTEX store to fulfill the multiple types of digital commerce businesses.

Component types:
- **Built-in**: Comes installed out-of-the-box
- **Plug-and-play**: Does not come installed, but can be installed with a few steps
- **Requires implementation**: Needs more complex configuration or a development stage

## Commerce Platform

### Digital Commerce

| Component | Description | Type |
|-----------|-------------|------|
| Catalog | Manage category tree, brands, products, SKUs, and specifications. Available via Admin, Catalog API, spreadsheet import, or back office integration. | Built-in |
| Price | Manage price details for SKUs. Supports fixed prices or context-based prices (trade policies, customer groups, promotions). Includes Pricing Hub for external price platforms. | Built-in |
| Promotions | Manage discounts applied to shopping carts, including product discounts, bundles, shipping, coupons. Available via Admin or Promotions & Taxes API. | Built-in |
| Checkout | Manages the shopping cart, coordinating Catalog, Price, Promotions, Logistics, and Payments. Supports custom solutions via Checkout API, VTEX IO, or headless implementation. | Built-in |
| Payment Gateway | Configures payment conditions and manages transactions. Merchants can choose their payment processing providers. Supports anti-fraud providers, Customer Credit, digital wallets, and gift cards. | Built-in |
| Channel Management | Supports Unified Commerce strategies integrating multiple sales channels (website, physical stores, Sales App). Supports Marketplace strategies. | Built-in |
| B2B Organizations | VTEX IO app from B2B Suite. Groups B2B users into organizations with custom payment methods, product selections, and prices. Each organization is segmented into cost centers. | Plug-and-play |
| B2B Quotes & Carts | VTEX IO app from B2B Suite. Allows B2B users to create quotes and save carts, enabling price negotiations and order approval flows. | Plug-and-play |

### Experience Management

| Component | Description | Type |
|-----------|-------------|------|
| Headless CMS | Part of FastStore toolkit. Allows merchants to store content in a decoupled data layer delivered as structured data via API. | Requires implementation |
| Intelligent Search | Native VTEX search solution. Features include autocomplete, filters, synonyms, and relevance rules. Works across all channels. | Plug-and-play |
| Storefront Application | Options include Store Framework (composable commerce) and FastStore (performance-focused). Custom solutions possible via APIs. | Requires implementation |
| PWA Application | Progressive Web Application natively available for every VTEX IO store. Supports push notifications. | Built-in |

### Distributed Order Management

| Component | Description | Type |
|-----------|-------------|------|
| Inventory Management | View SKU inventory data and define quantities in warehouses. Supports spreadsheet import and Logistics API integration. | Built-in |
| Logistics | Manages transportation, storage, and order shipping. Main configuration is the Shipping strategy (shipping policies, warehouses, loading docks). | Built-in |
| Shipping Network | Add-on for connecting carriers to create an integrated delivery network. Shows order tracking data. Available only in Brazil. | Plug-and-play, additional costs |

### Marketplace Management

| Component | Description | Type |
|-----------|-------------|------|
| Seller Management | Add sellers, enter their information, and manage their status. Supports VTEX sellers and external sellers. | Built-in |
| Offer Quality & Management | Track sending and syncing of offers on all sales channels. Supports Mercado Libre, Netshoes, and VTEX marketplaces. | Built-in |
| Seller Portal | Edition of the VTEX platform for sellers to connect and sell on marketplaces. Includes catalog, prices, logistics, and order management. | Built-in |
| Marketplaces and Integrations | Catalog of companies interested in partnerships. Enables integration between marketplaces and sellers. | Built-in |

## Platform Interaction

### VTEX Admin

| Component | Description | Type |
|-----------|-------------|------|
| Dashboards | Centralizes dashboard pages: Overview (sales metrics, conversion rate), Sales Performance (order data), Web Page Performance (Google PageSpeed Insights). | Built-in |
| Releases | FastStore feature for managing store changes. Includes Releases page and Calendar page. | Built-in, after installing FastStore |
| User & Account Management | Manage VTEX account details and Admin users with role assignments. | Built-in |
| Extensions Hub | Centralizes extension management. Includes App Store (acquire apps) and App Management (manage installed apps). | Built-in |

### Developer Tooling

| Component | Description | Type |
|-----------|-------------|------|
| VTEX IO Storefront Platform | **Store Framework**: React/TypeScript/Node.js/GraphQL-based framework using composable blocks. **FastStore**: Open-source toolkit based on React and Jamstack architecture. | Built-in |
| APIs | 750+ REST API endpoints across 70+ microservices. Requires authentication with keys or tokens. IO apps use clients to access APIs. | Built-in |
| Master Data Management | Highly customizable database platform for storing, searching, and customizing data. v1 (graphical interface) and v2 (JSON schemas). Supports triggers for custom behaviors. | Built-in |
| VTEX IO App Platform | Development platform for building, managing, installing, and deploying apps. Supports storefront themes, Admin apps, and backend services. | Built-in |

## Integrations

| Component | Description | Type |
|-----------|-------------|------|
| ERP | Enterprise Resource Planning. Integrates via Catalog, Pricing, Logistics, and Orders APIs. Two phases: initial setup (product data import) and middleware setup (order processing). | Plug-and-play if implemented |
| OMS/WMS | Order Management System / Warehouse Management System. Supports Feed (queue reading) and Hook (automatic notifications) for order events. | Plug-and-play if implemented |
| PIM/CPQ | Product Information Manager / Configure Price Quote. PIM integrates via Catalog API; CPQ integrates via Pricing API. | Plug-and-play if implemented |
| CRM | Customer Relationship Management. Integrates customer data via Master Data v1 API. | Plug-and-play if implemented |
| Third-Party Marketplaces | Sellers can offer products on external marketplaces via custom connectors. VTEX provides APIs and integration guides. | Plug-and-play if implemented |
| Search & Personalization | Third-party search solutions integrate via the Search Protocol (GraphQL schemas). Compatible with VTEX Store Framework. | Plug-and-play if implemented |
| Marketing & Analytics | Provided as VTEX IO apps. Pixel apps run scripts on all store pages for tracking and marketing integrations. | Plug-and-play if implemented |
| Payments | Payment providers integrate via Payment Provider Protocol. Merchants need a contract with the provider and configure via Admin. | Plug-and-play if implemented |
| Carriers | Delivery companies. Added via shipping policies or VTEX Shipping Network (Brazil only). Dedicated carrier apps available in App Store. | Plug-and-play |
| Third-party Sellers | External sellers integrate to sell on VTEX marketplaces via custom connectors. See External Seller integration guide. | Requires implementation |

## Add-ons

Add-ons are additional solutions offered by VTEX purchased separately through a subscription agreement.

| Component | Description |
|-----------|-------------|
| Sales App | Main solution for Unified Commerce. Mobile app enabling sales associates to serve customers in physical stores. |
| Live Shopping | Interactive ecommerce combining livestreaming and online shopping. Real-time interaction, personalized content, analytics. |
| Personal Shopper | One-to-one video chats with customers for product demonstration and direct add-to-cart. |
| Assisted Sales (SuiteShare) | Marketing platform for WhatsApp. Organizes customer support, integrates with CRMs. Based on official WhatsApp API. |
| Pick and Pack | Manages order fulfillment (picking, packing, delivery). Includes Fulfillment app, Last Mile app, and mobile applications. |
| VTEX Shield | Additional customizable protection layers for stores prioritizing platform resilience. |
| Ad Network | Connects VTEX stores with brands interested in advertising their products. |

---

Source: https://developers.vtex.com/docs/guides/vtex-composable-components
