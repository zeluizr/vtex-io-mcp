---
title: 'Data entity'
id: tutorials_1265
status: PUBLISHED
createdAt: 2017-04-27T21:56:57.118Z
updatedAt: 2024-10-23T23:39:13.110Z
source: vtexdocs/help-center-content
originalPath: docs/en/tutorials/master-data/master-data-basics/data-entity.md
---

A data entity is a representation of a set of information about a given concept. Each entity includes fields with information that makes up the entity.

> This article outlines the Master Data v1 operation. See also [Master Data v2](https://developers.vtex.com/docs/guides/master-data-v2-basics).

## Data types

When creating a field, the following types are available:

| Field type | Description |
| - | - |
| **Auto Increment** | Stores integers and is automatically incremented for each new record. |
| **Boolean** | Stores `true` or `false`. |
| **CEP** | Stores a postal code (Brazil). |
| **CPF / CNPJ** | Stores Brazilian taxpayer/company registration numbers. |
| **Currency** | Stores information in currency format. |
| **Date** | Stores date information. |
| **Date and Time** | Stores date and time. |
| **Decimal** | Stores numbers with 2 decimal places. |
| **Email** | Stores an email address. |
| **File** | Stores a file (max size configurable). |
| **Integer** | Stores integers between `-2147483648` and `2147483647`. |
| **Long** | Stores larger integers from `-2⁶³` to `2⁶³-1`. |
| **Percent** | Stores a percentage. |
| **Phone** | Stores a phone number. |
| **Relationship** | Creates a relationship with another entity. |
| **Score2** | Stores key, value, and expiration date (e.g., for loyalty points). |
| **Text** | Stores numbers, letters, and special characters without a character limit. |
| **Time** | Stores time information. |
| **URL** | Stores a URL. |
| **User Login** | Automatically selects the logged-in user's email. |
| **Varchar 10** | Up to 10 characters. |
| **Varchar 100** | Up to 100 characters. |
| **Varchar 50** | Up to 50 characters. |
| **Varchar 750** | Up to 750 characters. |

## Creating data entities

1. In the VTEX Admin, go to **Store Settings > Storefront > Master Data**.
2. Click **Applications > Advanced Settings > Data structure**.
3. Click the **Data Entities** tab.
4. Click the `Add` button.
5. Complete the **Acronym** field with 2 letters that identify the data entity.
6. Complete the **Name** of the data entity.
7. Select the type of primary key: **GUID** or **Primary key must be given using the 'ID' property**.
8. Optionally check **Allow all document query without filter** (critical — allows all records to be listed via API without authentication).
9. Complete the **Fields** tab with the desired fields:
   - **Name**: Field identifier (no spaces/special chars). Example: `CustomerName`.
   - **Display Name**: Name shown on the form. Example: `Customer name`.
   - **Type**: See Data types table above.
   - **General settings**: Configure nullability and credential requirements.
   - **Search and filter settings**: Configure whether field is searchable and filterable.
10. Click `Save` or `Save and New`.
11. Click the diskette button to publish the data entity.
12. Click the `Reload Applications` button.

> After creating the data entity, create the form for adding, changing, and displaying data in Master Data.
