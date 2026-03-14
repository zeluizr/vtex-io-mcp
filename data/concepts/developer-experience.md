# Developer Experience

Overview of the tools and resources available to development teams on VTEX IO.

## App development

[VTEX IO](https://developers.vtex.com/docs/guides/vtex-io-documentation-what-is-vtex-io) is VTEX's development platform that simplifies building, managing, and scaling ecommerce solutions.

**Technologies supported:** TypeScript, React, GraphQL, Node.js

**Capabilities:**
- Build custom web storefronts
- Customize the shopper experience
- Integrate with third-party systems
- Create custom applications to extend VTEX IO functionalities

### Developer tools

#### Command Line Interface (CLI)

[VTEX IO CLI](https://developers.vtex.com/docs/guides/vtex-io-documentation-vtex-io-cli-installation-and-command-reference) is the starting and ending point for any VTEX IO development. It allows:
- Releasing new app versions
- Publishing apps
- Managing workspaces
- Linking apps in development mode

For FastStore projects, the [FastStore CLI](https://developers.vtex.com/docs/guides/faststore/getting-started-3-faststore-cli) connects source code from `@faststore/core` with your customizations.

#### Workspaces

[Workspaces](https://developers.vtex.com/docs/guides/vtex-io-documentation-workspace) are isolated environments for app development — separate versions of the same account.

| Type | Description |
|------|-------------|
| **Master** | Unique production workspace reflecting the live store content |
| **Development workspaces** | Allow testing changes in real time without affecting user traffic or the live store. Required for storefront changes or new app development |
| **Production workspaces** | Handle real traffic. Used to run A/B tests and can be promoted to master |

#### A/B tests

After installing an app in a production workspace, run [A/B tests](https://developers.vtex.com/docs/guides/vtex-io-documentation-running-native-ab-testing) to compare traffic and choose the workspace that performs better in engagement and conversions.

#### Builders

[Builders](https://developers.vtex.com/docs/guides/vtex-io-documentation-builders) streamline development by abstracting complex implementation details. They act as bridges, allowing different parts of an app to work together by configuring and connecting to necessary services.

Key builders:
- **react** (3.x): Developing new storefront apps
- **styles** (2.x): Setting styles for components within a Store Theme app
- **node** (6.x): Backend services
- **graphql** (1.x): GraphQL schema and resolvers
- **store** (0.x): Store Framework blocks and routes
- **messages** (1.x): Internationalization
- **admin** (0.x): Admin panel apps
- **docs** (0.x): Publishing app documentation
- **pixel** (0.x): Pixel/tracking scripts

Benefits: flexibility, scalability, code reusability, and rapid deployment.

#### Edition Apps

[Edition Apps](https://developers.vtex.com/docs/guides/vtex-io-documentation-edition-app) are collections of VTEX apps that define the functionalities available in a VTEX account. They bundle settings, policies, backend and frontend apps.

Native Edition Apps:
- **Edition Store**: For Store Framework stores
- **Edition Business**: For Legacy CMS Portal stores

### VTEX apps

[VTEX Apps](https://developers.vtex.com/docs/guides/vtex-io-documentation-what-is-a-vtex-app) expand VTEX platform capabilities. Types:

| Type | Description |
|------|-------------|
| **Storefront apps** | React components that enhance store functionality and UX (carousels, navigation menus, etc.) |
| **Backend apps** | Node or .NET Core services that export HTTP routes, GraphQL resolvers, and event handlers |
| **Pixel apps** | Collect user data for third-party services by running scripts on all store pages |
| **Edition Apps** | Bundles of settings, policies, backend, and frontend apps in a single app |

**Code templates** are available to simplify development — no need to write boilerplate code.

#### VTEX App Store

[VTEX App Store](https://developers.vtex.com/docs/guides/vtex-app-store) is a marketplace for VTEX IO plug-and-play solutions. Developers can publish apps here for the wider VTEX ecosystem.

See [App Store Guidelines](https://developers.vtex.com/docs/guides/vtex-io-documentation-homologation-requirements-for-vtex-app-store) for homologation requirements.

#### Deployment flow

The deployment process for a new app version:

1. **Release**: Mark the beginning with Git, update version in `manifest.json`, document changes in `CHANGELOG.md`
2. **Publish**: App version becomes a candidate version, ready for testing in a production workspace
3. **Test**: Run A/B tests
4. **Deploy**: Update the app version across all accounts where the app is installed
5. **Promote** (optional): Promote the production workspace to master

App versioning follows the [SemVer standard](https://semver.org/).

## Storefront development

VTEX offers three storefront options:

| Option | Description | Status |
|--------|-------------|--------|
| **FastStore** | Jamstack-based architecture. Prioritizes performance and stability. Easily maintainable for editing store pages | Current (recommended for new stores) |
| **Store Framework** | Composable and flexible model using VTEX IO apps for dynamic storefronts | Current |
| **Legacy CMS Portal** | HTML, CSS, JavaScript managed exclusively through VTEX Admin | Legacy — not available for new stores |

## Contributions and collaboration

[VTEX Community](https://community.vtex.com/) is an ecosystem where clients and partners can interact, ask questions, and exchange information.

**Community features:**
- Forums and discussion groups
- Questions about development, implementation, optimization, and best practices
- Knowledge sharing and code contributions
- Collaboration to improve the platform and address common challenges

---

Source: https://developers.vtex.com/docs/guides/developer-experience
