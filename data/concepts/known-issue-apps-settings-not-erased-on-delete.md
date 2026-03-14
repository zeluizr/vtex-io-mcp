---
title: 'App settings are not erased when you delete the app'
source: vtexdocs/known-issues
category: Apps
kiStatus: Backlog
internalReference: 1065954
---

## Summary

When you install an app from the App Store and access its settings, you have the "Uninstall" option (deletes the app from the workspace but keeps its settings) and the "Delete" option (should delete both the app and its settings). However, when you select "Delete" and reinstall the app, the configuration has not been deleted as expected.

## Simulation

1. Go to the App Store and select an app.
2. Click "Get app" and "Install app".
3. Fill in the settings and save.
4. Click "Delete" and confirm.
5. Reinstall the same app.
6. Check the settings — previously filled information will still be present.

## Workaround

No workaround available. You can overwrite the settings with fictitious information as a temporary measure.
