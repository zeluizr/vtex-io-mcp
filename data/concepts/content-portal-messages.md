---
title: 'Messages'
source: vtexdocs/content-portal-content
slugEN: messages
locale: en
---

Messages consist of up to two sentences to communicate the system's current state and provide feedback on user actions. This pattern is commonly found in components like Inputs or Alerts. There is a 240-character limit per message.

## General rules

Keep it as short as possible while still being descriptive enough.

| Do | Don't |
| :---- | :---- |
| Provider couldn't be saved due to a technical issue | We faced an unexpected issue while attempting to save the provider. There might be several reasons for this, such as server downtime or network errors |
| Products couldn't be imported because the CSV file is invalid | Something went wrong |

Don't use technical language.

| Do | Don't |
| :---- | :---- |
| Invoice couldn't be sent due to a technical issue | Error 298dx9283 prevented the invoice from being sent |

Reuse messages (or their structure) whenever possible.

Don't use personal pronouns.

| Do | Don't |
| :---- | :---- |
| Account created successfully | Your account was successfully created |
| Double-check the password | You entered the wrong password. |

Use an objective and neutral tone. Avoid expressions like "Oops", "Hello", "Unfortunately", and "Please".

Use common contractions.

Use punctuation only when a larger message is extremely necessary (two sentences that both need periods).

Use sentence case, but capitalize proper nouns.

| Do | Don't |
| :---- | :---- |
| Collection exported successfully | Collection Exported Successfully |
| Notifying Intelligent Search indexer | Notifying intelligent search indexer |

## Specific rules

For error texts in a form field, start with an imperative verb.

| Do | Don't |
| :---- | :---- |
| Complete this field | This field is required |
| Check this option | This option needs to be checked |
| Select at least one option | At least one option needs to be selected |

In modals that confirm actions, personal pronouns and question marks can be used.

| Do | Don't |
| :---- | :---- |
| This action can't be undone. Are you sure you want to delete this product? | Do you want to delete this product? This can't be undone. |

For consistency, place the adverb "successfully" at the end of the phrase.

| Do | Don't |
| :---- | :---- |
| Order placed successfully | Your order was successfully placed |
| Collection exported successfully. | The collection was successfully exported |
