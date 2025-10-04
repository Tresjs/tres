![repository-banner.png](/public/github-banner.png)

# Tres Contributing Guide

Hi there!! If you are reading this guide, you are probably interested in contributing to Tres. You're awesome 🤩.

No contribution is too small, whether it is a typo in the docs, a bug report or refactoring a piece of code, every contribution is welcome, just make sure to follow the guidelines below ✌️.

Thanks from the heart 💚 for taking the time to help out. This guide will help you to get started with the project.

## Setup

Tresjs is a monorepo using [pnpm workspaces](https://pnpm.io/workspaces). Pnpm is a package manager that is faster than npm and yarn, and it also uses symlinks to avoid code duplication.

Make sure you are using [Node.js](https://nodejs.org/en/) version 14 or higher.

You can install pnpm using npm:

```bash
npm install -g pnpm
```

or using homebrew:

If you have the package manager installed, you can install pnpm using the following command:

```
brew install pnpm
```

To develop Tres core or any of the packages, run `pnpm install` in the root of the project. This will install all the dependencies and link the packages together. There is also a `postinstall` script that will build all the packages.

## Development

TresJS is an ecosystem of packages, each one of them has its own purpose. The main package is `@tresjs/core` which is the core of the library. The other packages are plugins that extend the core functionality, like `@tresjs/cientos` which is a plugin that adds a bunch abstractions and composables to make it easier to create 3D scenes.

### Core

You can go to the `packages/tres` folder and run `pnpm dev` to start the dev server. This will start a vite server that will watch for changes in the code and rebuild the package.

This is only a playground to test the core package, to keep the `App.vue` clean create a new component with your scene and import it in the `App.vue` file.

### Cientos

You can go to the `packages/cientos` folder and run `pnpm build --watch` to build the package and watch for changes. That way you can test the changes in the playground on the `packages/tres` folder.

### Docs

The docs are built using [vitepress](https://vitepress.vuejs.org/).

You can run `pnpm docs:dev` to start the dev server for the documentation. All the docs are located in the `docs` folder in markdown.

If you are adding a new page, make sure to add it to the `docs/.vitepress/config.ts` file following the sidebar structure.

### Testing

Currently there are no tests in place, but we are working on it. If you want to contribute with tests, please open an issue first to discuss the best approach.

## Pull Requests

Before opening a pull request, make sure to run `pnpm lint` to make sure the code is following the code style.

- Checkout a topic branch from the base branch `main` branch and merge back against that branch.
- Please follow the [commit message conventions](https://www.conventionalcommits.org/en/v1.0.0-beta.4/) when committing your changes. This is important because the release notes will be automatically generated from these messages. Small scoped commits are always preferred, as it is easier to review them.
- If adding new feature:
  - Provide convincing reason to add this feature. Ideally you should open a suggestion issue first and have it greenlighted before working on it. We would reject feature PRs that are not first opened as suggestions except for trivial changes.
  - Create a `feature/{issue-number}-add-test-to-core` branch for this feature. Make the name meaningful.
  - PR title must start with `feat(pkg): Descriptive title`. For example: `feat(core): added unit test to composables`.
- If fixing a bug 🐛:

  - Provide detailed description of the bug in the PR. Live demo preferred.
  - Create a `fix/{issue-number}-fix-test-in-core` branch for this bug fix.
  - If you are resolving a special issue, add `(fix #xxx[,#xxx])` (#xxx is the issue id) in your PR title for a better release log, e.g. `update entities encoding/decoding (fix #3899)`.

## Keep core small

The core package should be as small as possible, it should only contain the core functionality of the library. If you are adding a new feature, please consider adding it as a plugin instead, for example, if you want to add support for [Effect Composer](https://threejs.org/examples/?q=compo#webgl_postprocessing_effectcomposer) you should create a new package called `@tresjs/postprocessing` and add it as a plugin. If it's a smaller scope you can always add it to `cientos` package.
