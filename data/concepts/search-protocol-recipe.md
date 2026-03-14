# Search Protocol Recipe

Step-by-step guide to integrate an external search provider with VTEX IO using the Search Protocol.

---

## Steps to Integrate

### 1. Clone the reference search resolver

```sh
git clone https://github.com/vtex-apps/search-resolver/tree/v1.x
```

### 2. Uninstall any existing search-resolver (temporary)

Uninstall any other search-resolver app that may be installed on the account you're using (e.g., `vtex.search-resolver@0.x`).

> You may need to do this in a separate workspace if the store is live.

### 3. Change the vendor in manifest.json

Update the `vendor` field in the app's `manifest.json` to match the account you're using.

### 4. Implement the resolvers

Change the queries' resolver implementations to retrieve and return data from the external search engine you're integrating.

---

## Client Implementation

In VTEX IO, clients abstract calling other services in a centralized class. The reference implementation uses:

```
node/clients/biggy-search.ts
```

**Replace** the implementation of this client to fetch data from your target search provider. Rename `BiggySearchClient` to match your provider name.

---

## Resolver Implementation

The main resolver file to modify:

```
node/resolvers/search/index.ts
```

Search for occurrences of `biggySearch` and change the data treatment to get the desired behavior.

> Some resolvers should remain untouched and continue fetching from VTEX Catalog APIs (the 4 queries listed in the Specification).

---

## Tips on Working with the Example

- Entries and files with `BiggySearchClient` should be modified and renamed to match the search engine being integrated
- The main file is `node/resolvers/search/index.ts` — resolvers for search-related queries
- Some resolvers **will not be modified** since they connect directly to VTEX APIs
- Adapt TypeScript types in the code — they are specific to VTEX Search

---

## Troubleshooting

**Unknown errors**: Check if the version in `node/package.json` for the dependency `vtex.search-graphql` is up to date with the [latest version](https://github.com/vtex-apps/search-graphql/blob/master/manifest.json#L4).

After updating the version:

```sh
cd node
yarn
vtex link
```

---

## Documentation

- [Search Protocol Overview](./search-protocol-overview.md)
- [Search Protocol Specification](./search-protocol-specification.md)
- [Search Protocol Indexing & Onboarding](./search-protocol-indexing.md)
- [Search Protocol Reference Implementations](./search-protocol-references.md)
