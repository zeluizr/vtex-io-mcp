---
title: "Using Node Clients"
slug: "using-node-clients"
excerpt: "Learn how to use Clients in your VTEX IO app for interaction with both internal and external services."
hidden: false
createdAt: "2022-02-16T13:52:17.234Z"
updatedAt: "2022-12-13T20:17:43.979Z"
source: "https://developers.vtex.com/docs/guides/using-node-clients"
---

In VTEX IO Services, Node [Clients](https://developers.vtex.com/docs/guides/vtex-io-documentation-clients) are powerful tools that enable you to seamlessly interact with both internal and external services. These clients play a crucial role in tasks such as making API requests, fetching data, and performing various operations within your VTEX IO apps.

For this guide, note that VTEX IO Services exports functions that receive a `context` object. These functions can be resolver functions for GraphQL fields, middlewares for an HTTP server, or event handlers. In all cases, the Service receives a `ctx` object of type `Context`, and it is within `ctx.clients` where you will find your Clients.

## Before you begin

- **VTEX IO development workspace:** Ensure you have a VTEX IO development workspace set up.
- **TypeScript Familiarity:** This guide assumes you have a basic understanding of TypeScript, as we'll be using the `node` [Builder](https://developers.vtex.com/docs/guides/vtex-io-documentation-builders) to develop with TypeScript.
- **Understanding of Clients:** Clients play a crucial role in facilitating interactions between your application and both external and internal services.

## Using native `@vtex/api` Clients

1. Start a new VTEX IO app using the `node` builder and open the project using your preferred code editor.
2. Open the terminal and change to your app's `node` folder.
3. Install the `@vtex/api` package by running the following command:

   ```sh
   yarn add @vtex/api
   ```

4. In your app's handlers and middlewares, access the desired Clients via the `ctx` object. Here's an example of accessing the `@vtex/api` native `licenseManager` Client:

    ```ts
    export const authorize = async (ctx: Context) => {
        const { clients: { licenseManager } } = ctx
        ...
        const data = await licenseManager.canAccessResource(/*...*/)
    }
    ```

## Using native `@vtex/clients` Clients

The [`@vtex/clients`](https://github.com/vtex/io-clients) package exports Clients, Client Factories and TypeScript typings that help you connect a VTEX IO app with VTEX Core Commerce modules.

1. Start a new VTEX IO app using the `node` builder and open the project using your preferred code editor.
2. Open the terminal and change to your app's `node` folder.
3. Install the `@vtex/api` package by running the following command:

   ```sh
   yarn add @vtex/api
   ```

4. Install the `@vtex/clients` package by running the following command:

   ```sh
   yarn add @vtex/clients
   ```

5. Check the list of VTEX IO Clients available in the `@vtex/clients` package and choose whether to use a Factory or an individual Client based on your requirements.

### Using individual Clients

1. Create a `node/clients/index.ts` file and import the desired Client.

    ```ts
    import { Catalog } from '@vtex/clients'
    ```

2. In `node/clients/index.ts`, define a class called `Clients` that extends `IOClients`. Within the Clients class, declare a `get` property for each of your custom Clients:

    ```ts
    import { IOClients } from "@vtex/api";
    import { Catalog } from '@vtex/clients'

    export class Clients extends IOClients {
        public get catalog() {
            return this.getOrSet('catalog', Catalog)
        }
    }
    ```

3. In your app's handlers and middlewares, access the desired Clients via the `ctx` object:

    ```ts
    ctx.clients.catalog.getSkuById(...)
    ```

### Using Client Factories

1. Create a `node/clients/index.ts` file and import the desired factory. For example:

    ```ts
    import { masterDataFor } from '@vtex/clients'
    ```

2. In `node/clients/index.ts`, define a class called `Clients` that extends `IOClients`:

    ```ts
    import { IOClients } from "@vtex/api";
    const BooksClient = masterDataFor<MyBookType>('books')

    export class Clients extends IOClients {
        public get books() {
            return this.getOrSet('books', BooksClient)
        }
    }
    ```

3. In your app's handlers and middlewares, access the desired Clients via the `ctx` object:

    ```ts
    ctx.clients.books.save({ name: 'Example Book' })
    ```

## Using custom Clients

If you have developed custom Clients for a specific need, take the following steps to use them in your VTEX IO app.

1. After completing the steps in the [Developing custom Clients](https://developers.vtex.com/docs/guides/vtex-io-documentation-how-to-create-and-use-clients) guide, import the `Clients` class to the `node/index.ts` file.

   ```ts
   import { Clients } from "./clients";
   ```

2. Create or edit the `clients` object of type `ClientsConfig<Clients>` from `@vtex/api`:

   ```ts
   import type { ClientsConfig } from "@vtex/api";

   const clients: ClientsConfig<Clients> = {
     implementation: Clients,
     options: {
       default: {
         retries: 2,
         timeout: 2000,
       },
     },
   };
   ```

3. (Optional) In the `node/index.ts` file, consider adding a type declaration to improve type safety and code clarity:

   ```ts
   import type { ServiceContext } from "@vtex/api";

   declare global {
     type Context = ServiceContext<Clients, State>;
   }
   ```

4. In the `node/index.ts` file, export a new Service that defines route handlers and client options:

   ```ts
   export default new Service<Clients, State>({
    clients,
    routes: {
       ...
    },
   })
   ```

5. Now, in your app's handlers and middlewares, use the `clients` object from the `ctx` to access your custom Client:

   ```ts
   export const authorize = async (ctx: Context) => {
       const { clients: { github } } = ctx
       ...
       const data = await github.getUser(/*...*/)
   }
   ```

## Options

The table below provides a detailed description of the available options for configuring your custom Client:

| Option                          | Description                                                                         |
| ------------------------------- | ----------------------------------------------------------------------------------- |
| `authType`                      | Specifies the authentication type.                                                  |
| `timeout`                       | Sets the request timeout duration in milliseconds.                                  |
| `memoryCache`                   | Configures a memory cache layer for caching data.                                   |
| `diskCache`                     | Configures a disk cache layer for caching data.                                     |
| `baseURL`                       | Defines the base URL for making requests.                                           |
| `retries`                       | Specifies the number of times a request should be retried in case of failure.       |
| `exponentialTimeoutCoefficient` | Configures the coefficient for exponential timeout backoff strategy.                |
| `initialBackoffDelay`           | Sets the initial delay before starting exponential backoff retries in milliseconds. |
| `exponentialBackoffCoefficient` | Configures the coefficient for exponential backoff retries.                         |
| `metrics`                       | Specifies an object for accumulating metrics related to requests.                   |
| `concurrency`                   | Defines the maximum number of concurrent requests.                                  |
| `headers`                       | Sets default headers to be sent with every request.                                 |
| `params`                        | Sets default query string parameters to be sent with every request.                 |
| `middlewares`                   | Configures an array of middleware functions for request processing.                 |
| `verbose`                       | Enables or disables verbose logging for requests and responses.                     |
| `name`                          | Defines a custom name for the instance.                                             |
| `serverTimings`                 | Sets server timings for measuring request and response times.                       |
| `httpsAgent`                    | Configures the HTTPS agent for making requests over SSL/TLS.                        |
