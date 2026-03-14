---
title: 'Managing Pages in the Headless CMS'
id: 3DO6rBhZ1p3zndnFu5BgRt
status: PUBLISHED
createdAt: 2023-03-23T19:46:08.568Z
updatedAt: 2024-06-17T12:55:20.070Z
source: vtexdocs/help-center-content
originalPath: docs/en/tutorials/storefront/headless-cms/managing-pages.md
---

In **Headless CMS**, you can manage all the URL routes and page templates for your store's website, including `Global Alert Page`, `Page`, and `Product Page`. You can also create and link custom pages to predefined templates and manage pages created directly in the source code of your storefront project.

## Overview

| Option | Description |
|--------|-------------|
| Create Document | Creates a new page based on available options (e.g., `Product Page` or `Home`). |
| Settings (gear icon) | Opens a modal displaying project configurations in three tabs: **General**, **Content-Types**, and **Build**. |
| Search | Searches specific pages within the project. |
| Status | Filters pages by status: `Published` (live store) or `Draft` (work in progress). |
| Type | Filters pages by content type defined in your store code. |

## Creating a new page

1. In your VTEX Admin, access **Headless CMS**.
   > Ensure you're in the correct project. If not, go to the **Project** menu in the upper left corner and select the project name.
2. Click `Create document` and select the desired page type.
3. Under `Untitled`, name the page.
4. Click on `Sections` and select the desired section.
5. Add more sections if needed and fill them out.
6. Click `Publish`.

To duplicate or delete the page, click the **More actions** menu (`⋯`) of the page.

## Key concepts

- Pages in Headless CMS map to **URL routes** in your FastStore storefront.
- Content types are defined in your storefront source code and synced to Headless CMS via webhooks.
- Each page can have multiple **sections** that correspond to React components in your storefront.
- The **Build** webhook is triggered when you publish content, initiating a new build of your storefront.
