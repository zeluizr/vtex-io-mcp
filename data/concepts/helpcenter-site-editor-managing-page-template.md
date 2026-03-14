---
title: 'Managing page and template content'
id: 3tMbx6HXy4Fy5r9EhboG37
status: PUBLISHED
createdAt: 2021-05-07T03:32:03.808Z
updatedAt: 2023-03-24T22:17:48.424Z
source: vtexdocs/help-center-content
originalPath: docs/en/tutorials/storefront/site-editor/managing-page-and-template-content.md
---

The Site Editor natively reflects the Store Theme app, enabling you to overwrite the predefined configurations for blocks and create new content for your store pages and templates.

> The Site Editor does not allow you to add a new block to a template or specific page, only overwrite existing block configurations from the Store Theme app.

In the VTEX Admin:

1. Access **Storefront > Site Editor**.
2. Use the URL field to navigate to the page containing the block whose content will be overwritten.

## Creating content

1. Select the block to which you desire to create new content (via the list on the right or through the interface).
2. Click on `Versions` on the top-right corner.
3. Click on the `New content` button.
4. Perform the desired changes according to available block configurations.
5. Define visibility:
   - Check `Activate now` to activate immediately after saving.
   - Optionally set a start date and end date.
   - Check `this URL` to restrict content to a specific URL only. The more specific the URL (with parameters and query strings), the more restricted the content will be.
   - Or apply to the whole template (the current URL and all others from the template).
6. Save your changes.

> Site Editor applies content configurations per parameter hierarchy. Content for a category URL also updates all product page URLs whose parent parameter is that category.

## Editing content

1. Select the desired block.
2. The available content shown is the current active one. Edit fields with new values or click `Versions` to edit other content configurations.
3. Save your changes.

> Contents derived from the source code (Store Theme app) cannot have their visibility updated through Site Editor. Contents manually created on Site Editor can have their visibility changed to URL or template.

## Deleting and resetting content

1. Select the desired block.
2. Click on `Versions`.
3. Click on the desired content's kebab menu (three dots).
4. Click on `Delete` or `Reset` and confirm.

> Native contents (created in source code) cannot be deleted in the Admin, only reset. You can only delete contents manually created through Site Editor.

## Setting active and inactive content

Every Site Editor configuration natively overwrites the Store Theme app settings.

Newly created or updated content is mostly classified as active automatically (unless a start date was predefined).

To switch which content is active: delete or reset the current active content to let the next inactive content become activated instead.

> The queue for inactive contents goes from newest to oldest. Contents created through Site Editor always prevail over what was defined in the Store Theme.
