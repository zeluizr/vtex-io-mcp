# Complex Layouts

**Course ID:** layout-blocks
**Description:** Learn how to build complex layouts using VTEX Store Framework layout blocks.

## Overview

This course covers the main layout blocks available in VTEX Store Framework: flex-layout, slider-layout, responsive-layout, tab-layout, modal-layout, stack-layout, and condition-layout. You will learn how to compose these blocks to build rich, interactive store pages.

---

## Step 01 — Introducing Layout Blocks

### Concept

VTEX Store Framework provides several layout-focused apps. Before using them you must add them as dependencies in `manifest.json`.

Common layout dependencies:
- `vtex.flex-layout` — row/column grid system
- `vtex.slider-layout` — carousel/slider
- `vtex.tab-layout` — tabbed content
- `vtex.modal-layout` — modal/overlay dialogs
- `vtex.stack-layout` — layered overlapping content
- `vtex.condition-layout` — conditional rendering

### Activity

Add layout dependencies to `manifest.json`:

```json
// manifest.json
{
  "dependencies": {
    "vtex.flex-layout": "0.x",
    "vtex.slider-layout": "0.x",
    "vtex.tab-layout": "0.x",
    "vtex.modal-layout": "0.x",
    "vtex.stack-layout": "0.x",
    "vtex.condition-layout": "0.x",
    "vtex.responsive-layout": "0.x"
  }
}
```

**Answer sheet:**

```json
// manifest.json
{
  "vendor": "storecomponents",
  "name": "store-theme",
  "version": "0.0.1",
  "builders": {
    "store": "0.x",
    "styles": "2.x"
  },
  "dependencies": {
    "vtex.store": "2.x",
    "vtex.store-header": "2.x",
    "vtex.product-price": "1.x",
    "vtex.store-footer": "2.x",
    "vtex.store-components": "3.x",
    "vtex.styleguide": "9.x",
    "vtex.slider-layout": "0.x",
    "vtex.flex-layout": "0.x",
    "vtex.rich-text": "0.x",
    "vtex.store-media": "0.x",
    "vtex.tab-layout": "0.x",
    "vtex.modal-layout": "0.x",
    "vtex.stack-layout": "0.x",
    "vtex.condition-layout": "0.x",
    "vtex.responsive-layout": "0.x"
  }
}
```

---

## Step 02 — Flex Layout

### Concept

`flex-layout` implements a CSS Flexbox-based layout system. Two block types:

- `flex-layout.row` — horizontal flex container (`children` arranged in a row)
- `flex-layout.col` — vertical flex container (`children` arranged in a column)

Key props for `flex-layout.row`:
- `fullWidth` — stretch to full container width
- `colGap` / `rowGap` — spacing between children (Tachyons scale)
- `marginTop`, `marginBottom`, `paddingTop`, `paddingBottom`

Key props for `flex-layout.col`:
- `width` — percentage or fixed width
- `preventVerticalStretch` — prevents column from stretching vertically

### Activity

Add a flex-layout row with two images on the home page:

```jsonc
// store/blocks/home.jsonc
{
  "store.home": {
    "blocks": ["flex-layout.row#images"]
  },
  "flex-layout.row#images": {
    "children": ["image#cat1", "image#cat2"]
  },
  "image#cat1": {
    "props": {
      "src": "https://storecomponents.vteximg.com.br/arquivos/banner-principal.png",
      "link": { "url": "/feminino" },
      "alt": "Category banner",
      "maxWidth": "100%"
    }
  },
  "image#cat2": {
    "props": {
      "src": "https://storecomponents.vteximg.com.br/arquivos/banner2.png",
      "link": { "url": "/masculino" },
      "alt": "Category banner",
      "maxWidth": "100%"
    }
  }
}
```

**Answer sheet:**

```jsonc
// store/blocks/home.jsonc
{
  "store.home": {
    "blocks": ["flex-layout.row#images"]
  },
  "flex-layout.row#images": {
    "children": ["image#cat1", "image#cat2"]
  },
  "image#cat1": {
    "props": {
      "src": "https://storecomponents.vteximg.com.br/arquivos/banner-principal.png",
      "link": { "url": "/feminino" },
      "alt": "Category banner",
      "maxWidth": "100%"
    }
  },
  "image#cat2": {
    "props": {
      "src": "https://storecomponents.vteximg.com.br/arquivos/banner2.png",
      "link": { "url": "/masculino" },
      "alt": "Category banner",
      "maxWidth": "100%"
    }
  }
}
```

---

## Step 03 — Slider Layout

### Concept

`slider-layout` creates a carousel/slider from its children. Key props:
- `autoplay` — object with `timeout` (ms) and `stopOnHover` (boolean)
- `showNavigationArrows` — `"always"` | `"mobileOnly"` | `"desktopOnly"` | `"never"`
- `showPaginationDots` — same options as arrows
- `infinite` — boolean for infinite loop
- `itemsPerPage` — object mapping breakpoints to number of visible items

### Activity

Add a slider with image children, with autoplay enabled:

```jsonc
// store/blocks/home.jsonc
{
  "store.home": {
    "blocks": ["slider-layout#home"]
  },
  "slider-layout#home": {
    "children": ["image#cat1", "image#cat2", "image#cat3"],
    "props": {
      "autoplay": {
        "timeout": 3000,
        "stopOnHover": false
      }
    }
  }
}
```

```jsonc
// store/blocks/slider-layout.jsonc
{
  "slider-layout#home": {
    "children": ["image#cat1", "image#cat2", "image#cat3"],
    "props": {
      "autoplay": {
        "timeout": 3000,
        "stopOnHover": false
      }
    }
  },
  "image#cat1": {
    "props": {
      "src": "https://storecomponents.vteximg.com.br/arquivos/banner-principal.png",
      "link": { "url": "/feminino" },
      "alt": "Slider Image 1",
      "maxWidth": "100%"
    }
  },
  "image#cat2": {
    "props": {
      "src": "https://storecomponents.vteximg.com.br/arquivos/banner2.png",
      "link": { "url": "/masculino" },
      "alt": "Slider Image 2",
      "maxWidth": "100%"
    }
  },
  "image#cat3": {
    "props": {
      "src": "https://storecomponents.vteximg.com.br/arquivos/banner-principal.png",
      "link": { "url": "/sale" },
      "alt": "Slider Image 3",
      "maxWidth": "100%"
    }
  }
}
```

---

## Step 04 — Responsive Layout

### Concept

`responsive-layout` allows showing different blocks depending on the device/screen size:

- `responsive-layout.desktop` — rendered only on desktop
- `responsive-layout.mobile` — rendered only on mobile
- `responsive-layout.tablet` — rendered only on tablet
- `responsive-layout.phone` — rendered only on phone

### Activity

Show different images for desktop and mobile users:

```jsonc
// store/blocks/home.jsonc
{
  "store.home": {
    "blocks": [
      "responsive-layout.desktop",
      "responsive-layout.mobile"
    ]
  },
  "responsive-layout.desktop": {
    "children": ["image#desktop"]
  },
  "responsive-layout.mobile": {
    "children": ["image#mobile"]
  },
  "image#desktop": {
    "props": {
      "src": "https://storecomponents.vteximg.com.br/arquivos/banner-principal.png",
      "maxWidth": "100%"
    }
  },
  "image#mobile": {
    "props": {
      "src": "https://storecomponents.vteximg.com.br/arquivos/banner2.png",
      "maxWidth": "100%"
    }
  }
}
```

---

## Step 05 — Tab Layout

### Concept

`tab-layout` renders tabbed content. Requires connecting `tab-list.item` to `tab-content.item` via matching `tabId` prop.

Blocks:
- `tab-layout` — container; has `tab-list` and `tab-content` as children
- `tab-list` — tab header bar; has `tab-list.item` children
- `tab-list.item` — individual tab button; props: `tabId`, `label`, `defaultActiveTab`
- `tab-content` — content area; has `tab-content.item` children
- `tab-content.item` — individual tab pane; prop: `tabId` must match its `tab-list.item`

### Activity

Build a tab layout with two tabs:

```jsonc
// store/blocks/home.jsonc
{
  "store.home": {
    "blocks": ["tab-layout#home"]
  },
  "tab-layout#home": {
    "children": ["tab-list#home", "tab-content#home"],
    "props": {
      "blockClass": "home"
    }
  },
  "tab-list#home": {
    "children": ["tab-list.item#home1", "tab-list.item#home2"]
  },
  "tab-list.item#home1": {
    "props": {
      "tabId": "HomeTab1",
      "label": "Tab 1",
      "defaultActiveTab": true
    }
  },
  "tab-list.item#home2": {
    "props": {
      "tabId": "HomeTab2",
      "label": "Tab 2"
    }
  },
  "tab-content#home": {
    "children": ["tab-content.item#home1", "tab-content.item#home2"]
  },
  "tab-content.item#home1": {
    "children": ["image#cat1"],
    "props": { "tabId": "HomeTab1" }
  },
  "tab-content.item#home2": {
    "children": ["image#cat2"],
    "props": { "tabId": "HomeTab2" }
  }
}
```

---

## Step 06 — Modal Layout

### Concept

`modal-layout` creates a modal (popup) overlay. It uses a trigger pattern:

- `modal-trigger` — wraps the element that opens the modal; has `modal-layout` as child
- `modal-layout` — the modal container; defines modal content

### Activity

Add a modal triggered by an image:

```jsonc
// store/blocks/home.jsonc
{
  "store.home": {
    "blocks": ["modal-trigger#home"]
  },
  "modal-trigger#home": {
    "children": ["image#cat1", "modal-layout#home"]
  },
  "modal-layout#home": {
    "children": ["rich-text#modal"]
  },
  "rich-text#modal": {
    "props": {
      "text": "Click here to close the modal!"
    }
  }
}
```

---

## Step 07 — Quick View with Modal

### Concept

A common use case for `modal-layout` is building a "quick view" feature for product shelves. A product in the shelf shelf is wrapped in a `modal-trigger`, and the modal contains product detail blocks.

### Activity

Build a product shelf with quick view modals:

```jsonc
// store/blocks/home.jsonc
{
  "store.home": {
    "blocks": ["list-context.product-list#home"]
  },
  "list-context.product-list#home": {
    "children": ["product-summary.shelf#home"],
    "props": {
      "collection": "139",
      "itemsPerPage": 2
    }
  },
  "product-summary.shelf#home": {
    "children": [
      "product-summary-image#home",
      "product-summary-name",
      "product-summary-price#main"
    ]
  },
  "product-summary-image#home": {
    "children": ["modal-trigger#product"]
  },
  "modal-trigger#product": {
    "children": ["product-summary-image", "modal-layout#product"]
  },
  "modal-layout#product": {
    "children": [
      "product-images",
      "product-name",
      "product-price"
    ]
  }
}
```

---

## Step 08 — Stack Layout

### Concept

`stack-layout` stacks its children on top of each other (z-axis layering). The first child is at the bottom, subsequent children are layered on top. This is useful for overlaying text or buttons on images.

### Activity

Use stack-layout to overlay a link on top of an image:

```jsonc
// store/blocks/home.jsonc
{
  "store.home": {
    "blocks": ["stack-layout#home"]
  },
  "stack-layout#home": {
    "children": ["image#stackbg", "store-link#stack"]
  },
  "image#stackbg": {
    "props": {
      "src": "https://storecomponents.vteximg.com.br/arquivos/banner-principal.png",
      "maxWidth": "100%"
    }
  },
  "store-link#stack": {
    "props": {
      "text": "Shop Now",
      "url": "/sale",
      "blockClass": "stack-link"
    }
  }
}
```

CSS customization for the stack overlay:

```css
/* styles/css/vtex.stack-layout.css */
.stackItem--1 {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-bottom: 32px;
}
```

---

## Step 09 — Condition Layout

### Concept

`condition-layout` conditionally renders blocks based on product data. The most common variant is `condition-layout.product` which evaluates product properties.

Each condition has:
- `subject` — what to evaluate (e.g., `"productId"`, `"selectedSku"`, `"productClusters"`)
- `verb` — comparison operator (`"is"`, `"is-not"`, `"contains"`, `"does-not-contain"`)
- `object` — value to compare against

Multiple conditions can be combined with `match: "all"` or `match: "any"`.

### Activity

Show a "New" badge on products from a specific cluster:

```jsonc
// store/blocks/product.jsonc
{
  "store.product": {
    "children": [
      "flex-layout.row#product-main",
      "condition-layout.product#cluster"
    ]
  },
  "condition-layout.product#cluster": {
    "props": {
      "conditions": [
        {
          "subject": "productClusters",
          "verb": "contains",
          "object": "CLUSTER_ID"
        }
      ],
      "match": "all"
    },
    "children": ["rich-text#new-badge"]
  },
  "rich-text#new-badge": {
    "props": {
      "text": "**NEW**",
      "textAlignment": "CENTER"
    }
  }
}
```

CSS for the badge:

```css
/* styles/css/vtex.condition-layout.css */
.conditionLayoutContainer {
  position: absolute;
  top: 8px;
  left: 8px;
  background-color: #f71963;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 700;
}
```

---

## Challenge

Using the layout blocks learned in this course:

1. Add a `condition-layout.product` to the product page that shows a "New Arrival" message for products released within the last 30 days
2. Inside the condition block, add a `tab-layout` that separates product description and specifications into two tabs
3. Add a `slider-layout` with product images inside one of the tabs

This challenge combines condition-layout, tab-layout, and slider-layout in a single product page.
