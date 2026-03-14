---
title: "Manifest"
slug: "vtex-io-documentation-manifest"
excerpt: "Learn more about the manifest file, a crucial document containing metadata that defines and shapes the core attributes and functionalities of a VTEX IO app."
hidden: false
createdAt: "2020-09-22T21:29:09.380Z"
updatedAt: "2024-08-09T15:26:04.475Z"
category: "App Development"
---

Every [VTEX IO app](https://developers.vtex.com/docs/guides/vtex-io-documentation-what-is-a-vtex-app) must have a `manifest.json` file in its root folder. This file serves as the initial point of communication with [VTEX IO](https://developers.vtex.com/docs/guides/vtex-io-documentation-what-is-vtex-io) and holds important metadata about an app, such as its name, version, vendor, description, and dependencies.

## Fields

Check the following snippet, which shows a manifest example and its supported fields.

```json manifest.json
{
  "name": "app-name",
  "vendor": "vtex",
  "version": "1.0.0",
  "title": "App Name",
  "description": "Brief description of your app.",
  "builders": {
      "react": "3.x"
  },
  "scripts": {
      "postreleasy": "vtex publish --verbose"
  },
  "dependencies": {
      "vtex.styleguide": "9.x"
  },
  "peerDependencies": {
      "vtex.store": "2.x"
  },
  "policies": [...],
  "settingsSchema": {...},
  "credentialType": {...}
}
```

For a real example of a `manifest.json` file, check out [this file](https://github.com/vtex-apps/store-theme/blob/master/manifest.json).

## `name`

The app name. It should concisely express the app's purpose.

App names are in [kebab case](https://en.wiktionary.org/wiki/kebab_case). Basically, they must consist of lowercase letters separated by hyphens. Special characters, such as `*` and `@`, and numbers at the beginning of the name are not recommended.

## `vendor`

The app owner, i.e., the VTEX account responsible for the app development, maintenance, and distribution.

If the app is to be sold on the VTEX App Store, the vendor will profit from its installation. Therefore, remember the following: an app must have only one vendor. Even if the app is installed on multiple accounts, you should not change the app's `vendor` value for each account.

## `version`

The app version, following [Semantic Versioning 2.0.0](https://semver.org/).

> For more information, see [Understanding app versioning](https://developers.vtex.com/docs/guides/vtex-io-documentation-releasing-a-new-app-version#understanding-app-versioning).

## `title`

The app distribution name. This name is the one used in the Apps section of the Admin and in the VTEX App Store.

## `description`

A brief description explaining the app's purpose.

## `builders`

The list of builders used by the app. A builder is an abstraction for configuring other IO services, such as `node`, `dotnet`, `react`. It acts as an API service, which processes and interprets a directory from the app. Hence, you can use as many builders as you want in a single app.

For example, if you want to **develop React components** in an app, you should use the builder `react@3.x` and declare it in the manifest:

```
"builders": {
    "react": "3.x"
}
```

And create a `react` folder inside the app, adding the component files. Each builder has its own set of rules and validation processes.

> For more information, see [Builders](https://developers.vtex.com/docs/guides/vtex-io-documentation-builders).

## `scripts`

The list of scripts the app runs.

## `dependencies`

The list of other VTEX IO apps that the app relies on to properly work.

The most recurrent use of VTEX IO apps as dependencies is for:

- Using VTEX Store Framework blocks.
- Importing React components from another app.
- Importing Typescript types from a GraphQL service app.
- Using GraphQL or REST definitions declared in another app.
- Implementing a GraphQL schema from another app.

> For more information, see [Dependencies](https://developers.vtex.com/docs/guides/vtex-io-documentation-dependencies/).

## `peerDependencies`

The list of other apps that the app relies on to properly work. However, unlike regular dependencies, peer dependencies are not automatically installed in an account. Hence, these are mostly used in cases where an app relies on paid apps or a specific version of an app.

> For more information, see [peerdependencies](https://developers.vtex.com/docs/guides/vtex-io-documentation-peerdependencies/).

## `policies`

The list of policies that grant permissions to the app, in case it needs access to external services or specific data from other sources, such as external APIs.

> For more information, see [Policies](https://developers.vtex.com/docs/guides/vtex-io-documentation-policies/).

## `settingsSchema`

The layout settings of the app displayed in the VTEX Admin.

Using [JSON Schema](https://json-schema.org/), you can accept multiple fields with multiple data types. The VTEX Platform manages the persistence of information, and you may fetch the current configuration in your app code.

For example, in the `vtex.wordpress-integration` app, the following `settingsSchema`:

```json
"settingsSchema": {
    "title": "Wordpress Integration",
    "type": "object",
    "properties": {
      "endpoint": {
        "title": "Wordpress URL",
        "description": "Enter the URL of your Wordpress installation in the form http://www.example.com/",
        "type": "string"
      },
      "titleTag": {
        "title": "Title tag for blog homepage",
        "description": "Will also be appended to inner blog pages",
        "type": "string"
      },
      "blogRoute": {
        "title": "URL path for blog homepage",
        "description": "Example: if 'foo' is entered here, blog homepage will be at http://www.yoursite.com/foo . Make sure routes in your store-theme match this setting. If left blank, default is 'blog'",
        "type": "string"
      }
    }
  }
```

> For more information, see [Creating an interface for your app settings](https://developers.vtex.com/docs/guides/vtex-io-documentation-creating-an-interface-for-your-app-settings).

## [DEPRECATED] `credentialType`

The credential type. When set as `relative`, an app request can only be performed if the app and the role who called it have the required permissions. When set as `absolute`, a request from the app can be performed if the app has the necessary permissions.
