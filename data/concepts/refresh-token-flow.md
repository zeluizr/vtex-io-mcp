# Refresh token flow

The refresh token flow allows clients to obtain new access tokens without requiring users to reauthenticate. This guide explains how to implement it in headless scenarios using native VTEX Login.

> If using FastStore, the FastStore SDK Session automatically handles token renewal. See [Enabling refresh token on FastStore](https://developers.vtex.com/docs/guides/faststore/security-enabling-refresh-token).

> Contact [VTEX Support](https://support.vtex.com) to request refresh token activation and configure the expiration time.

## Token types

| Token | Cookie name | Expiration | Purpose |
|-------|-------------|------------|---------|
| **Access token** | `VtexIdclientAutCookie_{accountName}` | 24 hours | Primary credential for API authentication |
| **Refresh token** | `vid_rt` | 1, 7, or 30 days (configurable) | Used to renew expired access tokens |

## How the flow works

1. User logs in → VTEX ID issues access token + refresh token (stored as cookies)
2. After 24h, access token expires
3. If refresh token is still valid → client requests a new access token automatically
4. VTEX ID issues new access token + new refresh token (replaces old ones)
5. Cycle repeats until the refresh token expires → user must log in again

**Automatic handling:**
- Store Framework stores: handled automatically
- Legacy CMS Portal stores: handled automatically
- **Headless stores: must be implemented manually** (follow this guide)

> When using custom OAuth providers via the OAuth exchange endpoint, the VTEX refresh token is **not** generated. Token refresh must be managed by the external Identity Provider.

## Implementation for headless stores

### Step 1 — Start authentication

`GET /api/vtexid/pub/authentication/start?scope={accountName}&fingerprint={fingerprint}`

```bash
curl 'https://{storeDomain}/api/vtexid/pub/authentication/start?scope={accountName}&fingerprint={fingerprint}'
```

Response includes `authenticationToken` — use this in subsequent steps.

### Step 2 — Continue authentication (access key example)

Send a login code to the user's email:

`POST /api/vtexid/pub/authentication/accesskey/send?email={userEmail}`

```bash
curl --request POST \
  'https://{storeDomain}/api/vtexid/pub/authentication/accesskey/send?email={userEmail}' \
  --header 'Cookie: _vss={authenticationToken}'
```

Response: `200 OK` (empty body). User receives an email with the access code.

### Step 3 — Validate session

`POST /api/vtexid/pub/authentication/accesskey/validate`

```bash
curl --request POST \
  'https://{storeDomain}/api/vtexid/pub/authentication/accesskey/validate' \
  --header 'Cookie: _vss={authenticationToken}' \
  --form 'accesskey="{accessKey}"' \
  --form 'login="{userEmail}"'
```

**Response body:**
```json
{
  "authStatus": "Success",
  "authCookie": {
    "Name": "VtexIdclientAutCookie_{accountName}",
    "Value": "{accessToken}"
  },
  "expiresIn": 86399,
  "userId": "1f6c17e5-06f9-44a9-a459-b3686e03fa9d"
}
```

The response headers set a `vid_rt` cookie with the refresh token.

### Step 4 — Refresh the token

When the access token expires, use the refresh token to get a new one:

`POST /api/vtexid/refreshtoken/webstore`

```bash
curl --request POST \
  'https://{storeDomain}/api/vtexid/refreshtoken/webstore' \
  --header 'Content-Type: application/json;charset=UTF-8' \
  --header 'Cookie: vid_rt={vid_rt}; VtexIdclientAutCookie_{accountName}={accessToken}' \
  --data '{"fingerprint": "a1b2c3d4e5f6"}'
```

**Response body:**
```json
{
  "status": "Success",
  "userId": "1f6c17e5-06f9-44a9-a459-b3686e03fa9d",
  "refreshAfter": "2025-03-26T02:53:39+00:00"
}
```

Response cookies provide new values for `vid_rt`, `VtexIdclientAutCookie_{accountId}`, and `VtexIdclientAutCookie_{accountName}`.

---

Source: https://developers.vtex.com/docs/guides/refresh-token-flow
