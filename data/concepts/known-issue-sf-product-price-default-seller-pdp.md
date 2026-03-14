---
title: 'Product Price not considering default seller in PDP'
source: vtexdocs/known-issues
category: Store Framework
kiStatus: No Fix
internalReference: 429888
---

## Summary

When showing the price on a Product Detail Page (PDP), the `ProductPrice` component ignores the Default Seller setting and always considers the first seller that was registered in the array instead.

## Simulation

The `ProductPrice` component always uses the first seller in the array:

    const commertialOffer = path(
      ['sellers', 0, 'commertialOffer'],
      selectedItem
    )

This means the Default Seller configuration is not respected when determining the displayed price.

## Workaround

No workaround available. This is a known limitation with no fix planned.
