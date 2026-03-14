# Checkout Customization Guide

VTEX stores have a native Checkout UI ready from the start. For UI customizations, two approaches are available: Admin VTEX and Apps.

> ❗ VTEX does not support custom scripts and is not responsible for any damages their use may cause. Custom scripts can break your store or stop sales.

---

## Approach 1 — Admin VTEX

### Accessing the Checkout Code Editor

1. In Admin VTEX, go to **Checkout**
2. Click the `blue gear` button on the chosen website
3. Select the **Code** tab

> ℹ️ Files shown in the Code tab are publicly available at `https://{accountName}.myvtex.com/files/`

### Editable Files

| File/Template | Purpose |
|---|---|
| `checkout-header` (template) | HTML header |
| `checkout-footer` (template) | HTML footer |
| `checkout6-custom.css` (file) | Custom CSS |
| `checkout6-custom.js` (file) | Custom JS |

> ⚠️ The HTML body of the page cannot be edited.

### Importing Additional Files

Click **New → File upload** in the Code tab.

> ⚠️ Importing is not recommended for CSS files and is **prohibited** for JS files. Non-standard files can cause side effects, including store breakage.

---

## Approach 2 — Apps

### Checkout UI Settings App

Allows customizing the store's Checkout via terminal and [VTEX IO CLI](https://developers.vtex.com/docs/guides/vtex-io-documentation-vtex-io-cli-install).

Advantages over Admin method:
- Perform A/B testing
- Easily track all UI changes (via app versions)
- Quick rollbacks to previous versions

> ⚠️ If you use Checkout UI Settings, any script changes made through it will **override** HTML, CSS, and JS information made through Admin VTEX.
> ⚠️ Recommended only if you have prior experience with VTEX IO apps (Store Framework).

### Checkout UI Custom App

Applies pre-defined, VTEX-approved customization options quickly:
- Show items unit price
- Text size
- Colors

---

## Legacy CMS Portal

In stores using Legacy CMS Portal, files are managed by **Files Manager**:

- CSS: `checkout-custom.css` at `https://{accountName}.myvtex.com/arquivos/`
- JS: `checkout-custom.js` at the same path

> ⚠️ Changes to Legacy CMS Portal files apply to **all websites (stores)** in your account simultaneously.

---

## Documentation

- [Checkout API Overview](./checkout-api-overview.md)
- [Checkout Confirmation Pages](./checkout-confirmation-pages.md)
- [Checkout Payment Customization](./checkout-payment-customization.md)
