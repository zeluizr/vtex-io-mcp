---
title: 'Carousel layout issue using responsive-values in SKU Selector'
source: vtexdocs/known-issues
category: Store Framework
kiStatus: Backlog
internalReference: 1217421
---

## Summary

SKU Selector width value breaks when `displayMode="slider"` is used for unavailable products and `sliderItemsPerPage` is configured using `min-width` values (responsive-values pattern).

## Simulation

1. Install `vtex.responsive-values` app in the workspace, or configure a responsive-values block using `min-width` breakpoints.
2. Configure the `sliderItemsPerPage` prop of the SKU Selector using the responsive-values pattern with `min-width` keys.
3. Deploy this configuration to a PDP that has no available SKUs (all out of stock).
4. Access the PDP and confirm the SKU Selector renders in `displayMode="slider"`.
5. Observe that the SKU carousel breaks — items have incorrect widths, often overflowing or not rendering as expected.

## Workaround

Replace the `sliderItemsPerPage` configuration using `min-width` keys with the standard expected format using `desktop`, `tablet`, and `mobile` keys instead.
