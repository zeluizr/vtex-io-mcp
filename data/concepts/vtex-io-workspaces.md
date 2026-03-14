---
title: "Workspace"
slug: "vtex-io-documentation-workspace"
source: "https://developers.vtex.com/docs/guides/vtex-io-documentation-workspace"
---

Workspaces are environments isolated from each other in terms of app development. They can be understood as different versions of the same VTEX account. In practice, changes performed in a particular workspace do not affect your store's live version or other developers' work.

> If you're used to working with git, think of workspaces as branches.

## Types of workspaces

There are three main types of workspaces:

### Development workspace

Mainly used by software developers to draft, build or extend VTEX IO apps and storefront themes. These workspaces:
- Provide more development freedom
- Allow linking, installing, and publishing VTEX IO apps
- Cannot handle production traffic
- Cannot be promoted to master
- Cannot be used for A/B testing

### Production workspace

Mainly used by the quality assurance and development teams to validate VTEX IO apps. These workspaces:
- Support production traffic
- Can be used for A/B testing
- Forbid linking apps
- Can be promoted to master

### Master workspace

A **unique** production workspace that reflects the content served to the end-users of a store.

## Accessing workspaces

Development and production workspaces can be accessed at:
```
https://{workspace}--{account}.myvtex.com
```

## Key workspace commands

```bash
# Create or switch to a development workspace
vtex workspace use {workspaceName}

# Create a production workspace
vtex workspace use {workspaceName} --production

# Promote a production workspace to master
vtex workspace promote

# List all workspaces
vtex workspace list

# Delete a workspace
vtex workspace delete {workspaceName}
```

> ⚠ While each workspace operates independently when it comes to app development, they share the same VTEX platform modules accessible through Admin. Changes made in a specific workspace will be reflected in all others.
