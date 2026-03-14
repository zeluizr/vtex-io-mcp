---
title: 'Cold Start requests failing with timeout and courier retries not working as expected'
source: vtexdocs/known-issues
category: App Platform
kiStatus: Backlog
internalReference: 789499
---

## Summary

When an app does not receive requests for some time, it goes into cold start. Courier then makes several attempts to send events until the app "wakes up." When the app does not wake up, requests to it can fail due to a timeout. As a result, some events may never be sent. This is an intermittent behavior.

## Simulation

- Find an app that is in cold start.
- Follow its logs via OpenSearch.
- Sometimes it is possible to see that one or more events will never be sent.

## Workaround

No workaround available. This is a known platform limitation when apps experience cold starts.
