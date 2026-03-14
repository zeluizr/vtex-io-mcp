# Session Manager — Telesales (Customer Impersonation)

For B2B ecommerce operations, telesales operators must be able to conclude purchases on behalf of customers by "impersonating" them. VTEX offers the telesales feature through which an operator takes the place of the final customer during product selection and checkout — with limited permissions.

---

## Two Approaches

| Approach | Complexity | Control |
|---|---|---|
| **Telesales Toolbar** | Simple, out-of-the-box | Limited |
| **Session Manager API** | Requires integration | Full control |

---

## Telesales Toolbar

The [telesales toolbar](https://help.vtex.com/en/tutorial/telesales-toolbar--tutorials_5500) is the most straightforward way to use the telesales feature.

- A top bar appears on the store's frontend once the registered operator logs in
- Displayed in all site areas **except** the My Orders screen

### Setup Steps

1. [Create a telesales user](https://help.vtex.com/tutorial/como-criar-um-usuario-de-televendas--frequentlyAskedQuestions_4227)
2. [Make a purchase via telesales](https://help.vtex.com/tutorial/comprar-em-nome-do-cliente-pelo-televendas--4gsnClNy1iUCkSK6y0GI2O)

You can also [customize the telesales toolbar](https://help.vtex.com/tutorial/usando-e-customizando-toolbar-de-televendas--tutorials_5500).

---

## Session Manager API for Impersonation

For more complex B2B operations, building an integration directly with the Session Manager API allows greater control. Instead of using the telesales toolbar, the store inserts the customer's email address to be impersonated into Session Manager.

If the session administrator has permission to impersonate customers, each impersonated user's ID and email will be loaded into the session, enabling the operator to make purchases on their behalf.

### How It Works

The `vtex.impersonate-session` app monitors the `vtex-impersonated-customer-email` parameter (via `POST` or cookie) and uses admin credentials in the session to impersonate the target user.

**Required permission**: The operator must have the **telesales role**.

### App: vtex.impersonate-session

This app is **not installed by default** in VTEX stores. See [Session Manager Impersonate API](./session-manager-impersonate-api.md) for installation and usage.

---

## Documentation

- [Session Manager Overview](./session-manager-overview.md)
- [Session Manager Apps](./session-manager-apps.md)
- [Session Manager Impersonate API](./session-manager-impersonate-api.md)
