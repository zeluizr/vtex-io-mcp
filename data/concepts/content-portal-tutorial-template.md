---
title: 'Tutorial'
source: vtexdocs/content-portal-content
slugEN: tutorial-template
locale: en
---

A tutorial is a comprehensive and detailed guide that teaches users how to perform a series of tasks or understand concepts in depth.

## Differences between a tutorial and a how-to guide

| **Dimension** | **Tutorial** | **How-to guide** |
| ------------ | ------------ | ---------------- |
| **Purpose** | Learning-oriented. Teaches a broader concept, skill, or process in detail. | Task-oriented. Focus on helping the user complete a specific task or goal. |
| **Scope** | Covers a series of steps or concepts, often related to learning a new skill. | Narrow in scope, typically covering one task or process divided into steps. |
| **Content** | Educational, offering context, background, and explanations. | Practical, with direct, task-oriented instructions. |
| **Audience** | Users who want to learn a skill or understand a concept deeply. | Users who need to quickly achieve a specific goal, usually with prior knowledge. |

## Writing a tutorial

| **Topic** | **Description** |
| --------- | ------------ |
| **Title** | Directly states the tutorial's goal with a verb in the gerund form. For example: `Managing users in B2B organizations` |
| **Before you begin** (optional) | Lists all necessary prerequisites: tools and software requirements, account creation or setup, basic knowledge or skills. |
| **Steps** | Provides detailed, step-by-step instructions. Breaks the process into steps, ensuring each step is clear and actionable. |
| **Content of the steps** | Each step should guide the user from one point to the next in a logical sequence. Don't assume user knowledge. Use angle brackets (`>`) for sequential actions. Maintain consistent verb tense using imperative verbs. |
| **Step title** | In tutorial step titles, start with a verb using the gerund form, such as `Adding a loading dock` or `Setting up your environment`. |

## Tutorial templates

### Template 1 (with card components)

```md
# [Tutorial title]

[Provide a short description of the tutorial.]

Here's an overview of the parts:

<Flex>

<WhatsNextCard
title="Step 1. title"
description="Provide a short description of the step."
linkTo="https://developers.vtex.com/docs/guides"
linkTitle="See more"
/>

<WhatsNextCard
title="Step 2. title"
description="Provide a short description of the step."
linkTo="https://developers.vtex.com/docs/guides"
linkTitle="See more"
/>

## Before you begin

[Lists all prerequisites the user must meet or complete before following the steps.]
```

### Template 2 (with list links)

```md
# [Tutorial title]

[Provide a short description of the tutorial.]

Here's an overview of the parts:

- [Step 1. Title](https://developers.vtex.com/docs/add-the-step-slug-here)
- [Step 2. Title](https://developers.vtex.com/docs/add-the-step-slug-here)
- [Step 3.](https://developers.vtex.com/docs/add-the-step-slug-here)

## Before you begin

[Lists all necessary prerequisites.]
```

## Tutorial examples

- [Getting started: Storefront apps](https://developers.vtex.com/docs/guides/vtex-io-documentation-1-developing-storefront-apps-using-react-and-vtex-io)
- [Getting started: Pixel apps](https://developers.vtex.com/docs/guides/vtex-io-documentation-1-developnativeintegrationswithpixelapps)
- [Getting started: FastStore](https://developers.vtex.com/docs/guides/faststore/getting-started-overview)
- [Getting started: Store Framework](https://developers.vtex.com/docs/guides/getting-started-3)
