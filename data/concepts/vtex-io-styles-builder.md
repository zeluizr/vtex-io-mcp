---
title: "Styles builder"
slug: "vtex-io-documentation-styles-builder"
source: "https://developers.vtex.com/docs/guides/vtex-io-documentation-styles-builder"
---

The `styles` builder helps you set a cohesive style for all components within your Store Theme app. During the app-building process, the `styles` builder interprets the `styles/style.json` file using [Tachyons](https://tachyons.io/) to generate your storefront's CSS.

Using this builder, you avoid having to customize each component on different pages, as you set a standard style.

## Folder structure

```txt
styles
 ┣ 📂 configs
      ┗ 📄 style.json
 ┣ 📂 css
      ┗ 📄 vtex.{appName}.css
```

- `style.json`: Contains information relevant to styling — type scales, spacing, colors, typography, and other style-related settings.
- `css/`: Contains CSS files organized by app. File names follow the pattern `{vendor}.{appName}.css`.

## Usage

Declare in `manifest.json`:

```json
"builders": {
    "styles": "2.x"
}
```

If you're developing a Store Theme using the [Store Theme boilerplate](https://github.com/vtex-apps/store-theme), the `styles` builder is installed automatically.

## style.json structure

```json
{
  "font-family": "sans-serif",
  "font-aux": "sans-serif",
  "font-icon": "FontAwesome",
  "heading-1": {
    "fontFamily": "Fabriga,sans-serif",
    "fontWeight": "bold",
    "fontSize": "3.052rem",
    "textTransform": "initial",
    "letterSpacing": "0"
  },
  "body": {
    "fontFamily": "Fabriga,sans-serif",
    "fontWeight": "normal",
    "fontSize": "1rem",
    "textTransform": "initial",
    "letterSpacing": "0"
  },
  "colors": {
    "base": "#fff",
    "base--inverted": "#3f3f40",
    "action-primary": "#134CD8",
    "on-action-primary": "#fff",
    "emphasis": "#f71963"
  }
}
```

## CSS customization via css/ folder

In addition to `style.json`, you can add custom CSS files in the `css/` folder. Name CSS files after the app they target:

```
styles/css/vtex.header.css       → Styles for vtex.header app
styles/css/vtex.rich-text.css    → Styles for vtex.rich-text app
styles/css/vtex.menu.css         → Styles for vtex.menu app
```

Within these files, use CSS handles (class names) from the target app:

```css
/* styles/css/vtex.menu.css */
.container {
  background-color: #f5f5f5;
}

.menuItem {
  padding: 8px 16px;
}
```
