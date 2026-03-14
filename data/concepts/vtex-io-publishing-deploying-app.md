---
title: "Publishing and deploying an app"
slug: "vtex-io-documentation-publishing-an-app"
source: "https://developers.vtex.com/docs/guides/vtex-io-documentation-publishing-an-app"
---

After developing and testing an app in a development workspace, follow the process below to make it publicly available.

## Full release workflow

```
1. vtex release         → Bump version, commit, push to git
2. vtex publish         → Publish as release candidate
3. vtex install (test)  → Install and test in production workspace
4. vtex deploy          → Publish as stable version
5. vtex workspace promote → Promote workspace to master (for store themes)
```

## Step 1 — Release a new version

For git users, use `vtex release` to bump the version, commit, and push:

```shell
vtex release patch stable   # e.g., 0.0.1 → 0.0.2
vtex release minor stable   # e.g., 0.0.1 → 0.1.0
vtex release major stable   # e.g., 0.0.1 → 1.0.0
vtex release patch beta     # Release candidate
```

Or manually update `version` in `manifest.json` and commit.

## Step 2 — Publish as release candidate

Publishing makes your app installable in other accounts for testing:

```shell
vtex publish
```

This creates a **candidate version** — an internal build for testing purposes only, not yet publicly available.

## Step 3 — Validate in a production workspace

1. Create a production workspace:
   ```shell
   vtex use myprod --production
   ```
2. Install the candidate version:
   ```shell
   vtex install myvendor.myapp@0.1.0
   ```
3. Test behavior in the production workspace.
4. (Optional) Run A/B tests.

## Step 4 — Deploy as stable version

After validation, deploy as a stable version:

```shell
vtex deploy
# or
vtex deploy myvendor.myapp@0.1.0
```

By default, there's a **7-minute minimum waiting period** between `vtex publish` and `vtex deploy` to ensure proper testing. Use `--force` flag to skip this (use with caution).

## Step 5 — Promote to master (Store Themes)

If you're releasing a Store Theme or want changes to go live:

```shell
vtex workspace promote
```

This promotes the production workspace to master, making the changes available to all store users.

## Workspace capabilities

| Action | Development | Production | Master |
| --- | --- | --- | --- |
| Link apps | ✅ | ❌ | ❌ |
| Install apps | ✅ | ✅ | ✅ |
| Publish apps | ✅ | ✅ | — |
| A/B testing | ❌ | ✅ | — |
| Handle traffic | ❌ | ✅ | ✅ |
| Promote to master | ❌ | ✅ | — |

## Key considerations

- **Production workspaces don't inherit from development workspaces.** Any changes in a dev workspace must be manually replicated to the production workspace.
- **Workspace settings persist** unless conflicts arise with the master workspace (master takes precedence).
- **Workspaces are not automatically deleted.** Manually delete unused ones: `vtex workspace delete {name}`.
