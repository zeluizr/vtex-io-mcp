---
title: 'Changes made in the Styles admin page are not saved properly'
source: vtexdocs/known-issues
category: Store Framework
kiStatus: No Fix
internalReference: 971948
---

## Summary

Changes made using the styles page of the admin UI are not currently saving properly and will not always be applied to the website. The UI shows "Saved successfully" but the changes do not reflect on the store.

## Simulation

1. Try to make changes to the styling of the website through the styles page in admin.
2. Save the changes.
3. The changes won't reflect on the website.
4. There are no errors logged in the console and the "Saved successfully" message is displayed.

## Workaround

No workaround available. For reliable style changes, edit your theme's CSS files directly via the styles builder.
