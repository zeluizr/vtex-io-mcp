---
title: 'Drag and Drop issue on Site Editor'
source: vtexdocs/known-issues
category: CMS
kiStatus: Backlog
internalReference: 685103
---

## Summary

Customers cannot use the drag and drop feature in the Site Editor to upload images. This likely occurs due to a new implementation of CMS Media Management.

## Simulation

Go to any account and try to upload a banner image through drag and drop in the Site Editor.

## Workaround

Two options:
1. Upload images without using drag and drop (use the file picker instead).
2. Roll back to an older version of admin-pages that does not include CMS Media Management: `vtex.admin-pages@4.43.1`.

To roll back, run:

    vtex install vtex.admin-pages@4.43.1

Note: Rolling back to 4.43.1 will resolve the drag and drop issue but may reintroduce other previously fixed issues.
