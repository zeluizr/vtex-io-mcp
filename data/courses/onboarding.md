# Onboarding

**Course ID:** onboarding
**Description:** Get started with VTEX IO development — environment setup, tooling, and learning path.

## Overview

This onboarding guide walks you through setting up your VTEX IO development environment, understanding the prerequisites, and navigating the learning path. Complete this before starting any other courses.

---

## Step 01 — Introduction and Environment Setup

### Setting up on macOS

1. Install Homebrew (if not installed):
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

2. Install Node.js (v18 or later recommended):
```bash
brew install node
```

3. Install Git:
```bash
brew install git
```

4. Install the VTEX CLI:
```bash
npm install -g vtex
```

### Setting up on Linux (Ubuntu/Debian)

```bash
# Node.js via nvm (recommended)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 18
nvm use 18

# VTEX CLI
npm install -g vtex
```

### Setting up on Windows

1. Install [Node.js](https://nodejs.org/) (v18+)
2. Install [Git for Windows](https://gitforwindows.org/)
3. Install VTEX CLI:
```bash
npm install -g vtex
```

### Login and workspace

```bash
# Login to your VTEX account
vtex login {accountName}

# Create and switch to a development workspace
vtex use {workspaceName}

# Verify your environment
vtex whoami
```

---

## Step 02 — Technical Requirements

### Required knowledge

Before building VTEX IO apps, you should be comfortable with:

**Frontend (Store Framework and React apps):**
- **CSS3** — Selectors, box model, flexbox, responsive design
  - Resource: [MDN CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- **JSON** — Syntax, nesting, arrays, objects
  - Resource: [JSON.org](https://www.json.org/)
- **TypeScript** — Types, interfaces, generics, async/await
  - Resource: [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- **React** — Components, props, state, hooks (useState, useEffect, useContext)
  - Resource: [React docs](https://react.dev/learn)

**Backend (Node services):**
- **Node.js** — Modules, async patterns, HTTP
  - Resource: [Node.js docs](https://nodejs.org/en/docs/)
- **GraphQL** — Schema, queries, mutations, resolvers
  - Resource: [GraphQL intro](https://graphql.org/learn/)

### VTEX IO specific concepts

You will learn these during the courses:
- Store Framework block system
- `vtex link` development loop
- `manifest.json` structure
- Builders: `store`, `react`, `node`, `graphql`
- CSS Handles system
- Master Data

---

## Step 03 — Learning Flow

### Recommended course order

1. **Onboarding** (this course) — Environment setup
2. **Basic Blocks** — Core Store Framework blocks
3. **Layout Blocks** — Complex layout composition
4. **Making Your Store Unique** (Styles Course) — CSS and customization
5. **Custom Blocks** (Store Block) — React component development
6. **Services** — Node.js backend services
7. **Calling Commerce APIs** — VTEX API integration
8. **Admin Applications** — Admin panel apps
9. **Site Editor and Content** — Content management workflow
10. **Improving Performance** — Performance optimization

### Development loop

The standard VTEX IO development workflow:

```bash
# 1. Start a workspace
vtex use dev

# 2. Link your app (watches for file changes)
vtex link

# 3. Open your workspace URL in the browser
# https://dev--{account}.myvtex.com

# 4. Make changes — they hot-reload automatically

# 5. When ready to share, publish
vtex use release --production
vtex publish

# 6. Install in another workspace to test
vtex use testing
vtex install {vendor}.{appname}@0.0.1

# 7. Promote to master when validated
vtex workspace promote
```

### Key CLI commands reference

| Command | Description |
|---------|-------------|
| `vtex login {account}` | Log in to a VTEX account |
| `vtex whoami` | Show current account and workspace |
| `vtex use {workspace}` | Switch to or create a workspace |
| `vtex link` | Link app and watch for changes |
| `vtex unlink` | Unlink app from workspace |
| `vtex publish` | Publish app to registry |
| `vtex deploy` | Deploy a stable release |
| `vtex install {app}` | Install an app in current workspace |
| `vtex uninstall {app}` | Uninstall an app |
| `vtex workspace list` | List all workspaces |
| `vtex workspace promote` | Promote workspace to master |
| `vtex ls` | List installed apps |
| `vtex init` | Scaffold a new app from template |
