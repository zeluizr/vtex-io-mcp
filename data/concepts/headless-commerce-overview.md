# Headless Commerce Overview

VTEX supports headless commerce: use VTEX APIs for core commerce features while building the storefront with any third-party CMS.

## Architecture

- Core commerce via VTEX REST APIs
- Storefront built with a third-party CMS (except the authentication page)
- Native VTEX ID page for shopper authentication
- VTEX IO to host microservices and custom applications

---

## Authentication

### Shopper Authentication (Identity)

VTEX does not support headless shopper authentication. Shoppers must use the **native VTEX login page**.

Flow:
1. Redirect shopper to `{yourStoreUrl}/login` in a browser
2. After successful login, VTEX sets a **user token** in the cookie `VtexIdclientAutCookie`
3. Store and use this token to authenticate subsequent API requests

### API Request Authentication

| Context | Recommended Method |
|---|---|
| Requests on behalf of a logged-in shopper | **User token** (`VtexIdclientAutCookie`) |
| Requests without shopper context (e.g., product search) | **Application keys** (appKey + appToken) |

---

## Shopping Experience Areas

| Area | Guide |
|---|---|
| Viewing catalog information | `headless-catalog.md` |
| Placing orders (cart + checkout) | `headless-cart-and-checkout.md` |
| Account info and order history | `headless-profile-management.md` |

---

## Documentation

- [Authentication](./authentication.md)
- [Headless Catalog](./headless-catalog.md)
- [Headless Cart and Checkout](./headless-cart-and-checkout.md)
- [Headless Profile Management](./headless-profile-management.md)
