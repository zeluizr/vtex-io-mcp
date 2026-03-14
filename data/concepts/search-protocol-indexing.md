# Search Protocol — Indexing and Onboarding

How to set up catalog change notifications and customer onboarding for an external search provider on VTEX IO.

---

## Catalog Indexing

You can use the same VTEX IO app responsible for being a search provider to also set up a webhook and receive notifications whenever a change in the catalog occurs. The app can then send catalog changes to the search provider's indexing system.

For setup instructions, refer to: [Receiving Catalog Changes on VTEX IO](https://developers.vtex.com/docs/guides/how-to-receive-catalog-changes-on-vtex-io)

### Indexing Flow

```
VTEX Catalog change → Webhook notification → search-resolver app → Search provider indexing system
```

---

## Onboarding Admin Panel

When a user installs your search-resolver app, you will likely need an admin panel to set up the app. A working example is available at: `https://github.com/vtex-apps/admin-example`

The admin panel can:
- Show the indexing progress
- Notify the search provider service that a new customer needs to be onboarded

---

## Recommended Onboarding Flow

1. VTEX client installs the app in a **workspace other than master**
2. Client enters the admin panel to set up the app
3. App notifies the indexing system that a new account needs to be indexed
4. Index reaches 100% completion
5. VTEX client promotes the workspace / installs the search provider in **master**

> Never promote to master before indexing is complete — the store will show missing or incorrect search results.

---

## Documentation

- [Search Protocol Overview](./search-protocol-overview.md)
- [Search Protocol Specification](./search-protocol-specification.md)
- [Search Protocol Recipe](./search-protocol-recipe.md)
