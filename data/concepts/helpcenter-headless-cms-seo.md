---
title: 'Configuring SEO via Headless CMS'
id: 1qaJtUB28kOJRfhyaGeezGc
status: PUBLISHED
createdAt: 2025-07-14T16:29:35.269Z
updatedAt: 2025-07-14T16:59:24.399Z
source: vtexdocs/help-center-content
originalPath: docs/en/tutorials/storefront/headless-cms/configuring-seo-via-headless-cms.md
---

SEO (Search Engine Optimization) is one of the most important strategies to better position your site on organic search engine results pages.

In stores developed with [FastStore](https://developers.vtex.com/docs/guides/faststore), you can manage SEO settings through the [Headless CMS](https://help.vtex.com/en/tutorial/headless-cms-overview).

> For stores developed with Store Framework, see [Configuring SEO in your Store Framework store](https://help.vtex.com/en/tutorial/configurando-seo-em-sua-loja).

## Instructions

1. In the VTEX Admin, go to **Storefront > Headless CMS**.
2. Click the desired page.
3. Switch to the **Settings** tab.
4. Go to **SEO** and update the related fields.
5. Click `Save` to apply the changes.

> Available for these content types: **Product Detail Page (PDP)**, **home**, and **landing page**.

## SEO fields by content type

### Product Details Page (PDP)

| Field | Description | Example |
|-------|-------------|---------|
| ID | Unique identifier for the product page. Descriptive value concatenated to the product path. | `#product` → `product-slug/p#product` |
| Main entity of page | Unique identifier for the most relevant element on the page. Concatenated to the product path. | `#webpage` → `product-slug/p#webpage` |

### Home

| Field | Description | Example |
|-------|-------------|---------|
| Path | URL path where the homepage will be accessible. | `/homepage` |
| Default page title | Title displayed on the browser tab and in search results. | `My Store` |
| Meta tag description | Summary description displayed by search engines. | `Discover the best deals on electronics` |
| Canonical URL | Canonical URL to identify the main version, avoiding duplicate content. | `https://www.mystore.com` |
| Name | Site name. | `My Store` |
| Publisher ID | Unique identifier for the content publisher (descriptive fragment or full URL). | `#organization` or `https://www.mystore.com/publisher` |

### Landing Page

| Field | Description | Example |
|-------|-------------|---------|
| Path | URL path for the landing page. | `/landing-page-slug` |
| Default page title | Title for browser tab and search engines. | `FastStore Landing Page` |
| Meta tag description | Summary description for search results. | `Landing page description` |
| Canonical URL | Canonical URL for main version identification. | `https://www.mystore.com` |
