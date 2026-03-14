# App authentication using auth tokens (VTEX IO)

When working on VTEX IO apps, you generally don't make direct requests to VTEX APIs with application keys. VTEX IO provides convenient access through predefined [clients](https://developers.vtex.com/docs/guides/vtex-io-documentation-clients) with built-in authentication.

The recommended approach is using the [VTEX IO clients package](https://github.com/vtex/io-clients). Every client method has an optional `authMethod` argument that accepts one of three token types.

Import the IO context in your app:
```typescript
import { IOContext } as ctx from '@vtex/api'
```

## Available tokens

| Token | `authMethod` | Via context | Description | Permissions |
|-------|-------------|-------------|-------------|-------------|
| App authentication token (default) | `AUTH_TOKEN` | `ctx.authToken` | Every VTEX IO app has its own temporary authentication token. Avoid using this when user tokens are available. | Permissions declared in the app's [policies](https://developers.vtex.com/docs/guides/vtex-io-documentation-policies) in `manifest.json` |
| Store user token | `STORE_TOKEN` | `ctx.storeUserAuthToken` | User token with store scope | Shopper permissions |
| Admin user token | `ADMIN_TOKEN` | `ctx.adminUserAuthToken` | User token with Admin scope | Administrative permissions as defined by License Manager roles for the current logged-in user |

> **Important:** Authenticate app actions with user tokens whenever possible. Currently, app authentication tokens (`AUTH_TOKEN`) are **not subject to License Manager permissions**. Consider this carefully when defining app architecture and configuring policies.

## Usage examples

### App authentication token (`AUTH_TOKEN`)

Use when operations are not linked to a user. Permission level defined by policies in `manifest.json`.

```typescript
export class OmsClient extends JanusClient {
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(ctx, {
      ...options,
      headers: {
        ...options?.headers,
        VtexIdclientAutCookie: ctx.authToken,
      },
    })
  }
}
```

### Store user token (`STORE_TOKEN`)

Use when the app is focused on **store browsing** experience. Limits permissions to shopper-level access.

```typescript
export class OmsClient extends JanusClient {
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(ctx, {
      ...options,
      headers: {
        ...options?.headers,
        VtexIdclientAutCookie: ctx.storeUserAuthToken,
      },
    })
  }
}
```

### Admin user token (`ADMIN_TOKEN`)

Use when the app is focused on **Admin** experience. Limits permissions to the current Admin user's roles.

```typescript
export class OmsClient extends JanusClient {
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(ctx, {
      ...options,
      headers: {
        ...options?.headers,
        VtexIdclientAutCookie: ctx.adminUserAuthToken,
      },
    })
  }
}
```

## When to use each token

| Scenario | Recommended token |
|----------|------------------|
| Storefront app performing shopper actions | `STORE_TOKEN` (`ctx.storeUserAuthToken`) |
| Admin app managing store data | `ADMIN_TOKEN` (`ctx.adminUserAuthToken`) |
| Background tasks not linked to a user | `AUTH_TOKEN` (`ctx.authToken`) |

## Custom clients

If the available clients don't cover your needs, create your own clients following the same authentication logic. See [How to create and use clients](https://developers.vtex.com/docs/guides/vtex-io-documentation-how-to-create-and-use-clients).

---

Source: https://developers.vtex.com/docs/guides/app-authentication-using-auth-tokens
