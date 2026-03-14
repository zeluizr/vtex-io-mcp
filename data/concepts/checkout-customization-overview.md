# Checkout Customization Overview

Available customization options for VTEX Checkout.

---

## Customization Areas

| Area | Guide |
|---|---|
| **Checkout UI** (header, footer, CSS, JS) | [Checkout Customization Guide](./checkout-customization-guide.md) |
| **Order Confirmation pages** (Order Placed, Order Confirmation) | [Checkout Confirmation Pages](./checkout-confirmation-pages.md) |
| **Payment method names/descriptions** | [Checkout Payment Customization](./checkout-payment-customization.md) |
| **Observation field** | [Checkout Payment Customization](./checkout-payment-customization.md) |
| **SLA display by item** | Available via Checkout UI customization |

---

## Customization Methods

| Method | Description |
|---|---|
| **Admin VTEX** | Edit HTML templates and CSS/JS files directly in the Checkout Code tab |
| **Checkout UI Settings app** | VTEX IO app — supports A/B testing, version tracking, rollbacks |
| **Checkout UI Custom app** | Pre-defined VTEX-approved options (colors, text size, unit price display) |
| **CSS rules** | Toggle features via CSS class visibility |

---

## Quick Reference — Feature Toggles via CSS

```css
/* Enable Observation field */
.note { display: block; }

/* Enable foreign document field (Global Checkout) */
.document-box { display: block; }

/* Enable international phone field (Global Checkout) */
.phone-box { display: block; }

/* Show all countries in Invoice Address (Global Checkout) */
.CountrySelector--all-countries { display: block; }
.CountrySelector { display: none; }
```

---

## Documentation

- [Checkout Customization Guide](./checkout-customization-guide.md)
- [Checkout Confirmation Pages](./checkout-confirmation-pages.md)
- [Checkout Payment Customization](./checkout-payment-customization.md)
- [Checkout Region and Global](./checkout-region-and-global.md)
