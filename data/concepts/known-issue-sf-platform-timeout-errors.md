---
title: 'Platform timeout errors'
source: vtexdocs/known-issues
category: Store Framework
kiStatus: Backlog
internalReference: 1051070
---

## Summary

The messages app randomly receives a timeout error, and some pages may need a refresh to work properly. This affects admin pages and any other page on the platform. The issue is related to GraphQL queries — you will typically see errors in the `/meta` route or a messages app timeout related to the `translateWithDeps` query.

## Simulation

Try accessing some admin pages. Randomly, a page can receive a timeout error. The issue also appears on the myvtex environment when accessing any other pages. Refreshing the page should resolve it temporarily.

## Workaround

No workaround available. Refreshing the page typically resolves the immediate error.
