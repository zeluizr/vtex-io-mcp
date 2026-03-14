# Composability

Composability in ecommerce allows merchants to build and customize online shopping experiences by combining modular components or services. A composable commerce platform consists of loosely coupled microservices, enabling merchants to:

- Choose which services to use
- Choose alternative service providers
- Customize services

## VTEX: Composable and complete

VTEX provides **composability** by:

- Allowing businesses to choose and customize services and integrations
- Supporting native services and third-party providers

VTEX offers a **complete** platform through:

- Core modules that support running a full ecommerce operation
- Multiple combinations of native services, extensions, integrations, and add-ons
- Development frameworks for creating custom solutions

Key composable features:

- 750+ API endpoints
- 900+ live connections, including payment providers and marketplaces
- No-code extensibility through the VTEX Admin
- Services that emit events and logs
- 70+ decoupled microservices
- Headless commerce support
- Multi-tenant infrastructure
- Auto-scalable servers
- Extensible VTEX IO apps
- Documented integration protocols
- Customizable and extensible data models

## Pragmatic Composability

Pragmatic Composability is the architectural approach that empowers merchants to leverage VTEX's native services for core needs and selectively compose custom-built and best-of-breed applications.

Merchants can choose how composable their stores will be — completely native, full of integrations, or something in between. There are four main composability models:

### 1. Complete Platform

Uses mostly VTEX's native features, including frontend application, CMS, Search, commerce modules, and APIs.

- **Pros**: Quickest time to market, lowest total cost of ownership, no additional integration costs
- VTEX handles all maintenance and updates of native modules
- Frontend and backend customizations available via VTEX IO

### 2. Headless Commerce

Uses a Digital Experience Platform (DXP) decoupled from the native commerce infrastructure. A single DXP provider handles the Storefront Application, Frontend Infrastructure, CMS, and Search & Personalization.

- Good option for building a store's frontend from scratch
- VTEX offers [FastStore](https://developers.vtex.com/docs/guides/faststore/docs-what-is-faststore) as a native headless storefront option

### 3. Frontend as a Service (FEaaS)

Ideal for companies using a specific search solution or CMS that they want to reuse across several channels.

- Common when a company already uses a specific search provider or CMS before migrating to VTEX
- Combines a third-party FEaaS provider with independent CMS and search solutions
- Can become more expensive due to multiple systems to orchestrate

### 4. Best of Breed

Maximum composability and flexibility. Each commerce module uses a best-of-breed provider.

- Appropriate when merchants want complete control over deployment and infrastructure
- Higher implementation time, increased costs
- Requires development of an API Gateway or Backend for Frontend (BFF) layer
- Projects may take years to implement, but modules can be progressively integrated
- VTEX has native solutions for each module, enabling faster time to market

> ℹ️ Choosing a model at the beginning does not exclude the possibility of changing the architecture later. Adding new features and decoupling functions with third-party integrations is always possible.

## Store Architecture Models

For details of architectures in specific scenarios, see the [Store Architecture](https://developers.vtex.com/docs/guides/store-architecture) guide.

---

Source: https://developers.vtex.com/docs/guides/composability
