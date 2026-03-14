---
title: "Connecting to VTEX Core Commerce APIs"
slug: "how-to-connect-with-vtex-core-commerce-apis-using-vtex-io"
excerpt: "Learn how to enable seamless HTTP communication with VTEX Core Commerce APIs within your VTEX IO app."
hidden: false
createdAt: "2020-10-08T02:47:14.995Z"
updatedAt: "2021-03-25T14:40:29.493Z"
source: "https://developers.vtex.com/docs/guides/how-to-connect-with-vtex-core-commerce-apis-using-vtex-io"
---

VTEX IO apps are designed to seamlessly interface with [VTEX Core Commerce APIs](https://developers.vtex.com/docs/api-reference). These APIs provide a set of functionalities and data access points for managing and interacting with the VTEX ecommerce platform, enabling developers to perform various operations, such as managing orders, products, and customer data.

In this guide, you will learn how to create a custom client that can handle HTTP requests to these VTEX Core Commerce APIs, allowing your application to retrieve and manipulate data within the VTEX ecosystem.

## Before you begin

- **VTEX IO Development Workspace:** Set up your VTEX IO environment by following the steps outlined in [Creating a Development Workspace](https://developers.vtex.com/docs/guides/vtex-io-documentation-creating-a-development-workspace).
- **TypeScript Familiarity:** Acquire a basic understanding of TypeScript, as we'll be using the `node` [Builder](https://developers.vtex.com/docs/guides/vtex-io-documentation-builders) for TypeScript development.
- **Understanding of Clients:** Clients play a crucial role in facilitating interactions between your application and both external and internal services. Learn more about [Clients](https://developers.vtex.com/docs/guides/vtex-io-documentation-clients).

## Instructions

### Step 1 - Setting up your VTEX IO app

1. Start a new VTEX IO app using the `node` builder and open the project using your preferred code editor.
2. Install the `@vtex/api` package by running the following command:

   ```sh
   yarn add @vtex/api
   ```

3. Update the app's `manifest.json` to include the appropriate `outbound-access` policy for the requested URL:

    ```json
    {
      "policies": [
        {
          "name": "outbound-access",
          "attrs": {
            "host": "{{account}}.vtexcommercestable.com.br",
            "path": "/api/checkout/pub/orderForm/*"
          }
        }
      ]
    }
    ```

### Step 2 - Creating a Client for connecting to VTEX Core Commerce APIs

1. Create a TypeScript file for your Client in the `node/clients` directory. Choose a name that easily identifies your Client (e.g., `myClient.ts`).
2. Create a client that represents the module you want to access. It will be a class that extends `JanusClient`.

    ```ts
    import type { InstanceOptions, IOContext } from '@vtex/api'
    import { JanusClient } from '@vtex/api'

    export default class MyClient extends JanusClient {
        constructor(context: IOContext, options?: InstanceOptions) {
            super(context, { ...options })
        }
    }
    ```

3. In the constructor, set the `VtexIdclientAutCookie` header with the required token for authorization. Use `ctx.authToken` for the app's token, or `ctx.vtex.storeUserAuthToken` or `ctx.vtex.adminUserAuthToken` for requests from VTEX Admin or VTEX Storefront, respectively.

    ```ts
    import type { InstanceOptions, IOContext } from '@vtex/api'
    import { JanusClient } from '@vtex/api'

    export default class MyClient extends JanusClient {
        constructor(context: IOContext, options?: InstanceOptions) {
           super(context, {
            ...options,
            headers: {
              Accept: 'application/json',
              VtexIdclientAutCookie: context.storeUserAuthToken,
              'x-vtex-user-agent': context.userAgent,
              ...options?.headers,
            },
          })
        }
    }
    ```

### Step 3 - Implementing the Client methods

In your Client TypeScript file, implement the desired methods using the `HttpClient` for targeted HTTP calls:

```ts
import type { InstanceOptions, IOContext } from '@vtex/api'
import { JanusClient } from '@vtex/api'

export default class MyClient extends JanusClient {
    constructor(context: IOContext, options?: InstanceOptions) {
       super(context, {
        ...options,
        headers: {
          Accept: 'application/json',
          VtexIdclientAutCookie: context.storeUserAuthToken,
          'x-vtex-user-agent': context.userAgent,
          ...options?.headers,
        },
      })
    }

    public newOrderForm = (orderFormId?: string) => {
      return this.http
        .postRaw<OrderForm>(this.routes.orderForm(orderFormId), undefined, {
          metric: 'checkout-newOrderForm',
        })
        .catch(statusToError) as Promise<IOResponse<OrderForm>>
    }

    private get routes() {
      const base = '/api/checkout/pub'

      return {
        orderForm: (orderFormId?: string) =>
          `${base}/orderForm/${orderFormId ?? ''}`
      }
    }
}
```

### Step 4 - Exporting custom clients

Now that you've created your custom Client, organize and export it for use in your VTEX IO service.

1. Create an `index.ts` file in the `node/clients` folder.
2. Inside the `index.ts` file, import the custom client you created:

    ```ts
    import MyClient from "./myClient.ts";
    ```

3. Define a class called `Clients` that extends `IOClients`:

    ```ts
    import { IOClients } from "@vtex/api";
    import MyClient from "./myClient.ts";

    export class Clients extends IOClients {
      public get myClient() {
        return this.getOrSet("myClient", MyClient);
      }
    }
    ```

Now that you have developed and exported your custom Client, your Clients can be accessed and used within your VTEX IO service to perform various tasks. Learn how to use clients effectively in the [Using Node Clients](https://developers.vtex.com/docs/guides/using-node-clients) guide.

## Key considerations

- **GraphQL apps:** Some Core Commerce modules already feature a GraphQL app that abstracts their endpoints. Check if the desired data is available via one of our GraphQL apps. Utilize the [GraphQL IDE](https://developers.vtex.com/docs/guides/graphql-ide) app on the Admin for exploration.
- **Authentication:** IO apps do not require an appKey/appToken pair to make requests to VTEX Core Commerce APIs. Every app has its own rotating token that can be used on the app's code. In scenarios where using the app's token is not ideal (e.g., authorization depends on the calling user), opt to use the user's token instead, using `ctx.vtex.storeUserAuthToken` or `ctx.vtex.adminUserAuthToken`.

## Example

- [CheckoutClient](https://github.com/vtex-apps/store-graphql/blob/master/node/clients/checkout.ts)
