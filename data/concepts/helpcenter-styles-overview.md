---
title: 'Styles - Overview'
id: v0Db5ohEKSOFIkTzSwCjVi
status: PUBLISHED
createdAt: 2022-01-04T21:56:41.366Z
updatedAt: 2023-03-28T11:49:19.859Z
source: vtexdocs/help-center-content
originalPath: docs/en/tutorials/storefront/styles/styles-overview.md
---

The **Styles** page allows you to define the typography and color palette of your store's website.

To access it: **Storefront > Styles** in the VTEX Admin.

| **Tool** | **Description** |
|----------|----------------|
| Styles | A list of colors and typography styles created for your store's website. |
| More options | Edit or duplicate a style template. |
| New | Create a new style template for your store's website. |

> To apply and preview style changes in your store, use a [production workspace](https://developers.vtex.com/vtex-developer-docs/docs/vtex-io-documentation-workspace).

## Customizing typography

The typography of an online store demonstrates brand identity. VTEX Admin provides flexibility to customize store typography.

> Important: Changes made in Storefront override code-level typography changes. Coordinate with your development team to ensure consistency between Storefront and code-based typography.

### Adding Custom Font Families

1. Navigate to **Storefront > Styles**.
2. Select the kebab menu icon (three dots) and click **Edit > Typography > Font family**.
3. Click **Add custom font**.
4. Enter a name for the font in the **Font family** field.
5. Click **Upload** to upload the font file.
6. Select a font style (Thin, Extra Light, Light, Regular, Medium, Bold, Extra Bold, Black, and italic variants).
7. Click `Save`.

> Font files must have `.ttf` or `.woff` extensions.

### Configuring Type Tokens

Type tokens apply custom fonts to store text content. Customizable elements:

- **Headings**: Six levels (Heading 1–6) for hierarchical information display.
- **Body**: Paragraph text with improved readability.
- **Auxiliary**: Secondary elements like subtitles and badges (small/mini variants).
- **Action**: Primary page actions and interactive elements (three types: Action, Action Small, Action Large).
- **Code**: Technical terminology and specifications.

**Steps to configure type tokens:**

1. Go to **Storefront > Styles**.
2. Select the kebab menu icon and click **Edit > Typography > Type tokens**.
3. Choose a token (e.g., Heading 1) to customize.
4. Configure properties:

| Property | Description | Available Values |
|----------|-------------|------------------|
| Font Family | Sets font type | JosefinSans, Bold, Default |
| Font Weight | Thickness of characters | Thin, Extra Light, Light, Normal, Medium, Semi Bold, Bold, Extra Bold, Black |
| Font Size | Size of text | 48px, 36px, 24px, 20px, 16px, 14px, 12px |
| Text Transform | Capitalization | Initial, None, Capitalize, Uppercase, Lowercase |
| Letter Spacing | Space between characters | Normal, Tracked, Tracked Tight, Tracked Mega, Zero |

5. Click `Save`.

## Relationship with styles builder

In VTEX IO Store Framework, the **styles builder** (`2.x`) manages CSS customization via JSON configuration files in the `/styles` folder. The Storefront Styles page provides a visual interface on top of this system.
