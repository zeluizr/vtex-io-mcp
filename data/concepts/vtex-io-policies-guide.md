---
title: "Policies — complete guide"
slug: "vtex-io-documentation-policies-guide"
source: "https://developers.vtex.com/docs/guides/vtex-io-documentation-policies"
---

Policies are a set of permissions granted to a resource (VRN) or a role that allows or forbids them to execute a given set of actions in an account, such as making a request to the platform.

In VTEX IO, apps interact with policies in two ways:

- Using policies to **access an external resource**, such as an endpoint exposed by another VTEX IO app.
- **Exposing policies** to define how other apps, users, or services can securely access the resources they provide.

## Types of policies

Both types are based on AWS's IAM policies.

### Role-based policies

Associated with a role in the platform (e.g., a role assumed by an app). These policies must be declared in the `policies.json` file in the app's root folder.

### Resource-based policies

Assigned to a resource in the platform (e.g., an API endpoint). The resource itself must declare which apps, users, and services it trusts. Since routes are declared in `service.json`, resource-based policies are also declared there.

## Declaring outbound access policies

To allow an app to make requests to an external resource, add to `manifest.json`:

```json
"policies": [
  {
    "name": "outbound-access",
    "attrs": {
      "host": "api.example.com",
      "path": "*"
    }
  }
]
```

For VTEX internal APIs:

```json
"policies": [
  {
    "name": "outbound-access",
    "attrs": {
      "host": "portal.vtexcommercestable.com.br",
      "path": "/api/catalog/*"
    }
  }
]
```

## Common policy patterns

### Accessing VTEX APIs

```json
{
  "name": "outbound-access",
  "attrs": {
    "host": "{{account}}.vtexcommercestable.com.br",
    "path": "/api/*"
  }
}
```

### Accessing Master Data

```json
{
  "name": "outbound-access",
  "attrs": {
    "host": "{{account}}.vtexcommercestable.com.br",
    "path": "/api/dataentities/*"
  }
}
```

### VBase access

```json
{
  "name": "vbase-read-write"
}
```

## Resource-based policies in service.json

```json
{
  "routes": {
    "myRoute": {
      "path": "/_v/my-app/data",
      "public": false,
      "policies": [
        {
          "effect": "allow",
          "actions": ["GET"],
          "principals": ["vrn:vtex:aws-us-east-1:{account}:apps:{appVendor}.{appName}@*"]
        }
      ]
    }
  }
}
```
