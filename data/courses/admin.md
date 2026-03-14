# Admin Applications

**Course ID:** admin
**Description:** Learn how to create applications for the VTEX Admin panel using the admin builder and vtex.styleguide.

## Overview

This course covers building admin panel applications for VTEX IO. You will learn about the `admin` builder, navigation configuration, React components using `vtex.styleguide`, and connecting your admin app to a backend service via GraphQL.

---

## Step 01 — Introduction to Admin Apps

### Concept

Admin apps extend the VTEX Admin panel with custom pages. They use:

- The `admin` builder for declaring navigation and routes
- The `react` builder for React components
- The `vtex.styleguide` library for consistent Admin UI components

The `admin` builder creates pages accessible at `/admin/{your-path}`.

### Activity

Set up the manifest for an admin app:

```json
// manifest.json
{
  "vendor": "vtex",
  "name": "admin-example",
  "version": "0.0.1",
  "title": "Admin Example",
  "description": "Admin application example",
  "builders": {
    "admin": "0.x",
    "react": "3.x",
    "messages": "1.x"
  },
  "dependencies": {
    "vtex.styleguide": "9.x"
  }
}
```

**Answer sheet:**

```json
// manifest.json
{
  "vendor": "vtex",
  "name": "admin-example",
  "version": "0.0.1",
  "title": "Admin Example",
  "description": "Admin Example",
  "builders": {
    "admin": "0.x",
    "react": "3.x",
    "messages": "1.x"
  },
  "dependencies": {
    "vtex.styleguide": "9.x"
  },
  "$schema": "https://raw.githubusercontent.com/vtex/node-vtex-api/main/gen/manifest.schema.json"
}
```

---

## Step 02 — Navigation and Routes

### Concept

Admin apps define their navigation entries and routes in the `/admin` folder:

- `admin/navigation.json` — sidebar navigation entry
- `admin/routes.json` — page routes that map paths to React components

**navigation.json** structure:
```json
{
  "section": "SECTION_NAME",
  "titleId": "admin/navigation.label",
  "path": "/admin/app/example"
}
```

**routes.json** structure:
```json
{
  "admin.app.example": {
    "component": "AdminExample",
    "path": "/admin/app/example"
  }
}
```

> Note: Admin routes must start with `/admin/app/` to avoid conflicts with VTEX's own admin paths.

### Activity

Create navigation and routes for your admin app:

```json
// admin/navigation.json
{
  "section": "OTHER",
  "titleId": "admin/navigation.helloworld",
  "path": "/admin/app/helloworld"
}
```

```json
// admin/routes.json
{
  "admin.app.helloworld": {
    "component": "AdminExample",
    "path": "/admin/app/helloworld"
  }
}
```

```tsx
// react/AdminExample.tsx
import React from 'react'

const AdminExample = () => {
  return (
    <div>
      <p>Hello, World!</p>
    </div>
  )
}

export default AdminExample
```

**Answer sheet:**

```json
// admin/navigation.json
{
  "section": "OTHER",
  "titleId": "admin/navigation.helloworld",
  "path": "/admin/app/helloworld"
}
```

```json
// admin/routes.json
{
  "admin.app.helloworld": {
    "component": "AdminExample",
    "path": "/admin/app/helloworld"
  }
}
```

---

## Step 03 — Enhancing Navigation

### Concept

Admin navigation can be enhanced with:
- `titleId` pointing to a messages key for i18n support
- `searchKeyWordsHelpers` — additional keywords for admin search
- Multiple navigation entries pointing to different paths

Messages for admin navigation go in `messages/` as usual.

### Activity

Add internationalization to your navigation labels:

```json
// admin/navigation.json
{
  "section": "OTHER",
  "titleId": "admin/navigation.helloworld",
  "path": "/admin/app/helloworld",
  "searchKeyWordsHelpers": "admin/navigation.helloworld.keywords"
}
```

```json
// messages/en.json
{
  "admin/navigation.helloworld": "Hello World",
  "admin/navigation.helloworld.keywords": "hello world example"
}
```

```json
// messages/pt.json
{
  "admin/navigation.helloworld": "Olá Mundo",
  "admin/navigation.helloworld.keywords": "olá mundo exemplo"
}
```

---

## Step 04 — Sub-sections

### Concept

Admin navigation supports sub-sections with expandable menus. Add `subSectionItems` to a navigation entry to create a collapsible group:

```json
{
  "section": "SECTION",
  "titleId": "admin/navigation.parentLabel",
  "subSectionItems": [
    {
      "labelId": "admin/navigation.child1",
      "path": "/admin/app/example/page1"
    },
    {
      "labelId": "admin/navigation.child2",
      "path": "/admin/app/example/page2"
    }
  ]
}
```

### Activity

Create a navigation group with two sub-pages:

```json
// admin/navigation.json
{
  "section": "OTHER",
  "titleId": "admin/navigation.example",
  "subSectionItems": [
    {
      "labelId": "admin/navigation.example.main",
      "path": "/admin/app/example"
    },
    {
      "labelId": "admin/navigation.example.other",
      "path": "/admin/app/example/other"
    }
  ]
}
```

```tsx
// react/AdminOtherExample.tsx
import React from 'react'

const AdminOtherExample = () => {
  return (
    <div>
      <p>Second admin page</p>
    </div>
  )
}

export default AdminOtherExample
```

---

## Step 05 — Look and Feel with vtex.styleguide

### Concept

VTEX Styleguide provides a React component library consistent with the VTEX Admin design system. Key layout components:

- `Layout` — page wrapper with consistent padding and structure
- `PageBlock` — card-like container for page sections
- `PageHeader` — page title and breadcrumb area

Other useful components: `Table`, `Button`, `Input`, `Modal`, `Alert`, `Spinner`, `Tag`, `Box`, `ActionMenu`.

### Activity

Apply Styleguide layout to the admin page:

```tsx
// react/AdminExample.tsx
import React from 'react'
import { Layout, PageBlock } from 'vtex.styleguide'

const AdminExample = () => {
  return (
    <Layout>
      <div className="bg-base pa8 mw9 center">
        <PageBlock
          title="Admin Example"
          subtitle="This is an example admin page."
          variation="full"
        >
          <p>Hello, World!</p>
        </PageBlock>
      </div>
    </Layout>
  )
}

export default AdminExample
```

**Answer sheet:**

```tsx
// react/AdminExample.tsx
import React from 'react'
import { Layout, PageBlock } from 'vtex.styleguide'

const AdminExample = () => {
  return (
    <Layout>
      <div className="bg-base pa8 mw9 center">
        <PageBlock title="Admin Example" variation="full">
          <p>Hello, World!</p>
        </PageBlock>
      </div>
    </Layout>
  )
}

export default AdminExample
```

---

## Step 06 — Connecting to a Service (GraphQL)

### Concept

Admin apps can query backend services via GraphQL using the same Apollo Client pattern as storefront components.

To connect an admin app to a VTEX IO service:
1. Add the service app as a dependency in `manifest.json`
2. Create a `.gql` query file in the `react/` folder
3. Use `useQuery` from `react-apollo` in the React component

The service needs `graphql` builder with a schema and resolvers.

### Activity

Create a GraphQL-connected admin page:

```graphql
# react/helloworld.gql
query HelloWorld {
  helloWorld {
    greeting
  }
}
```

```graphql
# graphql/schema.graphql
type Greeting {
  greeting: String
}

type Query {
  helloWorld: Greeting
}
```

```typescript
// node/index.ts
import { Service } from '@vtex/api'
import { Clients } from './clients/index'
import { resolvers } from '../graphql/resolvers/index'

export default new Service({
  clients: { implementation: Clients },
  graphql: { resolvers },
})
```

```tsx
// react/AdminExample.tsx
import React from 'react'
import { useQuery } from 'react-apollo'
import { Layout, PageBlock, Spinner } from 'vtex.styleguide'
import helloWorldQuery from './helloworld.gql'

const AdminExample = () => {
  const { data, loading } = useQuery(helloWorldQuery)

  if (loading) {
    return <Spinner />
  }

  return (
    <Layout>
      <div className="bg-base pa8 mw9 center">
        <PageBlock title="Hello World" variation="full">
          <p>{data?.helloWorld?.greeting}</p>
        </PageBlock>
      </div>
    </Layout>
  )
}

export default AdminExample
```

**Answer sheet:**

```tsx
// react/AdminExample.tsx
import React from 'react'
import { useQuery } from 'react-apollo'
import { Layout, PageBlock } from 'vtex.styleguide'
import helloWorldQuery from './helloworld.gql'

interface HelloWorldData {
  helloWorld: {
    greeting: string
  }
}

const AdminExample = () => {
  const { data, loading } = useQuery<HelloWorldData>(helloWorldQuery)

  return (
    <Layout>
      <div className="bg-base pa8 mw9 center">
        <PageBlock title="Hello World" variation="full">
          {loading ? <p>Loading...</p> : <p>{data?.helloWorld?.greeting}</p>}
        </PageBlock>
      </div>
    </Layout>
  )
}

export default AdminExample
```

```graphql
# react/helloworld.gql
query HelloWorld {
  helloWorld {
    greeting
  }
}
```

```graphql
# graphql/schema.graphql
type Greeting {
  greeting: String
}

type Query {
  helloWorld: Greeting
}
```

```typescript
// node/index.ts
import { Service } from '@vtex/api'
import { Clients } from './clients/index'
import { resolvers } from '../graphql/resolvers/index'

export default new Service({
  clients: {
    implementation: Clients,
  },
  graphql: {
    resolvers,
  },
})
```

---

## Challenge

Build a complete CRUD interface for a Master Data entity using the Styleguide `Table` component:

1. Create a Master Data entity (e.g., `customers`)
2. Implement GraphQL queries for list, create, update, and delete
3. Use the Styleguide `Table` component to display the data
4. Add `Button` components for create/edit/delete actions
5. Use `Modal` from Styleguide for the create/edit form

This challenge integrates all concepts: admin builder, Styleguide components, GraphQL, and Master Data.
