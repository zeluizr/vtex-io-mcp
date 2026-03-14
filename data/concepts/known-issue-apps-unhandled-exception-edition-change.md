---
title: '"Unhandled exception" error when changing edition of account'
source: vtexdocs/known-issues
category: Apps
kiStatus: Backlog
internalReference: 907294
---

## Summary

Sometimes when changing the edition of an account or workspace you may see the following error:

    - error: Unhandled exception - error: Please report the issue in https://github.com/vtex/toolbelt/issues

The error is not consistent and does not happen all the time. It is more likely to occur when the master workspace is using `edition-business` and you want to change the edition to `edition-store` on a different workspace.

## Simulation

Try to change the edition of any test account or workspace — this error will eventually occur during the process.

## Workaround

- Run `vtex edition get` to confirm whether the edition actually changed. Sometimes it changes even when the error is shown.
- If apps did not update, run `vtex update`.
- Wait a while and try again.
- It can also happen that the error appears, the edition changes, but apps do not update — in this case just run `vtex update`.
