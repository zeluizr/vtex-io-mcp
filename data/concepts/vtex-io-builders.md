---
title: "Builders"
slug: "vtex-io-documentation-builders"
source: "https://developers.vtex.com/docs/guides/vtex-io-documentation-builders"
---

Builders play a pivotal role in streamlining app development. They are the orchestrators of VTEX IO apps, responsible for processing, validating, and passing on a specific block of code to a runtime or framework capable of executing it.

## Understanding Builders

In practical terms, a Builder acts like a bridge that allows different parts of your app to work together by configuring and connecting to the necessary services. Each Builder operates under its unique set of rules and validation processes, acting as gateways to an IO app's functionalities.

By having very well-defined and minimal responsibilities, a Builder can evolve independently, allowing for rapid development with minimal disruptive changes.

## Using Builders

Builders are specified in an app's `manifest.json` file, and the app itself is neatly structured with folders bearing the Builders' names. This organization ensures that each Builder knows precisely which code to process.

When you run a VTEX IO app, each Builder converts the files included in its corresponding folder into configurations for the competent services. This means an app can have as many Builders as you want, enabling the bundling of both frontend and backend development into a single package.

> To use Builders, ensure that you have at least `vtex.builder-hub@0.293.4` version installed in your account.

## Example

Suppose you want to develop a React frontend component with VTEX IO. For this, you will need to use a Builder that offers a React renderer, namely, the `react` Builder. To do that, you must declare the `react` Builder in your app's `manifest.json` file:

```json
"builders": {
    "react": "3.x"
}
```

Then, in your app's root directory, you must create a folder named after the Builder (e.g., `/react`) and place your React code inside it.

## List of Builders

| Name | Functionality |
| - | - |
| `admin` | Exports blocks and routes to the VTEX Admin. |
| `assets` | Handles assets used by Store Theme blocks. Gets all asset paths used and uploads them to the VTEX IO database. |
| `configuration` | Allows allocating code pertaining to service configurations to an independent app. |
| `docs` | Allows developers to add documentation in the `/docs` directory, to be published in the Developer Portal. |
| `dotnet` | Interprets the `/dotnet` directory, empowering the development of custom backend services with .NET. |
| `graphql` | Processes GraphQL APIs and schemas by interpreting `.graphql` and `.gql` files in the app's `/graphql` directory. |
| `messages` | Exports localized string messages, empowering VTEX IO internationalization. |
| `node` | Interprets the `/node` directory, empowering the development of custom backend services using TypeScript. |
| `paymentProvider` | Allows the implementation of payment connectors using the Payment Provider Framework (PPF). |
| `pixel` | Processes the source code and configuration of Pixel Apps in VTEX IO. Files are in the app's `/pixel` directory. |
| `react` | Interprets the `/react` directory, empowering the development of React components using TypeScript. |
| `services` | Fetches service workers exported by installed apps and bundles them in a single file. |
| `store` | Interprets and validates the blocks, interfaces, and routes in the theme app's `/store` directory. |
| `styles` | Exports CSS configurations for Store Framework blocks using Tachyons. |
