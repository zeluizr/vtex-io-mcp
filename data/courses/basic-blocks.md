# Basic Blocks

**Course ID:** basic-blocks
**Description:** Learn how to use the basic blocks of Store Framework.

## Overview

This course introduces the fundamental blocks of VTEX Store Framework. You will learn how to use rich-text, info-card, flex-layout, and other essential blocks to build product pages and search result layouts.

---

## Step 00 — Setup

### Prerequisites

- Git installed
- VTEX CLI installed: `npm install -g vtex`
- A VTEX account

### Login and workspace

```bash
vtex login {accountName}
vtex use {workspaceName} --production=false
```

After running `vtex link`, access your workspace at:
`https://{workspaceName}--{accountName}.myvtex.com`

---

## Step 01 — Introduction

Clone the minimum boilerplate theme to get started:

```bash
vtex init
# choose "minimum-boilerplate-theme"
```

The minimum boilerplate theme provides the simplest possible Store Framework app. Link it to see your store running:

```bash
vtex link
```

---

## Step 02 — Rich Text

### Concept

The `rich-text` block renders text content using Markdown. It is part of `vtex.rich-text`.

Key props:
- `text` — Markdown string to render
- `textPosition` — `"LEFT"` | `"CENTER"` | `"RIGHT"`
- `textAlignment` — `"LEFT"` | `"CENTER"` | `"RIGHT"`

### Activity

Add a `rich-text` block to your home page:

```jsonc
// store/blocks/home.jsonc
{
  "store.home": {
    "blocks": ["rich-text#home1", "rich-text#home2"]
  },
  "rich-text#home1": {
    "props": {
      "text": "Hello, World!",
      "textPosition": "LEFT",
      "textAlignment": "LEFT"
    }
  },
  "rich-text#home2": {
    "props": {
      "text": "Welcome to our store!",
      "textPosition": "RIGHT",
      "textAlignment": "RIGHT"
    }
  }
}
```

**Answer sheet:**

```jsonc
// store/blocks/home.jsonc
{
  "store.home": {
    "blocks": ["rich-text#home1", "rich-text#home2"]
  },
  "rich-text#home1": {
    "props": {
      "text": "Hello, World!",
      "textPosition": "LEFT",
      "textAlignment": "LEFT"
    }
  },
  "rich-text#home2": {
    "props": {
      "text": "Welcome to our store!",
      "textPosition": "RIGHT",
      "textAlignment": "RIGHT"
    }
  }
}
```

---

## Step 03 — Info Card

### Concept

The `info-card` block displays a promotional banner with a call-to-action button. It is part of `vtex.store-components`.

Key props:
- `isFullModeStyle` — boolean, full-width image mode
- `headline` — string, banner title
- `subhead` — string, banner subtitle
- `callToActionMode` — `"link"` | `"button"` | `"none"`
- `callToActionText` — label for the CTA
- `callToActionUrl` — URL for the CTA
- `imageUrl` — image source URL
- `imageTitle` — image alt text

### Block instancing with `#`

You can create multiple instances of the same block using the `#` suffix (e.g., `info-card#home1`, `info-card#home2`). This lets you reuse block types with different configurations.

### Activity

Add two `info-card` blocks to your home page:

```jsonc
// store/blocks/home.jsonc
{
  "store.home": {
    "blocks": [
      "rich-text#home1",
      "rich-text#home2",
      "info-card#home1",
      "info-card#home2"
    ]
  },
  "info-card#home1": {
    "props": {
      "isFullModeStyle": false,
      "headline": "Moda feminina",
      "callToActionMode": "link",
      "callToActionText": "COMPRAR",
      "callToActionUrl": "/feminino",
      "imageUrl": "https://storecomponents.vteximg.com.br/arquivos/banner-infocard1.png",
      "imageTitle": "Banner feminino"
    }
  },
  "info-card#home2": {
    "props": {
      "isFullModeStyle": true,
      "headline": "Sale",
      "callToActionMode": "link",
      "callToActionText": "COMPRAR",
      "callToActionUrl": "/sale",
      "imageUrl": "https://storecomponents.vteximg.com.br/arquivos/banner-infocard2.png",
      "imageTitle": "Banner sale"
    }
  }
}
```

**Answer sheet:**

```jsonc
// store/blocks/home.jsonc
{
  "store.home": {
    "blocks": [
      "rich-text#home1",
      "rich-text#home2",
      "info-card#home1",
      "info-card#home2"
    ]
  },
  "rich-text#home1": {
    "props": {
      "text": "Hello, World!",
      "textPosition": "LEFT",
      "textAlignment": "LEFT"
    }
  },
  "rich-text#home2": {
    "props": {
      "text": "Welcome to our store!",
      "textPosition": "RIGHT",
      "textAlignment": "RIGHT"
    }
  },
  "info-card#home1": {
    "props": {
      "isFullModeStyle": false,
      "headline": "Moda feminina",
      "callToActionMode": "link",
      "callToActionText": "COMPRAR",
      "callToActionUrl": "/feminino",
      "imageUrl": "https://storecomponents.vteximg.com.br/arquivos/banner-infocard1.png",
      "imageTitle": "Banner feminino"
    }
  },
  "info-card#home2": {
    "props": {
      "isFullModeStyle": true,
      "headline": "Sale",
      "callToActionMode": "link",
      "callToActionText": "COMPRAR",
      "callToActionUrl": "/sale",
      "imageUrl": "https://storecomponents.vteximg.com.br/arquivos/banner-infocard2.png",
      "imageTitle": "Banner sale"
    }
  }
}
```

---

## Step 04 — Product Detail Page (PDP)

### Concept

The product page (`store.product`) uses flex-layout blocks to arrange product information. Key blocks for a PDP:

- `flex-layout.row` — horizontal arrangement of children
- `flex-layout.col` — vertical arrangement of children
- `product-images` — product image gallery
- `product-price` — product price with discount
- `product-name` — product name and details
- `buy-button` — add to cart button

### Activity

Build a product page using flex-layout:

```jsonc
// store/blocks/product.jsonc
{
  "store.product": {
    "children": [
      "flex-layout.row#product-breadcrumb",
      "flex-layout.row#product-main"
    ]
  },
  "flex-layout.row#product-breadcrumb": {
    "props": { "marginTop": 4 },
    "children": ["breadcrumb"]
  },
  "flex-layout.row#product-main": {
    "props": { "colGap": 7, "rowGap": 7, "marginTop": 4, "marginBottom": 7, "paddingTop": 7, "paddingBottom": 7 },
    "children": ["flex-layout.col#product-image", "flex-layout.col#product-details"]
  },
  "flex-layout.col#product-image": {
    "props": { "width": "60%" },
    "children": ["product-images"]
  },
  "flex-layout.col#product-details": {
    "children": [
      "product-name",
      "product-price#product-details",
      "buy-button"
    ]
  },
  "product-price#product-details": {
    "props": {
      "showInstallments": true,
      "showSavings": true
    }
  }
}
```

**Answer sheet:**

```jsonc
// store/blocks/product.jsonc
{
  "store.product": {
    "children": [
      "flex-layout.row#product-breadcrumb",
      "flex-layout.row#product-main"
    ]
  },
  "flex-layout.row#product-breadcrumb": {
    "props": { "marginTop": 4 },
    "children": ["breadcrumb"]
  },
  "flex-layout.row#product-main": {
    "props": { "colGap": 7, "rowGap": 7, "marginTop": 4, "marginBottom": 7, "paddingTop": 7, "paddingBottom": 7 },
    "children": ["flex-layout.col#product-image", "flex-layout.col#product-details"]
  },
  "flex-layout.col#product-image": {
    "props": { "width": "60%" },
    "children": ["product-images"]
  },
  "flex-layout.col#product-details": {
    "children": [
      "product-name",
      "product-price#product-details",
      "buy-button"
    ]
  },
  "product-price#product-details": {
    "props": {
      "showInstallments": true,
      "showSavings": true
    }
  }
}
```

---

## Step 05 — Product Detail Page Part 2

### Concept

Enhance the product page with more product blocks:

- `breadcrumb` — navigation breadcrumb trail
- `product-identifier.product` — product reference code
- `sku-selector` — SKU variant selector
- `product-quantity` — quantity input for add to cart
- `shipping-simulator` — shipping cost calculator

### Activity

Evolve the PDP with additional blocks:

```jsonc
// store/blocks/product.jsonc
{
  "store.product": {
    "children": [
      "flex-layout.row#product-breadcrumb",
      "flex-layout.row#product-main"
    ]
  },
  "flex-layout.row#product-breadcrumb": {
    "props": { "marginTop": 4 },
    "children": ["breadcrumb"]
  },
  "flex-layout.row#product-main": {
    "props": { "colGap": 7, "rowGap": 7, "marginTop": 4, "marginBottom": 7, "paddingTop": 7, "paddingBottom": 7 },
    "children": ["flex-layout.col#product-image", "flex-layout.col#product-details"]
  },
  "flex-layout.col#product-image": {
    "props": { "width": "60%" },
    "children": ["product-images"]
  },
  "flex-layout.col#product-details": {
    "children": [
      "product-name",
      "product-identifier.product",
      "sku-selector",
      "product-quantity",
      "product-price#product-details",
      "buy-button",
      "shipping-simulator"
    ]
  },
  "product-price#product-details": {
    "props": {
      "showInstallments": true,
      "showSavings": true
    }
  }
}
```

**Answer sheet:**

```jsonc
// store/blocks/product.jsonc
{
  "store.product": {
    "children": [
      "flex-layout.row#product-breadcrumb",
      "flex-layout.row#product-main"
    ]
  },
  "flex-layout.row#product-breadcrumb": {
    "props": { "marginTop": 4 },
    "children": ["breadcrumb"]
  },
  "flex-layout.row#product-main": {
    "props": { "colGap": 7, "rowGap": 7, "marginTop": 4, "marginBottom": 7, "paddingTop": 7, "paddingBottom": 7 },
    "children": ["flex-layout.col#product-image", "flex-layout.col#product-details"]
  },
  "flex-layout.col#product-image": {
    "props": { "width": "60%" },
    "children": ["product-images"]
  },
  "flex-layout.col#product-details": {
    "children": [
      "product-name",
      "product-identifier.product",
      "sku-selector",
      "product-quantity",
      "product-price#product-details",
      "buy-button",
      "shipping-simulator"
    ]
  },
  "product-price#product-details": {
    "props": {
      "showInstallments": true,
      "showSavings": true
    }
  }
}
```

---

## Step 06 — Search Result Page

### Concept

The search page (`store.search`) uses `search-result-layout` which provides desktop, mobile, and not-found variants.

Key blocks:
- `search-result-layout` — container that routes to desktop/mobile/not-found
- `search-result-layout.desktop` — desktop search layout
- `search-result-layout.mobile` — mobile search layout
- `search-not-found-layout` — shown when no results found
- `breadcrumb.search` — search-aware breadcrumb
- `search-title.v2` — dynamic search page title
- `filter-navigator.v3` — faceted filter navigation
- `search-content` — product grid results
- `total-products.v2` — result count display
- `order-by.v2` — sort order selector
- `search-fetch-more` / `search-fetch-previous` — pagination controls

### Activity

Build a complete search result layout:

```jsonc
// store/blocks/search.jsonc
{
  "store.search": {
    "blocks": ["search-result-layout"]
  },
  "search-result-layout": {
    "blocks": [
      "search-result-layout.desktop",
      "search-result-layout.mobile",
      "search-not-found-layout"
    ]
  },
  "search-result-layout.desktop": {
    "children": [
      "breadcrumb.search",
      "search-title.v2",
      "flex-layout.row#top",
      "search-fetch-previous",
      "flex-layout.row#results",
      "search-fetch-more"
    ],
    "props": {
      "pagination": "showMore"
    }
  },
  "flex-layout.row#top": {
    "children": ["total-products.v2", "order-by.v2"]
  },
  "flex-layout.row#results": {
    "children": ["flex-layout.col#filter", "flex-layout.col#search"]
  },
  "flex-layout.col#filter": {
    "props": { "width": "20%" },
    "children": ["filter-navigator.v3"]
  },
  "flex-layout.col#search": {
    "children": ["search-content"]
  }
}
```

**Answer sheet:**

```jsonc
// store/blocks/search.jsonc
{
  "store.search": {
    "blocks": ["search-result-layout"]
  },
  "search-result-layout": {
    "blocks": [
      "search-result-layout.desktop",
      "search-result-layout.mobile",
      "search-not-found-layout"
    ]
  },
  "search-result-layout.desktop": {
    "children": [
      "breadcrumb.search",
      "search-title.v2",
      "flex-layout.row#top",
      "search-fetch-previous",
      "flex-layout.row#results",
      "search-fetch-more"
    ],
    "props": {
      "pagination": "showMore"
    }
  },
  "flex-layout.row#top": {
    "children": ["total-products.v2", "order-by.v2"]
  },
  "flex-layout.row#results": {
    "children": ["flex-layout.col#filter", "flex-layout.col#search"]
  },
  "flex-layout.col#filter": {
    "props": { "width": "20%" },
    "children": ["filter-navigator.v3"]
  },
  "flex-layout.col#search": {
    "children": ["search-content"]
  }
}
```

---

## Challenge

Using what you learned, add a search block to the home page that shows results for "Ovens". You will need to:

1. Use `search-result-layout.customQuery` on the home page
2. Configure `querySchema` with `queryField: "Ovens"` and `mapField: "ft"`
3. Reuse the `search-result-layout.desktop` block you already defined

This demonstrates how to embed search results in any page context.
