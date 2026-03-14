---
title: 'Messages app taking too long to return the information'
source: vtexdocs/known-issues
category: Store Framework
kiStatus: Backlog
internalReference: 567305
---

## Summary

In the indexation process, the messages app is called to save translated information on products. The main issue is that requests are taking too long to return, causing stores with many languages to either not index fully or have their indexations stuck.

## Simulation

Check any store that has more than 10 languages configured. The messages app will start to slow down responses and this can affect other systems that depend on messages for translation.

## Workaround

No workaround available.
