# Making your first API request

This guide explains how to make your first API request using the VTEX API reference and the built-in `TEST METHOD` feature, and how to import API specifications into tools like Postman.

## Before you begin

Authentication is required to interact with VTEX APIs. Two options:

- **Application keys**: An `appKey` + `appToken` pair. Recommended for server-side integrations. The key must be associated with roles that grant the necessary permissions.
- **User tokens**: For user-based access.

For testing via the Developer Portal `TEST METHOD` feature, you need a valid **API key** (`appKey` + `appToken`). See the [Application keys](https://help.vtex.com/en/tutorial/api-keys--4bFEmcHXgpNksoePchZyy6) guide to create them.

## Testing a request in the Developer Portal

1. Go to the API reference page of the endpoint you wish to test (e.g., [List orders](https://developers.vtex.com/docs/api-reference/orders-api#get-/api/oms/pvt/orders))
2. Read the documentation and fill in required parameters (headers, query parameters, request body)
3. In the **Authentication** section, enter your `appKey` and `appToken` in the respective fields: `X-VTEX-API-AppKey` and `X-VTEX-API-AppToken`
4. Hover over the `Base URL` field to see the `accountName` and `environment` fields
5. Enter your VTEX account name in the `accountName` field
6. Fill in the `environment` field — if unsure, use `vtexcommercestable`
7. Click `TEST METHOD` to send the request
8. Check the API response. Successful responses return `200 OK`, `201 Created`, or `204 No Content`

> If you get a `401 - Unauthorized` response, double-check your API key and token. Verify they are correctly entered in the request headers and associated with the appropriate roles and permissions.

## Using an API testing platform

### Using request examples

1. Open the desired API Reference in the VTEX Developer Portal
2. Fill in request parameters — the request box updates automatically with the full request
3. In the **Language** section, select the programming language (Node.js, Python, or Shell)
4. Copy the example request displayed below the **Base URL** field
5. Paste it into Postman or your preferred tool

To import a cURL request into Postman, follow the [Postman Import cURL commands](https://learning.postman.com/docs/getting-started/importing-and-exporting/importing-curl-commands/#import-a-curl-command-into-postman) guide.

### Downloading API specifications

VTEX API documentation follows the [OpenAPI 3.0 (OAS 3.0)](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.0.md) standard.

**Ways to download API specs:**

| Method | How |
|--------|-----|
| **GitHub** | Access [OpenAPI Schemas](https://github.com/vtex/openapi-schemas) repository → Click `<> Code` → Click `Download ZIP` |
| **API SPEC** | On the Developer Portal API Reference page → Click `DOWNLOAD OPENAPI SPEC` (JSON) or `VIEW OPENAPI SPEC` (browser) |
| **Postman** | On the Developer Portal API Reference page → Click `DOWNLOAD POSTMAN COLLECTION` (JSON) or `VIEW POSTMAN COLLECTION` (browser) |

After downloading, import the OpenAPI spec or Postman collection into your preferred API testing tool.

---

Source: https://developers.vtex.com/docs/guides/making-your-first-request
