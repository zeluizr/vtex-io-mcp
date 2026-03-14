---
title: 'Authentication'
id: 21CkKHLKP1o41lUpGhuRUs
status: PUBLISHED
createdAt: 2021-10-25T19:06:37.982Z
updatedAt: 2024-12-12T14:23:17.290Z
source: vtexdocs/help-center-content
originalPath: docs/en/tutorials/authentication/authentication-basics/authentication.md
---

Authentication is the process of validating a user's identity. On VTEX, this occurs in three contexts:

- **Login**: Verifies and validates the user's identity when accessing an online store or the VTEX Admin.
- **Developing integrations**: Authenticates requests made to VTEX APIs from integrations with external services (API keys or user tokens).
- **Developing apps**: Ensures legitimate communication between VTEX IO applications and VTEX APIs (authentication tokens).

## Login

On VTEX, login authentication occurs in two contexts:

| Login method | Webstore | Admin |
|---|---|---|
| Access code (random numeric code sent to email) | Can be enabled | Always enabled |
| Password (email + password) | Can be enabled. Password expiration can be enabled. | Always enabled. Password expiration can be enabled. |
| Facebook | Can be enabled | Not available |
| Google | Can be enabled | Can be enabled |
| Integration with other ID providers (OAuth/SAML) | Can be enabled via OAuth protocol | Can be enabled via SAML protocol |

> At least one login method must be enabled for the webstore.

### Enabling login methods

1. In the VTEX Admin top bar, click your profile avatar.
2. Click **Account settings > Authentication**.
3. Toggle the desired login methods on the **Webstore** or **Admin** tab.

### Enforcing password expiration

1. Go to **Account settings > Authentication**.
2. In the **Password** row, click `Edit`.
3. Check **Enforce password expiration**.
4. Select a period: **15**, **30**, or **90** days.
5. Click `Save`.

## Developing integrations

When using VTEX APIs in integrations, use one of these authentication methods:

- **Application keys (appKeys)**: Authenticate API requests. Store admins create keys and associate them with roles. See [API authentication using application keys](https://developers.vtex.com/docs/guides/api-authentication-using-application-keys).
- **User tokens**: Authenticate API requests, especially for frontend VTEX IO applications. See [API authentication using user tokens](https://developers.vtex.com/docs/guides/api-authentication-using-user-tokens).

## Developing apps

Authentication tokens (auth tokens) are required when developing apps on VTEX IO. See [App authentication using auth tokens](https://developers.vtex.com/docs/guides/app-authentication-using-auth-tokens).

App-to-API authentication in VTEX IO uses the app's context automatically — the `Context` object from `@vtex/api` provides pre-authenticated clients.
