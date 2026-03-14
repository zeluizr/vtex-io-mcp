# Site Editor and Content

**Course ID:** content-workflow
**Description:** Learn how to manage workspaces, publish apps, and use the VTEX Site Editor for content management.

## Overview

This course covers the VTEX IO development and publishing workflow: workspace types, publishing apps to production, installing apps, and using the Site Editor to manage storefront content without code changes.

---

## Step 01 — Workspaces

### Concept

VTEX IO uses workspaces to isolate development environments. There are three types:

1. **Development workspace** — created with `vtex use {name}`. Supports `vtex link`. Not accessible to customers.
2. **Production workspace** — created with `vtex use {name} --production`. Must be used when publishing. Cannot use `vtex link`.
3. **Master workspace** — the live storefront. Receives promoted production workspaces.

### Workspace commands

```bash
# Create/switch to a development workspace
vtex use myworkspace

# Create/switch to a production workspace
vtex use myworkspace --production

# List all workspaces
vtex workspace list

# Delete a workspace
vtex workspace delete myworkspace

# Promote a workspace to master
vtex workspace promote
```

### Access a workspace

Development/production workspaces are accessible at:
`https://{workspaceName}--{accountName}.myvtex.com`

### Key rules

- **`vtex link`** only works in development workspaces
- **`vtex publish`** requires a production workspace
- Changes in one workspace do not affect other workspaces or master

---

## Step 02 — Publishing an App

### Concept

Publishing makes an app version available in the VTEX IO registry for installation by any account.

### Steps to publish

1. Switch to a production workspace:
```bash
vtex use myworkspace --production
```

2. Publish the app:
```bash
vtex publish
```

Publishing validates the app, runs build steps, and uploads it to the registry. The app version in `manifest.json` determines the published version.

### Versioning

- **Patch** (0.0.x) — bug fixes, no breaking changes
- **Minor** (0.x.0) — new features, backward compatible
- **Major** (x.0.0) — breaking changes

After publishing, the app is available but not yet deployed. Use `vtex deploy` to make a stable release (for major/minor) or it's available immediately for patch releases.

---

## Step 03 — Installing an App

### Concept

After publishing, apps can be installed in any VTEX account.

```bash
# Install a specific version
vtex install {vendor}.{appname}@{version}

# Install latest compatible version
vtex install {vendor}.{appname}
```

### House Keeper (automatic updates)

VTEX IO's House Keeper service automatically updates installed apps to the latest compatible patch version. This means:
- Patch releases (`0.0.x`) are auto-installed
- Minor and major releases require manual installation

### Checking installed apps

```bash
# List installed apps in current workspace
vtex list

# Check app status
vtex ls
```

---

## Step 04 — Site Editor

### Concept

The **Site Editor** is a visual content management interface in the VTEX Admin. It allows non-technical users to change storefront content (banners, text, images) without touching code.

Access it at: `/admin/cms/site-editor`

For a block to be editable in Site Editor:
- Its props must be declared in the component's `schema` property (for custom React blocks)
- Or the native block must support Site Editor natively (most VTEX native blocks do)

### What you can do in Site Editor

- Change banner images and text
- Reorder blocks on a page
- Toggle block visibility
- Edit rich-text content
- Configure block props without code changes

### Activity

Using the Site Editor interface:

1. Navigate to `/admin/cms/site-editor` in your store admin
2. Select a page template (e.g., Home)
3. Click on an `info-card` block
4. Change the headline text
5. Change the banner image URL
6. Save and preview the changes

The Site Editor reads the `schema` property of each block to render the appropriate editing form. Fields declared in `schema.properties` appear as editable inputs.

---

## Challenge

Using the Site Editor:

1. Open your store's home page in Site Editor
2. Add a new `rich-text` block via the Site Editor interface
3. Edit an existing `info-card` block to change its image and call-to-action text
4. Reorder blocks on the home page
5. Preview the changes in a production workspace before promoting to master

This challenge demonstrates the full content management lifecycle without code changes.
