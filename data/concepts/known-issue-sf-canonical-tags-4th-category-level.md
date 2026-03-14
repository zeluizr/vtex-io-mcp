---
title: 'Canonical tags are not applied after 3rd category level'
source: vtexdocs/known-issues
category: Store Framework
kiStatus: Backlog
internalReference: 932349
---

## Summary

Canonical tags are not applied after the 3rd category level. When a store has a category tree with more than 3 levels (department, category, subcategory), the levels above the 3rd are not included in canonical tags. The only exception is when routes are stored in rewriter.

## Simulation

1. Create any 4th level subcategory.
2. Access the page created.
3. Check the canonical tag in the browser console — it will not show anything beyond the 3rd level.

## Workaround

Run the bootstrap query on rewriter `vtex.routes-bootstrap@0.x`:

    {bootstrap{categories}}
