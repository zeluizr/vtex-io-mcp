---
title: "Master Data's scroll endpoint sometimes returns a 408 error"
source: vtexdocs/known-issues
category: Master Data
kiStatus: Backlog
---

## Summary

In some cases, when requesting large amounts of data through the Master Data scroll endpoint, the request will timeout and return a 408 error. Executing the first call again typically results in success.

## Simulation

Make a scroll request to Master Data with a large `_size` value:

    http://api.vtex.com/{{accountName}}/dataentities/{{acronym}}/scroll?isCluster=true&_size=250&_fields=email,firstName

The response may be a timeout (408 error).

## Workaround

Reduce the first request's page size. For example, instead of requesting 1000 records, start with 20 or 250:

**Before:**

    http://api.vtex.com/{{accountName}}/dataentities/{{acronym}}/scroll?isCluster=true&_size=1000&_fields=email,firstName

**After:**

    http://api.vtex.com/{{accountName}}/dataentities/{{acronym}}/scroll?isCluster=true&_size=250&_fields=email,firstName
