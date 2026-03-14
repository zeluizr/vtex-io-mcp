# Calling Commerce APIs

**Course ID:** calling-commerce-apis
**Description:** Learn how to call VTEX Commerce APIs from within a VTEX IO service.

## Overview

This course teaches you how to access VTEX's native commerce APIs from within a VTEX IO Node.js service. You will learn about VTEX IO's built-in authentication model, how to import and use the `@vtex/clients` package, and how to declare the correct access policies in `manifest.json`.

**Prerequisites:** Familiarity with Node.js services (service-course recommended).

---

## Step 01 — Introduction

### Concept

VTEX IO services can call VTEX's commerce APIs (Catalog, OMS, Checkout, etc.) using typed clients from the `@vtex/clients` package.

Unlike traditional VTEX integrations that use AppKey/AppToken headers, VTEX IO services authenticate automatically using the app's own identity token. You do not need to manage credentials.

### Setup

Clone the service example to get started:

```bash
vtex init
# choose "service-example"
```

Or clone directly:

```bash
git clone https://github.com/vtex-apps/service-example.git
```

---

## Step 02 — VTEX IO Authentication

### Concept

VTEX IO uses a token-based authentication system. When a service runs on VTEX IO, it receives an `authToken` via the context object — no AppKey/AppToken needed.

You can inspect the token in middleware:

```typescript
// node/handlers/validate.ts
export async function validate(
  ctx: Context,
  next: () => Promise<unknown>
) {
  const {
    vtex: { authToken },
    header,
  } = ctx

  console.log('authToken:', authToken)

  await next()
}
```

The token represents the VTEX IO app's identity and is automatically scoped to the appropriate permissions based on the policies declared in `manifest.json`.

**Answer sheet:**

```typescript
// node/handlers/validate.ts
export async function validate(
  ctx: Context,
  next: () => Promise<unknown>
) {
  const {
    vtex: { authToken },
  } = ctx

  console.log('Received token:', authToken)

  await next()
}
```

---

## Step 03 — Importing Commerce Clients

### Concept

The `@vtex/clients` package provides pre-built, typed clients for VTEX commerce APIs. Register them in your `IOClients` class.

Available clients include:
- `Catalog` — product, category, brand data
- `OMS` (Order Management System) — orders
- `Checkout` — cart and checkout
- `Logistics` — inventory and shipping
- `Payments` — payment data

### Activity

Add the `Catalog` client to your service:

```typescript
// node/clients/index.ts
import { IOClients } from '@vtex/api'
import { Catalog } from '@vtex/clients'

export class Clients extends IOClients {
  public get catalog() {
    return this.getOrSet('catalog', Catalog)
  }
}
```

Register the import in `package.json`:

```json
// node/package.json
{
  "dependencies": {
    "@vtex/api": "6.x",
    "@vtex/clients": "0.x"
  }
}
```

**Answer sheet:**

```typescript
// node/clients/index.ts
import { IOClients } from '@vtex/api'
import { Catalog } from '@vtex/clients'

export class Clients extends IOClients {
  public get catalog() {
    return this.getOrSet('catalog', Catalog)
  }
}
```

---

## Step 04 — Using Commerce Clients

### Concept

Once registered, commerce clients are accessed via `ctx.clients` in route handlers or event handlers.

To use external APIs, you must declare the appropriate outbound access policy in `manifest.json` under `policies`.

### Activity

Use the `Catalog` client to fetch SKU data:

```typescript
// node/handlers/status.ts
export async function status(
  ctx: Context,
  next: () => Promise<unknown>
) {
  const { skuId } = ctx.vtex.route.params
  const skuData = await ctx.clients.catalog.getSkuById(String(skuId))

  ctx.status = 200
  ctx.body = skuData

  await next()
}
```

Declare the required policy in `manifest.json`:

```json
// manifest.json
{
  "policies": [
    {
      "name": "outbound-access",
      "attrs": {
        "host": "portal.vtexcommercestable.com.br",
        "path": "/api/catalog_system/pub/sku/stockkeepingunitbyid/*"
      }
    }
  ]
}
```

**Answer sheet:**

```typescript
// node/handlers/status.ts
import { json } from 'co-body'

export async function status(
  ctx: Context,
  next: () => Promise<unknown>
) {
  const { skuId } = ctx.vtex.route.params

  const data = await ctx.clients.catalog.getSkuById(String(skuId))

  ctx.status = 200
  ctx.body = data

  await next()
}
```

```json
// manifest.json
{
  "vendor": "vtex",
  "name": "service-example",
  "version": "0.0.1",
  "builders": {
    "node": "6.x"
  },
  "policies": [
    {
      "name": "outbound-access",
      "attrs": {
        "host": "portal.vtexcommercestable.com.br",
        "path": "/api/catalog_system/pub/sku/stockkeepingunitbyid/*"
      }
    }
  ]
}
```

---

## Challenge

Create a custom `Search` client that wraps VTEX Catalog's search API:

1. Create `node/clients/search.ts` extending `ExternalClient` or `JanusClient`
2. Implement a `productFullTextSearch(query: string)` method that calls the Catalog search API
3. Register the client in `node/clients/index.ts`
4. Create a route handler that uses the Search client to return product results
5. Declare the appropriate `outbound-access` policy in `manifest.json`

This challenge builds skills for creating custom commerce API wrappers beyond the provided `@vtex/clients` package.
