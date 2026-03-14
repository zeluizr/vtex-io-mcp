# API authentication using application keys

Application keys (`appKey`) are credentials used to authenticate requests to VTEX APIs. Store administrators can create multiple application keys for different integrations.

An API key includes specific permissions based on License Manager roles and resources selected when creating or editing the key.

Each `appKey` has an associated `appToken`. The `appKey`+`appToken` pair authorizes interactions with VTEX services when the key has the required roles and resources.

> **When to use:** Application keys are the best way to authenticate API calls in integrations or self-hosted **backend** requests. **Frontend requests should use [user tokens](https://developers.vtex.com/docs/guides/api-authentication-using-user-tokens) instead.**

> **Security warning:** Never use application keys in client-side code. This makes your store vulnerable to attacks. Follow the [Best practices for using application keys](https://help.vtex.com/en/tutorial/best-practices-api-keys--7b6nD1VMHa49aI5brlOvJm#never-use-client-side-code-for-integrations).

## Usage

Send the `appKey` and `appToken` values in these HTTP headers:

| Header | Value |
|--------|-------|
| `X-VTEX-API-AppKey` | `{appKey}` |
| `X-VTEX-API-AppToken` | `{appToken}` |

> Header names are case-insensitive per the W3C HTTP specification. `X-VTEX-API-AppKey`, `x-vtex-api-appkey`, etc., all work the same way.

### Example request

```bash
curl --request GET \
  'https://{accountName}.vtexcommercestable.com.br/api/oms/pvt/orders/{orderId}' \
  --header 'X-VTEX-API-AppKey: vtexappkey-example-YSWQFZ' \
  --header 'X-VTEX-API-AppToken: {appToken}' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json'
```

## Managing application keys

- **Create keys**: [Generating and managing application keys](https://help.vtex.com/en/tutorial/api-keys--4bFEmcHXgpNksoePchZyy6)
- **Manage permissions**: [Managing app key permissions](https://help.vtex.com/en/tutorial/api-keys--4bFEmcHXgpNksoePchZyy6#managing-app-key-permissions)
- **Best practices**: [Best practices for using application keys](https://help.vtex.com/en/tutorial/best-practices-api-keys--7b6nD1VMHa49aI5brlOvJm)

---

Source: https://developers.vtex.com/docs/guides/api-authentication-using-api-keys
