---
title: "6. Consuming data"
slug: "vtex-io-documentation-7-consuming-data"
hidden: false
createdAt: "2021-03-25T20:58:43.152Z"
updatedAt: "2022-12-13T20:17:44.370Z"
category: "App Development"
excerpt: "Learn how to communicate with the backend system in VTEX IO using GraphQL APIs."
source: "https://developers.vtex.com/docs/guides/vtex-io-documentation-7-consuming-data"
---

Now you need to learn how this new component will talk with the *backend* system, in other words, how it is going to **consume and insert data in the platform**.

Communication between storefront apps and VTEX IO is done through **GraphQL APIs**.

## Understanding GraphQL

GraphQL is a language for APIs whose main advantage is **to request specific data through a single endpoint**, avoiding *overfetching* and *underfetching*.

To manage the data consumed in GraphQL, we will use a library called [**React Apollo**](https://www.npmjs.com/package/react-apollo) that provides native components to perform data searches.

The main components in this library are:

| Name                                                                    | Description                                                                                                                                           |
| ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| [useQuery](https://www.apollographql.com/docs/react/data/queries/)      | *React hook* which, when executed, queries the server using the *GraphQL API* and returns what was requested in the *query* variables.                |
| [useMutation](https://www.apollographql.com/docs/react/data/mutations/) | *React hook*, which returns a function that, when executed, communicates with the server from the *GraphQL API* to send *updates* and overwrite data. |

The `useQuery` *React hook* returns an object with the following properties:

- `loading` (`boolean`) - Returns `true` if the *GraphQL API* is still being executed. Otherwise, it returns `false`.
- `error` (`any`) - Only assumes a value when an error occurs when communicating with the server.
- `data` (`any`) - Contains the object returned from the *query* execution.

The `useMutation` *React hook* returns an *array* containing:

- A function that can be called at any time to communicate with the server.
- An object that represents the current state of *mutation* that has the properties `loading`, `error`, and `data`.

## Installing the React Apollo library

Using your terminal, access your app's directory and run the command shown below to install the `npm` *React Apollo* library:

```sh
yarn add react-apollo
```

## Making queries in GraphQL

For your component to render the information provided by the VTEX IO platform, you have to query the data stored on the server using *GraphQL APIs*.

We will use the `useQuery` *React hook* to do this:

1. Open your app's code in the code editor of your choice.
2. In the `react` folder, access the `HelloData.tsx` file or create it if it does not already exist.
3. In this file, copy and paste the basic model below to build your *GraphQL query*:

```jsx
import { useQuery } from 'react-apollo'
import QUERY_VALUE from './helloData.gql'

const HelloData = () => {
  const { loading, error, data } = useQuery(QUERY_VALUE)

  if (loading) {
    return 'Loading...'
  }
  if (error) {
    return `Error ${error}`
  }

  return `Done fetching ${data}`
}

export default HelloData
```

Note that the `QUERY_VALUE` property is being imported from another file called `helloData.gql`. The `.gql` extension hints that it is a file written in *GraphQL*. The content of this file varies depending on the *query* that the app will send as a request.

A simple example for `helloData.gql` would be:

```gql
query hello {
  hero {
    name
    height
  }
}
```

## Mutating in GraphQL

In addition to *queries*, *mutations* are another type of operation available for GraphQL APIs.

*Mutations* are used to insert or modify data that already exists on the platform. They are used for sending *updates* to the server.

1. Open your app's code in the code editor of your choice.
2. In the `react` folder, access the `HelloMutation.tsx` file or create it if it does not already exist.
3. In this file, copy and paste the basic model below to run a *mutation* `gql` using the *React* component:

```jsx
import { useMutation } from 'react-apollo'
import MUTATION_VALUE from './helloMutation.gql'

const HelloMutation = () => {
  const [doSomething] = useMutation(MUTATION_VALUE)

  return <button onClick={() => { doSomething() }}>Click me</button>
}

export default HelloMutation
```

In this case, unlike the `useQuery` *hook* where the *query* is executed immediately, the call to the server will only be made after calling the function returned by the `useMutation` *hook* (`doSomething` in this example).

You can add *mutation* parameters as `doSomething` function variables:

```diff
- return <button onClick={() => { doSomething() }}>Click me</button>
+ return <button onClick={() => { doSomething({ variables: { cityName: 'Rio' } }) }}>Click me</button>
```

## Debugging queries and mutations in GraphQL

To test GraphQL *queries* and *mutations*, we will use the GraphQL IDE app.

To install this app on your VTEX account, run the following command on your terminal:

```sh
vtex install vtex.admin-graphql-ide
```

Once the app is installed, follow the steps below:

1. Access the Admin.
2. In the sidebar, go to **Apps**.
3. Look for GraphQL IDE in the installed apps list.
4. In the `Choose your app from the list below` field, select the app you want to debug/test.
5. On the left side of the text editor, enter the *query* or *mutation* that you want to run for testing purposes.
6. Then, click the *play* button, and the API query response will appear in the text editor to the right.

If you need help, there is a `docs` tab on the right corner of your screen that describes the queries and mutations available for the selected app.
