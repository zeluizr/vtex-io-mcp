---
title: "3. Declaring a theme block"
slug: "vtex-io-documentation-4-declaring-a-theme-block"
hidden: false
createdAt: "2021-03-25T20:58:43.073Z"
updatedAt: "2022-12-13T20:17:44.349Z"
category: "App Development"
excerpt: "Learn how to create a new theme block."
source: "https://developers.vtex.com/docs/guides/vtex-io-documentation-4-declaring-a-theme-block"
---

With the app template already copied, we will now create a new theme block. Follow the instructions below to create the new theme block.

## Understanding interfaces

An interface describes the shape of an object, including its properties and data types. This is crucial for ensuring type safety and preventing potential bugs.

In VTEX Store Framework, interfaces are used to link theme blocks to their corresponding React components. This way, interfaces provide a set of rules that dictate the behavior of theme blocks when rendering their React components and the available properties and methods.

For each theme block exported by your app, you should define a corresponding [interface](https://developers.vtex.com/docs/guides/vtex-io-documentation-interface) that defines the props available to the React component.

The following table shows some possible keys that could be added to the block interface, as well as their respective descriptions:

| Key           | Description                                                                                                                                 |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `component`   | Name of the React component that the theme block will render.                                                                               |
| `allowed`     | List of other theme blocks that help build the desired React component. When declared, these blocks can be included as children to the block you developed in the Store Theme app. |
| `composition` | Defines the rendering position of the children of the block. Possible values: `blocks` or `children`.                                       |
| `device`      | Defines whether your theme block is designed for mobile or desktop devices. Possible values are `mobile` and `desktop`.                     |
| `required`    | List of theme blocks that must be rendered in the interface to support the block rendering you are developing.                               |
| `around`      | List of theme blocks that must be rendered in the interface around your new block for it to work correctly.                                  |
| `before`      | List of theme blocks that must be rendered in the interface before your block (above it) for it to work correctly. For example: header.     |
| `after`       | List of theme blocks that must be rendered in the interface after your block (below it) for it to work correctly. For example: footer.      |
| `preview`     | Defines the behavior of the page while the block is loading.                                                                                |
| `render`      | Defines the block rendering type. Possible values are `lazy`, `server`, or `client`.                                                        |

The only mandatory key that needs to be declared in a block interface is `component`.

## Step 1 - Declaring an interface

To add new custom blocks to your storefront, you need to declare their interfaces in the `interfaces.json` file of your Store Theme app.

> The `interfaces.json` file is used by the `store` [Builder](https://developers.vtex.com/docs/guides/vtex-io-documentation-builders/) during the website building process.

For this example, we will create an interface for a basic block called `hello-world`. This block will render the React component defined in `HelloWorld.tsx`.

1. Open your app's code in the code editor.
2. In the `react` folder, create a new TypeScript file with the name of the desired React component. Following our example, we would have `HelloWorld.tsx`.
3. In the newly created file, add the sample code provided below:

```jsx
import React from 'react'

const HelloWorld = () => <div>Hello, World!</div>

export default HelloWorld
```

4. Create a new folder called `store` in the first level of your app folders.
5. In the `store` folder, add a new file called `interfaces.json`.
6. Declare the block interface in the `interfaces.json` file. For example:

```json
{
 "hello-world": {
    "component": "HelloWorld"
  }
}
```

Note that in the above structure, the first definition given by the interface is the name of your new theme block (`hello-world`). Within it, we declare an object containing the interface keys previously described.

In our example, we only used the `component` key to link the `hello-world` block to the React component that it will render (`HelloWorld`). Note that the value of the `component` key is `HelloWorld` — the file name that was previously created for the React component (`react/HelloWorld.tsx`).

After saving your code changes, any user who installs your app will be ready to implement the new block.

### Declaring device-specific interfaces

You may want your app to export different blocks for rendering different components based on the store's *breakpoint*, that is, based on the device accessing it.

To do this, you have to create different blocks for each possible device and create interfaces for each one.

For example, you are developing the `hello-world` block and want to create mobile and desktop versions. You will have to create the `HelloWorld`, `HelloWorldMobile`, and `HelloWorldDesktop` components, and define interfaces for each, such as `hello-world`, `hello-world.mobile`, and `hello-world.desktop`.

## Step 2 - Using your new theme block

We will now implement the new block you created in the Store Theme app.

1. Open the Store Theme app folder in your local files using the code editor of your choice.
2. In the Store Theme `manifest.json` file, add the app you are developing as a dependency in `dependencies`. For example:

```diff
"dependencies": {
+   "{accountName}.{appName}": "{appVersion}",
    "vtex.store": "2.x",
    "vtex.store-header": "2.x",
    ...
}
```

3. Add the new theme block (`hello-world` in our example) to one of the templates. For this walkthrough, we will add the `hello-world` block to the store's home page, in the `store.home` template:

```diff
{
  "store.home": {
     "blocks": [
+       "hello-world"
     ]
  },
  ...
}
```

4. [Link](https://developers.vtex.com/docs/guides/vtex-io-documentation-linking-an-app) the store's theme to the VTEX IO platform to verify the results.
5. Access your VTEX store using the `{workspaceName}-{accountName}.myvtex.com` format to see your new `hello-world` block being displayed in your development workspace.
