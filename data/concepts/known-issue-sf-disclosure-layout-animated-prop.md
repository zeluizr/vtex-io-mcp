---
title: "Disclosure Layout can't be used properly when prop animated is set as true"
source: vtexdocs/known-issues
category: Store Framework
kiStatus: No Fix
internalReference: 417947
---

## Summary

There is a bug in `disclosure-layout` where setting the `animated` prop to `true` causes the block to only trigger showing content but prevents it from closing/hiding. The `animated` prop does not work properly when set in disclosure layout.

## Simulation

1. Go to any store using `disclosure-layout` with prop `animated` set to `true`.
2. Try to show and then hide the element.
3. The content cannot be hidden after opening.

## Workaround

Add the following CSS handle in your styles. This avoids the animation issue because the class is changed when hidden:

    .vtex-disclosure-layout-1-x-content--search-description-content--hidden {display: none;}
