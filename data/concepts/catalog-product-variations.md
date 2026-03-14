# Catalog — Product Variations

Product variations occur when an item has different attributes such as color and size. These variants are grouped on a single product page.

---

## Parent / Child Relationship

The parent is the actual product; children are the variants.

Example: Cotton shirt (parent) → blue cotton shirt, small cotton shirt, small blue cotton shirt (children)

---

## Color Variations — Special Consideration

When dealing with colors as product variations, there are often specific requirements:

- A specific URL per color
- A specific product page with unique content per color
- Landing pages with products of the same color
- The ability to share only some colors (not all variations) with external services or marketplaces

### Recommendation: Use Similar Products, NOT SKU Specifications

For color variations, use **Similar Products** rather than SKU specifications.

Benefits:
- Creates unique URLs and pages for each color → better SEO
- Improves customer experience
- Allows sharing specific colors with Google Shopping or other platforms independently

See: [Similar Products Variants](https://developers.vtex.com/docs/guides/vtex-similar-products-variants)

---

## Standard Variations (Size, Voltage, etc.)

For non-color attributes like size or voltage, use SKU specifications normally:

- Create a specification field at the category level
- Create values for the specification (XS, S, M, L, XL)
- Associate the specification with each SKU
- Values become SKU selectors on the product page and browsing filters

---

## Documentation

- [Catalog — Products](./catalog-products.md)
- [Catalog — SKUs](./catalog-skus.md)
- [Catalog — SKU Specifications](./catalog-sku-specifications.md)
- [Catalog — Specifications](./catalog-specifications.md)
