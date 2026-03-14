---
title: 'Improving the SEO of product listing pages'
id: improving-seo-product-listing-pages
status: PUBLISHED
source: vtexdocs/help-center-content
originalPath: docs/en/tutorials/storefront/site-editor/improving-the-seo-of-product-listing-pages.md
---

Product Listing Pages (PLPs) are crucial for SEO as they aggregate multiple products under a category or search query. Optimizing PLPs improves your store's visibility in organic search results.

## SEO best practices for PLPs in VTEX IO Store Framework

### Page title and meta description

In your Store Theme, configure the `<title>` and meta description for category and search pages via the `store.search` template:

```jsonc
{
  "store.search": {
    "blocks": ["search-result-layout"],
    "props": {
      "context": {
        "skusFilter": "ALL_AVAILABLE",
        "simulationBehavior": "default"
      }
    }
  }
}
```

Use the `rich-text` block or `search-result-layout.desktop` to inject dynamic metadata based on the category name.

### Canonical URLs

VTEX IO automatically generates canonical URLs for PLPs using the category or department path. Ensure your `store.search` routes are configured correctly in `store/routes.json`.

### Structured data

VTEX IO Store Framework provides built-in structured data (JSON-LD) for product listings. The `search-result` block outputs schema.org markup automatically.

### Intelligent Search integration

For stores using VTEX Intelligent Search (`vtex.search-result`):

- Configure **Relevance Rules** to prioritize the most relevant products.
- Use **Merchandising Rules** to pin specific products or banners.
- Configure **Redirects** to send search queries to the right PLPs.

### Site Editor settings for PLPs

In **Storefront > Site Editor**, navigate to a category page and configure:

- **Banner**: Add category-specific banners.
- **Pagination**: Configure infinite scroll or page-based navigation.
- **Filters layout**: Configure which filters are visible and in what order.

## PLPs in FastStore (Headless CMS)

For FastStore stores, configure PLP SEO through **Headless CMS**:

1. Go to **Storefront > Headless CMS**.
2. Select the **Product Listing Page** content type.
3. In the **Settings** tab, configure the **SEO** section (title, meta description, canonical URL).

## Performance tips

- Use the `search-result` block with `lazyItemsRemaining` to control how many items are rendered server-side.
- Configure `simulationBehavior: "skip"` for category pages that don't need real-time price simulation.
- Enable `skusFilter: "FIRST_AVAILABLE"` to reduce the number of SKU variants loaded per product.
