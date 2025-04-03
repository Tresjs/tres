# Contributing Guide

Hi there!! If you are reading this guide, you are probably interested in contributing to Tres. You're awesome 🤩. First of all, thank you for taking the time to help out. No contribution is too small, whether it's:

- Reporting a bug 🐛
- Discussing the current state of the code 💬
- Submitting a fix 🔧
- Proposing new features ✨
- Improving documentation 📚

Thanks from the heart 💚 for taking the time to help out. This guide will help you to get started with the project.

## Ecosystem
- [@tresjs/core](https://github.com/Tresjs/tres) - The core package.
- [@tresjs/cientos](https://github.com/Tresjs/cientos) - The abstractions package.
- [@tresjs/postprocessing](https://github.com/Tresjs/post-processing) - The post-processing package.
- [@tresjs/nuxt](https://github.com/Tresjs/nuxt) - The Nuxt module.

## Development Process

We use GitHub to host code, to track issues and feature requests, as well as accept pull requests.

### Pull Requests

1. Fork the repo and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes `pnpm test`
5. Make sure your code lints `pnpm lint`

### Commit Messages

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification. This leads to more readable messages that are easy to follow when looking through the project history.

This is important because the release notes will be automatically generated from these messages. Small scoped commits are always preferred, as it is easier to review them.

```
<type>(<scope>): <description>

[optional body]

```

#### Type
Must be one of the following:

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools

#### Scope

The scope should be the name of the module/part affected (as perceived by the person reading the changelog generated from commit messages).

#### Examples

```
feat(core): add new component API
fix(ui): resolve button click event issue
docs(api): update authentication documentation
```

### OSS etiquette

#### Adding a new feature

Provide a convincing reason to add this feature. Ideally you should open a suggestion issue first and have it greenlighted before working on it. We would reject feature PRs that are not first opened as suggestions except for trivial changes.

#### Fixing a bug 🐛

- Link the related issue in the PR description, use `Closes #123` so Github will automatically close the issue when the PR is merged.
- Provide a short description on how the issue is resolved by your changes.
-  Create a `fix/{issue-number}-fix-test-in-core` branch for this bug fix.

### Setup

All the packages in the ecosystem use [pnpm workspaces](https://pnpm.io/workspaces). Pnpm is a package manager that is faster than npm and yarn. It also uses symlinks to avoid code duplication.

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

1. Install dependencies:
```bash
pnpm install
```

2. Start development server:
```bash
pnpm dev
```

### Code Style

- We use ESLint for code linting
- TypeScript is preferred over JavaScript
- Follow the existing code style
- Write descriptive variable and function names
- Add JSDoc comments for functions and complex logic
- Keep functions small and focused
- Write unit tests for new features

### Development

To start developing, you can run `pnpm run playground` in the root folder.

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

We use [Vitest](https://vitest.dev/) for unit testing.

To run the tests, you can use the following command:

```bash
pnpm test
```

It's tricky to test code related to Three.js since it's based on the `canvas` element. So add tests where they matter like:

- Testing a utility function that traverse a Three.js object
- A composable wrapper around a Three.js class

Rule of thumb, everything that doesn't need to be visually tested, should be tested.

## Third Party Libraries

Adding a new third party library is generally discouraged, unless it is absolutely necessary. If you want to add a new library, please open an issue first to discuss the best approach.

## Keep core small

The core package should be as small as possible, it should only contain the core functionality of the library. If you are adding a new feature, please consider adding it as a plugin instead. If it's a smaller scope you can always add it to the `cientos` package.

### Assets

If you need/want to add assets like models, videos, music, textures, etc. Please consider adding to our [official assets repo](https://github.com/Tresjs/assets).

## Issue Reporting Guidelines

### Before Submitting an Issue

- Check that the issue hasn't already been reported
- Check that the issue has not been fixed in the latest main branch
- Clearly describe the problem
- Include a minimal reproduction otherwise the issue will me marked as `needs-reproduction` and closed after a while if there is no response from the contributor.

Why reproductions are required [https://antfu.me/posts/why-reproductions-are-required](https://antfu.me/posts/why-reproductions-are-required)

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.

## Questions?

Don't hesitate to reach out to the community in the [Discord server](https://discord.gg/8WMS3q2W).

---

Thank you for contributing! 💚 