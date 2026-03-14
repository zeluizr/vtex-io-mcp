---
title: 'Advanced store settings being registered globally instead of by binding'
source: vtexdocs/known-issues
category: CMS
kiStatus: Backlog
internalReference: 783835
---

## Summary

When saving advanced settings split by binding in the CMS, the system registers the settings globally for all bindings instead of scoping them to the specific binding. However, when requesting these values at render runtime, the system correctly gets the values from the binding context (not from the global context), leading to a mismatch.

Reference: https://github.com/vtex-apps/store/blob/46e3df3ecba20170fc3a6eebf12370969e3b5abf/react/components/ProductTitleAndPixel.tsx#L186

## Simulation

You need a store with multiple bindings. Enable binding for store settings at `admin/cms/store`. Save your advanced settings and check `https://infra.io.vtex.com/apps/v0/{account}/apps/vtex.store/settings`. Advanced settings will appear outside of binding contexts.

## Workaround

Add the settings you want through a PUT request into the settings key inside one of the binding objects directly via API.
