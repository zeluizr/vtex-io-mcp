---
title: '"Error listing workspace dependencies" when trying to access an account'
source: vtexdocs/known-issues
category: Apps
kiStatus: Backlog
internalReference: 1260934
---

## Summary

When you try to access an account that has been inactive for a long time or has not been updated, you may see the following error:

    {"code": "route_map_error","message": "Error fetching source data for route map: Error listing workspace dependencies: (500 generic_error at http://infra.io.vtex.com/apps/v0//master/v2/apps?fields=...) Error listing workspace dependencies: Failed to get installed dependencies: Failed to read data from cache: Unable to fetch data from remote cache: got 4 elements in cluster info address, expected 2 or 3","requestId": ""}

This happens because the housekeeper does not update accounts that have been inactive for a long time. The issue is related to an update on the cache infrastructure.

## Simulation

Difficult to simulate; requires an old or inactive account. This issue also prevents access to the account's admin and makes it impossible to log in using the CLI. More likely to happen on franchise or seller accounts.

## Workaround

Open a ticket to PS Apps so the team can perform the workaround manually.
