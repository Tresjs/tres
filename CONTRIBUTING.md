![repository-banner.png](https://res.cloudinary.com/alvarosaburido/image/upload/v1683452574/repo-banner_d2xeem.png)

# Tres Contributing Guide

Hi there!! If you are reading this guide, you are probably interested in contributing to Tres. You're awesome 🤩.

No contribution is too small, whether it is a typo in the docs, a bug report or refactoring a piece of code, every contribution is welcome, just make sure to follow the guidelines below ✌️.

Thanks from the heart 💚 for taking the time to help out. This guide will help you to get started with the project.

## Ecosystem
- [@tresjs/core](https://github.com/Tresjs/tres) - The core package.
- [@tresjs/cientos](https://github.com/Tresjs/cientos) - The abstractions package.
- [@tresjs/postprocessing](https://github.com/Tresjs/post-processing) - The post-processing package.

## Setup

All the packages in the ecosystem use [pnpm workspaces](https://pnpm.io/workspaces). PnPM is a package manager that is faster than npm and yarn. It also uses symlinks to avoid code duplication.

The `workspace` has the following structure:


```
.
├── docs // The documentation
├── playground // The playground to test the package
├── src // The source code

```

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


## Development

To start developing, you can run `pnpm playground` in the root folder.

This will start the dev server for the playground at `http://localhost:5173/` where you can test the changes you are making in the `src` folder. 


> **Important**
> There is no need to run anything in the `src` folder or in the root, the `playground` will take care of it


Whenever you are working on a new feature or fixing a bug, make sure to add a demo under `playground/src/pages` and create a route in the `playground/src/router.ts` to test the changes you are making.

> **Warning**
> Make sure to check if there is already a demo for the feature you are working on. If so, feel free to add your changes to the existing demo.



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
  - Create a `feature/{issue-number}-add-test-to-cientos` branch for this feature. Make the name meaningful.
  - PR title must start with `feat(pkg): Descriptive title`. For example: `feat(cientos): added unit test to composables`.
- If fixing a bug 🐛:

  - Provide detailed description of the bug in the PR. Live demo preferred.
  - Create a `fix/{issue-number}-fix-test-in-core` branch for this bug fix.
  - If you are resolving a special issue, add `(fix #xxx[,#xxx])` (#xxx is the issue id) in your PR title for a better release log, e.g. `update entities encoding/decoding (fix #3899)`.

## Third Party Libraries

Adding a new third party library is generally discouraged, unless it is absolutely necessary. If you want to add a new library, please open an issue first to discuss the best approach.
