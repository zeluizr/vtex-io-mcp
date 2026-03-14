# Catalog — Categories

Categories organize your product assortment hierarchically, making it easier for customers to find products and keeping your store organized.

---

## Category Tree

The category tree is the backbone of the Catalog and must be carefully planned before importing.

- VTEX has no limit on the number of categories
- **Strongly recommended: maximum 3 levels** (Department → Category → Subcategory)
- Products must be associated with the **lowest level** of the category tree

---

## Category Inheritance

Specifications registered at upper levels are **inherited by all lower categories**.

Example: Root level specs (Gender, Color, Country) are inherited by Level 1, Level 2, etc. A product in Level 2 has all specs from its category + all parent categories.

---

## Limitations

| Limitation | Details |
|---|---|
| **Moving categories** | Risky due to inherited specifications — can negatively affect product information. Use the workaround in [Deactivating and reorganizing categories](https://help.vtex.com/en/tutorial/deactivating-and-reorganizing-categories--tutorials_264#changing-the-category-tree) |
| **Deleting categories** | Cannot delete a category unless you do a [full catalog cleanup](https://help.vtex.com/en/tutorial/database-maintenance-full-cleanup--34P9LGs7BCIQK6acQom802) |

---

## Create a Category

**Endpoint:** `POST /api/catalog/pvt/category`

> ❗ Activate the category, otherwise products will not be indexed and will not appear in the store.

### Request body example

```json
{
  "Name": "Clothing",
  "FatherCategoryId": null,
  "Title": "Clothing",
  "Description": "Shop from brands like Patagonia, The North Face...",
  "Keywords": "Clothing,apparel,clothes",
  "IsActive": true,
  "ShowInStoreFront": true,
  "ShowBrandFilter": true,
  "ActiveStoreFrontLink": true,
  "GlobalCategoryId": 772,
  "StockKeepingUnitSelectionMode": "SPECIFICATION",
  "Score": null
}
```

### Response body example

```json
{
  "Id": 2000089,
  "Name": "Clothing",
  "FatherCategoryId": null,
  "IsActive": true,
  "HasChildren": false
}
```

- `FatherCategoryId: null` = parent/root category
- To create a subcategory, set `FatherCategoryId` to the parent category ID

---

## Other Operations

| Operation | Endpoint |
|---|---|
| Edit category | `PUT /api/catalog/pvt/category/{categoryId}` |
| Get category tree | `GET /api/catalog_system/pub/category/tree/{categoryLevels}` |
| Get category by ID | `GET /api/catalog/pvt/category/{categoryId}` |

---

## FAQ

**When to import categories via API vs manually?**
The category tree rarely changes once defined. Specific changes can be made manually in Admin. API integration is useful when the tree grows progressively (e.g., new business validation phase).

**What category fields does VTEX Intelligent Search use?**
- Title
- Description

**SEO best practices for Title and Meta Tag Description:**
- Title: 55–60 characters
- Meta Tag Description: 1–2 sentences (140–160 characters) — compelling, with clear call to action

> ⚠️ Department, Category, and Subcategory titles can be customized using VTEX Intelligent Search for the search navigation bar.

---

## Documentation

- [Catalog Overview](./catalog-overview.md)
- [Catalog — Specifications](./catalog-specifications.md)
- [Catalog — Products](./catalog-products.md)
