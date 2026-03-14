---
title: "Dependencies and peerDependencies — complete guide"
slug: "vtex-io-documentation-dependencies-guide"
source: "https://developers.vtex.com/docs/guides/vtex-io-documentation-dependencies"
---

The `dependencies` property is a JSON object field in the app's `manifest.json` file.

This field specifies which VTEX IO apps your app relies on to function. Its semantics resemble the `dependencies` property in `package.json` for JavaScript applications.

When an app is installed on a VTEX account, every app listed in its `dependencies` field is automatically installed on that account.

Structure: `"{account}.{appName}": "{majorVersion}.x"`

```json
"dependencies": {
  "vtex.blog-interfaces": "0.x",
  "vtex.store": "2.x",
  "vtex.styleguide": "9.x",
  "vtex.store-components": "3.x",
  "vtex.shelf": "1.x",
  "vtex.product-summary": "2.x",
  "vtex.search-graphql": "0.x",
  "vtex.search-page-context": "0.x",
  "vtex.css-handles": "0.x"
}
```

## Common use cases

- Using blocks from VTEX Store Framework
- Importing React components from another app
- Importing TypeScript types from a service app
- Consuming GraphQL or REST definitions declared in another app
- Implementing a GraphQL schema interface from another app

> ⚠️ When you install a VTEX IO app, its dependencies are also installed on the account, but they are treated as **indirect dependencies**. This means they cannot declare public routes or receive public traffic directly.

## peerDependencies

The `peerDependencies` field lists other apps that the app relies on but which are **not automatically installed**. Use peer dependencies when:
- Your app relies on a **paid app**
- Your app relies on a **specific version** of an app

```json
"peerDependencies": {
  "vtex.store": "2.x"
}
```

## Common Store Framework app dependencies

| App | Version | Use |
| --- | --- | --- |
| `vtex.store` | `2.x` | Core store builder app — required for all Store Framework apps |
| `vtex.store-components` | `3.x` | Collection of basic Store components |
| `vtex.styleguide` | `9.x` | VTEX Admin UI component library |
| `vtex.product-summary` | `2.x` | Product summary component |
| `vtex.search-graphql` | `0.x` | GraphQL queries for search |
| `vtex.shelf` | `1.x` | Shelf/product list component |
| `vtex.css-handles` | `0.x` | CSS handles for custom styling |
| `vtex.slider-layout` | `0.x` | Slider/carousel layout |
| `vtex.flex-layout` | `0.x` | Flexible layout system |
| `vtex.rich-text` | `0.x` | Markdown text renderer |
| `vtex.search-result` | `3.x` | Search results page blocks |
| `vtex.breadcrumb` | `1.x` | Breadcrumb navigation |
