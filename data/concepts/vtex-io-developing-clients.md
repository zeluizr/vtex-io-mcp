---
title: "Developing Custom Clients"
slug: "vtex-io-documentation-how-to-create-and-use-clients"
source: "https://developers.vtex.com/docs/guides/vtex-io-documentation-how-to-create-and-use-clients"
---

If you need to integrate your VTEX IO app with external services that aren't covered by VTEX IO's native Clients, creating custom Clients is a powerful solution. Custom Clients extend the functionality of VTEX IO Client types, offering benefits like caching and versioning.

> ⚠ Direct communication with APIs is generally discouraged in favor of implementing a dedicated Client.

## Client types

| Type | Use case |
| --- | --- |
| `AppClient` | Communication with other IO Services via HTTP calls. |
| `AppGraphQLClient` | Communication with other IO GraphQL services. |
| `ExternalClient` | Communication with external APIs. |
| `JanusClient` | Communication with VTEX Core Commerce APIs through Janus Router. |
| `InfraClient` | Communication with VTEX IO Infra services. |

## Step 1 — Set up your app

1. Start a new VTEX IO app using the `node` builder.
2. Navigate to the `node` folder of your project and install `@vtex/api`:

```shell
cd node
yarn add @vtex/api
```

3. Add necessary policies in `manifest.json`. For example, to communicate with an external API:

```json
"policies": [
  {
    "name": "outbound-access",
    "attrs": {
      "host": "api.example.com",
      "path": "*"
    }
  }
]
```

## Step 2 — Create a custom Client

Create a folder named `clients` inside the `node` directory. Create a TypeScript file (e.g., `github.ts`):

```typescript
import type { IOContext, InstanceOptions } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

export default class GithubClient extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super('http://api.github.com', context, {
      ...options,
      retries: 2,
      headers: {
        Accept: 'application/vnd.github.machine-man-preview+json',
        'x-vtex-use-https': 'true'
      }
    })
  }

  public getRepo(owner: string, repo: string) {
    return this.http.get(`/repos/${owner}/${repo}`, {
      metric: 'git-repo-get'
    })
  }
}
```

Key notes:
- The `baseUrl` in `super` must start with `http://`. Use `'x-vtex-use-https': 'true'` header to force HTTPS.
- `metric` parameter names each HTTP call for analytics purposes.
- `getRaw` retrieves additional response info (headers, etc.). `get` retrieves only the response body.

## Step 3 — Export custom clients

Create `node/clients/index.ts`:

```typescript
import { IOClients } from '@vtex/api'
import GithubClient from './github'

export class Clients extends IOClients {
  public get github() {
    return this.getOrSet('github', GithubClient)
  }
}
```

## Step 4 — Use in service

In `node/index.ts`, reference the Clients class:

```typescript
import type { ClientsConfig, ServiceContext, RecorderState } from '@vtex/api'
import { LRUCache, method, Service } from '@vtex/api'
import { Clients } from './clients'

const memoryCache = new LRUCache<string, any>({ max: 5000 })
metrics.trackCache('status', memoryCache)

const clients: ClientsConfig<Clients> = {
  implementation: Clients,
  options: {
    default: {
      retries: 2,
      timeout: 10000,
    },
    status: {
      memoryCache,
    },
  },
}

export default new Service({
  clients,
  routes: {
    status: method({ GET: [statusHandler] }),
  },
})
```

Access clients in a handler via `ctx.clients`:

```typescript
export const statusHandler = async (ctx: Context, next: () => Promise<any>) => {
  const { github } = ctx.clients
  const repo = await github.getRepo('vtex-apps', 'store-theme')
  ctx.body = repo
  ctx.status = 200
  await next()
}
```

## InstanceOptions

| Option | Description |
| --- | --- |
| `authType` | Specifies the authentication type. |
| `timeout` | Request timeout duration in milliseconds. |
| `memoryCache` | Configures a memory cache layer. |
| `diskCache` | Configures a disk cache layer. |
| `retries` | Number of times to retry a failed request. |
| `exponentialTimeoutCoefficient` | Coefficient for exponential timeout backoff. |
| `initialBackoffDelay` | Initial delay before exponential backoff retries (ms). |
| `exponentialBackoffCoefficient` | Coefficient for exponential backoff retries. |
| `headers` | Default headers to send with every request. |
| `params` | Default query string parameters. |
| `concurrency` | Maximum number of concurrent requests. |
| `verbose` | Enables verbose logging. |

## HttpClient methods

| Method | Description |
| --- | --- |
| `get(url, config?)` | HTTP GET — returns response body only. |
| `getRaw(url, config?)` | HTTP GET — returns all response data including headers. |
| `getWithBody(url, data?, config?)` | HTTP GET with a request body. |
| `getBuffer(url, config?)` | HTTP GET returning data as a buffer. |
| `getStream(url, config?)` | HTTP GET returning response as a readable stream. |
| `put(url, data?, config?)` | HTTP PUT — returns response body. |
| `post(url, data?, config?)` | HTTP POST — returns response body. |
| `postRaw(url, data?, config?)` | HTTP POST — returns all response data. |
| `patch(url, data?, config?)` | HTTP PATCH — returns response body. |
| `head(url, config?)` | HTTP HEAD. |
| `delete(url, config?)` | HTTP DELETE. |
