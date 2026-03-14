---
title: "add_to_cart event doesn't send the discount info and the discount price"
source: vtexdocs/known-issues
category: Store Framework
kiStatus: Backlog
internalReference: 1337368
---

## Summary

When a product has a promotion applied, the `add_to_cart` event should send the discount information and the price with the discount applied (as described in the GA4 documentation: https://developers.google.com/analytics/devguides/collection/ga4/reference/events#add_to_cart_item). However, the current implementation does not include discount data in the `add_to_cart` event — the price sent is still the full price.

## Simulation

Add a product with a promotion to the cart and inspect the `add_to_cart` event in the data layer. There will be no discount field in the response and the price will be the full price.

## Workaround

No workaround available.
