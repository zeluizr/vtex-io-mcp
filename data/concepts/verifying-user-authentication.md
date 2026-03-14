# Verifying user authentication

This guide explains how to verify if a user is currently authenticated in your store using their authentication token stored in cookies, and how to retrieve identifying information (user ID and email).

## Authentication cookies overview

When a user logs into your store, cookies are created to store the authorization token. These cookies are automatically included in all requests to VTEX servers, enabling the system to identify the user.

**Cookie properties:**
- `HTTP Only`: Cannot be accessed via JavaScript
- `Secure`: Only sent over HTTPS requests

## Checking if a user is authenticated

Use the `POST` [Check authenticated user](https://developers.vtex.com/docs/api-reference/vtex-id-api#post-/api/vtexid/credential/validate) endpoint.

**Endpoint:** `POST /api/vtexid/credential/validate?an={accountName}`

### Request example

```bash
curl --request POST \
  --url 'https://{accountName}.vtexcommercestable.com.br/api/vtexid/credential/validate?an={accountName}' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
  --header 'X-VTEX-API-AppKey: {appKey}' \
  --header 'X-VTEX-API-AppToken: {appToken}' \
  --data '{"token": "{VtexIdclientAutCookie}"}'
```

### Response — authenticated user (200 OK)

```json
{
  "authStatus": "Success",
  "id": "1f6c17e5-06f9-44a9-a459-b3686e03fa9d",
  "user": "john@mail.com",
  "account": "apiexamples",
  "audience": "admin",
  "tokenType": "user"
}
```

**Response fields:**
| Field | Description |
|-------|-------------|
| `authStatus` | Authentication status (e.g., `Success`) |
| `id` | Unique user ID within VTEX services |
| `user` | User's email address |
| `account` | Account name associated with the request |
| `audience` | Token scope (`admin` or `store`) |
| `tokenType` | Type of token (`user`) |

### Response — non-authenticated user

Returns HTTP `401 Unauthorized`.

---

Source: https://developers.vtex.com/docs/guides/verifying-user-authentication
