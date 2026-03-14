---
title: "Admin builder"
slug: "vtex-io-documentation-admin-builder"
source: "https://developers.vtex.com/docs/guides/vtex-io-documentation-admin-builder"
---

The `admin` builder is used to develop apps for the VTEX Admin in combination with React. It exports blocks and routes to the VTEX Admin panel.

## Folder structure

```txt
admin
  ┣ 📄 navigation.json
  ┗ 📄 routes.json
```

- `navigation.json`: Defines the navigation in the Admin left panel for sections and pages.
- `routes.json`: Assigns React components to their corresponding routes. Routes must match paths described in `navigation.json`.

## Declare in manifest.json

```json
"builders": {
    "admin": "0.x",
    "react": "3.x",
    "messages": "1.x"
}
```

## Usage

1. **Start with a template:** Download the [`admin-ui-example` template](https://github.com/vtex/admin-ui-example/tree/main) or use `vtex init` and choose `admin-example`.
2. **Configure navigation:** Edit `navigation.json` to define sections and pages in the Admin left panel.
3. **Configure routes:** Edit `routes.json` to map components to navigation paths.
4. **Implement the app logic:** Add React components in the `react/` folder.
5. **Test:** Link the app with `vtex link`.

## navigation.json example

```json
[
  {
    "section": "storeSettings",
    "subSection": "storeFront",
    "adminVersion": 4,
    "subSectionItems": [
      {
        "labelId": "admin/my-app.navigation.title",
        "path": "/admin/my-app/"
      }
    ]
  }
]
```

Key properties:
- `section` and `subSection`: Which section of the Admin the page will appear in.
- `path`: URL path to access the page. Must match the path in `routes.json` (without `/app`).
- `subSectionItems`: List of pages in the subsection.
- `labelId`: Used by the `messages` builder for the app's translated name.
- `adminVersion`: `4` for the redesigned Admin.

## routes.json example

```json
{
  "admin.app.my-app": {
    "component": "AdminApp",
    "path": "/admin/app/my-app"
  }
}
```

Key properties:
- `component`: Name of the React component (must match file in `react/` folder).
- `path`: URL path with `/app` segment inserted after `/admin`.

## React component for Admin

```tsx
// react/AdminApp.tsx
import React from 'react'
import { Layout, Page } from '@vtex/admin-ui'

const AdminApp = () => {
  return (
    <Layout>
      <Page>
        <Page.Header>
          <Page.Title>My App</Page.Title>
        </Page.Header>
        <Page.Content>
          {/* Your admin app content here */}
        </Page.Content>
      </Page>
    </Layout>
  )
}

export default AdminApp
```

## Installing admin UI library

```shell
cd react
yarn add @vtex/admin-ui
```

## App examples using the admin builder

- [checkout-ui-custom](https://github.com/vtex-apps/checkout-ui-custom)
- [storefront-permissions-ui](https://github.com/vtex-apps/storefront-permissions-ui)
- [admin-graphql-ide](https://github.com/vtex-apps/admin-graphql-ide)
