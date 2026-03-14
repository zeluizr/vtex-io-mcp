---
title: 'Property blockClass from infoCard not working'
source: vtexdocs/known-issues
category: Store Framework
kiStatus: Backlog
internalReference: 743730
---

## Summary

The `infoCard` component has a prop called `blockClass` to add custom CSS classes to the component, but this property is not working. The class is not applied to the DOM element.

## Simulation

1. Open your `infoCard` component configuration.
2. Add the `blockClass` prop.
3. Inspect the elements in the DOM — you won't find any infoCard element with the added class.

## Workaround

Build your own infoCard using the following VTEX components: `vtex.flex-layout`, `vtex.image`, and `vtex.rich-text`. This gives you more flexibility to build the infocard layout and apply custom CSS handles.
