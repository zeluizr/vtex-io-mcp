---
title: 'VBase responds 404 to vtex.pages-graphql'
source: vtexdocs/known-issues
category: Apps
kiStatus: Backlog
internalReference: 822031
---

## Summary

VBase is intermittently responding 404 to the `vtex.pages-graphql` app installed in the account. When this happens, the app is not found and shoppers are impacted by not being able to access a specific product or page in the store. This 404 error is cached for 2 hours, so the problem typically stops after the cache expires. The problem is intermittent and the root cause has not yet been determined.

Incident report: https://io.vtex.com.br/incident-report/2023-04-04-VTEX-IO-Intermittent-Pageload-Failures.pdf

## Simulation

Difficult to simulate because it is intermittent and does not affect a specific page or product. The issue usually manifests as random products or pages failing to load completely during store navigation. Reloading the page resolves it temporarily.

## Workaround

No workaround available. The issue resolves after the 2-hour cache expires.
