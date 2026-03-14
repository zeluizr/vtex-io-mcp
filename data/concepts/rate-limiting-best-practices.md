# Rate Limiting Best Practices

Rate limits serve as crucial control mechanisms for managing the volume and frequency of requests made to an API. Exceeding these limits can lead to disruptions in service and a temporary suspension of access to VTEX Core Commerce APIs.

## Implement Efficient Data Retrieval Techniques

### VTEX IO Apps

When developing VTEX IO apps, avoid direct API communication in favor of implementing dedicated [Clients](https://developers.vtex.com/docs/guides/vtex-io-documentation-clients). VTEX IO Clients have built-in features:

- **Cache:** Efficient caching mechanisms that store and retrieve data, reducing strain on services and improving response times.
- **Native metrics support:** Integration with performance monitoring and analytics tools.
- **Retry and timeout options:** Flexible configurations for retries and timeouts, ensuring robustness when confronted with network issues or service unavailability.
- **Billing tracking:** Track usage and resource consumption for cost optimization.

VTEX offers native Clients within the `@vtex/clients` library for VTEX Core Commerce APIs and internal resources. For external services, use `@vtex/api` to develop custom clients with type support.

### Storefront Implementation

Use **GraphQL** in storefront implementations to avoid rate-limit errors:

- Precisely request only the data needed to fulfill the frontend (avoids over-fetching)
- Aggregate multiple data requirements into a single request
- Minimizes data transferred, alleviating burden on API endpoints

## Cache Data

Caching helps applications manage rate limits by retrieving data from a faster storage medium instead of always making new API requests.

### Implementation Steps

1. **Identify cacheable data:** Data that is frequently read and relatively static.
2. **Select a cache server close to the client:** Reduces latency and improves response times.
3. **Set expiry times:** Define how long data should be cached (minutes, days, or longer).
4. **Implement cache invalidation strategies:** Ensure the cache is updated when underlying data changes.

## Prioritize Requests

Some requests are more critical than others. Prioritize essential requests over non-essential ones using a queue system or by distinguishing between priority levels.

### How to Prioritize

1. **Define priority levels:** Establish a hierarchy (e.g., high, medium, low).
2. **Categorize requests** based on:
   - **Business logic:** Requests crucial for core business functions (checkout, account management, high-traffic pages)
   - **User interactions:** Requests that directly affect user experience (page load times, key features)
   - **SLAs:** Ensure priority levels align with Service Level Agreements
   - **Interdependencies:** Consider the impact of delaying a request on dependent processes
3. **Implement a queue system:** Manage and execute requests based on their priority.
4. **Handle errors with priority awareness:** Use more aggressive recovery strategies for high-priority requests.

### Example: Sale Event Traffic Surge

During a sale event with a traffic surge, a store prioritizes requests:

- **Highest priority:** Checkout requests — processed without delays so customers can complete purchases
- **Lowest priority:** Non-essential features (social sharing) — temporarily deprioritized or disabled

This ensures critical functions remain accessible during peak traffic.

## Implement Optimized Retries with Exponential Backoff

Avoid unnecessary or excessive API calls, which degrade performance and increase response times. When the service responds with rate limit exceeded errors (HTTP 429), implement **exponential backoff**: gradually increase the delay between retry attempts to reduce load on the service.

### Exponential Backoff Pattern

```typescript
async function fetchWithRetry<T>(
  fn: () => Promise<T>,
  maxRetries = 5,
  baseDelay = 1000
): Promise<T> {
  let lastError: Error

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn()
    } catch (error: any) {
      if (error.status !== 429 && error.status < 500) {
        throw error // Don't retry client errors (except 429)
      }

      lastError = error
      const retryAfter = error.response?.headers?.['retry-after']
      const delay = retryAfter
        ? parseInt(retryAfter, 10) * 1000
        : baseDelay * Math.pow(2, attempt) + Math.random() * 1000 // jitter

      await new Promise(resolve => setTimeout(resolve, delay))
    }
  }

  throw lastError!
}
```

### Key Principles

- **Exponential backoff:** Double the wait time on each retry (1s → 2s → 4s → 8s → 16s)
- **Jitter:** Add random variation to prevent synchronized retries from multiple instances
- **Max retries:** Cap at 5–7 attempts to avoid infinite loops
- **Respect Retry-After:** Always use the server-provided delay when the `Retry-After` header is present

## VTEX IO Specific Considerations

### Avoid Waterfall Requests

Use `Promise.all` for independent parallel requests:

```typescript
// Bad: sequential (3× latency)
const product = await clients.catalog.getProduct(id)
const stock = await clients.logistics.getStock(id)
const price = await clients.pricing.getPrice(id)

// Good: parallel (same total API calls, 1× latency)
const [product, stock, price] = await Promise.all([
  clients.catalog.getProduct(id),
  clients.logistics.getStock(id),
  clients.pricing.getPrice(id),
])
```

### Use Events for Background Processing

Instead of synchronous API calls in critical paths, fire events for non-critical work:

```typescript
export async function orderPlaced(ctx: EventContext) {
  await ctx.clients.events.sendEvent('', 'sync-to-erp', {
    orderId: ctx.body.orderId,
  })
}
```

### Optimize service.json

```json
{
  "memory": 256,
  "timeout": 10,
  "minReplicas": 1,
  "maxReplicas": 10,
  "workers": 1
}
```

## Documentation

- [Error Handling Best Practices](./error-handling-best-practices.md)
- [API Response Codes](./api-response-codes.md)
- [App Authentication Using Auth Tokens](./app-authentication-using-auth-tokens.md)
- [Making Your First Request](./making-your-first-request.md)
- [VTEX IO Clients](https://developers.vtex.com/docs/guides/vtex-io-documentation-clients)
