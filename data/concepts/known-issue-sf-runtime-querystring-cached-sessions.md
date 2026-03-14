---
title: 'Variable __RUNTIME__.route.queryString is Cached Across Different User Sessions'
source: vtexdocs/known-issues
category: Store Framework
kiStatus: Backlog
internalReference: 1275673
---

## Summary

The server caches query string parameters from the `__RUNTIME__.route.queryString` object across different user sessions. This can lead to a user's session incorrectly inheriting query string data from a previous user's session.

## Simulation

1. Access a store page with a specific query string on machine A: `https://www.examplestore.com/sale?targeting=affiliate_A`
2. The application reads the `targeting` parameter from `__RUNTIME__.route.queryString` and correctly identifies `affiliate_A`.
3. On a completely different machine B (new clean session), access the same page **without** the query string: `https://www.examplestore.com/sale`
4. **Expected behavior:** `__RUNTIME__.route.queryString` should be empty or not contain `targeting`.
5. **Actual behavior:** Due to server-side caching, `__RUNTIME__.route.queryString` still contains `targeting=affiliate_A` from machine A's session.

## Workaround

Do not use `__RUNTIME__.route.queryString` to read dynamic query string parameters expected to vary between users or sessions (such as affiliate, campaign, or user identifiers). This variable is subject to server-side page caching and is not session-specific.

The correct approach:
- **For client-side components (React):** Use browser APIs like `window.location.search` to get the current URL's query string and parse it.
- **For server-side rendering (Node.js):** Access the query string from the request context (e.g., `ctx.query`) instead of the `__RUNTIME__` object.
