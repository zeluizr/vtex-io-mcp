# API Response Status Codes

Every interaction with VTEX Core Commerce APIs returns an HTTP status code that indicates whether the request succeeded, failed, or demands particular actions.

## Status Code Reference

| Status code | Description |
|---|---|
| `200 OK` | The request was successfully processed by VTEX. |
| `201 Created` | The request has been fulfilled and a new resource has been created. Typically sent after POST requests and some PUT requests. |
| `202 Accepted` | The request has been received, but processing has not been completed yet. |
| `204 No Content` | The request was processed successfully, but there is no content to return. |
| `205 Reset Content` | The server has accepted the request but will not return any content. The client must reset the document from which the original request was sent. |
| `400 Bad Request` | The server could not decode the request body, generally due to malformed syntax or an incorrect `Content-Type` header. |
| `401 Unauthorized` | The caller was not authorized to perform the request due to missing or incorrect authentication credentials. Refer to [Authentication](./authentication.md). |
| `403 Forbidden` | The request is valid, but the server refuses to process it. Ensure you have the appropriate roles to perform the desired action. |
| `404 Not Found` | The requested resource cannot be located. Refer to [VTEX API Reference](https://developers.vtex.com/docs/api-reference) for correct endpoint naming. |
| `405 Method Not Allowed` | The HTTP method used to access the endpoint is incorrect. Refer to [VTEX API Reference](https://developers.vtex.com/docs/api-reference) for supported methods. |
| `429 Too Many Requests` | The application exceeded request rate limits. See [Rate Limiting Best Practices](./rate-limiting-best-practices.md). |
| `500 Internal Server Error` | An internal server error has occurred. Verify the headers of the HTTP request. If directed to an external server, check with the provider. For VTEX-related issues, visit the [VTEX status page](https://status.vtex.com/). If it persists, contact VTEX Support. |
| `502 Bad Gateway` | The server acting as a gateway or proxy received an invalid response from the upstream server. Please try again later. |
| `503 Service Unavailable` | The server is temporarily unavailable. Check the [VTEX status page](https://status.vtex.com/). Try again later, or reach out to VTEX Support. |
| `504 Gateway Timeout` | The server acting as a gateway or proxy timed out while attempting to complete the request. Please try again later, or reach out to VTEX Support. |

## Quick Reference by Scenario

| Scenario | Status code |
|---|---|
| Successful read (GET) | `200 OK` |
| Successful create (POST) | `201 Created` |
| Async operation started | `202 Accepted` |
| Successful delete | `204 No Content` |
| Invalid request body / missing field | `400 Bad Request` |
| Missing or wrong API key | `401 Unauthorized` |
| Insufficient permissions / roles | `403 Forbidden` |
| Wrong URL / resource ID | `404 Not Found` |
| Wrong HTTP verb | `405 Method Not Allowed` |
| Too many API calls | `429 Too Many Requests` |
| VTEX internal error | `500 Internal Server Error` |
| VTEX service down | `503 Service Unavailable` |
| Request took too long | `504 Gateway Timeout` |

## Documentation

- [Error Handling Best Practices](./error-handling-best-practices.md)
- [Rate Limiting Best Practices](./rate-limiting-best-practices.md)
- [Authentication](./authentication.md)
- [VTEX Status Page](https://status.vtex.com/)
