---
title: "Store builder"
slug: "vtex-io-documentation-store-builder"
source: "https://developers.vtex.com/docs/guides/vtex-io-documentation-store-builder"
---

The `store` builder enables the development of Store Framework storefronts, empowering the development of both storefront components and unique store themes.

## Main use cases

- **Frontend apps**: When used alongside the `react` builder, allows integrating a frontend component with Site Editor. Enables mapping a React component to a block, grouping store blocks, and defining route handling.
- **Store Theme apps**: Defines block usage and store routes.

## Folder structure

```txt
store
 ┣ 📄 blocks.json           (block composition definitions)
 ┣ 📄 contentSchemas.json   (JSON Schema for content types)
 ┣ 📄 interfaces.json       (block → React component mappings)
 ┗ 📄 routes.json           (custom route definitions)
```

Or using the `/store/blocks` directory structure:
```txt
store
 ┣ 📂 blocks
      ┗ 📂 footer
      ┗ 📂 header
      ┗ 📂 home
      ┗ 📂 pdp
      ┗ 📄 search.jsonc
 ┣ 📄 blocks.json
 ┗ 📄 routes.json
```

## File descriptions

- `blocks.json` / `blocks/*.json`: Declares all blocks that exist in your project. Can be split into multiple JSON files in the `store/blocks` directory.
- `contentSchemas.json`: Follows the JSON Schema format. Defines properties and settings for components in Site Editor.
- `interfaces.json`: Establishes a relationship between blocks and React components. Required for connecting your React component to a Store Framework block.
- `routes.json`: Creates custom routes in your app, mapping page templates to the path they will respond to.

## Declare in manifest.json

```json
"builders": {
    "store": "0.x"
}
```

## Example: interfaces.json

```json
{
  "my-custom-block": {
    "component": "MyCustomComponent",
    "composition": "children"
  }
}
```

## Example: blocks.json (Store Theme)

```json
{
  "store.home": {
    "blocks": [
      "header",
      "carousel#home",
      "shelf#home",
      "info-card#home",
      "rich-text#footer",
      "footer"
    ]
  }
}
```

## Example: routes.json

```json
{
  "store.custom#about-us": {
    "path": "/about-us"
  },
  "store.custom#faq": {
    "path": "/faq"
  }
}
```

## Store Theme boilerplate

Use the official [store-theme boilerplate](https://github.com/vtex-apps/store-theme) as a starting point. It includes pre-configured `blocks`, `routes`, and styles.

The `store` builder is natively installed in the Store Theme boilerplate, along with the `/store` folder structure.
