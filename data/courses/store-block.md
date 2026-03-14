# Custom Blocks

**Course ID:** store-block
**Description:** Learn how to create custom React blocks for VTEX Store Framework.

## Overview

This course teaches you how to build a custom VTEX IO block from scratch using React and TypeScript. You will create a Countdown Timer block, learning about: manifest.json structure, React components with `StorefrontFunctionComponent`, props and schema, CSS Handles, internationalization with the messages builder, interfaces.json for block composition, and GraphQL queries with Apollo.

**Prerequisites:** React hooks, GraphQL basics, TypeScript basics.

---

## Step 00 — Introduction

### What you will build

A **Countdown Timer** block that:
- Counts down to a target date
- Has customizable title
- Uses CSS Handles for styling
- Supports internationalization
- Fetches product release date from GraphQL

### App structure

```
countdown/
├── manifest.json
├── react/
│   ├── Countdown.tsx
│   ├── Title.tsx
│   └── utils/
│       └── time.ts
├── store/
│   ├── interfaces.json
│   └── blocks/
│       └── countdown.jsonc
└── messages/
    ├── en.json
    ├── pt.json
    └── context.json
```

---

## Step 01 — Manifest

### Concept

The `manifest.json` is the app's descriptor file. Every VTEX IO app must have one.

Key fields:
- `vendor` — your VTEX account name
- `name` — unique app name in kebab-case
- `version` — semantic version (major.minor.patch)
- `title` — human-readable name
- `description` — short description
- `builders` — which builders this app uses and their versions
- `dependencies` — other VTEX IO apps this app depends on
- `peerDependencies` — apps that must be installed in the account (but not bundled)

### Activity

Create the manifest for the countdown app:

```json
// manifest.json
{
  "vendor": "vtex",
  "name": "countdown",
  "version": "0.0.1",
  "title": "Countdown",
  "description": "Countdown component",
  "defaultLocale": "pt-BR",
  "builders": {
    "react": "3.x",
    "messages": "1.x",
    "store": "0.x"
  },
  "mustUpdateAt": "2019-04-02",
  "scripts": {
    "postreleasy": "vtex publish --verbose"
  },
  "dependencies": {
    "vtex.styleguide": "9.x",
    "vtex.css-handles": "0.x"
  },
  "$schema": "https://raw.githubusercontent.com/vtex/node-vtex-api/main/gen/manifest.schema.json"
}
```

---

## Step 02 — React Component

### Concept

VTEX IO React components use `StorefrontFunctionComponent` type from `vtex.types/types`. This type includes the VTEX IO injected props (`runtime`, `children`, etc.).

Every block that wants to be configurable via Site Editor needs a static `schema` property on the component.

### Activity

Create the basic Countdown component:

```tsx
// react/Countdown.tsx
import React from 'react'

const Countdown: StorefrontFunctionComponent = () => {
  return <div></div>
}

Countdown.schema = {
  title: 'editor.countdown.title',
  description: 'editor.countdown.description',
  type: 'object',
  properties: {},
}

export default Countdown
```

Register in `store/interfaces.json` and configure `home.jsonc`:

```jsonc
// store/blocks/home.jsonc
{
  "store.home": {
    "blocks": ["countdown"]
  }
}
```

**Answer sheet:**

```tsx
// react/Countdown.tsx
import React from 'react'

const Countdown: StorefrontFunctionComponent = () => {
  return <div></div>
}

Countdown.schema = {
  title: 'editor.countdown.title',
  description: 'editor.countdown.description',
  type: 'object',
  properties: {},
}

export default Countdown
```

```json
// manifest.json
{
  "vendor": "vtex",
  "name": "countdown",
  "version": "0.0.1",
  "title": "Countdown",
  "description": "Countdown component",
  "builders": {
    "react": "3.x",
    "messages": "1.x",
    "store": "0.x"
  },
  "dependencies": {
    "vtex.styleguide": "9.x",
    "vtex.css-handles": "0.x"
  }
}
```

---

## Step 03 — Props Implementation

### Concept

Props in VTEX IO React blocks are defined in two places:

1. **TypeScript interface** — defines the TypeScript types for the props
2. **`schema` property** — defines the props as a JSON Schema for Site Editor editability

### Activity

Add a `targetDate` prop and display it:

```tsx
// react/Countdown.tsx
import React from 'react'

interface CountdownProps {
  targetDate: string
}

const Countdown: StorefrontFunctionComponent<CountdownProps> = ({ targetDate }) => {
  return <div>{targetDate}</div>
}

Countdown.schema = {
  title: 'editor.countdown.title',
  description: 'editor.countdown.description',
  type: 'object',
  properties: {
    targetDate: {
      title: 'editor.countdown.targetDate.title',
      description: 'editor.countdown.targetDate.description',
      type: 'string',
      default: null,
    },
  },
}

export default Countdown
```

---

## Step 04 — Countdown Implementation

### Concept

Implement the actual countdown logic using React's `useState` and `useEffect` hooks.

The `TimeSplit` type represents the countdown broken into days, hours, minutes, and seconds.

### Activity

Implement the live countdown:

```tsx
// react/Countdown.tsx
import React, { useState } from 'react'

interface TimeSplit {
  hours: string
  minutes: string
  seconds: string
}

interface CountdownProps {
  targetDate: string
}

const tick = (targetDate: string, setter: (time: TimeSplit) => void) => {
  const target = new Date(targetDate)
  const now = new Date()
  const diff = target.getTime() - now.getTime()
  const remaining = diff > 0 ? diff : 0
  const hours = Math.floor(remaining / 1000 / 60 / 60)
  const minutes = Math.floor((remaining / 1000 / 60) % 60)
  const seconds = Math.floor((remaining / 1000) % 60)

  setter({
    hours: String(hours).padStart(2, '0'),
    minutes: String(minutes).padStart(2, '0'),
    seconds: String(seconds).padStart(2, '00'),
  })
}

const getTwoDaysFromNow = () => {
  const future = new Date()
  future.setDate(future.getDate() + 2)
  return future.toISOString()
}

const Countdown: StorefrontFunctionComponent<CountdownProps> = ({
  targetDate = getTwoDaysFromNow(),
}) => {
  const [timeRemaining, setTime] = useState<TimeSplit>({
    hours: '00',
    minutes: '00',
    seconds: '00',
  })

  const interval = setInterval(() => tick(targetDate, setTime), 1000)

  return (
    <div>
      {`${timeRemaining.hours}:${timeRemaining.minutes}:${timeRemaining.seconds}`}
    </div>
  )
}

Countdown.schema = {
  title: 'editor.countdown.title',
  description: 'editor.countdown.description',
  type: 'object',
  properties: {
    targetDate: {
      title: 'editor.countdown.targetDate.title',
      description: 'editor.countdown.targetDate.description',
      type: 'string',
      default: null,
    },
  },
}

export default Countdown
```

---

## Step 05 — CSS Handles

### Concept

CSS Handles are CSS classes generated from a component's declared handle list. They allow theme authors to style custom components without modifying the component code.

To use CSS Handles in a React component:

```tsx
import { useCssHandles } from 'vtex.css-handles'

const CSS_HANDLES = ['container', 'text', 'title'] as const

const MyComponent = () => {
  const handles = useCssHandles(CSS_HANDLES)
  return (
    <div className={handles.container}>
      <span className={handles.text}>Hello</span>
    </div>
  )
}
```

Tachyons utility classes can be combined with handles for layout and spacing.

### Activity

Add CSS Handles to the Countdown component:

```tsx
// react/Countdown.tsx
import React, { useState } from 'react'
import { useCssHandles } from 'vtex.css-handles'

interface TimeSplit {
  hours: string
  minutes: string
  seconds: string
}

interface CountdownProps {
  targetDate: string
}

const CSS_HANDLES = ['countdown', 'countdown__hours', 'countdown__separator', 'countdown__minutes', 'countdown__seconds'] as const

const Countdown: StorefrontFunctionComponent<CountdownProps> = ({
  targetDate,
}) => {
  const handles = useCssHandles(CSS_HANDLES)
  const [timeRemaining, setTime] = useState<TimeSplit>({
    hours: '00',
    minutes: '00',
    seconds: '00',
  })

  return (
    <div className={`${handles.countdown} c-muted-1 db tc`}>
      <span className={handles.countdown__hours}>{timeRemaining.hours}</span>
      <span className={handles.countdown__separator}>{' : '}</span>
      <span className={handles.countdown__minutes}>{timeRemaining.minutes}</span>
      <span className={handles.countdown__separator}>{' : '}</span>
      <span className={handles.countdown__seconds}>{timeRemaining.seconds}</span>
    </div>
  )
}

Countdown.schema = {
  title: 'editor.countdown.title',
  description: 'editor.countdown.description',
  type: 'object',
  properties: {
    targetDate: {
      title: 'editor.countdown.targetDate.title',
      description: 'editor.countdown.targetDate.description',
      type: 'string',
      default: null,
    },
  },
}

export default Countdown
```

---

## Step 06 — Messages (i18n)

### Concept

The `messages` builder enables internationalization. It uses `react-intl` and the `FormattedMessage` component.

File structure:
- `messages/en.json` — English translations
- `messages/pt.json` — Portuguese translations
- `messages/context.json` — All message IDs with descriptions (for translation tools)

### Activity

Add a translated title to the Countdown component:

```tsx
// react/Countdown.tsx
import React, { useState } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { FormattedMessage } from 'react-intl'

// ...

const Countdown: StorefrontFunctionComponent<CountdownProps> = ({
  targetDate,
  title,
}) => {
  const handles = useCssHandles(CSS_HANDLES)
  // ...

  return (
    <div className={`${handles.countdown} c-muted-1 db tc`}>
      <FormattedMessage id="countdown.title" />
      {/* ... countdown display ... */}
    </div>
  )
}
```

```json
// messages/en.json
{
  "countdown.title": "Ends in:",
  "editor.countdown.title": "Countdown",
  "editor.countdown.description": "Countdown component",
  "editor.countdown.targetDate.title": "Target date",
  "editor.countdown.targetDate.description": "Countdown target date"
}
```

```json
// messages/pt.json
{
  "countdown.title": "Termina em:",
  "editor.countdown.title": "Contagem Regressiva",
  "editor.countdown.description": "Componente de contagem regressiva",
  "editor.countdown.targetDate.title": "Data alvo",
  "editor.countdown.targetDate.description": "Data alvo da contagem regressiva"
}
```

```json
// messages/context.json
{
  "countdown.title": {
    "context": "The title displayed above the countdown timer",
    "description": "countdown.title"
  }
}
```

---

## Step 07 — Separating the Title Component

### Concept

In VTEX IO, blocks can be composed — a parent block can declare which child blocks it accepts. This is configured via `store/interfaces.json`.

The `interfaces.json` maps component names to their interface definitions, including which allowed children blocks they accept.

### Activity

Create a separate `Title` component and declare it as a composable child of `Countdown`:

```tsx
// react/Title.tsx
import React from 'react'
import { FormattedMessage } from 'react-intl'

interface TitleProps {
  title: string
}

const Title: StorefrontFunctionComponent<TitleProps> = ({ title }) => {
  return (
    <div>
      {title ? (
        <span>{title}</span>
      ) : (
        <FormattedMessage id="countdown.title" />
      )}
    </div>
  )
}

Title.schema = {
  title: 'editor.countdown.title.title',
  description: 'editor.countdown.title.description',
  type: 'object',
  properties: {
    title: {
      title: 'editor.countdown.title.text',
      description: 'editor.countdown.title.text.description',
      type: 'string',
      default: null,
    },
  },
}

export default Title
```

```json
// store/interfaces.json
{
  "countdown": {
    "component": "Countdown",
    "allowed": ["countdown.title"],
    "composition": "children"
  },
  "countdown.title": {
    "component": "Title"
  }
}
```

```jsonc
// store/blocks/countdown.jsonc
{
  "store.home": {
    "blocks": ["countdown"]
  },
  "countdown": {
    "blocks": ["countdown.title"]
  }
}
```

---

## Step 08 — React Apollo (GraphQL)

### Concept

VTEX IO React components can query data using Apollo Client. The `useQuery` hook from `react-apollo` fetches GraphQL data.

GraphQL query files (`.gql` extension) are placed in the `react/` folder and imported directly in TypeScript files.

To access product context data (on product pages), use the `useProduct` hook from `vtex.product-context/useProduct`.

### Activity

Fetch the product release date and use it as the countdown target:

```graphql
# react/productReleaseData.graphql
query productReleaseDate($slug: String) {
  product(slug: $slug) @context(provider: "vtex.store@2.x") {
    releaseDate
  }
}
```

```tsx
// react/Countdown.tsx
import React, { useState } from 'react'
import { useQuery } from 'react-apollo'
import useProduct from 'vtex.product-context/useProduct'
import { useCssHandles } from 'vtex.css-handles'
import productReleaseDate from './productReleaseData.graphql'

interface CountdownProps {
  targetDate: string
}

const Countdown: StorefrontFunctionComponent<CountdownProps> = ({
  targetDate: defaultTargetDate,
}) => {
  const handles = useCssHandles(CSS_HANDLES)
  const { product } = useProduct()
  const { data } = useQuery(productReleaseDate, {
    skip: !product,
    variables: { slug: product?.linkText },
  })

  const targetDate = data?.product?.releaseDate ?? defaultTargetDate

  // ... countdown logic ...

  return (
    <div className={`${handles.countdown} c-muted-1 db tc`}>
      {/* countdown display */}
    </div>
  )
}
```

Add `vtex.product-context` to manifest dependencies:

```json
// manifest.json
{
  "dependencies": {
    "vtex.styleguide": "9.x",
    "vtex.css-handles": "0.x",
    "vtex.product-context": "0.x"
  }
}
```
