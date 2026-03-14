---
title: 'Service worker does not create a correct scope for multibinding stores'
source: vtexdocs/known-issues
category: Store Framework
kiStatus: Backlog
internalReference: 1146421
---

## Summary

The VTEX IO Service Worker fails to create the correct scope for stores with multiple bindings. When generating the scope to create the access URL for the service worker, it ends up creating a duplicate path, which causes errors in functionalities that depend on the service worker.

## Simulation

1. Create a store with multiple bindings (multibinding).
2. Set up the service worker to generate the URL with scope.
3. Observe that the service worker creates a duplicate path. This duplication leads to errors or unexpected behavior in parts of the application that rely on the service worker.

## Workaround

If your multibinding store does not require a service worker, you can disable the service worker as a workaround. This will prevent the error from occurring until a proper fix is implemented.
