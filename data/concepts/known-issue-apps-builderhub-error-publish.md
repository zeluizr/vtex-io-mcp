---
title: 'Builder-hub error when trying to publish an app'
source: vtexdocs/known-issues
category: Apps
kiStatus: Backlog
internalReference: 1262332
---

## Summary

When trying to publish an app, you may encounter a builder-hub error. This intermittency normally happens in apps with self-dependency. You'll see an error such as:

    error: node@4.x builder failed to install dependencies through yarn (retries=3)
    yarn errors: An unexpected error occurred: "http://.vtexassets.com/_v/public/typings/v1//public/@types/: Request failed \"500 Internal Server Error\"".
    vtex.builder-hub@0.309.0

## Simulation

Not simple to reproduce; the issue is intermittent.

## Workaround

This may be solved after some retries. If the error persists, open a ticket with Product Support to resolve it.
