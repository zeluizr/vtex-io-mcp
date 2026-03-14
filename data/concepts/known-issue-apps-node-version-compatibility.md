---
title: 'Issue with Node Version Compatibility'
source: vtexdocs/known-issues
category: Apps
kiStatus: Backlog
internalReference: 1256617
---

## Summary

Currently, the builder hub runs on Node image 16.X, meaning it is only possible to build libraries supported up to that version. Apps using builder 7 run on Node 20, however the problem arises during the build process, as the builder hub is running on version 16, causing an incompatibility issue.

## Simulation

When trying to build an app in VTEX, you may see an error like:

    @vendor/app@1.X.X: The engine "node" is incompatible with this module. Expected version ">=18.0.0". Got "16.X.X" Found incompatible module.

The module requires Node version 18.0.0 or higher, but the builder hub currently uses 16.X.X.

## Workaround

Since builder-hub is limited to Node 16.X, you need to use packages that have the engine set to `node >= 16.X`. If you're using a specific library, downgrade the library version to a compatible one that supports Node 16.
