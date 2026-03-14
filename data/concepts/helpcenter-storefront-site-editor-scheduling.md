---
title: 'Scheduling content updates in Site Editor'
id: helpcenter-site-editor-scheduling
status: PUBLISHED
source: vtexdocs/help-center-content
originalPath: docs/en/tutorials/storefront/site-editor/scheduling-content-updates.md
---

The Site Editor allows you to schedule storefront content updates to go live at specific dates and times. This is useful for campaigns, seasonal promotions, and planned store changes.

## How scheduling works

When creating or editing content in Site Editor, you can configure the **Visibility** settings for each block version to control when it appears in your store.

Key concepts:

- **Active now**: The content goes live immediately when saved.
- **Scheduled start date**: The content activates automatically at the defined date/time.
- **Scheduled end date**: The content deactivates automatically at the defined date/time, returning to the previous active content.

## Setting up scheduled content

1. In the VTEX Admin, access **Storefront > Site Editor**.
2. Navigate to the page containing the block you want to schedule.
3. Select the desired block.
4. Click on `Versions` > `New content` (or select an existing version).
5. Make your desired changes.
6. In the **Visibility** section:
   - Toggle the **Start date** button and select the activation date in the calendar.
   - Optionally toggle the **End date** button and select the deactivation date.
7. Save the changes.

## Scope of scheduling

When scheduling content, you can choose whether the changes apply to:

- **This URL**: Content only shows on the specific URL you are currently viewing (with its exact parameters and query strings).
- **This template**: Content applies to all pages using the same template.

The more specific the URL, the more restricted the new content will be.

## Managing scheduled versions

All versions — active, inactive, and scheduled — are visible in the **Versions** panel for each block:

- Versions are listed from newest to oldest.
- The active version is highlighted.
- Scheduled versions show their activation times.
- You can delete or reset any version from the kebab menu.

## Relationship with content versions

Scheduling is built on top of the [content versions](https://help.vtex.com/en/tutorial/managing-content-versions) feature. Each scheduled update creates a new version for the block, enabling rollback if needed.
