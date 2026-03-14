# Webstore SSO — Custom OAuth2 Integration

Integrate an external Identity Provider (IdP) with the VTEX storefront login via OAuth2.

> Each VTEX account may have **one** custom OAuth implementation, active for all store names in that account.

---

## OAuth2 Flow Overview

1. User requests protected content → VTEX ID redirects to IdP `getAuthorizationCode` endpoint
2. IdP presents login page → user sends credentials
3. IdP redirects back to VTEX with `code` + `state`
4. VTEX POSTs to IdP `getAccessToken` endpoint with `code`, `client_id`, `client_secret`
5. IdP returns `access_token` + `expires_in`
6. VTEX GETs IdP `getUserInfo` endpoint with `access_token`
7. IdP returns `userId`, `email`, `name`
8. VTEX ID sets cookie and redirects user to requested content

---

## Key Endpoints (IdP must implement)

### getAuthorizationCode

Receives: `client_id`, `state`, `redirect_uri` (always `https://vtexid.vtex.com.br/VtexIdAuthSiteKnockout/ReceiveAuthorizationCode.ashx`)

Returns: redirect with `code` (>64 chars, single-use, short expiry) + `state`

> If code is used multiple times, credentials must be revoked.

### getAccessToken

**POST** request with body:
- `client_id`
- `client_secret`
- `code`
- `redirect_uri`

Response body:
- `access_token`
- `expires_in` (seconds)

### getUserInfo

**GET** with `access_token` (bearer header or query string)

Response body:
- `userId` (required)
- `email` (required — primary key for VTEX user identity)
- `name`

---

## Configuration (Admin Panel)

**Admin > Account Settings > Authentication > Webstore tab > My Custom OAuth > SET UP**

### Step 1 — Provider Details

| Field | Description |
|---|---|
| Provider name | Display name for users |
| `client_id` key | Must be `client_id` |
| `client_id` value | Your IdP client ID |
| `client_secret` key | Must be `client_secret` |
| `client_secret` value | Your IdP client secret |

### Step 2 — Authorization Code

- **URL** — IdP's `getAuthorizationCode` endpoint
- **Authorization code key** — key name IdP uses to send the code back (e.g., `code`)
- Optional: custom parameters

### Step 3 — Access Token Exchange

- **URL** — IdP's `getAccessToken` endpoint
- **Authorization code key** — key name VTEX uses to send the code to IdP
- **Content-Type** — request content type
- Optional: custom parameters

Response keys to configure:
- **Access token key** — key name for the token in IdP response
- **Token duration key** — key name for `expires_in` in IdP response

### Step 4 — User Information Exchange

- **URL** — IdP's `getUserInfo` endpoint
- **Access token location** — bearer header (default) or query string
- Optional: custom parameters

Response keys to configure:
- **User email key**
- **User ID key**
- **User name key**

---

## Custom Parameters

For any request step, add static key-value parameters via **+ NEW PARAMETER**.

---

## Fields Summary Table

| Request | Direction | Required setup |
|---|---|---|
| Authorization request | VTEX → IdP | URL, custom params |
| Authorization callback | IdP → VTEX | Authorization code key |
| Access token exchange | VTEX → IdP | URL, content-type, code key, custom params |
| Access token response | IdP → VTEX | Access token key, token duration key |
| User info request | VTEX → IdP | URL, token location, token key (if query string), custom params |
| User info response | IdP → VTEX | Email key, user ID key, user name key |

---

## Documentation

- [Admin SAML SSO](./admin-saml-sso.md)
- [Authentication](./authentication.md)
