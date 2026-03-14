---
title: 'Managing Projects in the Headless CMS'
id: headless-cms-projects
status: PUBLISHED
createdAt: 2023-11-01T00:00:00.000Z
updatedAt: 2025-04-25T00:00:00.000Z
source: vtexdocs/help-center-content
originalPath: docs/en/tutorials/storefront/headless-cms/managing-projects.md
---

Projects is a feature in the VTEX Headless CMS that simplifies the management of multiple frontend projects, such as mobile apps, websites, and email marketing, from one control panel.

## Projects interface

The Projects interface includes:

- **Project cards**: Open and edit content for each project.
- **Settings modal**: Three configuration tabs (General, Content-Types, Build).
- **Create new project**: Create a new frontend project.

## Creating a new project

1. Click `Create new` on the Projects page.
2. Fill in the fields according to Project settings specifications.
3. Click `Create` to complete setup.

## Project configuration tabs

### General

Manages:
- **Project ID**: Unique identifier for the project.
- **Storefront selection**: Choose between VTEX Storefronts or Custom.
- **API settings**: Configure API access for this project.

### Content-Types

Configures:
- **Webhook URLs** for sections and content types synchronization between the CMS and source code.
- These webhooks keep the CMS in sync with content type definitions in your storefront codebase.

### Build

Sets:
- **Webhook URLs** for build notifications.
- **Preview URLs** for seeing content changes before publishing.
- **Real-time content synchronization** settings.

## Project management operations

- **Editing**: Update project information after creation.
- **Archiving**: Disables API and content access for the project (reversible).
- **Restoring**: Re-enables functionality for an archived project.

## Prerequisites

Required resources for managing projects:
- *See CMS menu on the top-bar*
- *Settings*
- *CMS GraphQL API*

These must be associated with your user role.
