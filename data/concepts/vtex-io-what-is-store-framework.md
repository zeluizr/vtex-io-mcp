---
title: "What is VTEX Store Framework"
slug: "vtex-io-documentation-what-is-vtex-store-framework"
source: "https://developers.vtex.com/docs/guides/vtex-io-documentation-what-is-vtex-store-framework"
---

When comparing two or more online stores, we can notice similarities in their structure. For instance, regardless of the store, it's common to see products highlighted in the window display, a search bar, menus, product pages with a buy button, a logo, etc.

These commonalities suggest that **online store components are intertwined**, and this makes the process of creating a store easier.

Frontend development can be done using a **single, shareable component structure** among stores, and this is where Store Framework comes into play.

## Delivering the foundation needed for any storefront structure

The VTEX Store Framework is built on the VTEX IO development platform and React technology, and it is responsible for building the storefront by offering native ecommerce components in JSON format.

Our components allow you to:

- Build your store frontend in the **fastest possible go-to-market**.
- Have **comprehensive shopping experiences** that never get old.
- Adapt these experiences to match your store's unique identity since they are highly **flexible** and allow for **high customization**.
- Enjoy native **integration with VTEX APIs**.
- Easily track your store view events through **analytic tools**, such as Google Tag Manager and Google Analytics.
- Connect and collaborate with other developers, ask questions and share your knowledge at the VTEX Community.
- **Standardize the way your team develops** frontend code.

## Key concepts

- **Blocks**: Store Framework components defined in JSON format. Blocks can be composed to build pages.
- **Store Theme**: The app that contains all your store's block configurations and styles.
- **Site Editor**: VTEX Admin interface that allows non-technical users to update store content visually.
- **CSS Handles**: Unique identifiers for HTML elements that allow targeted CSS customization.

## Storefront structure

Store Framework storefronts are built by composing blocks:

1. Install a Store Theme from the boilerplate: `https://github.com/vtex-apps/store-theme`
2. Customize blocks in the `/store/blocks` folder using JSON/JSONC files
3. Define styles in the `/styles/style.json` file
4. Use `vtex link` to see changes live in a development workspace
