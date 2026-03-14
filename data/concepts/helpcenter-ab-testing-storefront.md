---
title: 'A/B testing for storefronts'
id: helpcenter-ab-testing-storefront
status: PUBLISHED
source: vtexdocs/help-center-content
originalPath: docs/en/tutorials/storefront/layout/ab-testing-how-where-when-and-why.md
---

A/B testing allows you to compare two versions of storefront content to determine which one performs better in terms of conversion, engagement, or other metrics.

## How A/B testing works in VTEX

VTEX supports two types of A/B testing for storefronts:

### 1. Workspace A/B testing (VTEX IO)

In VTEX IO, you can run A/B tests by routing a percentage of traffic to different workspaces:

1. Create a production workspace with the variant version:
   ```bash
   vtex use <workspace-name> --production
   ```

2. Implement your variant changes.

3. Start the A/B test by allocating traffic:
   - Use the VTEX IO CLI or the A/B test API to split traffic.
   - Configure the percentage of sessions for each workspace.

4. Monitor results in the VTEX Admin dashboard.

5. When confident in results, promote the winning workspace to production:
   ```bash
   vtex workspace promote
   ```

### 2. Site Editor content testing

Within a workspace, use Site Editor's Versions feature to test different block configurations:

1. Create multiple versions of a block (banner, shelf, etc.).
2. Schedule different versions for different time periods.
3. Compare metrics from each period to determine the winner.

Note: True simultaneous A/B testing across multiple Site Editor versions requires the workspace A/B testing approach above.

## A/B testing with Master Data

For data-driven A/B testing beyond UI changes (e.g., testing promotional logic, pricing strategies), use Master Data v2 triggers with load splitting:

```json
{
  "rule": {
    "action": "RECORD_IS_CHANGED",
    "field": "checkoutStatus"
  },
  "actions": [
    {
      "type": "HTTP_REQUEST",
      "url": "https://variant-a-endpoint.com/webhook",
      "loadPercentage": 50
    },
    {
      "type": "HTTP_REQUEST",
      "url": "https://variant-b-endpoint.com/webhook",
      "loadPercentage": 50
    }
  ]
}
```

## Best practices

- **Define metrics before starting**: Conversion rate, add-to-cart rate, revenue per session.
- **Run tests long enough**: At least 2 weeks to account for weekday/weekend variation.
- **Test one change at a time**: Isolate variables to understand causality.
- **Statistical significance**: Use a significance level of at least 95% before declaring a winner.
- **Segment carefully**: Consider running tests on specific device types, user segments, or geographic regions.

## VTEX workspace A/B test API

```
POST /api/ab-tester/start
{
  "workspace1": "master",
  "workspace2": "challenger",
  "proportion": 50
}
```
