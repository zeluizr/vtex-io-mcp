# Search Protocol Overview

The Search Protocol defines the contract between an external search provider and a VTEX store running on VTEX IO. If a search provider adheres to this protocol, it can replace completely the original VTEX search capabilities without needing to implement any frontend pages or React components.

The main idea is to provide the ability for a search provider to integrate with the minimum amount of work necessary, and a VTEX customer to easily switch search providers without having to change anything in the storefront.

---

## Why Search Protocol

A search engine is a crucial part of ecommerce. Good search results drive more sales; bad ones worsen the user experience.

Changing the search provider usually involved changing code both in the frontend and in the backend, creating unnecessary friction.

The VTEX Search Protocol provides a clear contract between any VTEX store on VTEX IO and a search provider, defined by a GraphQL schema. This contract enables:

- Low-effort switching between different search engines
- Faster development of new search provider integrations
- Complete decoupling of the integration from frontend components

---

## How It Works

The **VTEX Search Protocol** is a set of definitions and GraphQL schemas that allows VTEX IO applications to serve **ecommerce search results** usable by VTEX Store Framework.

Creating a **search-resolver** service app on VTEX IO that implements the VTEX Search Protocol allows any VTEX Account using VTEX IO to:

1. Install the application
2. Instantly change the store's provider for search results — no frontend modification required

The search provider can also be distributed on the [VTEX App Store](https://apps.vtex.com/) to make installation even simpler.

---

## Search Schema

The **GraphQL schema** for VTEX Search Protocol defines the set of **queries** necessary for Store Framework to retrieve search information, including appropriate GraphQL types that any search resolver app should respond to.

The schema is defined in the **`vtex.search-graphql`** app:
- Repository: `https://github.com/vtex-apps/search-graphql`
- Schema definition: `graphql/schema.graphql`
- Reference: `README.md` in the same repository

---

## Implementation Pre-requisites

- Access to a user in a VTEX account with permissions to link and install apps
- TypeScript and Node.js familiarity
- [GraphQL](https://graphql.org/) familiarity

---

## Documentation

- [Search Protocol Specification](./search-protocol-specification.md)
- [Search Protocol Recipe](./search-protocol-recipe.md)
- [Search Protocol Reference Implementations](./search-protocol-references.md)
