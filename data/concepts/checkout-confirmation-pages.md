# Checkout — Customize Confirmation Pages

How to customize the Order Placed and Order Confirmation pages in VTEX Checkout.

---

## Accessing the Code Editor

1. In Admin VTEX, go to **Checkout**
2. Click the `blue gear` button on the chosen website
3. Select the **Code** tab

> ℹ️ Files shown in the Code tab are publicly available at `https://{accountName}.myvtex.com/files/`

---

## HTML Templates

To edit confirmation page HTML, access the following templates:

| Template | Area |
|---|---|
| `checkout-confirmation-top` | Top of the page |
| `checkout-confirmation-header` | Header area |
| `checkout-confirmation-bottom` | Bottom of the page |
| `checkout-confirmation-footer` | Footer area |

> ⚠️ Any customization performed on the templates applies to **both** pages simultaneously: Order Placed and Order Confirmation.

---

## CSS Customization

Add styles in a `<style>` tag in one of the HTML templates loaded on the page.

### Available CSS Classes

```css
.cconf-alert               /* Confirmation alert */
.cconf-client-email        /* Element carrying customer's email */
.cconf-address             /* Card with order address */
.cconf-payment             /* Card with payment method */
.cconf-summary             /* Card with order summary */
.cconf-product-table       /* Table with product orders */
.cconf-product             /* Table line with order */
.cconf-continue-button     /* Button leading back to the store */
```

---

## JS Customization

The page can also be changed via JavaScript using one of these files (accessible via the Code tab in Admin):

| File | Checkout Version |
|---|---|
| `checkout-confirmation-custom.js` | v4+ |
| `checkout-confirmation-custom4.js` | v3 |

---

## Documentation

- [Checkout Customization Guide](./checkout-customization-guide.md)
- [Checkout API Overview](./checkout-api-overview.md)
