# Catalog — Brands

Brands are product attributes that help customers identify a product and the business behind it. Each product can only be associated with a single brand, and brand association is mandatory.

Creating a Brand is a mandatory step when configuring the Catalog — usually the second step after creating categories.

---

## Create a Brand

**Endpoint:** `POST /api/catalog/pvt/brand`

> ❗ Do not insert empty spaces at the end of the brand name — VTEX interprets that as a new brand, causing duplication.

> ❗ You must activate the brand, otherwise associated products will not be indexed and will not appear in the store.

### Request and response body example

```json
{
  "Id": 2000013,
  "Name": "Orma Carbon",
  "Text": "Orma Carbon",
  "Keywords": "orma",
  "SiteTitle": "Orma Carbon",
  "Active": true,
  "MenuHome": true,
  "AdWordsRemarketingCode": "",
  "LomadeeCampaignCode": "",
  "Score": null,
  "LinkId": "orma-carbon"
}
```

---

## Edit a Brand

**Endpoint:** `PUT /api/catalog/pvt/brand/{brandId}`

- Uses the same request body structure as create
- The Brand ID is the only non-editable field

---

## Get Brand List

| Endpoint | Description |
|---|---|
| `GET /api/catalog_system/pvt/brand/list` | Full brand list — limited to 20,000 results |
| `GET /api/catalog_system/pvt/brand/list/paged` | Paginated brand list — use this for more than 20k brands |

---

## Get a Specific Brand

**Endpoint:** `GET /api/catalog_system/pvt/brand/{brandId}`

---

## Delete a Brand

**Endpoint:** `DELETE /api/catalog/pvt/brand/{brandId}`

> ⚠️ This action is permanent and cannot be undone.

---

## Documentation

- [Catalog Overview](./catalog-overview.md)
- [Catalog — Products](./catalog-products.md)
- [Catalog — Categories](./catalog-categories.md)
