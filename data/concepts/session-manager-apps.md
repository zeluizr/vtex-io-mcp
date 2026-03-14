# Session Manager — Built-in Apps

Data available from VTEX apps in Session Manager. Each app monitors input parameters and produces output parameters in the session.

---

## Store (`vtex.store-session`)

| | |
|---|---|
| **RunOnCreate** | `true` |
| **Inputs** | `public`: `cultureInfo`, `sc`, `locale` |
| | `profile`: `email`, `isAuthenticated` |
| **Outputs** | `store`: `channel`, `countryCode`, `cultureInfo`, `currencyCode`, `currencySymbol` |

Processes the current user on the session (by email, if available) and requests the corresponding trade policy and related information.

- `sc` input = trade policy request. If present, the app checks if the requested trade policy is within the active options for that user and selects it if possible. Otherwise: `401` (not authenticated) or `403` (authenticated but not allowed).
- `locale` / `cultureInfo` inputs overwrite the `cultureInfo` output to set session language according to user preference.

---

## Authentication (`vtex.authentication-session`)

| | |
|---|---|
| **RunOnCreate** | `false` |
| **Inputs** | `cookie`: `VtexIdclientAutCookie`, `VtexIdclientAutCookie_.*` |
| **Outputs** | `authentication`: `adminUserId`, `adminUserEmail`, `storeUserId`, `storeUserEmail` |

Primary authentication method. Takes the VTEXID cookie from the request, validates it, and extracts user or admin IDs.

---

## Profile (`vtex.profile-session`)

| | |
|---|---|
| **RunOnCreate** | `false` |
| **Inputs** | `public`: `storeUserEmail` |
| | `authentication`: `storeUserId` |
| | `impersonate`: `storeUserId` |
| **Outputs** | `profile`: `id`, `email`, `firstName`, `lastName`, `phone`, `document`, `priceTables`, `isAuthenticated` |

Ensures user information matches the data loaded into the session.

- If `storeUserEmail` is defined in `public` namespace → no auth cookie assumed; `isAuthenticated: false`; only `priceTables` is loaded
- If `storeUserId` is defined in `authentication` or `impersonate` namespace → all relevant information is loaded from Master Data

---

## Rates and Benefits (`vtex.rnb-session`)

| | |
|---|---|
| **RunOnCreate** | `false` |
| **Inputs** | `profile`: `email` |
| | `public`: `utm_source`, `utm_campaign`, `postalCode` |
| **Outputs** | `rnb`: `campaigns` |

Integrates with the Rates and Benefits system, identifying which campaigns the user is eligible for.

---

## Checkout (`vtex.checkout-session`)

| | |
|---|---|
| **RunOnCreate** | `false` |
| **Inputs** | `public`: `regionId`, `country`, `postalCode`, `geoCoordinates` |
| **Outputs** | `checkout`: `regionId`, `cartId` |

Handles the user's purchasing experience. Looks up the user's location (requires `country` + either `postalCode` or `geoCoordinates`). Also contains the ID of the cart used during checkout.

---

## Impersonate (`vtex.impersonate-session`)

| | |
|---|---|
| **RunOnCreate** | `false` |
| **Inputs** | `public`: `vtex-impersonated-customer-email` |
| | `cookie`: `vtex-impersonated-customer-email` |
| | `authentication`: `adminUserEmail` |
| **Outputs** | `impersonate`: `storeUserId`, `storeUserEmail`, `canImpersonate`, `account` |

> **Not installed by default** — must be manually installed on each store.

Enables customer impersonation for telephone centers and B2B telesales operations. Receives `vtex-impersonated-customer-email` via `POST` or cookie, then attempts to impersonate that user using the admin credentials in the session.

If the admin has impersonation permission, the impersonated user's ID and email are loaded into the session.

---

## Documentation

- [Session Manager Overview](./session-manager-overview.md)
- [Session Manager Telesales](./session-manager-telesales.md)
- [Session Manager Impersonate API](./session-manager-impersonate-api.md)
