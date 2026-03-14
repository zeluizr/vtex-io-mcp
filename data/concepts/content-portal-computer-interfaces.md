---
title: 'Computer Interfaces'
source: vtexdocs/content-portal-content
slugEN: computer-interfaces
locale: en
---

> The following content explains how to reference interfaces in tutorials and guides. To write copy for interfaces, see the Interface copy section.

## Placeholders

Placeholders indicate where dynamic or user-provided information should be added. For information that should be input by the user, such as URL variables, use placeholders contained in curly brackets.

| Do | Don't |
| :--- | :--- |
| `{accountName}.myvtex.com/admin` | `{{accountName}}.myvtex.com/admin` or `accountName.myvtex.com/admin` |

When mentioning a placeholder in a flowing text, format it as code without the curly brackets.

| Do | Don't |
| :--- | :--- |
| The `accountName` should be replaced with the name of your store account. | The `{accountName}` should be replaced with the name of your store account. |

## Action labels

Action labels are interactive elements that trigger actions, such as buttons. When referring to action labels in a list, numbered procedure, flowing text, or bulleted list, format the button name as code.

| Do | Don't |
| :--- | :--- |
| In the Marketplace module, click `Integrations`. | In the `Marketplace` module, click **Integrations**. |
| On the Google Shopping card, click `Integrate`. | On the *Google Shopping card*, click `Integrate`. |
| Then click `Save`. | Then click "Save configuration". |

## Content labels

Content labels, including titles, menus, and column headers, offer structure and navigation cues. Use bold formatting in flowing text for interface elements like titles, module names, sequences involving content labels with angle brackets, and table elements.

| Do | Don't |
| :--- | :--- |
| Select the **Status** column. | Select the `Status` column. |
| In the **Products** module, click **Store Setup** > **inStore** > **Customer Identification**. | In the **Products** module, click `Store Setup` > `inStore` > `Customer Identification`. |

## Icons

Icons are included in text to indicate an interface icon that supports user recognition while reading the documentation. When including icons in text, add a label describing them to enhance accessibility. Prefer adding the icon after the label. The icon needs to be the same as in the interface.

| Do | Don't |
| :--- | :--- |
| Click the search 🔍 button. | Click the magnifying glass button. |

When adding an icon in HTML, include the attribute `aria-hidden="true"` so that screen readers ignore the inline icon HTML tag.

| Do | Don't |
| :--- | :--- |
| Click the search `<i class="fas fa-search" aria-hidden="true"></i>` button. | Click the search `<i class="fas fa-search"></i>` button. |
