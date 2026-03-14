# Checkout — Region Feature and Global Checkout

## Region Feature

The Region feature regionalizes the store experience, allowing sellers to set their own prices and enabling marketplaces to display prices according to the client's region (used with White Label Sellers).

### How It Works

The session system identifies the user's ZIP code and country to show custom prices and availability by region. This info can come from:
- A previous purchase cookie (`vtex_session`)
- JavaScript injection into the session

### Setting Region via Session API

**Endpoint:** `POST /{account-name}.{environment}.com.br/api/sessions`

**By postal code:**
```json
{
  "public": {
    "country": { "value": "USA" },
    "postalCode": { "value": "32004" }
  }
}
```

**By geo-coordinates:**
```json
{
  "public": {
    "country": { "value": "USA" },
    "geoCoordinates": { "value": "22.123,-14.1" }
  }
}
```

**By address ID:**
```json
{
  "public": {
    "storeUserEmail": { "value": "example@example.com" },
    "addressId": { "value": "123456789" }
  }
}
```

### Verify Session Update

**Endpoint:** `GET /{account-name}.{environment}.com.br/api/sessions?items={namespace}.{value},{namespace}.{value2}`

Look for the `country` and `postalCode` fields. After refreshing the product page, the platform updates price and availability for the specified region.

---

## Global Checkout

Global Checkout enables selling to many different countries regardless of the VTEX account's country of origin.

> ℹ️ For a complete experience, also configure your store to [display in other languages](https://help.vtex.com/en/tutorial/displaying-the-store-in-another-language).

### Enable Foreign Document and Phone Fields

In Admin → **Checkout** → `blue gear` → **Code** → `checkout6-custom.css`:

```css
/* Displays the option to enter a foreign document */
.document-box { display: block; }

/* Displays the option to enter an international phone */
.phone-box { display: block; }
```

This adds:
- "I don't have CPF" button
- "I don't have a Brazilian phone" button

### International Deliveries

1. [Create a new carrier](https://help.vtex.com/en/tutorial/registering-a-carrier/)
2. For the carrier, create a shipping worksheet with a **Country** column using 3-digit ISO codes (e.g., `GBR` for England)

> ℹ️ Check country codes at `https://countrycode.org/`

### International Invoice Addresses

To allow billing for credit cards from other countries, enable all countries in the Invoice Address field via CSS:

```css
/* Show all countries */
.CountrySelector--all-countries { display: block; }

/* Hide delivery countries */
.CountrySelector { display: none; }
```

---

## Documentation

- [Checkout API Overview](./checkout-api-overview.md)
- [Session Manager Overview](./session-manager-overview.md)
- [Checkout Features Overview](./checkout-features-overview.md)
