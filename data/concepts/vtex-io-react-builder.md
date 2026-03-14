---
title: "React builder"
slug: "vtex-io-documentation-react-builder"
source: "https://developers.vtex.com/docs/guides/vtex-io-documentation-react-builder"
---

The `react` builder is used to develop apps with React when your project requires customized frontend solutions not covered by native components.

This builder interprets the `/react` directory, where you must place the app's React code using TypeScript. When you run your app, this code is transformed into compiled bundles, ready for use in frontend apps.

## Folder structure

```txt
react
 ┣ 📂 typings
 ┣ 📂 components
 ┣ 📂 graphql
 ┣ 📂 utils
 ┣ 📄 {ReactCodeFileName}.tsx
 ┣ 📄 package.json
 ┣ 📄 tsconfig.json
 ┗ 📄 yarn.lock
```

- `typings/`: Folder holding TypeScript type definitions.
- `.tsx` files: Contain the source code of React components.
- `components/`: Subfolder for organizing component files.
- `graphql/`: GraphQL queries and mutations used by components. Keeping GraphQL code separate promotes modularity.
- `utils/`: Utility functions or helper modules.
- `tsconfig.json`: TypeScript compiler settings.
- `package.json`: Project metadata, dependencies, and scripts using Yarn.
- `yarn.lock`: Locks exact versions of project dependencies for consistent builds.

## Usage

1. Clone the React [boilerplate app](https://github.com/vtex-apps/react-app-template).
2. Modify `manifest.json` to include your app's metadata. Declare the `react` builder:
    ```json
    "builders": {
        "react": "3.x"
    }
    ```
3. Link your app to a development workspace with `vtex link`.

## Creating a storefront component

A typical storefront React component looks like this:

```tsx
// react/MyComponent.tsx
import React from 'react'
import { useCssHandles } from 'vtex.css-handles'

const CSS_HANDLES = ['container', 'title'] as const

interface Props {
  text: string
}

const MyComponent: React.FC<Props> = ({ text }) => {
  const handles = useCssHandles(CSS_HANDLES)

  return (
    <div className={handles.container}>
      <h2 className={handles.title}>{text}</h2>
    </div>
  )
}

MyComponent.schema = {
  title: 'My Component',
  type: 'object',
  properties: {
    text: {
      title: 'Display text',
      type: 'string',
      default: 'Hello World',
    },
  },
}

export default MyComponent
```

## Connecting React to a Store block

To use a React component as a Store Framework block, you also need the `store` builder:

```json
"builders": {
    "react": "3.x",
    "store": "0.x"
}
```

Then create `store/interfaces.json`:

```json
{
  "my-component": {
    "component": "MyComponent"
  }
}
```

Users can now use `my-component` in their Store Theme.

## Using GraphQL in React components

```tsx
// react/MyComponent.tsx
import { useQuery } from 'react-apollo'
import MY_QUERY from './graphql/myQuery.graphql'

const MyComponent = () => {
  const { data, loading } = useQuery(MY_QUERY)

  if (loading) return <div>Loading...</div>
  return <div>{data?.myQuery?.result}</div>
}
```

```graphql
# react/graphql/myQuery.graphql
query MyQuery {
  myQuery {
    result
  }
}
```

## Notable hooks available in VTEX IO React apps

- `useRuntime()` from `vtex.render-runtime` — access to account, workspace, locale info
- `useCssHandles()` from `vtex.css-handles` — CSS customization support
- `useProduct()` from `vtex.product-context` — product data on PDP
- `useProductSummary()` from `vtex.product-summary-context` — product summary data
