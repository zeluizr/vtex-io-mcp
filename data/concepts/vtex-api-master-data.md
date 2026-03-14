# VTEX Master Data API v2

## Description

Master Data is a secure, fast, scalable, and extensible solution that allows users to create their own entities, store data, and retrieve information directly from the storefront or external integrations. Several internal VTEX modules use Master Data as a data repository, including Orders and Sales App.

Master Data v2 is **not compatible** with data entities from previous versions (such as `CL` and `AD` from v1).

## Base URLs

- **External integrations:** `https://{accountName}.vtexcommercestable.com.br`
- **Storefront (avoid CORS):** Use relative paths from the storefront host

## Authentication

| Header | Description |
|--------|-------------|
| `X-VTEX-API-AppKey` | API key identifier. |
| `X-VTEX-API-AppToken` | API key secret token. |

**Important for storefront use:**
- Use relative paths to avoid CORS issues
- Never add `AppKey`/`AppToken` via JavaScript on the storefront — security risk
- Configure the data entity JSON Schema to define what fields are public

## Endpoints by Tag

### Documents

| Method | Path | Summary |
|--------|------|---------|
| `POST` | `/api/dataentities/{dataEntityName}/documents` | Create new document |
| `PATCH` | `/api/dataentities/{dataEntityName}/documents` | Create partial document |
| `GET` | `/api/dataentities/{dataEntityName}/documents/{id}` | Get document |
| `PUT` | `/api/dataentities/{dataEntityName}/documents/{id}` | Create document with custom ID or update entire document |
| `PATCH` | `/api/dataentities/{dataEntityName}/documents/{id}` | Update partial document |
| `DELETE` | `/api/dataentities/{dataEntityName}/documents/{id}` | Delete document |

### Search

| Method | Path | Summary |
|--------|------|---------|
| `GET` | `/api/dataentities/{dataEntityName}/search` | Search documents |

### Scroll

| Method | Path | Summary |
|--------|------|---------|
| `GET` | `/api/dataentities/{dataEntityName}/scroll` | Scroll documents |

### Schemas

| Method | Path | Summary |
|--------|------|---------|
| `GET` | `/api/dataentities/{dataEntityName}/schemas` | Get schemas |
| `GET` | `/api/dataentities/{dataEntityName}/schemas/{schemaName}` | Get schema by name |
| `PUT` | `/api/dataentities/{dataEntityName}/schemas/{schemaName}` | Save schema by name |
| `DELETE` | `/api/dataentities/{dataEntityName}/schemas/{schemaName}` | Delete schema by name |

### Indices

| Method | Path | Summary |
|--------|------|---------|
| `GET` | `/api/dataentities/{dataEntityName}/indices` | Get indices |
| `PUT` | `/api/dataentities/{dataEntityName}/indices` | Put indices |
| `GET` | `/api/dataentities/{dataEntityName}/indices/{index_name}` | Get index by name |
| `DELETE` | `/api/dataentities/{dataEntityName}/indices/{index_name}` | Delete index by name |

### Clusters

| Method | Path | Summary |
|--------|------|---------|
| `POST` | `/api/dataentities/{dataEntityName}/documents/{id}/clusters` | Validate document by clusters |

### Versions

| Method | Path | Summary |
|--------|------|---------|
| `GET` | `/api/dataentities/{dataEntityName}/documents/{id}/versions` | List versions |
| `GET` | `/api/dataentities/{dataEntityName}/documents/{id}/versions/{versionId}` | Get version |
| `PUT` | `/api/dataentities/{dataEntityName}/documents/{id}/versions/{versionId}` | Put version |

## Key Request/Response Models

### Create Document (POST /api/dataentities/{dataEntityName}/documents)

Request body example (for a customer newsletter entity):
```json
{
  "email": "clark.kent@examplemail.com",
  "firstName": "Clark",
  "lastName": "Kent",
  "phone": "+12025550195",
  "documentType": "CPF",
  "document": "12345678900",
  "isCorporate": false,
  "isNewsletterOptIn": false,
  "localeDefault": "en-US"
}
```

Response (201 Created):
```json
{
  "Id": "Newsletter-cbfc4f67-6ea3-11ee-83ab-0a8d18f9f827",
  "Href": "http://cosmetics2.vtexcommercestable.com.br/api/dataentities/Newsletter/documents/cbfc4f67-...",
  "DocumentId": "cbfc4f67-6ea3-11ee-83ab-0a8d18f9f827"
}
```

### Get Document (GET /api/dataentities/{dataEntityName}/documents/{id})

Query params:
- `_fields` — Comma-separated list of fields to return. Use `_fields=_all` for all fields.
- `_schema` — Schema name to validate against

Response example:
```json
{
  "id": "b818cbda-e489-11e6-94f4-0ac138d2d42e",
  "accountId": "14af940d-9300-4279-9355-61d44c2ff879",
  "email": "clark.kent@example.com",
  "firstName": "Clark",
  "lastName": "Kent"
}
```

### Search Documents (GET /api/dataentities/{dataEntityName}/search)

Query params:
- `_where` — Filter expression, e.g. `email="test@example.com"`
- `_fields` — Fields to return
- `_sort` — Sort field and direction, e.g. `createdIn DESC`
- `_from`, `_to` — Pagination range (e.g., `_from=1&_to=10`)
- `_schema` — Schema name

### Scroll Documents (GET /api/dataentities/{dataEntityName}/scroll)

Used for paginating through large datasets. Returns a `X-VTEX-MD-TOKEN` header for subsequent scroll calls.

Query params:
- `_where` — Filter expression
- `_fields` — Fields to return
- `_size` — Number of documents per page (max 1000)
- `_token` — Token from previous scroll response (for continuation)

**Warning:** Creating query loops with scroll can trigger throttling or API disabling.

### Save Schema (PUT /api/dataentities/{dataEntityName}/schemas/{schemaName})

JSON Schema that defines the data entity structure. Example:
```json
{
  "properties": {
    "email": { "type": "string" },
    "firstName": { "type": "string" },
    "isNewsletterOptIn": { "type": "boolean" }
  },
  "required": ["email"],
  "v-indexed": ["email", "isNewsletterOptIn"],
  "v-default-fields": ["email", "firstName", "isNewsletterOptIn"],
  "v-cache": false,
  "v-security": {
    "allowGetAll": true,
    "publicRead": ["email"],
    "publicWrite": ["email", "isNewsletterOptIn"],
    "publicFilter": ["email"]
  }
}
```

## Common Use Cases in VTEX IO

### Storing custom data from a Node service

```typescript
// In a Node service middleware
const { clients } = ctx
const masterData = clients.masterdata  // from @vtex/api

// Create document
await masterData.createDocument({
  dataEntity: 'MyEntity',
  fields: { email: 'user@example.com', preference: 'dark' }
})

// Search documents
const docs = await masterData.searchDocuments({
  dataEntity: 'MyEntity',
  fields: ['id', 'email', 'preference'],
  where: `email="user@example.com"`,
  pagination: { page: 1, pageSize: 10 }
})
```

### Storefront usage (from React component)

```javascript
// Use relative path to avoid CORS
const response = await fetch(
  `/api/dataentities/Newsletter/search?email=test@example.com&_fields=id,email`,
  { credentials: 'include' }
)
```

## Documentation

https://developers.vtex.com/docs/api-reference/master-data-api-v2
