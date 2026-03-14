---
title: "4. Configuring templates"
slug: "vtex-io-documentation-4-configuringtemplates"
hidden: false
createdAt: "2020-06-03T16:02:44.335Z"
updatedAt: "2025-02-04T15:00:13.976Z"
category: "Storefront Development"
excerpt: "Learn how to manage templates and customize your Store Theme."
source: "https://developers.vtex.com/docs/guides/vtex-io-documentation-4-configuringtemplates"
---

In this guide, you'll learn how to customize your store theme by managing templates that define the structure of your website pages. Templates declare `JSON` blocks that, once rendered, determine the set of components for your website pages, such as the homepage, product page, search results page, etc.

The [Store Theme](https://developers.vtex.com/docs/guides/vtex-io-documentation-store-theme) app already implements basic templates for each page of your store, defined within its `blocks.json` or `blocks.jsonc` files. These templates enable your store to display VTEX Store Framework default components, even if you haven't made any custom configurations in the code. By managing templates, you can create a custom theme for your website by adding or removing blocks to meet your business needs.

## Before you begin

### Learn about the JSON block concept

Familiarize yourself with the concept of a `JSON` block - the smallest Store Framework abstraction of React components displayed on the user interface. Thus, blocks are self-contained pieces of code, exported to the platform by independent apps, that determine how components are rendered on your website.

Blocks are imbued with higher flexibility, allowing you to achieve complex scenarios and specific component behaviors by configuring their properties (*props*) or even declaring them in other blocks. In practice, when you edit your theme's code using the Store Theme app, you're directly modifying blocks that will become your store's page components when rendered.

> To add a new component to a page, you simply declare a new block in the corresponding template. Similarly, removing a block from a template will exclude its associated component from the page.

### Understand the block composition

When a block is being developed, the composition definition indicates how the block's content is structured or how it interacts with other components. There are 3 types of composition definitions:

- `blocks`: Have a fixed position on the store's page irrespective of where they were declared in the code, leading to a preordained position on the UI.
- `children`: Do not have a fixed position on the store's page, which means that how they're declared in the code directly impacts the page position. The `children` block declared first will be at the top of the page, followed by the second one below it, and so on.
- `slots`: Placeholders within a block that enable the insertion of dynamic content. It is useful for flexible component design where content can be passed into specific slots, enabling the customization or reuse of a block with different content.

## Instructions

### Step 1 - Declaring blocks in your Store Theme app

Declare all your blocks in the `blocks.jsonc` file, or create as many files and folders as needed within the `store` folder to organize store blocks and templates. You can also declare blocks in the `blocks` subfolder. The only difference is that `jsonc` files allow you to add comments to the code.

Since blocks are pieces of code exported by VTEX Store Framework apps, whenever a block is used in your theme, the app behind it must be declared in your Store Theme [dependencies](https://developers.vtex.com/docs/guides/vtex-io-documentation-dependencies/) list.

When declaring a new block in your Store Theme app, check if the app blocking it is listed as a dependency. If not, open the `manifest.json` file and add the app name and desired version to the `dependencies` list, following this format: `"vtex.{appName}": "{majorVersion}.x"`.

### Step 2 - Managing blocks in your theme

To better understand how to manage blocks within your Store Theme app, follow the steps below to see the structure of the predefined homepage template:

1. Open the Store Theme app using the code editor of your choice.
2. Go to `store` and then `blocks`.
3. Access `home` and then `home.jsonc`. You'll see a result similar to the following:

```json
{
  "store.home": {
    "blocks": [
      "list-context.image-list#demo",
      "flex-layout.row#deals",
      "rich-text#shelf-title",
      "flex-layout.row#shelf",
      "info-card#home",
      "rich-text#question",
      "rich-text#link",
      "newsletter"
    ]
  },

  "shelf#home": {
    "blocks": ["product-summary.shelf"]
  },

  "product-summary.shelf": {
    "children": [
      "product-summary-name",
      "product-summary-description",
      "product-summary-image",
      "product-summary-price",
      "product-summary-sku-selector",
      "product-summary-buy-button"
    ]
  }
}
```

### Step 3 - Clarifying block naming and properties

The `rich-text#question` block has two props: `text` and `blockClass`. The `text` prop specifies the content the component will display, while `blockClass` defines an ID used for customization.

```json
"rich-text#question": {
  "props": {
    "text": "**This is an example store built using the VTEX platform. Want to know more?**",
    "blockClass": "question"
  }
}
```

To check the available props of the app behind the `rich-text` block, see the Configuration section within the [Rich Text](https://developers.vtex.com/docs/guides/vtex-rich-text) app documentation. Note that the exported block's name is simply `rich-text`, whereas Store Theme uses `rich-text#block`. This is because you can use a `#` symbol after the block's official name to easily identify it when inserting it into the theme's code and better organize the theme.

> All the props available to configure a block can be found in the documentation of its exporting app or in the block's own documentation (if applicable).

### Step 4 - Defining blocks composition

Note that a block can declare another block in its `blocks` list, which in turn declares other blocks below in a list called `children`:

```json
"shelf#home": {
  "blocks": ["product-summary.shelf"]
},

"product-summary.shelf": {
  "children": [
    "product-summary-name",
    "product-summary-description",
    "product-summary-image",
    "product-summary-price",
    "product-summary-sku-selector",
    "product-summary-buy-button"
  ]
}
```

To build a component using multiple blocks, the main block can declare a `blocks` list, such as `shelf#home`, or a `children` list, as seen in the `product-summary.shelf` block.

The choice between using a `blocks` or `children` list depends on the *composition* of the blocks being declared.
