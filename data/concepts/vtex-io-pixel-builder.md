---
title: "Pixel builder"
slug: "vtex-io-documentation-pixel-builder"
source: "https://developers.vtex.com/docs/guides/vtex-io-documentation-pixel-builder"
---

The `pixel` builder allows the implementation of JavaScript scripts in HTML files. The scripts run in the head or body of every store page and can collect user data, respond to events, and connect with third-party services.

## Folder structure

```txt
pixel
 ┣ 📄 body.html
 ┗ 📄 head.html
```

- `body.html`: Script that runs in the **body** of store pages. Better performance, but some early events might be missed since execution happens during HTML element rendering.
- `head.html`: Script that runs in the **head** of store pages. Ensures all events are detected (executes before HTML elements render), but has higher impact on performance.

## Declare in manifest.json

```json
"builders": {
    "pixel": "0.x"
}
```

## Usage

### 1. Start with a template

Download the [pixel-app-template](https://github.com/vtex-apps/pixel-app-template/).

### 2. Configure settingsSchema

Add configurable settings to `manifest.json`:

```json
"settingsSchema": {
  "title": "My Pixel App",
  "type": "object",
  "properties": {
    "pixelId": {
      "title": "Pixel/Tag ID",
      "description": "Enter your pixel ID",
      "type": "string"
    }
  }
}
```

### 3. Implement the script

```html
<!-- pixel/head.html -->
<script>
  (function() {
    var pixelId = "{{settings.pixelId}}";

    // Your pixel/tracking code here
    // Use {{settings.fieldName}} syntax to access app settings
  })()
</script>
```

### 4. Listen to store events (optional)

You can listen to store events from a React component in the `react/` folder:

```tsx
// react/PixelApp.tsx
import { canUseDOM } from 'vtex.render-runtime'

const TRACK_EVENTS = [
  'vtex:productView',
  'vtex:addToCart',
  'vtex:removeFromCart',
  'vtex:orderPlaced',
]

const PixelApp = () => {
  if (!canUseDOM) return null

  TRACK_EVENTS.forEach(event => {
    window.addEventListener(event, (e: Event) => {
      const { detail } = e as CustomEvent
      // Process event data
      console.log(event, detail)
    })
  })

  return null
}

export default PixelApp
```

### 5. Test

Link the app to a development workspace:

```shell
vtex link
```

Access the store at `https://{workspace}--{account}.myvtex.com` and trigger events.

## Common pixel use cases

- Google Tag Manager integration
- Facebook Pixel / Meta Pixel
- Custom analytics tracking
- Customer behavior tracking (page views, add-to-cart, etc.)
- Heatmap tools (Hotjar, etc.)

## Available store events

Common events available to pixel apps:

| Event | Description |
| --- | --- |
| `vtex:pageView` | Page navigation |
| `vtex:productView` | Product detail page view |
| `vtex:addToCart` | Item added to cart |
| `vtex:removeFromCart` | Item removed from cart |
| `vtex:orderPlaced` | Order completed |
| `vtex:cartLoaded` | Cart loaded |
| `vtex:promoView` | Promotion viewed |
| `vtex:promotionClick` | Promotion clicked |

## Example apps using the pixel builder

- [vtex.google-tag-manager](https://github.com/vtex-apps/google-tag-manager)
- [vtex.facebook-pixel](https://github.com/vtex-apps/facebook-pixel)
