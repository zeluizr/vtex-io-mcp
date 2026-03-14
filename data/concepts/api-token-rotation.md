# API token rotation and renewal

The older API tokens are, the higher the risk of exposure. VTEX recommends renewing tokens regularly — ideally every **90 or 180 days**. Tokens don't expire automatically, so rotation is a proactive security best practice.

The VTEX renewal process allows generating a new token while the old one remains active, ensuring uninterrupted service during the transition.

## Token rotation process

The API-based rotation involves two steps:

1. **Initiate renewal** (`PATCH /apitoken/renew`) — Generates a new token. The old token stays active. Both tokens work simultaneously during the transition.
2. **Complete renewal** (`PATCH /apitoken/finish-renewal`) — Deactivates the old token. Only the new token remains valid.

## Required permission

Use a valid API key (not the one being renewed) with the following License Manager resource:

| Product | Category | Resource |
|---------|----------|----------|
| License Manager | API Key Management | **Renew API Token** |

## Step 1 — Initiate token renewal

**Endpoint:** `PATCH /api/vtexid/apikey/{apiKey}/apitoken/renew`

```shell
curl -X PATCH "https://{accountName}.vtexcommercestable.com.br/api/vtexid/apikey/{apiKey}/apitoken/renew" \
  -H "Content-Type: application/json" \
  -H "X-VTEX-API-AppKey: {apiKey}" \
  -H "X-VTEX-API-AppToken: {apiToken}"
```

**Response:**
```json
{
  "id": "1f6c17e5-06f9-44a9-a459-b3686e03fa9d",
  "keyName": "my-api-key",
  "creationDateToken": "2025-02-18T12:00:00Z",
  "creationDateNewToken": "2025-02-25T12:00:00Z",
  "expirationPeriod": 30,
  "newToken": "abc123xyz789"
}
```

The `newToken` field contains the new token. Update all your systems to use it before proceeding.

## Step 2 — Complete token renewal

**Endpoint:** `PATCH /api/vtexid/apikey/{apiKey}/apitoken/finish-renewal`

> Before completing the renewal, make sure no integrations are still using the old token. This action cannot be undone.

```shell
curl -X PATCH "https://{accountName}.vtexcommercestable.com.br/api/vtexid/apikey/{apiKey}/apitoken/finish-renewal" \
  -H "Content-Type: application/json" \
  -H "X-VTEX-API-AppKey: {apiKey}" \
  -H "X-VTEX-API-AppToken: {apiToken}"
```

**Response:**
```json
{
  "id": "1f6c17e5-06f9-44a9-a459-b3686e03fa9d",
  "creationDateToken": "2025-02-18T15:30:00Z",
  "creationDateNewToken": null
}
```

A `null` value in `creationDateNewToken` confirms the old token is deactivated and rotation is complete.

## Post-rotation checklist

- Update all environments and tools with the new token
- Remove the old token from vaults or environment variables
- Monitor logs for failed authentication attempts
- Inform affected teams or services about the token change

## Alternatives

Token rotation can also be done via the **API keys Admin page** in the VTEX Admin (no code required). See [Renewing API tokens](https://help.vtex.com/en/tutorial/renewing-api-tokens--7r4AzptYjXErGHadg9LnJ3).

---

Source: https://developers.vtex.com/docs/guides/api-token-rotation
