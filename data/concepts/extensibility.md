# Extensibility

VTEX is a complete platform that, out of the box, offers all the features needed to run an ecommerce operation. The platform is also extensible, providing multiple ways to extend its basic functionality, including integrating third-party solutions and developing custom applications.

Extensibility is divided into four areas:
- Data services
- Commerce APIs
- Development platform
- Composable SaaS

## Data services

[Master Data](https://help.vtex.com/en/tutorial/master-data--4otjBnR27u4WUIciQsmkAw) is a key-document database solution that enables merchants to store, search, expand, and customize data.

**Advantages:**
- **Native VTEX solution**: No need to integrate an external database
- **Scalable**: Store data as needed without usage limits
- **No additional costs**: VTEX does not charge extra for Master Data usage

**Versions:** Master Data v1 (graphical UI) and Master Data v2 (JSON schemas via API). By default, Master Data v1 stores customer data.

**Three main data concepts:**
- **Data entities**: Definition of data structures (like a table). Each has a name and stores a data type. Example: CL entity stores store customer data in v1.
- **Documents**: Table rows, records of the data entity. Each document represents one customer in the CL entity.
- **Fields**: Table columns, properties of the data entity. CL entity has fields: name, ID number, email, phone number.

### New entities and data schemas

Master Data comes with default data entities for basic ecommerce operations and allows customization:

- **v1**: Create and edit data entities using the UI
- **v2**: Create and edit data schemas through the API using JSON schemas

**Data entity capabilities:**

| Capability | Description | Availability |
|------------|-------------|--------------|
| Define data entity name | Set the name (and acronym in v1 — two capital letters, e.g., `AD` for Address) | v1, v2 |
| Define fields and properties | v1: UI-based field definition with type, nullable, searchable, filterable. v2: JSON schema validation invalidates requests with wrong types | v1, v2 |
| `id` field generation | How v1 generates the `id` field: GUID, sequential numeric, or manually entered | v1 only |
| Index or alternate keys | Additional fields that work as an index, allowing document retrieval without `id` | v1, v2 |
| Default fields | Fields shown when reading a document or searching without `_fields` query parameter | v2 only |
| Public fields | Fields accessible without authentication (useful for storefront public data) | v1, v2 |
| Inherit schema | Data entity inherits schemas from other data entities | v2 only |
| Triggers | Automatic custom actions triggered by specific events | v1, v2 |

### Endpoints to read and write data

Master Data has complete CRUD functionality:

| Endpoint | Method | Description |
|----------|--------|-------------|
| Create new document | POST | Create a new document in the chosen data entity |
| Create partial document | PATCH | Create a new document with partial data |
| Get document | GET | Retrieve a document by `id` |
| Create document with custom ID or update entire document | PUT | Create with specific `id`, or replace entire document if `id` exists |
| Update partial document | PATCH | Update only declared fields; other fields keep their values |
| Delete document | DELETE | Delete the document with the given `id` |
| Search documents | GET | Retrieve a list of documents with filters (schemas, indexed fields) |
| Scroll documents | GET | Retrieve a large amount of documents with filters |

All endpoints are available in both v1 (`/api/dataentities/{acronym}/...`) and v2 (`/api/dataentities/{dataEntityName}/...`).

### Triggers

A Master Data Trigger performs an action after creating or updating a document if configured conditions are met.

**Possible trigger actions:**
- Send an HTTP request
- Send an email
- Save a document in another data entity

**Configuration:**
- **v1**: Configure triggers from the UI — see [How to create a trigger in Master Data v1](https://help.vtex.com/en/tutorial/creating-trigger-in-master-data--tutorials_1270)
- **v2**: Configure triggers in the `v-triggers` field in a JSON Schema of the data entity — see [Setting up triggers in Master Data v2](https://developers.vtex.com/docs/guides/setting-up-triggers-on-master-data-v2)

### Custom Master Data apps with VTEX IO

By developing an IO app, you can create a solution that uses Master Data APIs through [clients](https://developers.vtex.com/docs/guides/vtex-io-documentation-clients). This keeps development environment, code, and Master Data all inside VTEX.

Basic steps: clone boilerplate → define policies → add client → create middleware functions.

Guides:
- [Interacting with Master Data v1 through VTEX IO services](https://developers.vtex.com/docs/guides/interacting-with-master-data-v1-through-vtex-io-services)
- [Create a Master Data CRUD app](https://developers.vtex.com/docs/guides/create-master-data-crud-app) (for v2)

## Commerce APIs

VTEX is an API-first ecommerce platform with 750+ API endpoints. These endpoints provide extensibility options through third-party integrations or custom solutions developed with VTEX IO.

See: [API reference](https://developers.vtex.com/docs/api-reference) and [List of REST APIs](https://developers.vtex.com/docs/guides/getting-started-list-of-rest-apis).

### Endpoints to read and write data

The main category of endpoints. Used for all commerce operations:
- Create product categories
- Read order details
- Update shipping policies
- Delete SKU prices
- And more

Commonly used in back-office integrations (ERP, PIM) to import data to VTEX or control data through back-office software.

### Hooks and Feeds for orders

Allow communication through events for integrating back-office software with VTEX OMS.

**Feed v3**: List of events with order updates. Back-office software queries the list, processes orders, then removes items from the list.

**Hook**: Channel for automatically receiving notifications about order updates. Back-office software provides an endpoint; VTEX sends notifications when order updates occur.

Order processing operations: canceling, changing items, issuing invoices.

See: [Orders Feed](https://developers.vtex.com/docs/guides/orders-feed) and [Set up order integration](https://developers.vtex.com/docs/guides/erp-integration-set-up-order-integration).

### Extension points to change data flow

#### Hubs

Central access points for multiple providers, allowing selection of a service provider. Example: **Gift Card Hub** allows interaction with VTEX Gift Card Provider and external providers.

#### Protocols

Rules defined by VTEX that allow external providers to implement their solutions. VTEX calls the provider's endpoints to access their solution.

**Example**: In a payment integration, the VTEX Payment Gateway calls the payment provider's endpoints (authorization, settlement, cancellation, refund).

**Available protocols:**

| Protocol | Use case |
|----------|----------|
| [Payment Provider Protocol](https://developers.vtex.com/docs/guides/integrating-a-new-payment-provider-on-vtex) | Integrate payment providers |
| [Antifraud Provider Protocol](https://developers.vtex.com/docs/guides/how-the-integration-protocol-between-vtex-and-antifraud-companies-works) | Integrate anti-fraud providers |
| [Gift Card Provider Protocol](https://developers.vtex.com/docs/api-reference/giftcard-provider-protocol) | Integrate gift card providers |
| [Search Protocol](https://developers.vtex.com/docs/guides/external-search-provider-overview) | Integrate external search engines |
| [External Marketplace](https://developers.vtex.com/docs/guides/external-marketplace-integration-guide) | Integrate as an external marketplace |
| [External Seller](https://developers.vtex.com/docs/guides/external-seller-integration-guide) | Integrate as an external seller |
| [Tax Service](https://developers.vtex.com/docs/guides/tax-service-integration-guide) | Integrate tax calculation services |
| [Login integrations](https://developers.vtex.com/docs/guides/login-integration-guide) | Integrate identity providers |
| [Pick and Pack Last Mile Protocol](https://developers.vtex.com/docs/guides/vtex-pick-and-pack-carriers-integration-protocol) | Integrate last-mile carriers |

## Development platform

[VTEX IO](https://developers.vtex.com/docs/guides/vtex-io-documentation-what-is-vtex-io) is VTEX's development platform for creating low-code custom solutions for both frontend and backend.

**Technologies supported:** TypeScript, React, GraphQL, .NET, Node.js

**Infrastructure:** Cloud-native with automatic scaling — developers focus on business logic, not infrastructure.

### Frontend

- **Storefront apps**: Created using Store Framework. Can be a store theme (defines frontend structure) or a collection of frontend components for specific shopping experience parts
- **Admin apps**: Apps with at least one Admin panel, used by store operators to configure and manage the shopping experience. Supports tables, dashboards, property fields (text, number, radio lists, etc.)

### Backend

- **Services**: Backend apps running on Node.js or .NET. Expose functions via REST or GraphQL APIs
- **Clients**: Used by IO apps to make API requests (REST and GraphQL). Enable access to VTEX commerce APIs, external endpoints, and other apps. Developers must declare required [policies](https://developers.vtex.com/docs/guides/vtex-io-documentation-policies)
- **Pixel apps**: Run scripts on store website pages for sales tracking, user support, and marketing services

## Composable SaaS

VTEX is a composable platform for building commerce experiences by combining pre-built components.

### VTEX IO apps

Enclosed solutions created with VTEX IO that extend VTEX platform functionalities. Developers can publish and distribute apps; merchants can install at will.

**Examples of IO app solutions:**
- Frontend components
- Additional shopping experiences
- Payment connectors
- Marketing and analytics tools

Install using [VTEX IO CLI](https://developers.vtex.com/docs/guides/vtex-io-documentation-vtex-io-cli-installation-and-command-reference).

> Always read app documentation before installation to avoid undesired behavior.

### App Store apps

Plug-and-play apps from the [VTEX App Store](https://apps.vtex.com). Merchants can install with just a few steps, without code interaction.

**Available functionalities:**
- Social marketing integrations
- Data collection and analytics
- Marketplace integrations
- Gift lists
- And more

---

Source: https://developers.vtex.com/docs/guides/extensibility
