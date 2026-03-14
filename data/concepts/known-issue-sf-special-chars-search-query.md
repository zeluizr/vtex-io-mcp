---
title: 'Special Characters in Search Query Break Store Framework Search Behavior'
source: vtexdocs/known-issues
category: Store Framework
kiStatus: Backlog
internalReference: 1232881
---

## Summary

When a search query includes special characters such as `#` or `?`, the remainder of the product name after the special character is ignored. Additionally, the `map` parameter is incorrectly recognized, resulting in an empty search or a 'Not Found' page if the flag `enable404OneSegment` is set to `true`.

## Simulation

1. Go to the store's search page (Store Framework-based).
2. Perform a search for a product with special characters, such as `Produto#123` or `Produto?123`.
3. Observe that only the part of the term before the special character is considered.
4. The `map` parameter is disregarded, leading to a broken or empty search result.

## Workaround

No workaround available.
