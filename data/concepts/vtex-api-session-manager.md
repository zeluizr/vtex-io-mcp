# VTEX Session Manager API

## Description

Session Manager tracks the current browsing sessions of all customers on the VTEX platform. Important session information is automatically captured and stored in a secure and easily accessible location. This includes relevant cookies, query strings, authentication credentials, current profile and pricing information.

The Session Manager API has no required authentication — it operates on the session cookie context.

## Base URL

```
https://{accountName}.vtexcommercestable.com.br
```

## Endpoints by Tag

### Sessions

| Method | Path | Summary |
|--------|------|---------|
| `POST` | `/api/sessions` | Create new session |
| `GET` | `/api/sessions` | Get session |
| `PATCH` | `/api/sessions` | Edit session |

### Segment

| Method | Path | Summary |
|--------|------|---------|
| `GET` | `/api/segments` | Get segment |

## Key Request/Response Models

### Create New Session (POST /api/sessions)

Used to create a new session or refresh an existing one. Typically called by the storefront.

Request body:
```json
{
  "public": {
    "utm_source": {
      "value": "google"
    },
    "utm_medium": {
      "value": "cpc"
    }
  }
}
```

The response sets the `vtex_session` cookie, which must be sent on all subsequent requests.

### Get Session (GET /api/sessions)

Query params:
- `items` (string) — Comma-separated list of namespaced items to retrieve from the session.

Example: `?items=profile.id,profile.email,store.channel,authentication.storeUserEmail`

Response:
```json
{
  "id": "session-uuid",
  "namespaces": {
    "profile": {
      "id": { "value": "user-id-123", "keepAlive": true },
      "email": { "value": "user@example.com", "keepAlive": true },
      "isAuthenticated": { "value": "true" }
    },
    "store": {
      "channel": { "value": "1" }
    },
    "authentication": {
      "storeUserEmail": { "value": "user@example.com" },
      "adminUserEmail": { "value": null }
    },
    "public": {
      "utm_source": { "value": "google" }
    },
    "impersonate": {
      "canImpersonate": { "value": "false" }
    }
  }
}
```

### Edit Session (PATCH /api/sessions)

Used to update session data such as setting trade policy, region, or custom data.

Request body:
```json
{
  "public": {
    "channel": {
      "value": "2"
    }
  }
}
```

### Get Segment (GET /api/segments)

The segment represents the commercial/pricing context for the current session. It is derived from the session and is used by Checkout and Pricing.

Response:
```json
{
  "campaigns": null,
  "channel": "1",
  "priceTables": null,
  "regionId": "v2.region-id",
  "utm_campaign": null,
  "utm_source": null,
  "utmi_campaign": null,
  "cultureInfo": "pt-BR",
  "channelPrivacy": "public"
}
```

## Session Namespaces

The session is organized into namespaces. Common ones:

| Namespace | Description |
|-----------|-------------|
| `profile` | Customer profile data (id, email, isAuthenticated, etc.) |
| `store` | Store context (channel/trade policy) |
| `authentication` | Auth tokens and user emails |
| `public` | Public data set via query strings or cookies (UTMs, coupons) |
| `impersonate` | Telesales impersonation data |
| `checkout` | Checkout-related data |
| `rnb` | Promotions/pricing context |

## VTEX IO Integration

In VTEX IO Node services, the session can be accessed via the `Session` client:

```typescript
// In a middleware
const session = await ctx.clients.session.getSession(
  ctx.vtex.sessionToken,
  ['profile.email', 'store.channel']
)
```

The `vtex_session` token is automatically forwarded from the storefront to VTEX IO services via the `x-vtex-session` header.

### Using Session in React Components

```typescript
import { useRuntime } from 'vtex.render-runtime'

// The runtime provides session-derived data
const { culture, binding } = useRuntime()
```

For direct session queries from React, use the `vtex.session-client` app or make fetch calls to `/api/sessions`.

## Documentation

https://developers.vtex.com/docs/api-reference/session-manager-api
