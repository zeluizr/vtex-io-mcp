---
title: 'Headless CMS ignores array validation settings'
source: vtexdocs/known-issues
category: CMS
kiStatus: Backlog
internalReference: 1046372
---

## Summary

When configuring array validation rules in the Headless CMS — such as minimum and maximum number of array items — the validation errors are not shown to the user, and it is possible to save the schema without passing validation.

The expected behavior would be to block saving and display a message such as:

    "keyword": "minItems", "message": "must NOT have fewer than 3 items"

## Simulation

Add a section that has an array validation rule configured. If you do not respect the validation, the Headless CMS will allow you to publish the content normally without any validation error.

## Workaround

No workaround available. Validate content manually before publishing.
