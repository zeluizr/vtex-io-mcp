# Expiring a shopper's password

You can use the VTEX ID API to expire a shopper's password. Once expired, they cannot log in until they create a new password on your website.

**Required permission:** The API key or user must have a License Manager role with the `Expire User Password` resource.

## Recommended flow

1. Activate repeated password prevention (first time only)
2. Expire the shopper's password
3. Notify the shopper

## Step 1 — Prevent repeated passwords (optional, one-time setup)

To prevent shoppers from reusing the same password after expiration:

**Endpoint:** `POST /api/vtexid/pub/providers/setup/password/webstore/password`

```bash
curl --request POST \
  'https://{accountName}.vtexcommercestable.com.br/api/vtexid/pub/providers/setup/password/webstore/password' \
  --header 'Content-Type: application/json' \
  --data '{"isActive": true, "allowRepeated": false}'
```

> This configuration impacts **all shoppers** of your account. Only send this request when you want to change the configuration.

## Step 2 — Expire a shopper's password by email

**Endpoint:** `POST /api/vtexid/password/expire?email={email}`

```bash
curl --request POST \
  'https://{accountName}.vtexcommercestable.com.br/api/vtexid/password/expire?email={shopperEmail}'
```

- No request body required
- Successful response: `200 OK` with empty body

> This request does **not** trigger any notification. You must notify the shopper manually.

## Step 3 — Notify the shopper

Once the password is expired, the shopper cannot log in. You must notify them and instruct them to visit your store and create a new password.

---

Source: https://developers.vtex.com/docs/guides/expire-shopper-password
