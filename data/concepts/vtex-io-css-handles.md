---
title: "CSS Handles for Store Customization"
slug: "vtex-io-documentation-using-css-handles-for-store-customization"
source: "https://developers.vtex.com/docs/guides/vtex-io-documentation-using-css-handles-for-store-customization"
---

CSS handles are unique identifiers assigned to HTML elements that allow you to target and add CSS classes to a component within your Store Theme.

CSS handles can overwrite a storefront's default styles, allowing for independent customization of specific blocks within a Store Theme.

## Identifying CSS handles

1. Open your browser and go to your store's development workspace:
   ```
   https://{workspace}--{account}.myvtex.com?__inspect
   ```
2. Hover your mouse over the page element you want to customize. A box will appear displaying its available CSS handles (names starting with `.`), CSS file names, and related information.
3. Check the CSS handles table in the documentation of the app or block that renders the HTML element to confirm the handle is valid.

## Applying a general customization

Apply a style that affects every block instance of the same type:

1. In your Store Theme, go to the `css` folder.
2. Create a new CSS file named after the component you're targeting (e.g., `vtex.menu.css`).
3. Use the CSS handle as the class selector:

```css
.menuItem {
    background: rgba(0, 0, 0, 0.2);
    margin: 5px;
    border-radius: 5px;
}
```

4. Run `vtex link` to see the changes.

## Customizing a single block

To customize a specific block instance without affecting others:

1. Add the `blockClass` prop to the target block in the JSON configuration:

```json
"menu-item#your-item": {
  "props": {
    "blockClass": "header"
  }
}
```

2. This creates a new CSS handle: `{originalHandle}--{blockClass}` (e.g., `.menuItem--header`).

3. Use this new class in your CSS file:
```css
.menuItem--header {
    background: blue;
}
```

## Adding CSS handles to custom React components

When developing a custom React component, use the `vtex.css-handles` package to create handles:

1. Install the dependency in `manifest.json`:
```json
"dependencies": {
  "vtex.css-handles": "0.x"
}
```

2. In your React component:
```tsx
import { useCssHandles } from 'vtex.css-handles'

const CSS_HANDLES = ['container', 'title', 'button'] as const

const MyComponent = () => {
  const handles = useCssHandles(CSS_HANDLES)

  return (
    <div className={handles.container}>
      <h1 className={handles.title}>Hello</h1>
      <button className={handles.button}>Click</button>
    </div>
  )
}
```

Users can then customize these handles in their Store Theme's CSS files.

## Allowed CSS selectors

The following selectors are allowed for store customization:

- Class selectors (e.g., `.foo`)
- Pseudo-selectors: `:hover`, `:visited`, `:active`, `:disabled`, `:focus`, `:local`, `:empty`, `:target`
- `:not()`
- `:first-child` and `:last-child`
- `:nth-child(even)`, `:nth-child(odd)`, `:nth-child(2n)` (and other steps like `4n`, `5n`)
- All pseudo-elements: `::before`, `::after`, `::placeholder`
- Space combinator (e.g., `.foo .bar`)
- `[data-...]`
- `:global(vtex-{AppName}-{AppVersion}-{ComponentName})` for elements from different apps
- Media queries (e.g., `@media (max-width: 768px)`)

> ⚠️ CSS selectors NOT in this list (e.g., `:nth-child(2)`, `foo > bar`, `[alt="bar"]`) are not supported and can cause app linking failure.
