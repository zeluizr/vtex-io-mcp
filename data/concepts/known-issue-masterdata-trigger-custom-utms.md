---
title: 'Master Data trigger custom UTMs do not reflect accordingly'
source: vtexdocs/known-issues
category: Master Data
kiStatus: Backlog
---

## Summary

During the email trigger creation process, the user is able to set a custom UTM. However, Master Data always uses `VTEXCEM` as the UTM source instead of the custom one set by the user.

## Simulation

1. Create a trigger in Master Data.
2. Set the UTM to a custom value (e.g., `CEM`).
3. Trigger the action (e.g., abandon a cart to trigger an abandoned cart email).
4. Notice that the email uses the UTM `VTEXCEM` instead of the custom value `CEM`.

## Workaround

No workaround available for this scenario.
