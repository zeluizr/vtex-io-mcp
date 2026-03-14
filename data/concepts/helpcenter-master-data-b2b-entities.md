---
title: 'How to structure Master Data entities to store B2B sales data'
id: 7vHtMxXLc9oYnEfajjtTqL
status: PUBLISHED
createdAt: 2020-05-29T12:32:31.968Z
updatedAt: 2021-11-24T13:35:52.020Z
source: vtexdocs/help-center-content
originalPath: docs/en/tutorials/master-data/master-data-settings/how-to-structure-master-data-entities-to-store-b2b-sales-data.md
---

Through [Master Data](https://help.vtex.com/en/tutorial/master-data) — the VTEX platform's module for creating database architectures — it is possible to collect, store and make available data in various formats for customers and administrative users. Configuration methods:

- Using the Content Management System (CMS) internal to the store's administrative dashboard.
- Sending requests to [Master Data's API](https://developers.vtex.com/docs/api-reference/master-data-api-v2-overview).

The stored data is described by [Data Entities](https://help.vtex.com/en/tutorial/data-entity), which are representative models that allow Master Data to validate information received and create forms. The system allows creating connections between data of different entities and provides automation possibilities via [Triggers](https://help.vtex.com/en/tutorial/creating-trigger-in-master-data).

## Modeling B2B sales structures and goals

### Representatives

A table of representatives or Autonomous Commercial Representatives useful for monitoring sales. Relevant fields:

- Representative's name and email
- Supervisor's name and ID
- Represented brands
- Acting region
- Is administrative user? → Administrative user's ID

### Supervisors

A table of supervisors to associate each representative with a supervisor. Relevant fields:

- Supervisor's name
- Supervisor's email
- Phone number
- Administrative user's ID

### Customers

Every store has a `CL` data entity for customers. You can add B2B-specific fields. Relevant fields:

- Representative's ID
- Is it a company?
- Company's data:
  - Company registration number
  - Legal business name
  - Trade name
  - Contact number
  - State registration
- Registration approved?
- Sales channel

### Goals

A table for controlling sales goals of representatives. Relevant fields:

- Representative's ID
- Cycle region
- Cycle start date
- Cycle end date
- Goal value (by product, by brand)
- Successful sales value per cycle
- Canceled sales value per cycle

## Data entry methods

### Forms

Master Data CMS allows configuring forms to fill in modeled tables — useful for administrative users (access limited via roles).

- [Creating forms in Master Data](https://help.vtex.com/en/tutorial/creating-form-in-master-data)
- [Creating applications in Master Data](https://help.vtex.com/en/tutorial/creating-an-application-in-master-data)

### Front-end or API

Forms can be submitted via front-end for customers, or accessed through [Master Data's API](https://developers.vtex.com/docs/api-reference/master-data-api-v1-overview).

### Triggers

Events in a data entity can trigger changes to data. See [Creating triggers in Master Data v1](https://help.vtex.com/en/tutorial/creating-trigger-in-master-data).

### Bulk import

Fill tables in bulk by uploading spreadsheets. See [Importing data into Master Data](https://help.vtex.com/en/tutorial/importing-data-into-master-data-v1).

## Learn more

- [Master Data](https://help.vtex.com/en/tutorial/master-data)
- [Master Data API v2](https://developers.vtex.com/docs/api-reference/master-data-api-v2-overview)
- [Creating data entities](https://help.vtex.com/en/tutorial/data-entity)
- [Creating relationships between data entities](https://help.vtex.com/en/tutorial/creating-relationships-between-data-entities--6TdIa6Q2IgWYUu2wsYIG48)
- [Configuring B2B on VTEX](https://help.vtex.com/en/tutorial/configurando-b2b-na-vtex)
