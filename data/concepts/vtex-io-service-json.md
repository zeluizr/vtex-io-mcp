---
title: "Service (service.json)"
slug: "vtex-io-documentation-service"
source: "https://developers.vtex.com/docs/guides/vtex-io-documentation-service"
---

In the VTEX IO ecosystem, services play a crucial role by allowing you to run .NET and Node.js code directly on VTEX servers. Services enable VTEX IO apps to export HTTP routes, GraphQL resolvers, and event handlers to the server.

## Developing services

To create and export services, you need to specify the `node` or `dotnet` builders in your app's `manifest.json` file. GraphQL services can be exported using the `graphql` builder.

## The `service.json` file

The `service.json` is a configuration file located in the `/node` or `/dotnet` folder of your app. It defines essential parameters, including timeout, memory allocation, routes, event handlers, and replicas.

```json
{
  "memory": 256,
  "ttl": 10,
  "timeout": 2,
  "minReplicas": 2,
  "maxReplicas": 4,
  "routes": {
    "status": {
      "path": "/_v/status/:code",
      "public": true
    }
  }
}
```

## Service configuration parameters

| Name | Type | Description |
|--|--|--|
| `memory` | `number` | Memory size (in MB). Default: 128, maximum: 1024. |
| `minReplicas` | `number` | Minimum number of replicas. Minimum: 2 for installed apps, 1 for linked apps. |
| `maxReplicas` | `number` | Maximum number of replicas. Minimum: 5, maximum: 60. |
| `timeout` | `number` | Timeout (in seconds) for aborting a connection. Default: 10, min: 1, max: 60. |
| `ttl` | `number` | Time-to-live (in minutes) for how long the platform keeps each instance running without new requests. Default: 10, min: 10, max: 60. |
| `workers` | `number` | Number of workers to spawn for the service on production. Min: 1, max: 4. |
| `routes` | `object` | Maps route names to objects containing `path`, `public`, `access`, and `policies`. |
| `events` | `object` | Maps event handler names to objects describing `sender`, `topics`, and `settingsType`. |
| `rateLimitPerReplica` | `object` | Global throttling limits with `perMinute` and `concurrent` sub-fields. |

## Routes configuration

Each route object supports:

| Field | Type | Description |
|--|--|--|
| `path` | `string` | URL path of the route (supports `:param` patterns). |
| `public` | `boolean` | If `true`, accessible at `{account}.myvtex.com`. If `false`, requires VtexidClientAutCookie for authentication. |
| `access` | `string` | Possible values: `public`, `authenticated`, or `authorized`. |
| `policies` | `array` | Defines allowed/denied actions for the route (Resource-based Policies). |

## Events configuration

```json
"events": {
  "skuChange": {
    "keys": ["broadcaster.notification"]
  }
}
```

| Field | Description |
|--|--|
| `topics` | Identifiers of the event (previously known as `keys`). |
| `sender` | Name of the app that sends the event. |
| `settingsType` | Possible values: `pure`, `workspace`, or `userAndWorkspace`. |

## Best practices

### Memory allocation
Evaluate the app's memory usage considering complexity and data structures. Adequate memory allocation prevents failures and performance issues.

### Timeout settings
Balance between low (fast feedback to client) and high (accommodate slow processing) timeout. Default of 10s is appropriate for most cases.

### Replica management
`minReplicas` and `maxReplicas` should reflect expected demand. VTEX autoscales within these bounds.

### TTL management
Low TTL values can lead to cold starts (slow first request). Increase TTL above default only if you frequently observe cold start slowness.

### Worker configuration
More workers increase processing capacity but also increase memory usage. Only increase if your service benefits from parallelism.
