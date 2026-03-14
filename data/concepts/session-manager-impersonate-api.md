# Session Manager — Impersonate Session API

Using the `vtex.impersonate-session` app and Session Manager API for customer impersonation in telesales and B2B scenarios.

---

## Installing vtex.impersonate-session

The `vtex.impersonate-session` app is **not installed by default** in VTEX stores.

### 1. Install VTEX CLI

```sh
yarn global add vtex
```

### 2. Log in to your store

```sh
vtex login
```

### 3. Install the app

```sh
vtex install vtex.impersonate-session
```

Customer impersonation is now enabled.

---

## How the App Works

The app monitors changes to its inputs and modifies session parameters through its outputs (standard Session Manager pattern).

**Inputs:**

| Namespace | Parameter |
|---|---|
| `public` | `vtex-impersonated-customer-email` |
| `cookie` | `vtex-impersonated-customer-email` |
| `authentication` | `adminUserEmail` |

**Outputs:**

| Namespace | Parameters |
|---|---|
| `impersonate` | `storeUserId`, `storeUserEmail`, `canImpersonate`, `account` |

### Impersonation Logic

1. App receives `vtex-impersonated-customer-email` via direct `POST` or cookie
2. Attempts to impersonate that user using the admin credentials in the session
3. If admin has the **telesales role** → impersonated user's ID and email are loaded into session
4. Operator can then make purchases on the customer's behalf

---

## API Usage

### Request

Send a `POST` to the Session Manager API with the impersonation data:

```json
{
  "public": {
    "vtex-impersonated-customer-email": {
      "value": "client@gmail.com"
    },
    "authentication": {
      "value": "operator@gmail.com"
    }
  }
}
```

### Response

```json
{
  "public": {
    "vtex-impersonated-customer-email": {
      "value": "client@gmail.com"
    },
    "authentication": {
      "value": "operator@gmail.com"
    }
  },
  "impersonate": {
    "canImpersonate": {
      "value": "true"
    },
    "account": {
      "value": "myStore"
    }
  }
}
```

---

## Required Permission

The operator must have the **telesales role** in VTEX account management. Without this role, `canImpersonate` will be `false` and impersonation will fail.

---

## Documentation

- [Session Manager Overview](./session-manager-overview.md)
- [Session Manager Apps](./session-manager-apps.md)
- [Session Manager Telesales](./session-manager-telesales.md)
- [API Reference](https://developers.vtex.com/docs/api-reference/session-manager-api#overview)
