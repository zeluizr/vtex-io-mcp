---
title: "Receiving Catalog Changes on VTEX IO"
slug: "how-to-receive-catalog-changes-on-vtex-io"
source: "https://developers.vtex.com/docs/guides/how-to-receive-catalog-changes-on-vtex-io"
---

This guide shows how to set up a system for detecting and responding to changes in the VTEX Catalog using VTEX IO.

We use the [Broadcaster](https://developers.vtex.com/docs/apps/vtex.broadcaster) app to trigger events and develop a new app to handle these events.

**Flow:**
```
Catalog change detected
  → Broadcaster triggers event "broadcaster.notification"
    → Your service's event handler runs
```

## Before you begin

Install the Broadcaster app in a development workspace:

```shell
vtex install vtex.broadcaster
```

## Implementation

### 1. Clone the events-example boilerplate

```shell
git clone https://github.com/vtex-apps/events-example
```

### 2. Configure the event handler in service.json

```json
// node/service.json
{
  "memory": 128,
  "ttl": 10,
  "timeout": 2,
  "minReplicas": 2,
  "maxReplicas": 10,
  "workers": 4,
  "events": {
    "skuChange": {
      "keys": ["broadcaster.notification"]
    }
  },
  "routes": {
    "hcheck": {
      "path": "/_v/app/events-example/hcheck",
      "public": true
    }
  }
}
```

- `skuChange`: Custom name for the event handler function
- `keys`: Event identifier the service will listen for

### 3. Implement the event handler function

```typescript
// node/index.ts
import type { IOClients, ParamsContext, ServiceContext, RecorderState } from '@vtex/api'
import { Service } from '@vtex/api'

export default new Service<IOClients, State, ParamsContext>({
  clients: {
    options: {
      events: {
        exponentialTimeoutCoefficient: 2,
        exponentialBackoffCoefficient: 2,
        initialBackoffDelay: 50,
        retries: 1,
        timeout: 3000,
        concurrency: 10,
      },
    },
  },
  events: {
    skuChange: (ctx: any) => {
      console.log('Received SKU changed event')
      console.log(ctx.body)
    },
  },
  routes: {
    hcheck: (ctx: any) => {
      ctx.status = 200
      ctx.body = 'ok'
    },
  },
})
```

### 4. Link the app

```shell
vtex link
```

### 5. Configure Broadcaster for the workspace

By default, the Broadcaster app only triggers events in the master workspace. To test in a development workspace, add the workspace in the Broadcaster app settings (see Broadcaster documentation).

### 6. Trigger the event

Change the catalog to trigger an event — modify inventory amount, product price, or description. The event contains fields about the SKU change.

### 7. Check the handler output

After linking and triggering the event, look for log output like:

```
13:29:52.531 - info: App running service-node@6.38.3
13:29:58.810 - info: Received SKU changed event service-node@6.38.3
13:29:58.815 - info: { HasStockKeepingUnitModified: true, IdSku: '1' } service-node@6.38.3
```

## Event body from Broadcaster

The `ctx.body` in the event handler contains SKU change data including:
- `HasStockKeepingUnitModified`: boolean
- `IdSku`: string — the SKU ID that changed
- Stock, price, and other change details

## Other event sources

You can also listen to order-related events by configuring different event keys. See the [Receiving order notifications](https://developers.vtex.com/docs/guides/how-to-receive-order-notifications-on-vtex-io) guide for details.
