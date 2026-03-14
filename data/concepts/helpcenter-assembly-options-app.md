---
title: 'Assembly Options App'
id: 54mWg37mojrqOgCA79iqqk
status: PUBLISHED
createdAt: 2022-06-14T10:43:51.367Z
updatedAt: 2023-03-29T14:51:54.670Z
source: vtexdocs/help-center-content
originalPath: docs/en/tutorials/apps/assembly-options/assembly-options-app.md
---

> This app is only available for stores developed using [VTEX IO](https://vtex.com/br-pt/store-framework/). Before proceeding, you need to [install and configure Product Customizer](https://developers.vtex.com/vtex-developer-docs/docs/vtex-product-customizer) in your store.

Product customization options are available at VTEX when using Assembly Options. This solution helps create attachments for complex scenarios in which you need to manage different product combinations, quantities, additional items and costs.

The [Assembly Options app](https://apps.vtex.com/vtex-admin-assembly-options/p) provides an interface to configure and manage customization options in stores using VTEX IO, as an alternative to implementing Assembly Options through Catalog attachments.

## Installation

Install from the [VTEX App Store](https://apps.vtex.com/vtex-admin-assembly-options/p) or via VTEX IO CLI:

```bash
vtex install vtex.assembly-options
```

> If you install the Assembly Options app in a **seller account**, the product customization options display to your customers at checkout. If you want options to display on the product page, install the app in a **marketplace account**.

After installation, the **Catalog > Assembly Options** page becomes available in the VTEX Admin.

## List of Assembly Options

In the VTEX Admin, go to **Catalog > Assembly Options** to see all assembly options with:

- **ID**: Assembly option ID (same as the attachment ID in Catalog).
- **Name**: Name of the assembly option's attachment.
- **Required**: Whether the option is required.
- **Status**: Active or Inactive.
- **Menu**: Edit or Delete actions.

## Creating or Editing Assembly Options

1. Fill in **Basic information**:
   - **Name**: Name of the assembly option (e.g., `Ingredients`).
   - **Active**: Whether the option is available in the store.
   - **Required**: Whether customers must choose one of the options.

2. In **SKU Groups**, click `Add new group`. Each group contains SKU options for customers to choose from.

3. Fill in group information:
   - **Name**: Group name displayed on the product page (e.g., `Extra ingredients`).
   - **Minimum quantity**: Lowest number of group items a customer can choose.
   - **Maximum quantity**: Highest number of group items a customer can choose.

4. Click `Add new SKU` to add an existing SKU to the group:
   - **SKU ID**: The SKU identifier.
   - **Linked price table name**: Name of the price table listing this SKU (empty = trade policy price).
   - **Minimum quantity**: Lowest number of items a customer can choose.
   - **Maximum quantity**: Highest number of items a customer can choose.
   - **Initial quantity**: Default selected quantity.

5. Click `Save`.

When you save an assembly option, an attachment is automatically created in **Catalog > Attachments** with the prefix `vtex.assembly-option.` added to the name (e.g., `vtex.assembly-option.Ingredients`).

> For the customization options to appear in the storefront, associate the created attachment with a SKU in **Catalog > Products and SKUs > Advanced settings > Attachments**.

## Learn more

- [Assembly Options](https://help.vtex.com/en/tutorial/assembly-options)
- [What is an Attachment?](https://help.vtex.com/en/tutorial/what-is-an-attachment)
- [Assembly Options guide for developers](https://developers.vtex.com/vtex-developer-docs/docs/assembly-options-app)
