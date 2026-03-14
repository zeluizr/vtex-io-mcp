# Improving Performance

**Course ID:** store-performance
**Description:** Learn best practices for improving the performance of VTEX Store Framework storefronts.

## Overview

This course covers key performance optimization techniques for VTEX IO stores: lazy loading with the fold block, optimizing menu rendering, image optimization, search query tuning, and block refactoring for better Core Web Vitals scores.

---

## Step 01 — The Fold Block

### Concept

The `__fold__` block is a performance primitive in Store Framework. Any blocks placed **below** the `__fold__` block are lazy-loaded — they are not fetched or rendered until the user scrolls to them.

This reduces the initial page load size and improves Time to Interactive (TTI) and Largest Contentful Paint (LCP) metrics.

There are two variants:
- `__fold__` — the standard fold separator
- `__fold__.experimentalLazyAssets` — additionally lazy-loads CSS and JavaScript assets of blocks below the fold

### Activity

Add the fold block to the home page to lazy-load below-fold content:

```jsonc
// store/blocks/home.jsonc
{
  "store.home": {
    "blocks": [
      "slider-layout#home",
      "rich-text#above-fold",
      "__fold__",
      "info-card#below-fold",
      "shelf#home"
    ]
  }
}
```

**Answer sheet:**

```jsonc
// store/blocks/home.jsonc
{
  "store.home": {
    "blocks": [
      "slider-layout#home",
      "rich-text#welcome",
      "info-card#home",
      "__fold__",
      "tab-layout#home",
      "shelf#home"
    ]
  }
}
```

---

## Step 02 — Menu Items as Props

### Concept

In Store Framework, menu items can be defined either as child blocks or as props. When defined as **props**, they are editable via the Site Editor.

Using props-based menu items improves performance because it eliminates the need to render each menu item as a separate block subtree during server-side rendering.

```json
// Props-based menu items (recommended for performance + Site Editor)
"category-menu": {
  "props": {
    "items": [
      { "id": "women", "name": "Women", "slug": "/feminino" },
      { "id": "men", "name": "Men", "slug": "/masculino" }
    ]
  }
}
```

### Activity

Convert menu children blocks to the props-based approach:

```jsonc
// store/blocks/category-menu.jsonc
{
  "category-menu": {
    "props": {
      "showAllDepartments": false,
      "showSubcategories": true,
      "menuDisposition": "center",
      "departments": [],
      "sortOrder": "category-asc"
    }
  }
}
```

**Answer sheet:**

```jsonc
// store/blocks/category-menu.jsonc
{
  "category-menu": {
    "props": {
      "showAllDepartments": false,
      "showSubcategories": true,
      "menuDisposition": "center",
      "departments": [],
      "sortOrder": "category-asc"
    }
  }
}
```

---

## Step 03 — Submenu Optimization

### Concept

The `experimentalOptimizeRendering` prop on `category-menu` defers the rendering of submenu items until they are needed (hovered over). This prevents the full submenu tree from being included in the initial HTML payload.

Enable it on menus with many categories or deep nesting.

### Activity

Enable the submenu optimization flag:

```jsonc
// store/blocks/category-menu.jsonc
{
  "category-menu": {
    "props": {
      "showAllDepartments": false,
      "showSubcategories": true,
      "menuDisposition": "center",
      "experimentalOptimizeRendering": true,
      "departments": [],
      "sortOrder": "category-asc"
    }
  }
}
```

**Answer sheet:**

```jsonc
// store/blocks/category-menu.jsonc
{
  "category-menu": {
    "props": {
      "showAllDepartments": false,
      "showSubcategories": true,
      "menuDisposition": "center",
      "experimentalOptimizeRendering": true,
      "departments": [],
      "sortOrder": "category-asc"
    }
  }
}
```

---

## Step 04 — Image Optimization

### Concept

Two key image optimizations in Store Framework:

1. **Product images with explicit width** — Set explicit width on `product-summary-image` to prevent the CDN from serving oversized images. This enables the VTEX Image Service to serve appropriately sized images.

2. **Use `image` block instead of `info-card` for banners** — The `image` block goes through VTEX's CDN image pipeline which optimizes format, compression, and caching. `info-card` uses `background-image` CSS which bypasses CDN optimization.

### Activity

Optimize product images in search results:

```jsonc
// store/blocks/blocks.jsonc
{
  "product-summary-image": {
    "props": {
      "width": 300,
      "height": 300,
      "aspectRatio": "1:1"
    }
  }
}
```

Replace info-card banners with image blocks in search pages:

```jsonc
// store/blocks/search.jsonc
{
  "search-result-layout.desktop": {
    "children": [
      "image#search-banner",
      "flex-layout.row#results"
    ]
  },
  "image#search-banner": {
    "props": {
      "src": "https://storecomponents.vteximg.com.br/arquivos/banner-principal.png",
      "maxWidth": "100%",
      "link": { "url": "/sale" }
    }
  }
}
```

**Answer sheet:**

```jsonc
// store/blocks/blocks.jsonc
{
  "product-summary-image": {
    "props": {
      "width": 300,
      "aspectRatio": "1:1"
    }
  }
}
```

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
    "props": { "pagination": "showMore" }
  }
}
```

---

## Step 05 — Search Query Optimization

### Concept

The `store.search` template accepts performance-tuning props via its context:

- `skusFilter: "FIRST_AVAILABLE"` — fetches only the first available SKU per product instead of all SKUs. Reduces data payload significantly on stores with many SKU variations.
- `simulationBehavior: "skip"` — skips price/availability simulation on search results. Trades real-time price accuracy for faster load times. Use only if prices are consistent.

### Activity

Tune search context props:

```jsonc
// store/blocks/search.jsonc
{
  "store.search": {
    "blocks": ["search-result-layout"],
    "props": {
      "context": {
        "skusFilter": "FIRST_AVAILABLE",
        "simulationBehavior": "skip"
      }
    }
  }
}
```

**Answer sheet:**

```jsonc
// store/blocks/search.jsonc
{
  "store.search": {
    "blocks": ["search-result-layout"],
    "props": {
      "context": {
        "skusFilter": "FIRST_AVAILABLE",
        "simulationBehavior": "skip"
      }
    }
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
    "props": { "pagination": "showMore" }
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

## Step 06 — Block Refactoring (Shelf to list-context)

### Concept

The legacy `shelf` block is deprecated in favor of `list-context.product-list` combined with `slider-layout`. This combination:

1. Lazy-loads the product shelf when it appears in the viewport
2. Allows the slider to be controlled independently
3. Better integrates with the Store Framework context system

Migration pattern:

```
Old: shelf → product-summary.shelf (children: images, name, price, ...)
New: list-context.product-list → slider-layout → product-summary.shelf
```

### Activity

Replace the legacy shelf with the modern list-context pattern:

```jsonc
// store/blocks/home.jsonc
{
  "store.home": {
    "blocks": [
      "__fold__",
      "list-context.product-list#home"
    ]
  },
  "list-context.product-list#home": {
    "children": ["slider-layout#home-shelf"],
    "props": {
      "collection": "140",
      "orderBy": "OrderByTopSaleDESC",
      "hideUnavailableItems": true
    }
  },
  "slider-layout#home-shelf": {
    "children": ["product-summary.shelf"],
    "props": {
      "itemsPerPage": {
        "desktop": 4,
        "tablet": 2,
        "phone": 1
      },
      "infinite": true
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
      "slider-layout#home",
      "flex-layout.row#home-description",
      "__fold__",
      "tab-layout#home",
      "list-context.product-list#home"
    ]
  },
  "list-context.product-list#home": {
    "children": ["slider-layout#home-shelf"],
    "props": {
      "collection": "140",
      "orderBy": "OrderByTopSaleDESC",
      "hideUnavailableItems": true
    }
  },
  "slider-layout#home-shelf": {
    "children": ["product-summary.shelf"],
    "props": {
      "itemsPerPage": {
        "desktop": 4,
        "tablet": 2,
        "phone": 1
      },
      "infinite": true,
      "showNavigationArrows": "always",
      "showPaginationDots": "always"
    }
  }
}
```
