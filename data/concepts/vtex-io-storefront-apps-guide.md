---
title: "Storefront apps — developing with React and VTEX IO"
slug: "vtex-io-documentation-1-developing-storefront-apps-using-react-and-vtex-io"
source: "https://developers.vtex.com/docs/guides/vtex-io-documentation-1-developing-storefront-apps-using-react-and-vtex-io"
---

While VTEX IO and Store Framework provide high-quality and customizable React storefront blocks, there may be cases where you require specific frontend solutions not covered by native components. The VTEX IO platform empowers you to create your own storefront apps with React.

## Development process overview

Building a custom storefront app involves 9 stages:

1. **Setting up the development environment** — Install VTEX IO CLI, log in to your account, create a development workspace.
2. **Creating the new app** — Use `vtex init` or clone the [react-app-template](https://github.com/vtex-apps/react-app-template) and customize the `manifest.json`.
3. **Declaring a theme block** — Create `store/interfaces.json` to map your React component to a Store Framework block.
4. **Defining styles** — Use CSS handles (`useCssHandles`) so store theme users can customize your component.
5. **Structuring documentation** — Use the `docs` builder and add a README.md.
6. **Consuming data** — Use GraphQL queries via `useQuery` hook or VTEX IO context hooks.
7. **Translating the component** — Use the `messages` builder for i18n.
8. **Improving performance with caching** — Use Apollo client caching, React.memo, and other techniques.
9. **Making your app publicly available** — Publish to the VTEX App Store.

## Minimum viable storefront app

### manifest.json

```json
{
  "vendor": "mystore",
  "name": "my-component",
  "version": "0.0.1",
  "title": "My Component",
  "description": "A custom storefront component",
  "builders": {
    "react": "3.x",
    "store": "0.x",
    "docs": "0.x",
    "messages": "1.x"
  },
  "dependencies": {
    "vtex.css-handles": "0.x"
  }
}
```

### store/interfaces.json

```json
{
  "my-component": {
    "component": "MyComponent"
  }
}
```

### react/MyComponent.tsx

```tsx
import React from 'react'
import { useCssHandles } from 'vtex.css-handles'

const CSS_HANDLES = ['container', 'title', 'description'] as const

interface Props {
  title?: string
  description?: string
}

const MyComponent: React.FC<Props> = ({
  title = 'Default Title',
  description = 'Default Description',
}) => {
  const handles = useCssHandles(CSS_HANDLES)

  return (
    <div className={handles.container}>
      <h2 className={handles.title}>{title}</h2>
      <p className={handles.description}>{description}</p>
    </div>
  )
}

MyComponent.schema = {
  title: 'My Component',
  description: 'A custom storefront component',
  type: 'object',
  properties: {
    title: {
      title: 'Title',
      type: 'string',
      default: 'Default Title',
    },
    description: {
      title: 'Description',
      type: 'string',
      default: 'Default Description',
    },
  },
}

export default MyComponent
```

## Using the component in a Store Theme

Once your app is linked or installed, add the block to a Store Theme:

```json
// store-theme/store/blocks/home/home.json
{
  "store.home": {
    "blocks": [
      "my-component"
    ]
  },
  "my-component": {
    "props": {
      "title": "Welcome to our store!",
      "description": "Discover our latest products."
    }
  }
}
```

And add it as a dependency in the Store Theme's `manifest.json`:

```json
"dependencies": {
  "mystore.my-component": "0.x"
}
```

## Consuming GraphQL data

```tsx
import { useQuery } from 'react-apollo'
import PRODUCTS_QUERY from './graphql/products.graphql'

const ProductList = () => {
  const { data, loading, error } = useQuery(PRODUCTS_QUERY, {
    variables: { category: 'electronics' },
  })

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <ul>
      {data.products.map((product: any) => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  )
}
```

## Key VTEX IO React hooks

| Hook | Package | Use |
| --- | --- | --- |
| `useCssHandles` | `vtex.css-handles` | CSS customization handles |
| `useRuntime` | `vtex.render-runtime` | Access account, workspace, locale |
| `useProduct` | `vtex.product-context` | Product data on PDP |
| `useProductSummary` | `vtex.product-summary-context` | Product summary data |
| `useOrderForm` | `vtex.order-manager` | Cart/order form data |
| `useSearchPage` | `vtex.search-page-context` | Search page context |
| `useIntl` | `react-intl` | i18n translations |

## Development workflow

```shell
# 1. Clone a boilerplate
git clone https://github.com/vtex-apps/react-app-template

# 2. Update manifest.json with your app details

# 3. Link and develop
vtex workspace use mydev
vtex link

# 4. Test in browser
open https://mydev--myaccount.myvtex.com

# 5. Publish when ready
vtex publish
vtex deploy
```
