---
title: "Messages builder (i18n)"
slug: "vtex-io-documentation-messages-builder"
source: "https://developers.vtex.com/docs/guides/vtex-io-documentation-messages-builder"
---

The `messages` builder handles the internationalization (i18n) of strings in VTEX IO apps using React. Instead of declaring static strings in frontend components, this builder allows you to use an ID for each message, which will be dynamically replaced with the corresponding string in the user's language.

## Folder structure

```txt
messages
┣ 📄 en.json
┣ 📄 es.json
┗ 📄 pt.json
```

Each file is named using the two lowercase letters of the language's ISO 639-1 code (e.g., `en`, `es`, `pt`).

## Usage

### 1. Configure manifest.json

```json
{
  "builders": {
    "react": "3.x",
    "docs": "0.x",
    "messages": "1.x"
  }
}
```

### 2. Install React i18n libraries

In the `react` folder:
```shell
yarn add react-intl@3
yarn add @types/react-intl@3 --dev
```

### 3. Use message identifiers in React code

```typescript
import React from 'react'
import { FormattedMessage } from 'react-intl'

const HelloWorld = () => {
  return (
    <div>
      <FormattedMessage id="store/my-app.hello"/>
    </div>
  )
}

export default HelloWorld
```

Key naming conventions:
- Keys starting with `store/` are used in the storefront.
- Keys starting with `admin/` are used in the Admin UI.
- If a key doesn't have a matching entry in the JSON files, it falls back to the automatic translation service.

### 4. Create the messages files

```json
// messages/en.json
{
  "store/my-app.hello": "Hello, world!",
  "store/my-app.button": "Click me"
}
```

```json
// messages/es.json
{
  "store/my-app.hello": "¡Hola, mundo!",
  "store/my-app.button": "Haz clic aquí"
}
```

```json
// messages/pt.json
{
  "store/my-app.hello": "Olá, mundo!",
  "store/my-app.button": "Clique aqui"
}
```

> ℹ️ We recommend adding keys to JSON files in alphabetical order to help developers and translators work with them.

## Using useIntl hook (React 16+)

```tsx
import { useIntl } from 'react-intl'

const MyComponent = () => {
  const intl = useIntl()

  return (
    <input
      placeholder={intl.formatMessage({ id: 'store/my-app.placeholder' })}
    />
  )
}
```

## Using defineMessages

```tsx
import { defineMessages, useIntl } from 'react-intl'

const messages = defineMessages({
  hello: { id: 'store/my-app.hello', defaultMessage: 'Hello' },
})

const MyComponent = () => {
  const intl = useIntl()
  return <p>{intl.formatMessage(messages.hello)}</p>
}
```
