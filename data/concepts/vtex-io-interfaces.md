---
title: "Interfaces"
slug: "vtex-io-documentation-interface"
source: "https://developers.vtex.com/docs/guides/vtex-io-documentation-interface"
---

Interfaces establish a relation between a block and a React component, allowing the store builder to build the store frontend. These interfaces are defined in the app's `interfaces.json` file.

Interfaces provide a set of rules that dictate the behavior of theme blocks when rendering their React components and the available properties and methods.

For each theme block exported by your app, you should define a corresponding interface that defines the props available to the React component.

## Interface keys

| Key | Description |
| --- | --- |
| `component` | **Required.** Name of the React component that the theme block will render. |
| `allowed` | List of other theme blocks that help build the desired React component. When declared, these blocks can be included as children. |
| `composition` | Defines the rendering position of children blocks. Possible values: `blocks` (children have specific positions based on the React component) or `children` (position depends exclusively on how they are declared in the theme). Default: `blocks`. |
| `device` | Defines whether the block is designed for mobile or desktop. Possible values: `mobile` and `desktop`. |
| `required` | List of theme blocks that must be rendered in the interface to support the block rendering. |
| `around` | List of theme blocks that must be rendered around your new block. |
| `before` | List of theme blocks that must be rendered before your block (above it). |
| `after` | List of theme blocks that must be rendered after your block (below it). |
| `preview` | Defines the behavior of the page while the block is loading. |
| `render` | Defines the block rendering type: `lazy` (rendered only when a user interacts with it), `server` (server-side rendering), or `client` (client-side rendering). |

## Example

```json
// store/interfaces.json
{
  "my-custom-block": {
    "component": "MyCustomBlock",
    "composition": "children",
    "allowed": ["rich-text", "image"],
    "render": "client"
  }
}
```

For a more complete example (from `vtex.product-summary`):

```json
// product-summary/store/interfaces.json
{
  "product-summary": {
    "component": "ProductSummary",
    "composition": "children",
    "content": {
      "$ref": "app:vtex.product-summary#/definitions/ProductSummary"
    }
  }
}
```

## How interfaces relate to React components

1. Create the React component in the `/react` folder (e.g., `react/MyCustomBlock.tsx`)
2. Declare the interface in `/store/interfaces.json` mapping the block name to the component name
3. The `store` builder uses the interface to know which React component to render when the block is used in a Store Theme

## Typical storefront app structure

```
my-app/
├── manifest.json          (builders: store, react)
├── store/
│   ├── interfaces.json    (maps block → React component)
│   └── blocks.json        (optional: default block composition)
└── react/
    └── MyCustomBlock.tsx  (the actual React component)
```
