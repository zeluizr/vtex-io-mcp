# ERP Integration — Import Customers

Import customer data from CRM or other systems into VTEX using Master Data v1.

## Overview

The **Checkout** module stores shopper data in **Master Data v1** by default. Using the **Master Data v1 API** is the recommended way to integrate your customer database into VTEX.

Importing customer data also enables **SmartCheckout** — automatic fill-in of customer information at checkout for returning customers.

## Data Entities

Master Data v1 uses **data entities** (tables) where each document (profile or address) is saved as a row.

Two native data entities are used for customer integration:

| Entity | Description |
|---|---|
| `CL` | Shopper profiles |
| `AD` | Shopper addresses |

## Create Customer Profile

```
POST /api/dataentities/CL/documents
```

```json
{
  "email": "clark.kent@examplemail.com",
  "firstName": "Clark",
  "lastName": "Kent",
  "phone": "+12025550195",
  "documentType": "CPF",
  "document": "12345678900",
  "isCorporate": false,
  "isNewsletterOptIn": false,
  "localeDefault": "en-US"
}
```

Response:

```json
{
  "Id": "CL-b345cbda-e489-11e6-94f4-0ac138d2d42e",
  "Href": "http://api.vtex.com/my-store-name/dataentities/CL/documents/b345cbda-e489-11e6-94f4-0ac138d2d42e"
}
```

> **Important:** Save the `Id` returned in the response. You will need it to link addresses to this customer.

## Create Customer Address

```
POST /api/dataentities/AD/documents
```

Use the `Id` from the profile creation as `userId` to associate the address with the customer.

```json
{
  "addressName": "My House",
  "addressType": "residential",
  "city": "Metropolis",
  "complement": "",
  "country": "USA",
  "postalCode": "11375",
  "receiverName": "Clark Kent",
  "reference": null,
  "state": "MP",
  "street": "Baker Street",
  "neighborhood": "Upper east side",
  "number": "21",
  "userId": "7e03m794-a33a-11e9-84rt6-0adfa64s5a8e"
}
```

## Retrieve Customer Data

```
GET /api/dataentities/CL/search    # Search documents (single or multiple results)
GET /api/dataentities/CL/scroll    # Scroll documents (paginate across large datasets)
```

Both endpoints support:
- Filtering by any field
- Sorting by any field
- Returning only specific fields (instead of full documents)

## Edit Customer Data

Customers can update their own profile via **My Account** in the storefront — changes are automatically saved to Master Data.

For programmatic updates:

**Update customer profile (partial):**

```
PATCH /api/dataentities/CL/documents/{id}
```

```json
{
  "phone": "+12025550195",
  "isNewsletterOptIn": false
}
```

**Update address (partial):**

```
PATCH /api/dataentities/AD/documents/{id}
```

```json
{
  "street": "Market Street",
  "neighborhood": "South side",
  "number": "27"
}
```

## Documentation

- [ERP Integration Guide](./erp-integration-guide.md)
- [Master Data Overview](./master-data.md)
- [Authentication](./authentication.md)
