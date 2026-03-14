---
title: 'Customizing your store typography'
id: storefront-styles-typography
status: PUBLISHED
source: vtexdocs/help-center-content
originalPath: docs/en/tutorials/storefront/styles/customizing-your-stores-typography.md
---

The typography of an online store demonstrates brand identity to customers. VTEX Admin provides flexibility to customize store typography according to business needs.

> Important: Changes made in Storefront override code-level typography changes. Coordinate with your development team to ensure consistency between Storefront and code-based typography.

## Adding Custom Font Families

1. Navigate to **Storefront > Styles** in VTEX Admin.
2. Select the kebab menu icon (three dots).
3. Click **Edit > Typography > Font family**.
4. Click **Add custom font**.
5. Enter a name for the font in the **Font family** field.
6. Click **Upload** to upload the desired font file.
7. Select a font style: Thin, Extra Light, Light, Regular, Medium, Bold, Extra Bold, Black, and italic variants.
8. Click `Save`.

> Font files must have `.ttf` or `.woff` extensions.

## Configuring Type Tokens

Type tokens apply custom fonts to store text content. Customizable elements:

- **Headings** (Heading 1–6): Hierarchical information display.
- **Body**: Paragraph text.
- **Auxiliary**: Secondary elements like subtitles and badges (small/mini variants).
- **Action** (Action, Action Small, Action Large): Primary page actions and interactive elements.
- **Code**: Technical terminology and specifications.

### Steps to Configure Type Tokens

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

## Relationship with VTEX IO Styles Builder

In Store Framework, the `styles` builder (`2.x`) manages CSS customization via JSON in the `/styles` folder. The Admin Storefront > Styles interface provides a visual way to customize:

- Font families and type tokens (typography)
- Color palettes

Changes made via Admin override the JSON config in your store theme's source code. Always coordinate between developers (who manage the Store Theme) and the store operators (who use Site Editor/Styles).
