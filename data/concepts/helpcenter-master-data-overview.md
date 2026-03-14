---
title: 'Master Data'
id: 4otjBnR27u4WUIciQsmkAw
status: PUBLISHED
createdAt: 2018-04-02T19:01:38.026Z
updatedAt: 2025-09-02T23:26:45.478Z
source: vtexdocs/help-center-content
originalPath: docs/en/tutorials/master-data/master-data-basics/master-data.md
---

Master Data is a VTEX database platform solution, which is highly customizable, and it also enables you to create applications.

By default, Master Data is used to store and organize Customer data from your store. It features a powerful search engine, allowing you to store, search, expand, and customize data.

## Versions available

Currently there are two versions available:

- **v1**: Has a graphical interface, supports importing/exporting spreadsheets, attachments, and triggers. Data entities referenced by two-capital-letter acronyms (e.g., `CL` for clients, `AD` for addresses). Cannot be created via API.
- **v2**: No graphical interface — API only. Supports JSON schemas, nested properties, and named data entities (e.g., `Notification`). Can only be created via API.

> VTEX automatically saves customer data from your store in Master Data v1.

> Note: Data entities of the two versions are independent. Data created in a v1 entity cannot be queried or edited using v2 resources and vice versa.

## Basic components

### Data entities

Data entities are in the form of tables where documents and fields are recorded.

- **v1**: Referenced by two-capital-letter acronyms (e.g., `CL`, `AD`).
- **v2**: Referenced by name (e.g., `Client`, `Address`).

### Documents

Documents are records in a data entity. Each document represents a row in a table and has an automatically generated unique ID.

### Fields

Fields are the attributes that make up documents. In v1, fields must be filled in the specific format configured in the data entity. In v2, there is no restriction — format validation is done through JSON schemas.

#### Nested properties

Master Data v2 allows structured data with nested properties. For example, a client profile might have the field `Document`, which consists of `Type` and `Number` properties. You can also create nested triggers.

### Indexes

Indexes specify a document to be accessed using an indexed field instead of its ID. Useful for querying a document by a known field value (e.g., email) when the document ID is unknown.

## Triggers

A Master Data trigger is a mechanism that performs an action after creating or updating a document, if the conditions set in the configuration are met. Actions can be:

- Send HTTP request
- Send an email
- Save document in another data entity

## v2 schemas

With Master Data v2, you can define data formats with JSON schemas. This format indicates how the Master Data should validate and index documents.

A document can be compatible with multiple JSON Schemas, or with none.

## Applications

### A/B Testing

With v2 triggers, you can establish multiple actions for the same trigger by setting the load percentage that each action should receive.

### Abandoned cart

Master Data can be used to create abandoned cart integrations — performing automatic actions whenever clients add products to their store cart and log out without checking out.

## Learn more

- [Master Data v1 API](https://developers.vtex.com/docs/api-reference/masterdata-api)
- [Master Data v2 API](https://developers.vtex.com/vtex-rest-api/reference/master-data-api-v2-overview)
- [Starting to work with JSON schemas in Master Data v2](https://developers.vtex.com/vtex-rest-api/docs/starting-to-work-on-master-data-with-json-schema)
