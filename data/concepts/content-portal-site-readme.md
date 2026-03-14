# VTEX Content Style Guide (Content Portal)

## Summary

- [About](#about)
  - [Objective](#objective)
  - [Concepts and Features](#concepts-and-features)
- [Versioning](#versioning)
- [Development](#development)
  - [Project Pattern](#project-pattern)
    - [React Preferences](#react-preferences)
    - [Code Linting and Format](#code-linting-and-format)
  - [Commits](#commits)
    - [How to Make a Commit](#how-to-make-a-commit)
  - [Branches](#branches)
    - [Feature Branches](#feature-branches)
  - [How to Add New Articles](#how-to-add-new-articles)
  - [Navigation Sidebar](#navigation-sidebar)
    - [Updating the Navigation Sidebar](#updating-the-navigation-sidebar)
  - [Algolia Search](#algolia-search)
    - [How Algolia Works](#how-algolia-works)
    - [Configuration](#configuration)
    - [Indexing Process](#indexing-process)
    - [Search Interface](#search-interface)
    - [Maintenance](#maintenance)
  - [Glossary Page](#glossary-page)
    - [How the Glossary Works](#how-the-glossary-works)
    - [Crowdin Integration](#crowdin-integration)
    - [Maintenance](#maintenance-1)
  - [Redirects](#redirects)
    - [Creating a Redirect](#creating-a-redirect)
- [GitHub Actions](#github-actions)
  - [Release Version Workflow](#release-version-workflow)
  - [Verify Pull Request Labels](#verify-pull-request-labels)
  - [Cypress Integration Tests](#cypress-integration-tests)
  - [Cypress Extensive Tests](#cypress-extensive-tests)
  - [Lighthouse Mobile Tests](#lighthouse-mobile-tests)
  - [Lighthouse Desktop Tests](#lighthouse-desktop-tests)
- [Contributing](#contributing)
  - [How to Develop and Propose a New Contribution](#how-to-develop-and-propose-a-new-contribution)
  - [What to Do When Someone Updated the `main` Branch and I'm Developing Something on My Feature Branch](#what-to-do-when-someone-updated-the-main-branch-and-im-developing-something-on-my-feature-branch)

## About

### Objective

This repository implements the new VTEX Content Style Guide, improving users' experience as they consult our guidelines on how to produce textual content aligned with VTEX's patterns.

### Concepts and Features

As the Content Style Guide provides VTEX documentation to users, some of its main features are:

- Multilingual content

  All information present in the Content Style Guide Portal is displayed in three languages (English, Portuguese and Spanish), allowing easy access to the content available on the platform.

- Markdown files rendering

  [Markdown](https://www.markdownguide.org/) is a very popular markup language that helps making plaintext documents more semantic by adding formatting elements defined in its syntax. All documentation available on Content Style Guide is written in markdown language.

## Versioning

The versioning process of this repository was built to automate version releases and standardize its contributions. The following goals are currently implemented:

- Standardize the repository history by adopting a commit messaging convention that makes commits more semantic

  [Commitlint](https://commitlint.js.org/#/) is a tool that lints commit messages according to Conventional Commits. [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/), on the other hand, is based on the [SemVer (Semantic-Versioning)](https://semver.org/) standard.

- Automate new version releases when Pull Requests (PR) are merged into the `main` branch

## Development

1. Clone this repo, access the command line at its root directory and install all dependencies:

```bash
yarn install
```

2. To start the application development server, run:

```bash
yarn dev
```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Project Pattern

Content Style Guide is a [Next.js](https://nextjs.org/) app based on [React](https://reactjs.org/) and [Typescript](https://www.typescriptlang.org/).

#### React preferences

- It is preferable to use **arrow functions**
- It is preferable to use **functional components** instead of class components
- It is preferable to use **Hooks** over Higher Order Components (HOCs)

#### Code linting and format

- [ESLint](https://eslint.org/) is used to lint code and identify errors based on a pre-defined ruleset (`.eslintrc.json` file)

  Before any change is committed, a pre-commit hook will run the ESLint on JavaScript and TypeScript files located at pre-defined paths (such as `src/pages`, `src/components` etc) to fix their errors (ignored paths are described in `.eslintignore`).

- [Prettier](https://prettier.io/) is used to standardize the code formatting based on a pre-defined ruleset (`.prettierrc` file)

  Before any change is committed, a pre-commit hook will run Prettier and correct errors found in the appropriate files (ignored paths are included in `.prettierignore`).

You might want to configure ESLint and Prettier in your code editor to see errors and correction suggestions at development time.

### Commits

Within the repository we can consider three types of commit:

- **commits**: Default commits performed by the user on GitHub.
- **merge commits**: Commits through the command `git merge <branch> --no-ff` (it is also generated when merging a Pull Request without squashing).

#### How to Make a Commit

- **Step 1.** Stage the desired changes:

  ```bash
  git add <filenames>
  ```

- **Step 2.** Commit your staged files:

  - Make your **commit** manually following the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) model:

    ```
    <type>[optional scope]: <description>

    [optional body]

    [optional footer(s)]
    ```

    If there are any breaking changes introduced by your changes, follow one of the options:

    - Append a `!` after `<type>[optional scope]`

      ```
      <type>[optional scope]!: <description>

      [optional body]

      [optional footer(s)]
      ```

    - Add `BREAKING CHANGE: < breaking change description>` to the footer

      ```
      <type>[optional scope]: <description>

      [optional body]

      BREAKING CHANGE: <breaking change description>
      ```

    The `<scope>` may specify the context of the applied changes (e.g., subject, component, or file name), and the `<body>` may help explain the commit in more detail. The `<type>` helps make commit messages more semantic, and all options are described in the table below.

    <a href="commit-types-table" id="commit-types-table"></a>
    Commit `<type>` Options | Description | Release\*
    -----|-------------|---------------
    `fix` | fixes bugs in your codebase | PATCH
    `feat` | introduces a new feature to the codebase | MINOR
    `docs` | documentation only changes | PATCH
    `style` | changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc) | PATCH
    `refactor` | a code change that neither fixes a bug nor adds a feature | PATCH
    `perf` | a code change that improves performance | PATCH
    `test` | adds missing tests or corrects existing tests | PATCH
    `build` | changes that affect the build system or external dependencies (scope examples: gulp, broccoli, npm) | PATCH
    `ci` | changes to CI configuration files and scripts (scope examples: Travis, Circle, BrowserStack, SauceLabs) | PATCH
    `chore` | other changes that don't modify src or test files | PATCH
    `revert` | changes that revert previous commits | PATCH

    **Examples:**

    ```bash
    # Commit message without scope, body, footer or breaking change
    chore: add favicon

    # Commit message with scope
    ci(versioning): add Release-Version GitHub workflow

    # Commit message with scope and breaking change
    feat(api)!: send an email to user when a request is submitted

    # Commit message with breaking change (footer)
    chore: drop support for Node 6

    BREAKING CHANGE: use JavaScript features not available in Node 6.
    ```

  **What _NOT_ to do:**

  - Add dot in the end of text. E.g.: `chore: add favicon.`
  - Start with uppercase. E.g.: `feat(api): Send an email to user when a request is submitted`
  - Write in Portuguese. E.g.: `chore: Atualizar a navigation sidebar`

### Branches

Currently, we have one fixed branch: `main`.

The `main` branch must reflect exactly what is deployed in production, it should be treated as **_the single source of truth_**. It is from `main` where every development branch is created.

> **Important note:** Only _merge commits_ should be made by developers on `main` branch.

#### Feature Branches

You must create a branch based on `main` to start a feature, improvement, or fix. This branch is called a _feature branch_. It must have the following structure name: `<type>/<description>`
Choose the `type` that best summarizes your contribution at the [Commit Types Table](#commit-types-table).

The _feature branch_ description must be short and written with kebab-case. It should give a basic understanding of what is being developed on the branch.

E.g.: `git checkout -b feature/landing-page`.

> **Important note:** Only _commits_ should be made in a _feature branch_. None _release or merge commits_ should be made.

### How to Add New Articles

1. Add the new article as a markdown file to the [content-portal-content](https://github.com/vtexdocs/content-portal-content) repository following the same structure as the already presented files
2. Add a reference to your new article in the messages files following the same structure as the already presented entries. Example:

```json
  "guides_page_section.content.0.title": "Inclusive language",
  "guides_page_section.content.0.description": "Learn how to use language that reflects diversity and promotes respectful, inclusive communication across all VTEX content",
  "guides_page_section.content.0.link": "/docs/guides/inclusive-language"
```

So your new entry must replace `"guides"` with the respective section, the number 0 with the highest number of the section + 1, and the link with the correct slug according to your file's name.

3. If necessary, increase the `length` value on the `index.tsx` page of the desired section to consider the index number of your file. This happens because the article's cards of each section are built in a loop iterating over the keys of each section. Example:

```typescript
  <Box sx={styles.contentContainer}>
    <ContentSection
      id={'documentation_page_section_general'}
      length={8}
    />
```

This will capture the first 8 entries starting with that id. Any entry above that value would not be captured and turned into an article card.

### Navigation Sidebar

To display an article in the Content Style Guide navigation sidebar, you need to update the [navigation.json](https://github.com/vtexdocs/content-portal/blob/main/public/navigation.json) file located inside the [content-portal](https://github.com/vtexdocs/content-portal) repository.

The excerpt below shows an example of how the first articles in the Guides section is listed within this file:

```json
{
    "documentation": "Guides",
    "name": {
        "en": "Guides",
        "es": "Guías",
        "pt": "Guias"
    },
    "slugPrefix": "docs/guides",
    "categories": [
        {
            "name": {
                "en": "General",
                "es": "General",
                "pt": "Geral"
            },
            "slug": {
                "en": "index-guides",
                "es": "index-guides",
                "pt": "index-guides"
            },
            "origin": "",
            "type": "category",
            "children": [
                {
                    "name": {
                        "en": "Inclusive language",
                        "es": "Lenguaje neutro",
                        "pt": "Linguagem neutra e inclusiva"
                    },
                    "slug": {
                        "en": "inclusive-language",
                        "es": "inclusive-language",
                        "pt": "inclusive-language"
                    },
                    "origin": "",
                    "type": "markdown",
                    "children": []
                },
                {
                    "name": {
                        "en": "Product and feature naming",
                        "es": "Pautas de naming de productos y funcionalidades",
                        "pt": "Diretrizes de nomenclatura de produtos e funcionalidades"
                    },
                    "slug": {
                        "en": "product-and-feature-naming",
                        "es": "product-and-feature-naming",
                        "pt": "product-and-feature-naming"
                    },
                    "origin": "",
                    "type": "markdown",
                    "children": []
                },
                {
                    "name": {
                        "en": "Tone of voice",
                        "es": "Voz y tono",
                        "pt": "Tom e voz"
                    },
                    "slug": {
                        "en": "tone-of-voice",
                        "es": "tone-of-voice",
                        "pt": "tone-of-voice"
                    },
                    "origin": "",
                    "type": "markdown",
                    "children": []
                }
            ]
        }
    ]
},
```

Notes:

1. The slug value must be the same as the article's file name on [content-portal-content](https://github.com/vtexdocs/content-portal-content).
2. Categories are recursive, so each category can have categories as children.
3. Keep the same slug in all languages. This allows the user to swap the language from an article page without needing to be sent to any other page.

#### Updating the Navigation Sidebar

Follow the steps below to add new content to the navigation sidebar:

1. Open a [feature branch](#feature-branches) in this repository.
2. In the [navigation.json](https://github.com/vtexdocs/content-portal/blob/main/public/navigation.json) file, locate where you want the new article reference to appear in the side bar navigation menu.
3. Copy and paste the structure below into the JSON file, replacing the names of the articles (one version per locale) within the `name` object, and the respective slugs in the `slug` object.

   ```json
   {
     "name": {
       "en": "Creating a subscription plan",
       "es": "Cómo crear un plan de suscripción",
       "pt": "Como criar um plano de assinatura"
     },
     "slug": {
       "en": "creating-a-subscription-plan",
       "es": "creating-a-subscription-plan",
       "pt": "creating-a-subscription-plan"
     },
     "origin": "",
     "type": "markdown",
     "children": []
   }
   ```

4. Save the file.
5. Commit the modifications.
6. Open a PR on GitHub.

   > **Important note:** You should select the `release-no` option in the `Labels` field of the PR.

7. Test your navigation through the preview.
8. Send the PR link in the `#dev-portal-pr` Slack channel to be approved.
9. Once PR is approved, apply the merge to update the navigation sidebar.

### Algolia Search

Algolia is the search engine used in the Content Style Guide to provide fast and relevant search results. It crawls and indexes all portal content, allowing users to quickly find articles, guides, and other documentation.

#### How Algolia Works

The Algolia integration consists of three main components:

1. **Indexing**: Content from the portal is automatically crawled and indexed by Algolia
2. **Search Interface**: A dedicated search page (`/search`) powered by the `@vtexdocs/components` library
3. **Configuration**: Environment variables and scraper settings control the indexing behavior

#### Configuration

The Algolia implementation requires the following environment variables:

- `NEXT_PUBLIC_ALGOLIA_APP_ID`: Your Algolia application ID
- `NEXT_PUBLIC_ALGOLIA_WRITE_KEY`: API key with write permissions for indexing

These variables are configured in:
- `.env` file for local development
- Netlify/deployment platform environment variables for production

The search configuration is defined in `src/utils/libraryConfig.ts`:

```typescript
const libraryConfig = {
  appId: process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || '',
  apiKey: process.env.NEXT_PUBLIC_ALGOLIA_WRITE_KEY || '',
  index: 'content-platform',
}
```

#### Indexing Process

Content indexing is performed using a custom scraper based on DocSearch. The indexing configuration is located in `algolia/scraper_contentplatform.json`:

**Key Configuration Settings:**

- **Index Name**: `content-platform`
- **Start URLs**: `https://contentguide.vtex.com`
- **Sitemap**: Uses `server-sitemap.xml` for crawling
- **Content Selectors**:
  - `lvl0`: Article titles and H1 headings
  - `lvl1`: H2 headings
  - `lvl2`: H3 headings
  - `lvl3`: H4 headings
  - `lvl4`: H5 headings
  - `text`: Paragraphs and list items
- **Faceting Attributes**: `doctype` and `language` for filtering results
- **Separator Indexing**: Underscores (`_`) are indexed to improve search for technical terms

**Automatic Indexing:**

The indexing process runs automatically via GitHub Actions when Pull Requests are merged into the `main` branch:

- **Workflow**: `.github/workflows/docsearch-scraper.yml`
- **Action**: `vtexdocs/devportal-docsearch-action@main`
- **Trigger**: PR closed/merged to main branch

**Manual Indexing:**

To manually trigger the indexing process locally:

```bash
yarn index
```

This command executes the `algolia/scripts/scraper.sh` script, which:
1. Clones the `vtexdocs/docsearch-scraper` repository
2. Installs dependencies (pipenv, chromedriver)
3. Runs the scraper with the configuration file
4. Uploads indexed content to Algolia
5. Cleans up temporary files

#### Search Interface

The search functionality is accessible at `/search` and is implemented using the `@vtexdocs/components` library:

```typescript
// src/pages/search/index.tsx
import { Search } from '@vtexdocs/components'

const SearchPage = () => {
  return <Search />
}
```

The Search component provides:
- Real-time search as you type
- Faceted filtering by document type and language
- Highlighting of matching terms
- Direct links to relevant content
- Mobile-responsive interface

#### Maintenance

To maintain and update the Algolia search:

1. **Updating Search Configuration**:
   - Edit `algolia/scraper_contentplatform.json` to modify:
     - Content selectors
     - Indexed attributes
     - Faceting options
     - URL patterns
   - Changes take effect on the next indexing run

2. **Testing Indexing Locally**:
   - Ensure environment variables are set in `.env`:
     ```
     NEXT_PUBLIC_ALGOLIA_APP_ID=your_app_id
     NEXT_PUBLIC_ALGOLIA_WRITE_KEY=your_write_key
     ```
   - Run `yarn index` to test the scraper
   - Verify indexed content in the Algolia dashboard

3. **Monitoring Search Performance**:
   - Log in to the [Algolia Dashboard](https://www.algolia.com/dashboard)
   - Check the `content-platform` index for:
     - Number of records indexed
     - Search analytics and queries
     - Response times
     - Popular search terms

4. **Troubleshooting**:
   - **Empty search results**: Verify indexing completed successfully and check the GitHub Actions logs
   - **Missing content**: Ensure the sitemap includes all pages and the scraper selectors match the HTML structure
   - **Outdated results**: Trigger a manual reindex with `yarn index` or wait for the next automatic indexing
   - **Slow searches**: Review indexed attributes and consider optimizing the index settings in Algolia dashboard

5. **Dependencies**:
   - `algoliasearch`: ^4.14.2 (Algolia JavaScript client)
   - `react-instantsearch-dom`: ^6.37.0 (React search components)
   - `search-insights`: ^2.3.0 (Analytics integration)
   - `@vtexdocs/components`: Search UI components

### Glossary Page

The Glossary page (`/docs/glossary`) is a dynamic page that displays terminology used in VTEX content across three languages (English, Spanish, and Portuguese). The glossary data is managed in Crowdin and automatically fetched during the build process.

#### How the Glossary Works

The glossary page consists of the following key components:

1. **Data Source**: Glossary data is stored and managed in Crowdin as concepts and terms
2. **Data Fetching**: During build time (`getStaticProps`), the application calls the Crowdin API to fetch all glossary entries
3. **Display**: The data is rendered in an interactive table using jQuery DataTables, providing search, pagination, and sorting capabilities
4. **Multilingual Support**: Each entry includes:
   - **English (en-US)**: Required for all entries
   - **Spanish (es-MX)**: Optional translation
   - **Portuguese (pt-BR)**: Optional translation
   - **Definition**: Explanation of the term
5. **Status Indicators**: Terms can have status markers:
   - **Preferred** (green): Recommended terminology
   - **Avoid** (yellow/orange): Obsolete terminology
   - **Don't Use** (red): Not recommended terminology

#### Crowdin Integration

The glossary integrates with Crowdin through the following process:

1. **Environment Variables**: Two environment variables must be configured:
   - `CROWDIN_TOKEN`: Authentication token for Crowdin API
   - `CROWDIN_ENGLISH_GLOSSARY_ID`: ID of the main glossary in Crowdin

2. **API Controller**: The `src/utils/crowdin-apis/crowdinController.ts` file handles all Crowdin interactions:
   - `fetchConcepts()`: Retrieves all concepts from the glossary
   - `fetchTerms()`: Retrieves all terms associated with concepts
   - `getCrowdinGlossaryData()`: Main function that:
     - Fetches concepts and terms from Crowdin
     - Organizes terms by language (en, es-MX, pt-BR)
     - Maps Crowdin statuses to display statuses
     - Returns formatted data ready for rendering

3. **Data Format**: Each glossary entry contains:
   ```typescript
   {
     id: number,
     definition: string,
     term_en_US: { text: string, status: string | null },
     term_es_MX: { text: string, status: string | null } | null,
     term_pt_BR: { text: string, status: string | null } | null
   }
   ```

4. **Revalidation**: The page uses Incremental Static Regeneration (ISR) with a revalidation period of 3600 seconds (1 hour), ensuring glossary updates from Crowdin are reflected without requiring a full rebuild

#### Maintenance

To maintain the glossary page:

1. **Updating Glossary Content**:
   - Log in to Crowdin and navigate to the glossary section
   - Add, edit, or delete terms as needed
   - Changes will automatically appear on the site after the next build or revalidation period

2. **Adding New Languages**:
   - Update the `getCrowdinGlossaryData()` function in `src/utils/crowdin-apis/crowdinController.ts` to include the new language ID
   - Add corresponding table headers in `src/pages/docs/glossary/index.tsx`
   - Update the TypeScript types to include the new language field

3. **Modifying the Table Display**:
   - Table configuration is in `src/pages/docs/glossary/index.tsx` within the DataTables initialization
   - Custom styles are defined in `src/pages/docs/glossary/glossary.module.css`
   - DataTables options include: search, pagination, column widths, and language strings

4. **Troubleshooting**:
   - Check browser console for DataTables initialization errors
   - Verify environment variables are properly set
   - Ensure Crowdin API token has appropriate permissions
   - Check build logs for API errors during `getStaticProps` execution

5. **Dependencies**:
   - jQuery 3.7.1
   - DataTables 2.3.2
   - Both are loaded via CDN in the page component

### Redirects

Redirect is the functionality that allows the browser to open a page with an address different from the one entered by the user in the URL field. This type of action is necessary when an old page address has been archived and a new one is created to replace it.

#### Creating a Redirect

Follow the steps below to create a new redirect:

1. Open a [feature branch](#feature-branches) in the repository.
2. In the [netlify.toml](https://github.com/content-portal/blob/main/netlify.toml) file, you will find an array of redirects. Add the one you want to create following the format below, replacing `from` and `to` with the desired slugs:

   ```toml
       [[redirects]]
       force = true
       from = "/es/topic/master-data"
       status = 308
       to = "/tutorial/what-is-master-data--4otjBnR27u4WUIciQsmkAw"
   ```

   > Make sure you add specific redirects before more global redirects, otherwise they will have no effect. For now, hashlinks (`#`) are not supported in the source slug.

3. Save the file.
4. Commit the modifications.
5. Open a PR on GitHub.

   > **Important note:** You should select the `release-no` option in the `Labels` field of the PR.

6. Tag at least one Localization Engineer as reviewer.
7. Once PR is approved, apply the merge to update the navigation sidebar.

## GitHub Actions

The repository uses several GitHub Actions to automate various processes. Below is a detailed description of each action:

### Release Version Workflow

**File:** `.github/workflows/release-version.yml`

This workflow automates the version release process when Pull Requests are merged into the `main` branch. It handles version bumping, changelog updates, and GitHub release creation.

**Dependencies:**

- `actions/checkout@v3`: Checks out the repository code
  - Used to access the repository files and perform git operations
  - Requires `GITHUB_TOKEN` secret for authentication
- `actions/create-release@v1`: Creates GitHub releases
  - Used to create new releases based on version tags
  - Requires `GITHUB_TOKEN` secret for authentication

**Trigger Conditions:**

- Runs on PR merge to `main` branch
- Supports different release types through PR labels:
  - `release-major`: Major version bump
  - `release-minor`: Minor version bump
  - `release-patch`: Patch version bump
  - `release-auto`: Automatic version bump based on commit messages
  - `release-no`: No version bump

### Verify Pull Request Labels

**File:** `.github/workflows/verify-pr-labels.yml`

This workflow ensures that Pull Requests have the correct labels for version management.

**Dependencies:**

- `jesusvasquez333/verify-pr-label-action@v1.4.0`: Validates PR labels
  - Checks if PR has valid release labels
  - Requires `GITHUB_TOKEN` secret for authentication

**Trigger Conditions:**

- Runs on PR events: opened, reopened, labeled, unlabeled, synchronize
- Only runs on `main` branch
- Validates against allowed labels: 'release-no', 'release-auto', 'release-patch', 'release-minor', 'release-major'

### Cypress Integration Tests

**File:** `.github/workflows/cypress.yml`

This workflow runs Cypress integration tests against Pull Requests to ensure code quality.

**Dependencies:**

- `actions/checkout@v1`: Checks out the repository code
- `fountainhead/action-wait-for-check@v1.1.0`: Waits for Netlify preview deployment
  - Ensures tests run against the latest deployed version
  - Requires `GITHUB_TOKEN` secret
- `jakepartusch/wait-for-netlify-action@v1.4`: Waits for Netlify preview URL
  - Ensures the preview site is accessible
  - Requires `NETLIFY_TOKEN` secret
- `wei/curl@v1`: Downloads navigation data
  - Fetches navigation.json for test fixtures
- `cypress-io/github-action@v5`: Runs Cypress tests
  - Executes integration tests
  - Requires environment variables:
    - `CYPRESS_baseUrl`: URL to test against
    - `CYPRESS_testProbability`: Test execution probability
- `thollander/actions-comment-pull-request@v2`: Comments test results on PR
  - Posts test summary as PR comment
  - Requires `GITHUB_TOKEN` secret

**Trigger Conditions:**

- Runs on Pull Request events
- Waits for Netlify preview deployment
- Runs tests with 10% probability
- Posts test results as PR comment

### Cypress Extensive Tests

**File:** `.github/workflows/cypress-extensive.yml`

This workflow runs comprehensive Cypress tests against the production environment.

**Dependencies:**

- `actions/checkout@v1`: Checks out the repository code
- `wei/curl@v1`: Downloads navigation data
  - Fetches navigation.json for test fixtures
- `cypress-io/github-action@v5`: Runs Cypress tests
  - Executes integration tests
  - Requires environment variables:
    - `CYPRESS_baseUrl`: Set to https://developers.vtex.com
    - `CYPRESS_testProbability`: Set to 1.0 (100% test execution)

**Trigger Conditions:**

- Manually triggered (workflow_dispatch)
- Runs all tests against production environment
- Generates summary report

### Lighthouse Mobile Tests

**File:** `.github/workflows/lighthouse-mobile.yml`

This workflow runs Lighthouse performance tests against mobile configurations.

**Dependencies:**

- `actions/checkout@v1`: Checks out the repository code
- `actions/setup-node@v1`: Sets up Node.js environment
  - Configures Node.js 14.x
- `kamranayub/wait-for-netlify-action@2.0.0`: Waits for Netlify preview
  - Ensures tests run against deployed preview
  - Requires `NETLIFY_TOKEN` secret
- `@lhci/cli@0.8.x`: Lighthouse CI tool
  - Runs performance tests
  - Requires `LHCI_GITHUB_APP_TOKEN` secret

**Trigger Conditions:**

- Runs on Pull Request events
- Waits for Netlify preview deployment
- Runs mobile-specific Lighthouse tests
- Uploads results to temporary public storage

### Lighthouse Desktop Tests

**File:** `.github/workflows/lighthouse-desktop.yml`

This workflow runs Lighthouse performance tests against desktop configurations.

**Dependencies:**

- `actions/checkout@v1`: Checks out the repository code
- `actions/setup-node@v1`: Sets up Node.js environment
  - Configures Node.js 14.x
- `kamranayub/wait-for-netlify-action@2.0.0`: Waits for Netlify preview
  - Ensures tests run against deployed preview
  - Requires `NETLIFY_TOKEN` secret
- `@lhci/cli@0.8.x`: Lighthouse CI tool
  - Runs performance tests
  - Requires `LHCI_GITHUB_APP_TOKEN` secret

**Trigger Conditions:**

- Runs on Pull Request events
- Waits for Netlify preview deployment
- Runs desktop-specific Lighthouse tests
- Uploads results to temporary public storage

## Contributing

### How to Develop and Propose a New Contribution

- **Step 1.** Create a _feature branch_ based on `main` (follow the naming pattern defined at [Feature Branches](#feature-branches) section).

  ```bash
  git checkout main
  git checkout -b feature/nice-new-thing
  ```

- **Step 2.** Develop the contribution in your _feature branch_ by making commits (see [How to Make a Commit](#how-to-make-a-commit) section).

  ```bash
  git add <filenames>
  git commit -m "feat: add nice new thing"
  ```

- **Step 3.** Push your _feature branch_ to the remote repository (in the following example represented by the _origin_ alias)

  ```bash
  git push origin feature/nice-new-thing
  ```

- **Step 4.** Open a Pull Request (PR), select its reviewers and add it one of the release labels:

  | Release Labels  | Description                                                                                                             | Release Type          |
  | --------------- | ----------------------------------------------------------------------------------------------------------------------- | --------------------- |
  | `release-no`    | When no new version should be released when the PR is merged into the `main` branch                                     | None                  |
  | `release-auto`  | When the new version to be released should be deducted automatically based on the PR semantic commits when it is merged | [PATCH, MINOR, MAJOR] |
  | `release-patch` | When the new version should be released as a patch                                                                      | PATCH                 |
  | `release-minor` | When the new version should be released as a minor                                                                      | MINOR                 |
  | `release-major` | When the new version should be released as a major                                                                      | MAJOR                 |

- **Step 5.** Verify if your Pull Request passed all checks that run against opened Pull Requests. In case any of them fail, look for a solution and update your _feature branch_. The most important test to pass is the **Build**.

  > **Important note:** If your branch has been updated with new commits, you should request new reviews to your PR.

- **Step 6.** When your PR has been approved by reviewers, make sure your feature branch is still rebased on the `main` branch.

- **Step 7.** After your PR has been rebased onto `main`, passed all checks, and been approved by reviewers, click on the **Merge Pull Request** option (the one that generates a merge commit). This way all commits from the _feature branch_ will be added to the base branch and their semantic messages will be considered to update `CHANGELOG.md` when releasing a new version.
- **Step 8.** The merged PR, if set to release a new version in **Step 4**, will trigger a GitHub action that results in a new commit `chore(release): v*.*.*`, a new version tag and its corresponding GitHub Release (see [Versioning](#versioning) section for more details) - you can verify those changes in the repository initial page after the workflow has finished. Wait for the build in Netlify to end and your released version will be deployed.
- **Step 9.** Celebrate! You have just finished your contribution to the VTEX Content Style Guide repository.

### What to Do When Someone Updated the `main` Branch and I'm Developing Something on My Feature Branch

Make a _rebase_ of your _feature branch_ on `main`:

```bash
# Bring to local main branch the remote main latest updates
git checkout main
git pull origin main

# Checkout your feature branch and rebase it onto main (solve possible conflicts)
git checkout feature/new-nice-thing
git rebase main

# Force push your rebased feature branch
git push --force origin feature/new-nice-thing
```

> **Important note:** Always maintain your _feature branch_ rebased on `main`.
