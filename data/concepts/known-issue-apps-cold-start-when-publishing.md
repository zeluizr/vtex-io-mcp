---
title: 'Cold start when publishing an app'
source: vtexdocs/known-issues
category: Apps
kiStatus: Backlog
internalReference: 1088942
---

## Summary

When trying to publish an app, the process may fail on the first attempt due to a cold start of the responsible app.

## Simulation

Try publishing an app. If it doesn't work the first time, try again. The error you will see on the first attempt will be something like:

    error: undefined

## Workaround

Try to publish the app again. This is typically a cold start issue and a retry usually succeeds.
