# VTEX Headless CMS API

## Description

The VTEX Headless CMS is a solution for storefront content management used with FastStore (VTEX's headless commerce framework). You can use the Headless CMS API to fetch data about your project's pages and content types, including `status`, `id`, and `type`.

This API is specifically for the **FastStore/Headless CMS** integration, not the legacy VTEX Site Editor (which uses a different API).

## Base URLs

- **Production:** `https://{accountName}.myvtex.com`
- **Workspace:** `https://{workspace}--{accountName}.myvtex.com`

## Authentication

Requires License Manager permissions:
- `CMS > cms > See CMS menu on the top-bar`
- `CMS > cms > Settings`
- `CMS > GraphQL > CMS GraphQL API`

## Endpoints by Tag

### Pages

| Method | Path | Summary |
|--------|------|---------|
| `GET` | `/_v/cms/api/{projectId}` | Get all content types |
| `GET` | `/_v/cms/api/{projectId}/{content-type}` | Get all CMS pages by content type |
| `GET` | `/_v/cms/api/{projectId}/{content-type}/{document-id}` | Get CMS page |

## Path Parameters

| Parameter | Description |
|-----------|-------------|
| `{projectId}` | Project ID specified in the settings of the CMS (alpha) app (e.g., `faststore`) |
| `{content-type}` | Content type identifier (e.g., `page`, `plp`, `pdp`, `landingPage`) |
| `{document-id}` | Unique ID of the CMS document/page |

## Key Response Models

### Get All Content Types (GET /_v/cms/api/{projectId})

Returns all available content types defined in the FastStore project configuration.

Response:
```json
{
  "contentTypes": [
    {
      "id": "page",
      "name": "Page",
      "configurationSchemaSets": [
        {
          "name": "SEO",
          "configurations": [
            {
              "name": "seoSettings",
              "schema": {
                "title": "SEO Settings",
                "description": "Configure SEO metadata for this page",
                "properties": {
                  "title": { "type": "string" },
                  "description": { "type": "string" }
                }
              }
            }
          ]
        }
      ]
    }
  ]
}
```

### Get All CMS Pages by Content Type (GET /_v/cms/api/{projectId}/{content-type})

Returns a list of pages of the specified content type.

Response:
```json
[
  {
    "id": "abc123",
    "name": "Home Page",
    "type": "page",
    "status": "published",
    "createdAt": "2023-01-15T10:00:00Z",
    "updatedAt": "2023-06-20T14:30:00Z"
  }
]
```

Status values:
- `"draft"` — Not yet published
- `"published"` — Live and visible
- `"unpublished"` — Previously published, now hidden

### Get CMS Page (GET /_v/cms/api/{projectId}/{content-type}/{document-id})

Returns the full page data including sections and their configurations.

Response:
```json
{
  "id": "abc123",
  "name": "Home Page",
  "type": "page",
  "status": "published",
  "sections": [
    {
      "id": "hero-banner",
      "name": "Hero Banner",
      "data": {
        "title": "Summer Collection",
        "subtitle": "Shop Now",
        "ctaLabel": "Shop Now",
        "ctaHref": "/summer",
        "backgroundImage": "https://..."
      }
    },
    {
      "id": "product-shelf",
      "name": "Product Shelf",
      "data": {
        "title": "Featured Products",
        "productClusterId": "140"
      }
    }
  ],
  "settings": {
    "seo": {
      "title": "Home | My Store",
      "description": "Welcome to our store"
    }
  }
}
```

## FastStore Integration

The Headless CMS API is consumed by FastStore's `@faststore/core` package during build time and at runtime for dynamic pages.

### Fetching CMS data in a FastStore page

```typescript
// In a FastStore page component
import { getCMSPage } from '@faststore/core'

export async function getStaticProps({ params }) {
  const cmsPage = await getCMSPage({
    contentType: 'landingPage',
    documentId: params.slug
  })

  return {
    props: { cmsPage },
    revalidate: 60 // ISR revalidation in seconds
  }
}
```

### Configuring content types in FastStore

Content types are defined in the FastStore project's `cms/` folder:

```typescript
// cms/config.ts
export const contentTypes = {
  page: {
    name: 'Page',
    configurationSchemaSets: [
      {
        name: 'SEO',
        configurations: [
          {
            name: 'seoSettings',
            schema: {
              title: 'SEO Settings',
              type: 'object',
              properties: {
                title: { type: 'string', title: 'Page Title' },
                description: { type: 'string', title: 'Meta Description' }
              }
            }
          }
        ]
      }
    ]
  }
}
```

## Relationship to Store Framework

- **Headless CMS** is for **FastStore** (Next.js based headless storefronts)
- **Site Editor** is for **Store Framework** (VTEX IO React-based storefronts)
- They are different systems — do not mix them in the same project

## Documentation

https://developers.vtex.com/docs/api-reference/headless-cms-api
