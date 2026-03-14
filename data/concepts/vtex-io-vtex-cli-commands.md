---
title: "VTEX IO CLI Command Reference"
slug: "vtex-io-documentation-vtex-io-cli-command-reference"
source: "https://developers.vtex.com/docs/guides/vtex-io-documentation-vtex-io-cli-command-reference"
---

Reference for VTEX IO CLI default commands. VTEX IO CLI 3.x has a plugin-based architecture, which means certain commands are implemented as plugins.

## Default commands

| Command | Description |
| --- | --- |
| `vtex autoupdate` | Automatically updates VTEX IO CLI. |
| `vtex browse [PATH]` | Opens the URL relative to your current workspace and account in a new browser window. |
| `vtex deploy [APPID]` | Publishes an app as a stable version. Only works for apps previously published as a release candidate. |
| `vtex deprecate [APPID]` | Deprecates the specified app, uninstalling and downgrading it on every VTEX account. |
| `vtex deps diff [WS1] [WS2]` | Displays differences between the dependencies of two distinct workspaces. |
| `vtex deps list` | Displays the complete dependency tree of the current workspace. |
| `vtex deps update` | Updates a dependency of the current workspace. If not specified, updates all dependencies. |
| `vtex edition get` | Displays the Edition App version installed on the current account. |
| `vtex edition set` | Sets the Edition App version for the current account. |
| `vtex help` | Displays help for VTEX CLI commands. |
| `vtex init` | Copies starting files and folders from VTEX boilerplates to your local directories. |
| `vtex install [APPID]` | Installs an app on the current workspace. If no app specified, defaults to the app in the current directory. |
| `vtex link` | Syncs the app in the current directory with the development workspace being used. |
| `vtex list` | Lists the apps installed on the current workspace and account. |
| `vtex local token` | Prints the user auth token and copies it to the clipboard. |
| `vtex login [ACCOUNT]` | Logs into a VTEX account. |
| `vtex logout` | Logs out from the current VTEX account. |
| `vtex publish` | Publishes the app in the current directory as a release candidate version. |
| `vtex release [RELEASETYPE] [TAGNAME]` | Bumps the app version, commits, and pushes to remote. |
| `vtex setup` | Sets up typing and tools for the current development environment. |
| `vtex switch [ACCOUNT]` | Switches to another VTEX account. |
| `vtex undeprecate [APPID]` | Reverts a deprecated version of an app to a stable version. |
| `vtex uninstall [APPID]` | Uninstalls an app from the current account and workspace. |
| `vtex unlink [APPID]` | Unlinks an app from the current workspace. |
| `vtex update` | Updates all installed apps to the latest minor or patch version. Does not upgrade to another major. |
| `vtex whoami` | Prints details about the current account, workspace, environment, and login information. |

## Workspace commands

| Command | Description |
| --- | --- |
| `vtex workspace abtest finish` | Stops all A/B tests on the current account. |
| `vtex workspace abtest start` | Starts a new A/B test on the current workspace. |
| `vtex workspace abtest status` | Displays the results of the active A/B tests. |
| `vtex workspace delete [NAME]` | Deletes one or many workspaces from the current account. |
| `vtex workspace list` | Lists all workspaces of the current account. |
| `vtex workspace promote` | Promotes the current workspace to master. Only for production workspaces. |
| `vtex workspace reset [NAME]` | Cleans all configurations of the specified workspace and recreates it from master. |
| `vtex workspace status [NAME]` | Displays information about the specified workspace. |
| `vtex workspace use [NAME]` | Creates and switches to a new workspace or switches to an existing one. |

## Key command details

### `vtex link`

Syncs the app in the current directory with the development workspace. Use this during development to see changes live.

```shell
vtex link
```

Options:
- `--clean` / `-c`: Cleans the builder cache before linking.
- `--no-watch` / `-n`: Doesn't watch for local source file changes after the first sync.

### `vtex deploy`

Publishes an app as a stable version. Requires the app to have been previously published as a release candidate with `vtex publish`.

```shell
vtex deploy
vtex deploy vtex.service-example@0.0.1
```

Options:
- `--yes` / `-y`: Answers yes to all prompts.
- `--force` / `-f`: Ignores the 7-minute testing period after publishing.

### `vtex publish`

Publishes the app in the current directory as a release candidate version.

```shell
vtex publish
```

Options:
- `--workspace` / `-w`: Specify a workspace to release from.
- `--yes` / `-y`: Answers yes to all prompts.

### `vtex workspace use`

Creates and switches to a new workspace, or switches to an existing one.

```shell
# Development workspace (default)
vtex workspace use myworkspace

# Production workspace
vtex workspace use myworkspace --production
```

### `vtex release`

For git users. Bumps the app version, commits, and pushes to remote.

```shell
vtex release major
vtex release minor
vtex release patch
vtex release major beta
```

## Common development workflow

```shell
# 1. Login to your account
vtex login myaccount

# 2. Create a development workspace
vtex workspace use mydev

# 3. Link your app for live development
vtex link

# 4. When done, switch to a production workspace
vtex workspace use myprod --production

# 5. Install your app to test
vtex install

# 6. Publish as release candidate
vtex publish

# 7. Deploy as stable
vtex deploy

# 8. Promote to master
vtex workspace promote
```
