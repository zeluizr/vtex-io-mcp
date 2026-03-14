# External Marketplace — Integration App Template

The [mkp-app-template](https://github.com/vtex/mkp-app-template) is a pre-built VTEX IO app that reduces development time for external marketplace integrations. Apps built from this template are eligible for the VTEX App Store.

## What the Template Includes

- Standard setup page (activate/deactivate toggle, affiliate ID, email notifications, callback URL, sales channel fields)
- Custom settings page (franchise accounts toggle)
- Complete search endpoint to retrieve seller configurations using AppKey/AppToken
- Link to VTEX Mapper Registration for catalog category mapping

## Prerequisites

- VTEX IO development environment set up
- VTEX IO CLI installed
- VTEX Partner account
- Builders enabled: `admin`, `docs`, `graphql`, `messages`, `node`, `react`

---

## Step 1 — Create Repository from Template

1. Access [github.com/vtex/mkp-app-template](https://github.com/vtex/mkp-app-template)
2. Click **Use this template**
3. Name your repository, select **Private**, do not check **Include all branches**
4. Click **Create repository from template**

---

## Step 2 — Configure the App

### Substitute Placeholders

| Placeholder | Description | Files |
|---|---|---|
| `appName` | App name in kebab-case | manifest.json, navigation.json, routes.json, node/service.json, node/constants/variables.ts, react/package.json |
| `appVendor` | Partner's VTEX accountName | manifest.json, navigation.json, node/routes.json, node/service.json, node/constants/variables.json |
| `appTitle` | Title shown in VTEX Admin | messages/context.json, messages/en.json, messages/pt.json, messages/es.json, node/constants/variables.ts |
| `connectorEndpoint` | Base URL of the backend connector receiving VTEX notifications | node/constants/variables.ts, react/areas/ConfigArea/DefaultConfigs/endpoint.tsx |
| `connectorEndpointHost` | Host from `connectorEndpoint` (e.g., `externalconnector.com`) | manifest.json |
| `affiliateId` | 3-consonant affiliate identifier | react/areas/ConfigArea/index.tsx |
| `manifestTitle` | App title in VTEX App Store | manifest.json |
| `manifestDescription` | App description in VTEX App Store | manifest.json |
| `mapperId` | Connector ID in VTEX Mapper | admin/navigation.json |
| `connectorId` | Connector ID in Channel Manager | node/constants/variables.json |

### Notification Endpoints to Implement

The connector must implement these POST routes at `{{connectorEndpoint}}`:

**Catalog notification:** `POST {{connectorEndpoint}}/catalog/notification`
Receives product/SKU updates (stock, price, trade policy) via VTEX Broadcaster Adapter format.

**Store configuration notification:** `POST {{connectorEndpoint}}/store-config/notification`

Payload fields:

| Field | Type | Description |
|---|---|---|
| `accountName` | string | Seller's VTEX account name |
| `active` | boolean | If false, deactivate seller's products on marketplace |
| `affiliateId` | string | Affiliate ID connecting seller to marketplace |
| `salesChannel` | string | Trade policy ID used for this marketplace |
| `email` | string | Email for affiliate change notifications |
| `cookie` | string | Auth cookie for VTEX API requests |
| `allowFranchiseAccounts` | boolean | Whether to sync franchise accounts via Multilevel Omnichannel Inventory |

### App Structure

- **TitleArea** — defined by `{{appTitle}}`
- **ConfigArea**
  - **DefaultConfigs** — mandatory fields (toggle, affiliateId, endpoint, email, sales channel selector) — do not modify
  - **CustomConfigs** — optional fields (VTEX Mapper link, AllowFranchiseAccounts toggle) — customize as needed

### Adding Custom Fields

1. Create `react/areas/configArea/customConfigs/{fieldName}.tsx`
2. Implement the component using `DefaultProps` (provides `intl` and `config`)
3. Add the component to `react/areas/configArea/customConfigs/index.tsx`
4. Add i18n strings to `messages/en.json`, `messages/es.json`, `messages/pt.json`

### Removing Optional Features

**Remove VTEX Mapper** — delete from `admin/navigation.json`:
```json
{
  "labelId": "admin/app.mapper.tile",
  "path": "/admin/mkp-category-mapper/{{mapperId}}"
}
```

**Remove AllowFranchiseAccounts** — remove component from `react/areas/ConfigArea/CustomConfigs/index.tsx`, remove field from GraphQL schema/types, set `allowFranchiseAccounts: false` in `react/areas/ConfigArea/index.tsx`.

---

## Step 3 — Translate Components

Use the `intl` library with the `messages` builder. Add translations to `messages/en.json`, `messages/es.json`, `messages/pt.json` in the format:

```json
"admin/{messageId}": "translation"
```

Use in components: `intl.formatMessage({ id: 'admin/{messageId}' })`

---

## Step 4 — Test Locally

```bash
vtex login {{account}}
vtex use {{workspace}}
vtex setup
vtex link
```

Access: `https://{{workspace}}--{{account}}.myvtex.com/admin/{{appVendor}}/{{appName}}`

### Retrieve Seller Configuration

```
GET https://{{workspace}}--{{account}}.myvtex.com/_v/{{appVendor}}/{{appName}}/config
```

Authenticate with AppKey/AppToken headers.

---

## Step 5 — Publish to VTEX App Store

Follow [Submitting your app in the VTEX App Store](https://developers.vtex.com/docs/guides/vtex-io-documentation-submitting-your-app-in-the-vtex-app-store).

---

## GraphQL API

### Queries

```graphql
getConfiguration: Configuration    # Get current integration configuration
getSalesChannel(salesChannelId: String): SalesChannel    # Get sales channel details
```

### Mutations

```graphql
saveConfiguration(config: ConfigurationInput): String    # Save integration settings
createSalesChannel(salesChannelData: SalesChannelInput): String    # Create/update sales channel
```

### Configuration Type

| Field | Type | Description |
|---|---|---|
| `accountName` | String | Account where the integration is installed |
| `active` | Boolean | Whether the integration is active |
| `affiliateId` | String | 3-consonant affiliate ID (e.g., `LVL`) |
| `salesChannel` | String | Trade policy/sales channel ID |
| `email` | String | Email for affiliate notifications |
| `allowFranchiseAccounts` | Boolean | Whether franchise accounts are allowed |

### SalesChannel Type

| Field | Type | Description |
|---|---|---|
| `Id` | ID! | Sales channel ID |
| `Name` | String | Channel name |
| `CountryCode` | String | ISO 3166-1 alpha-2 (e.g., `"US"`) |
| `CultureInfo` | String | IETF BCP 47 (e.g., `"en-US"`) |
| `TimeZone` | String | Windows time zone name |
| `CurrencyCode` | String | ISO 4217 (e.g., `"USD"`) |

## Documentation

- [External Marketplace Integration](./external-marketplace-integration.md)
- [External Marketplace — VTEX Seller Setup](./external-marketplace-seller-setup.md)
- [External Marketplace — Architecture](./external-marketplace-architecture.md)
