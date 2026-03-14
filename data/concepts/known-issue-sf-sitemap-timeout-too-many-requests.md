---
title: 'Sitemap not generating due to a timeout (tooManyRequests)'
source: vtexdocs/known-issues
category: Store Framework
kiStatus: Backlog
internalReference: 1077009
---

## Summary

When generating a new sitemap for a store with a large number of products (normally around 100k products), the `vtex.store-sitemap` app may receive a `tooManyRequests` error and the sitemap generation fails to complete.

## Simulation

If your store has a huge number of products (normally around 100k), try generating a new sitemap. If the sitemap is not finished, this can be related to the tooManyRequests error caused by the large product count.

## Workaround

Open a ticket to the product support team for analysis and assistance.
