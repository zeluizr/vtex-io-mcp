# Error Handling Best Practices

Handling errors and exceptions is essential for building resilient applications that can effectively navigate temporary restrictions from VTEX Core Commerce API rate limits. Exception handling and error recovery mechanisms help your store respond gracefully to rate limit exceeded errors without impacting user interactions. They also minimize unnecessary retries and resource wastage by introducing appropriate wait times.

Refer to [API Response Codes](./api-response-codes.md) for the full list of status codes. This guide focuses on the 3xx, 4xx, and 5xx error families.

## Handle 3xx Errors (Redirection)

HTTP 3xx codes demand the user agent to take additional actions to fulfill the request.

| Error code | Error handling strategies |
|---|---|
| `308 Permanent Redirect` | - Update the URL/endpoint used in the request to the new provided location. - Ensure the redirection is valid and current at the time of the request. - Confirm if the redirection is genuinely permanent rather than temporary. - Update bookmarks, links, or references to reflect the new resource location. |

## Handle 4xx Errors (Client Errors)

HTTP 4xx codes denote client errors, typically originating from issues on the client side.

| Error code | Error handling strategies |
|---|---|
| `400 Bad Request` | - Refer to [API Reference](https://developers.vtex.com/docs/api-reference) for the expected request format. - Review the request parameters. - Validate the request structure and syntax. - Ensure all required parameters are included. |
| `401 Unauthorized` | - Verify the authentication method used. Refer to [Authentication](./authentication.md). - Ensure authentication tokens or API keys are correctly passed in request headers. - Re-authenticate with valid credentials. |
| `403 Forbidden` | - Ensure you have the appropriate roles to perform the desired action. - Check the expiration or validity of your access credentials. |
| `404 Not Found` | - Refer to [API Reference](https://developers.vtex.com/docs/api-reference) for correct endpoint naming. - Double-check the URL or endpoint for accuracy. - Confirm if the resource has been moved or deleted. - Check the [VTEX status page](https://status.vtex.com/) for outages. |
| `405 Method Not Allowed` | - Ensure the request method matches the allowed methods for the resource. - Check for spelling errors in the method used. |
| `429 Too Many Requests` | - Reduce the frequency of requests by optimizing code to limit unnecessary API calls or batch requests. - Implement an [exponential backoff strategy](./rate-limiting-best-practices.md) to gradually increase the delay between retries. - Monitor API request patterns to identify areas triggering rate limits. - Consider implementing a queue system to distribute requests over time. - If persistent, reach out to VTEX Support. |

## Handle 5xx Errors (Server Errors)

HTTP 5xx codes indicate server errors — issues on the server side that hinder request fulfillment.

| Error code | Error handling strategies |
|---|---|
| `500 Internal Server Error` | - Check if the issue is on your end or the server's. - Test the same request on different tools to confirm. - Check the [VTEX status page](https://status.vtex.com/) for outages. - Retry the request after some time, as the error might be temporary. - If it persists, reach out to VTEX Support. |
| `503 Service Unavailable` | - Retry the request after some time, as the error might be temporary. - Check the [VTEX status page](https://status.vtex.com/) for outages. - If it persists, reach out to VTEX Support. |
| `504 Gateway Timeout` | - Check for potential network connectivity problems on your end. - Investigate if the request payload size or complexity might be causing the timeout. - Check the [VTEX status page](https://status.vtex.com/) for outages. - Implement retry mechanisms or backoff strategies to manage timeouts. |

## General Best Practices

### Always Read the Response Body

Error responses include a JSON body with details:

```json
{
  "error": {
    "code": "invalid_field",
    "message": "Field 'email' must be a valid email address",
    "exception": null
  }
}
```

### Idempotency for Write Operations

For POST/PUT/PATCH operations:
- Before retrying, check if the operation already succeeded
- For order creation and payment flows, always verify state before retrying to avoid duplicates

### In VTEX IO Context

Use the `ctx.clients` pattern and let the framework handle retries:

```typescript
export async function getProduct(ctx: Context) {
  const { clients: { catalog }, vtex: { logger } } = ctx

  try {
    const product = await catalog.getProductById(ctx.state.productId)
    ctx.body = product
    ctx.status = 200
  } catch (error) {
    logger.error(error)

    if (error.status === 404) {
      ctx.status = 404
      ctx.body = { message: 'Product not found' }
      return
    }

    ctx.status = 500
    ctx.body = { message: 'Internal error' }
  }
}
```

## Documentation

- [API Response Codes](./api-response-codes.md)
- [Rate Limiting Best Practices](./rate-limiting-best-practices.md)
- [Authentication](./authentication.md)
- [Making Your First Request](./making-your-first-request.md)
- [VTEX Status Page](https://status.vtex.com/)
