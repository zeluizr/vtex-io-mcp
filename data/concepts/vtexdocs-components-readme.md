# VTEX Documentation - Component Library

## Summary

- [About](#about)
- [Included Components](#included-components)
- [Development](#development)
  - [Installation](#installation)
  - [Run Storybook](#run-storybook)
  - [Styling](#styling)
  - [Context](#context)
  - [Search](#search)
  - [Testing](#testing)

## About

This collection of components has been specifically crafted for integration with the [Developers Portal](https://github.com/vtexdocs/devportal) and the [Help Center](https://github.com/vtexdocs/helpcenter).

## Included Components

- Was this helpful?
- Hamburger Menu
- Markdown Renderer
- Search Input
- Detailed Search
- Table Of Contents

## Development

### Installation

To get started, install the required dependencies using Yarn:

```bash
yarn
```

Build the library with the following command:

```bash
yarn run build
```

The generated files can be found in the ./dist folder.

### Run Storybook

Explore and interact with the components using Storybook:

```bash
yarn storybook
```

⚠️ Please note that the `yarn build-storybook` command is currently not working as expected.

### Styling

The library utilizes components from the [@vtex/brand-ui library](https://www.npmjs.com/package/@vtex/brand-ui). When using the Component Library, wrap all components in the @vtex/brand-ui `ThemeProvider` to ensure consistent styling. The Storybook documentation uses the ThemeProvider to show the expected styling.

### Context

To use the library, wrap it in the `LibraryContextProvider`. This provider requires the following props: `sections`, `isPreview`, `fallback`, `sectionSelected`, and `locale`.

Example usage:

```tsx
<ThemeProvider>
    <LibraryContextProvider
        sections={sections}
        isPreview={isPreview}
        fallback={sidebarfallback}
        sectionSelected={sectionSelected}
    >
        <Header />
        <Content /> {/* Where all the components are used */}
        <Footer />
    </LibraryContextProvider>
</ThemeProvider>
```

### Search

For search functionality, pass the `appId`, `apiKey`, and `index` for the search client. Create a configuration file and use the `SearchConfig` function:

```typescript
import { SearchConfig } from '@vtexdocs/components'

const libraryConfig = {
  appId: process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || '',
  apiKey: process.env.NEXT_PUBLIC_ALGOLIA_WRITE_KEY || '',
  index: process.env.NEXT_PUBLIC_INDEX || '',
}

export default SearchConfig(libraryConfig)
```

### Testing with a repository

When testing changes to the component library in another repository (e.g., a documentation portal like helpcenter or devportal), follow these steps to ensure that your updates are correctly integrated. This process involves updating the components repository, applying the changes in the target repository, and verifying them in a local development environment.

#### Updating the components repository

1. Make the necessary changes to the components.
2. Commit your changes.
3. Build the project:

   ```bash
   yarn run build
   ```

4. Commit the generated build files.
5. Push your changes to the remote repository.

#### Updating a target repository

If the branch is not yet in use in the `package.json` file in the target repository:

1. Update the `package.json` file in the target repository to reference the branch:

   ```json
   "@vtexdocs/components": "https://github.com/vtexdocs/components.git#fix/slugify"
   ```

2. Install dependencies:

   ```bash
   yarn
   ```
3. Start the development server:

   ```bash
   yarn dev
   ```

If the branch is already in use:

1. Remove the branch reference in the `package.json` file in the target repository:

   ```json
   "@vtexdocs/components": "https://github.com/vtexdocs/components.git"
   ```

2. Install dependencies:

   ```bash
   yarn
   ```

3. Re-add the branch reference to the `package.json` file:

   ```json
   "@vtexdocs/components": "https://github.com/vtexdocs/components.git#fix/slugify"
   ```

4. Reinstall dependencies:

   ```bash
   yarn
   ```

5. Start the development server:

   ```bash
   yarn dev
   ```

>⚠️ If the local development environment isn't refreshing the components version properly, try erasing the `.next` folder locally before running `yarn` and `yarn dev` again.

Feel free to explore and integrate these components into your project. If you encounter any issues, please refer to the documentation or reach out to our community for assistance.
