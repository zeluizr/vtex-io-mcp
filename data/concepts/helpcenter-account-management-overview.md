---
title: 'Account Management - Overview'
id: helpcenter-account-management-overview
status: PUBLISHED
source: vtexdocs/help-center-content
originalPath: docs/en/tutorials/account-management/
---

Account management in VTEX encompasses user administration, roles, permissions, and account settings that control who can access your VTEX environment and what they can do.

## Users and roles

### Admin users

Administrative users have access to the VTEX Admin to manage store operations. Key concepts:

- **Users**: Individual accounts with email-based authentication.
- **Roles**: Collections of permissions (resources) that define what a user can do.
- **Resources**: Specific actions or pages accessible in the VTEX Admin.

### License Manager

License Manager is the VTEX module that handles access control. It uses a role-based access control (RBAC) system.

Common predefined roles:

- **Owner**: Full access to all features.
- **Admin Super**: Almost full access, excluding some financial features.
- **Operations**: Access to orders, logistics, and catalog.
- **Developer**: Access to VTEX IO tools and development features.

### Creating custom roles

1. In the VTEX Admin, go to **Account Settings > Roles**.
2. Click `New Role`.
3. Enter a name for the role.
4. Add desired resources from the available list.
5. Save the role.

### Assigning roles to users

1. Go to **Account Settings > Users**.
2. Select a user or create a new one.
3. Assign one or more roles to the user.

## Application keys (API keys)

Application keys are used for machine-to-machine authentication with VTEX APIs. They consist of:

- **AppKey**: A unique identifier for the key (format: `vtexappkey-{account}-XXXXX`).
- **AppToken**: The secret token paired with the AppKey.

Managing API keys:

1. Go to **Account Settings > Account Management > API Keys**.
2. Create a new key or manage existing ones.
3. Associate the key with a role to define its permissions.

Use in API calls:

```http
GET /api/oms/pvt/orders
X-VTEX-API-AppKey: vtexappkey-mystore-XXXXX
X-VTEX-API-AppToken: <your-app-token>
```

## VTEX IO app authentication

In VTEX IO apps, authentication is handled automatically through the app context. The `@vtex/api` SDK provides pre-authenticated clients that use the app's own identity.

For requests requiring elevated permissions, the app must declare the appropriate **policies** in its `manifest.json`.

## Multi-account architecture

VTEX supports complex account structures:

- **Franchise accounts**: Sub-accounts sharing the main account's catalog.
- **Seller accounts**: Accounts that sell products on marketplace accounts.
- **Marketplace accounts**: Accounts that host third-party sellers.

In VTEX IO, apps can be installed per account and can use `@vtex/api` to make cross-account requests (with appropriate policies).
