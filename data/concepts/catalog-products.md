# Catalog — Products

A product is a generic definition of an item in your store's Catalog (e.g., a shirt). Products may vary by model, color, size — each variation is an SKU.

---

## Create a Product

**Endpoint:** `POST /api/catalog/pvt/product`

> ⚠️ Let VTEX auto-generate the product ID by setting `Id` to `null`. Store the generated ID from the response for future updates.

> ⚠️ Products must be associated with the most specific category level in the category tree.

### Request body example

```json
{
  "Id": null,
  "Name": "Zoom Stefan Janoski Canvas RM SB Varsity Red",
  "DepartmentId": 2000089,
  "CategoryId": 2000090,
  "BrandId": 12121219,
  "LinkId": "stefan-janoski-canvas-varsity-red",
  "RefId": "sr_1_90",
  "IsVisible": true,
  "Description": "The Nike Zoom Stefan Janoski Men's Shoe...",
  "DescriptionShort": "The Nike Zoom Stefan Janoski is made with a premium leather.",
  "ReleaseDate": "2023-01-01T00:00:00",
  "KeyWords": "Zoom,Stefan,Janoski",
  "Title": "Zoom Stefan Janoski Canvas RM SB Varsity Red",
  "IsActive": true,
  "MetaTagDescription": "The Nike Zoom Stefan Janoski Men's Shoe...",
  "ShowWithoutStock": true
}
```

### Response body example

```json
{
  "Id": 42,
  "Name": "Zoom Stefan Janoski Canvas RM SB Varsity Red",
  "DepartmentId": 2000089,
  "CategoryId": 2000090,
  "BrandId": 12121219,
  "LinkId": "stefan-janoski-canvas-varsity-red",
  "RefId": "sr_1_90",
  "IsVisible": true,
  "IsActive": true,
  "ShowWithoutStock": true,
  "Score": 1
}
```

---

## Update a Product

**Endpoint:** `PUT /api/catalog/pvt/product/{productId}`

> ⚠️ You must send **all fields** in the update request. Any blank fields will have their previously configured values deleted. Always GET the product first and use the response as the update template.

---

## Create Product Using Brand Name and Category Path

Alternative endpoint that avoids needing to look up IDs:

**Endpoint:** `POST /api/catalog/pvt/product`

### Example body

```json
{
  "Name": "Test Product",
  "CategoryPath": "Storage/Hard Drive",
  "BrandName": "Sample Brand",
  "RefId": "310117069123",
  "Title": "Browser Title for this product",
  "LinkId": "test-product",
  "Description": "This is a cool product",
  "ReleaseDate": "2019-01-01T00:00:00",
  "IsVisible": true,
  "IsActive": true,
  "TaxCode": "",
  "MetaTagDescription": "tag test",
  "ShowWithoutStock": true,
  "Score": 1
}
```

---

## Create Product Specification Using Field and Group Names

Alternative endpoint that avoids needing to look up IDs:

**Endpoint:** `PUT /api/catalog/pvt/product/{productId}/specificationvalue`

### Example body

```json
{
  "FieldName": "TesteAPI",
  "GroupName": "TestGroup",
  "RootLevelSpecification": true,
  "FieldValues": ["Value123"]
}
```

---

## Documentation

- [Catalog Overview](./catalog-overview.md)
- [Catalog — Product Variations](./catalog-product-variations.md)
- [Catalog — SKUs](./catalog-skus.md)
- [Catalog — Product Specifications](./catalog-product-specifications.md)
