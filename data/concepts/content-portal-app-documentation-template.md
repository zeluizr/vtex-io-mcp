---
title: 'App documentation'
source: vtexdocs/content-portal-content
slugEN: app-documentation-template
locale: en
---

An app documentation guide helps users understand [VTEX apps](https://developers.vtex.com/docs/guides/vtex-io-documentation-what-is-a-vtex-app), including installation and configuration.

> To add documentation to an app, you must use the [Docs builder](https://developers.vtex.com/docs/guides/vtex-io-documentation-docs-builder). The documentation is written in Markdown files inside the app repository. By using the Docs builder, the documentation becomes publicly available on the VTEX Developer Portal.

This guide is part of the [App Store guidelines](https://developers.vtex.com/docs/guides/vtex-io-documentation-homologation-requirements-for-vtex-app-store) and one of the requirements to submit an app to the homologation process.

## Writing app documentation

| Section | Guidance |
| :--- | :--- |
| **Target audience** | Differentiate between developers and business users. Don't assume a single audience. |
| **Learning objective** | Clearly state what users should learn. Don't leave learning goals ambiguous. |
| **Title** | Use the app name and a verb describing the learning objective. Capitalize the first letter of each word. Don't include punctuation, version numbers, or the word `App`. |
| **Introduction** | Summarize the app's purpose and user benefits. Include an image and callouts for important notes. Don't focus solely on technical details. |
| **Before you begin (optional)** | Use clear bullet points or checklists. Use callouts if applicable. Don't write lengthy paragraphs explaining prerequisites. |
| **Installation** | Provide clear and concise steps. Enhance clarity with code snippets. Don't skip steps or lack specific instructions. |
| **Configuration** | List all essential settings with detailed steps as defined in the `settingsSchema`. Don't omit configuration details. |
| **How it works** | Use numbered lists for each operation, with clear and concise steps. Use images to illustrate the UI. |
| **Customization** | Include CSS handles and a related table if applicable. Reference external documentation for CSS customization. |
| **Contributors (optional)** | Follow the [All-Contributors specification](https://github.com/all-contributors/all-contributors). |

## App documentation template

```md
# `{Insert the app name}`

`{insert app name}` `{app's purpose starting with a verb}` so you can `{job to be done}`.

![insert-an-image-preview](/)

## Before you begin

You need to have `{insert what the user needs to have}`.

## Installation

1. [Install](https://developers.vtex.com/vtex-developer-docs/docs/vtex-io-documentation-installing-an-app) the `{insert app name}` app in the desired VTEX account by running `vtex install {appVendor}.{appName}` in your terminal.
2. (Optional, for frontend apps) Open the store Store Theme app directory in your code editor.
3. (Optional, for frontend apps) Open the app `manifest.json file` and add the `{insert app name}` app under the `peerDependencies` field.

      "peerDependencies": {
          "vtex.`{appName}`": "`{appVersion}`"
      }

4. (Optional, for frontend apps) Declare the `{insert app name}` app in the desired template.

## Configuration

Once you have installed the app, you can `{describe the app's configuration}`.

1. `First step`.
2. `Second step`.
3. `Third step`.

## Customization (Optional, for frontend apps)

To apply CSS customizations to this and other blocks, follow the instructions in [Using CSS Handles for store customization](https://developers.vtex.com/vtex-developer-docs/docs/vtex-io-documentation-using-css-handles-for-store-customization).

| CSS Handles |
| ------------------ |
| csshandlesName |

## How the app works (optional)

`{Detail what can be done with the app and provide the steps to perform each operation.}`

## Contributors

Thanks go to these wonderful people:

- `{insert the GitHub username}`
```

## Examples of app documentation articles

- [Breadcrumb](https://developers.vtex.com/docs/apps/vtex.breadcrumb)
- [SKU Selector](https://developers.vtex.com/docs/apps/vtex.store-components/skuselector)
- [Store Locator](https://developers.vtex.com/docs/apps/vtex.store-locator)
- [Assembly Options](https://developers.vtex.com/docs/guides/assembly-options-app)
- [Installing Google Tag Manager](https://developers.vtex.com/docs/guides/vtex-io-documentation-installing-google-tag-manager)
