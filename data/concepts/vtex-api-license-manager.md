# VTEX License Manager API

## Description

The License Manager API allows you to create users, modify their names and emails, add and remove roles from users, and create and manage API keys. It is used for access control and authentication management in VTEX accounts.

## Base URL

```
https://{accountName}.vtexcommercestable.com.br
```

## Authentication

This API requires admin-level authentication. Use `AppKey`/`AppToken` with appropriate License Manager permissions.

## Endpoints by Tag

### User

| Method | Path | Summary |
|--------|------|---------|
| `GET` | `/api/license-manager/users/{userId}` | Get user information by user ID |
| `GET` | `/api/license-manager/users/{userEmail}/roles` | Get user information by user email |
| `DELETE` | `/api/license-manager/users/{userId}` | Delete user |
| `POST` | `/api/license-manager/users` | Create user |
| `GET` | `/api/license-manager/site/pvt/logins/list/paged` | Get list of users |

### Roles

| Method | Path | Summary |
|--------|------|---------|
| `PUT` | `/api/license-manager/users/{userId}/roles` | Add roles to user or API Key |
| `GET` | `/api/license-manager/users/{userId}/roles` | Get roles by user ID or API Key |
| `DELETE` | `/api/license-manager/users/{userId}/roles/{roleId}` | Remove role from user or API Key |
| `GET` | `/api/license-manager/site/pvt/roles/list/paged` | Get list of roles |

### API Keys

| Method | Path | Summary |
|--------|------|---------|
| `POST` | `/api/vlm/appkeys` | Create new API Key |
| `GET` | `/api/vlm/appkeys` | Get API keys from account |
| `PUT` | `/api/vlm/appkeys/{id}` | Update API Key |

### Store

| Method | Path | Summary |
|--------|------|---------|
| `GET` | `/api/vlm/account/stores` | Get stores |

### Account

| Method | Path | Summary |
|--------|------|---------|
| `GET` | `/api/vlm/account` | Get information about account |

## Key Request/Response Models

### Create User (POST /api/license-manager/users)

Request body:
```json
{
  "userId": "optional-custom-id",
  "email": "user@example.com",
  "name": "John Doe"
}
```

### Add Roles to User (PUT /api/license-manager/users/{userId}/roles)

`{userId}` can be either a user ID or an API key ID.

Request body:
```json
[
  { "id": 123 }
]
```

Where `id` is the role ID obtained from the List Roles endpoint.

### Get User Information (GET /api/license-manager/users/{userId})

Response:
```json
{
  "userId": "abc123",
  "email": "user@example.com",
  "name": "John Doe",
  "isAdmin": false
}
```

### Create API Key (POST /api/vlm/appkeys)

Request body:
```json
{
  "label": "My Integration Key",
  "roles": [{ "id": 123 }]
}
```

Response:
```json
{
  "id": "vtexappkey-xxxx",
  "label": "My Integration Key",
  "keyValue": "VTEX_APP_KEY_VALUE",
  "keySecret": "VTEX_APP_TOKEN_VALUE"
}
```

The `keySecret` is only returned once at creation time. Store it securely.

## Common VTEX IO Policies Related to License Manager

VTEX IO apps use **policies** in `manifest.json` to declare necessary permissions. The License Manager is responsible for validating these policies. Common policies:

```json
{
  "policies": [
    {
      "name": "outbound-access",
      "attrs": {
        "host": "{{accountName}}.vtexcommercestable.com.br",
        "path": "/api/license-manager/*"
      }
    }
  ]
}
```

## VTEX IO App Permissions

When a VTEX IO app needs to call VTEX APIs, it must:
1. Declare outbound access policies in `manifest.json`
2. The app is assigned a robot user with the declared permissions
3. The service context (`ctx.vtex.authToken`) contains the token for the robot user

This is different from user authentication — VTEX IO apps use their own service tokens, not admin user credentials.

## Documentation

https://developers.vtex.com/docs/api-reference/license-manager-api
