# Punchout Login Integration

Authenticate external procurement system users into a VTEX store without manual credential input, using One-Time Tokens (OTT).

---

## Two Flow Types

| Flow | Use case | Auth method |
|---|---|---|
| **VTEX user flow** | User exists on VTEX platform | username + password in request body |
| **Pre-authenticated flow** | User doesn't exist on VTEX | API key + API token with `CanPunchout` permission |

---

## How It Works

1. Procurement system POSTs to `/api/authenticator/punchout/start` → receives a URL with OTT
2. User's browser accesses the URL → calls `/api/authenticator/punchout/finish?ott=TOKEN`
3. VTEX validates OTT, sets session cookies, redirects to `returnURL`

> OTT expires in **5 minutes** and can only be used **once**.

---

## VTEX User Flow

**POST** `/api/authenticator/punchout/start?returnURL=/checkout`

```json
{
  "username": "user@example.com",
  "password": "vtex_user_password"
}
```

Response:

```json
{
  "url": "https://store.myvtex.com/api/authenticator/punchout/finish?ott=OTT123"
}
```

---

## Pre-Authenticated User Flow

**POST** `/api/authenticator/punchout/authenticated/start?returnURL=/checkout`

Headers: `X-VTEX-API-AppKey` + `X-VTEX-API-AppToken` (role must have `CanPunchout` permission)

> `VtexIdClientAutCookie` does **not** work for this endpoint.

```json
{
  "username": "buyer@company.com"
}
```

Response:

```json
{
  "url": "https://store.myvtex.com/api/authenticator/punchout/finish?ott=OTT123"
}
```

---

## Finish Redirect

**GET** `/api/authenticator/punchout/finish?ott={one_time_token}`

The finish endpoint:
- Validates OTT (existence, expiry, not previously used)
- Creates VTEX session (VTEX user or delegated username from token `sub` claim)
- Adds `authMethod: "Punchout"` to session token
- Sets VTEX session cookies in response headers
- Redirects to `returnURL` (302) if provided

In **browser-based** integrations this happens automatically when the user accesses the URL. For **headless/server-side** integrations, call the finish endpoint explicitly to obtain the session cookies.

---

## Security

- **OTT**: Single-use, 5-minute expiry
- **Credentials**: Validated against VTEX user database (VTEX flow) or secured with API credentials (pre-auth flow)
- **Redirect protection**: `returnURL` is validated against authorized hosts (no open redirects)

---

## Store Framework — Content-Security-Policy

Required only for **Store Framework** stores embedded in procurement system iframes.

Configure the `Content-Security-Policy` header with `frame-ancestors`:

```
Content-Security-Policy: frame-ancestors 'self' https://procurement-system-a.com https://*.procurement-system-b.com
```

> Modern browsers support `frame-ancestors`. IE 10/11 do not support it and may have issues with Punchout.

---

## Documentation

- [Authentication](./authentication.md)
- [Admin SAML SSO](./admin-saml-sso.md)
- [Webstore OAuth2 SSO](./webstore-oauth2-sso.md)
