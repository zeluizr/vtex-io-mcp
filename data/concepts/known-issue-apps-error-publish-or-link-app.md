---
title: 'Error when trying to publish or link an app'
source: vtexdocs/known-issues
category: Apps
kiStatus: Backlog
internalReference: 1056882
---

## Summary

This error is normally associated with a huge app size being developed. It happens because the builder hub bursts its memory due to many files on the app. Delays in linking the app may also be associated with this issue.

## Simulation

Try using `vtex link` on an app with a huge size or a lot of files. You may receive the following errors:

    11:51:13.298 - error: Workerpool Worker terminated Unexpectedly exitCode: `null` signalCode: `SIGABRT` workerpool.script: `/usr/local/data/service/src/node/utils/workers/worker.js` spawnArgs: `/usr/local/bin/node,/usr/local/data/service/src/node/utils/workers/worker.js` spawnfile: `/usr/local/bin/node` stdout: `null` stderr: `null` vtex.builder-hub@0.299.0 11:51:13.299 - error: App build failed with message: Workerpool Worker terminated Unexpectedly

    13:30:05.456 - error: App ended with exit code 15. Will restart in 10s. service-node@6.38.3

## Workaround

Analyze the size of the app and its files. If it is necessary, try to divide the app into smaller apps so the size will be reduced.
