---
title: 'Security - Overview'
id: helpcenter-security-overview
status: PUBLISHED
source: vtexdocs/help-center-content
originalPath: docs/en/tutorials/security/
---

VTEX provides multiple layers of security to protect store data, customer information, and platform operations.

## Access control

VTEX uses Role-Based Access Control (RBAC) through the License Manager module:

- **Users**: Individual admin users with email-based login.
- **Roles**: Sets of permissions (resources) defining what each user can do.
- **Resources**: Granular permissions for specific actions or pages.

Principle of least privilege: Assign only the permissions users need for their specific responsibilities.

## API authentication

### Application keys

Machine-to-machine authentication via AppKey and AppToken pairs. Keys are associated with roles to limit their scope.

Best practices:
- Create separate keys for each integration.
- Rotate keys periodically.
- Never expose keys in frontend code (use server-side requests).

### User tokens

Short-lived tokens for user-authenticated API requests. Used primarily in VTEX IO frontend apps.

## VTEX IO app security

### Policies

VTEX IO apps declare the external and internal resources they need to access via **policies** in `manifest.json`. This requires explicit permission from the store account when installing the app.

Types of policies:

- **`outbound-access`**: Permission to make HTTP requests to external URLs.
- **`vbase-access-write`**: Permission to write to vbase storage.
- **Resource policies**: Access to specific VTEX APIs (e.g., read orders, write catalog).

Example:
```json
{
  "policies": [
    {
      "name": "outbound-access",
      "attrs": {
        "host": "external-api.example.com",
        "path": "/api/*"
      }
    }
  ]
}
```

### App sandboxing

VTEX IO apps run in isolated sandboxes:
- Node services run in containerized environments.
- Apps cannot access file system paths outside their workspace.
- Inter-app communication goes through the VTEX IO routing layer.

## Customer data protection

### LGPD/GDPR compliance

VTEX provides tools for data compliance:

- **Data subject requests**: API endpoints to retrieve or delete customer data.
- **Consent management**: Tools to record and manage customer consent.
- **Data residency**: Options for storing data in specific regions.

### PCI DSS

VTEX is PCI DSS Level 1 certified. Card data never touches your store's servers — it goes directly to VTEX's secure payment infrastructure.

## reCAPTCHA

VTEX integrates Google reCAPTCHA to protect checkout and login forms from bot attacks. Configurable in **Store Settings > Security**.

Applicable cases:
- Checkout login.
- Newsletter subscriptions.
- Custom forms (via Master Data frontend forms).

## Intrusion detection

VTEX's infrastructure includes automated threat detection and DDoS mitigation through its CDN (AWS CloudFront / Fastly) and security layers.
