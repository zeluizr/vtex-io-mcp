---
title: 'How to create a trigger in Master Data v1'
id: tutorials_1270
status: PUBLISHED
createdAt: 2017-04-27T21:56:49.666Z
updatedAt: 2024-06-27T13:01:58.637Z
source: vtexdocs/help-center-content
originalPath: docs/en/tutorials/master-data/master-data-v1-triggers/creating-trigger-in-master-data.md
---

> This article is about Master Data v1. For Master Data v2, see [Setting up triggers in Master Data v2](https://developers.vtex.com/docs/guides/setting-up-triggers-in-master-data-v2).

A trigger is a programming resource that performs a specific action whenever an associated event occurs. In Master Data, a trigger consists of configuring one or more events that activate when a particular situation occurs based on different variables.

Main characteristics of triggers:

- Associated with a data entity
- Activate automatically
- Cannot be called directly
- Trigger several actions
- Allow creating recursion scenarios
- Can impact data manipulation in the entity due to recursion

## Trigger structure

A trigger configuration has four parts:

### 1. Action that fires the trigger

- **Rule**: The action that triggers another action (e.g., a new registration in the store).
- **Additional filters**: Conditions the action must meet for the response action to execute (e.g., registration through newsletter form, not checkout).

### 2. Trigger time

You can schedule the trigger based on a time interval or a date field. For example: send a notification 1 month before a product's due date.

### 3. Actions if positive (record meets trigger rule and filters)

Actions executed when the record meets the conditions and additional filters:
- Send an email
- Score a Score2 field
- Send HTTP request
- Save document in another data entity

### 4. Actions if negative (record meets rule but not filters)

Actions executed when the record meets the trigger condition but does NOT meet the additional filters.

## Configuring triggers

1. Access Master Data at `https://{accountname}.ds.vtexcrm.com.br/`.
2. Click the **Trigger** tab.
3. Click the `Add` button.
4. Enter the **Name** of the trigger.
5. Select the data entity that will fire the trigger.
6. Select a status: **Enabled** or **Disabled**.
7. Configure the tabs: Rules, Schedule, If Positive, If Negative.
8. Click `Save`.

### Rules tab

**Trigger rules:**

- **An attribute value is changed**: Fires when the value of a specific field is changed.
- **A filter attribute is changed**: Fires when a filter attribute is changed.
- **A record is changed**: Fires when any field in a record changes.
- **A record is created**: Fires when a record is created.
- **A record is deleted**: Fires when a record is deleted.

**Additional filters:**

- **Add Group**: Creates groups with filters (combinable with AND/OR).
- **Add Filter**: Creates individual field/value filters.

> Master Data v1 does not allow trigger retry configuration, unlike v2.

### Schedule tab

- **Run ASAP**: Fire immediately.
- **Schedule on specific date**: Schedule for a specific date and time.
- **Schedule on dynamic date**: Set a future date relative to the current date or a date field (minutes, hours, days, months, years).

### If Positive tab

**Send an email**: Sends to dynamic or static recipients. Content can include text, HTML, or URL content. Valid tags show how to reference field values.

**Send an email using a VTEX Message Center template**: Uses an existing Message Center template.

**Add scores to the Score2 field**: Sets key, points, and validity for a Score2 field.

**Send an HTTP request**: Sends an HTTP request and optionally saves the response in Master Data.

### If Negative tab

Same action types as If Positive, but executed when the record does not meet the additional filters.

## Example: Abandoned cart

- **Rule**: When the Checkout attribute is changed.
- **Additional filter**: Checkout equal to Completed.
- **If Positive**: Send an order confirmation email.

## Example: Newsletter welcome email

- **Rule**: A record is created.
- **Additional filter**: Source equals `newsletter`.
- **If Positive**: Send welcome email with newsletter deals.
- **If Negative**: (nothing, or a different email).
