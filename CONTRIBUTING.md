# Contributing to TresJS

Thank you for your interest in contributing to TresJS! We welcome contributions from everyone. This guide will help you get started with contributing to our NX monorepo.

## 📦 Monorepo Structure

This monorepo contains the following packages and apps:

### Packages

- **[@tresjs/core](./packages/core)** - Core Vue custom renderer for Three.js
- **[@tresjs/cientos](./packages/cientos)** - Collection of helpers and abstractions
- **[@tresjs/post-processing](./packages/postprocessing)** - Post-processing effects library
- **[@tresjs/leches](./packages/leches)** - Tasty GUI for Vue controls
- **[@tresjs/nuxt](./packages/nuxt)** - Nuxt module integration
- **[@tresjs/eslint-config](./packages/eslint-config)** - Shared ESLint configuration

### Apps

- **[docs](./apps/docs)** - Main documentation site (Nuxt + Nuxt UI Pro)
- **[playground](./apps/playground)** - Development testing sandbox
- **[lab](./apps/lab)** - Experimental features and testing environment

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [pnpm](https://pnpm.io/) v8 or higher (we use pnpm workspaces)
- [NX](https://nx.dev/) is included as a dev dependency (no global install needed)

### Development Setup

1. Fork and clone the repository:
```bash
git clone https://github.com/<your-username>/tres.git
cd tres
```

2. Install dependencies:
```bash
pnpm install
```

3. Build all packages:
```bash
pnpm build
```

4. Start development mode for a specific package:
```bash
# For core package (runs playground)
pnpm --filter playground dev

# For cientos package
pnpm --filter @tresjs/cientos dev
```

## 🏗️ Monorepo Workflow

This project uses **NX** for intelligent build caching and affected package detection.

### Building Packages

```bash
# Build all packages
pnpm build

# Build specific package
pnpm build @tresjs/core

# Build only affected packages
pnpm nx affected --target=build
```

### Running Tests

```bash
# Run all tests
pnpm test

# Test specific package
pnpm --filter @tresjs/core test
pnpm --filter @tresjs/core test:ui  # with UI and coverage

# Test only affected packages
pnpm nx affected --target=test
```

### Code Quality

```bash
# Lint all files
pnpm lint

# Auto-fix lint issues
pnpm lint:fix

# Type check all packages
pnpm typecheck
```

## 📝 Commit Convention

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification. This enables automatic version bumping and changelog generation.

### Commit Message Format

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code changes that neither fix a bug nor add a feature
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Changes to build process, dependencies, or tooling

### Scope

The scope should be the package or app name:

**Packages:**
- `core`
- `cientos`
- `postprocessing`
- `leches`
- `nuxt`
- `eslint-config`

**Apps:**
- `docs`
- `playground`
- `lab`

### Examples

```bash
feat(core): add useRaycaster composable
fix(cientos): correct OrbitControls damping behavior
docs(core): update useTresContext documentation
chore(nuxt): upgrade dependencies
```

### Breaking Changes

For breaking changes, add `!` after the type/scope or add `BREAKING CHANGE:` in the footer:

```bash
feat(core)!: change camera management API

BREAKING CHANGE: useCameraManager now requires sizes parameter
```

## 🎨 Code Style Guidelines

### TypeScript

- **Always use TypeScript** for all code
- **Avoid using `any`** - find a good type if possible  
- Use `type` for unions, `interface` for object shapes
- Document public APIs with JSDoc comments


### Vue Components

- Use `<script setup lang="ts">` syntax
- Define props with `defineProps<{ propName: Type }>()`
- Define emits with `defineEmits<{ eventName: [arg: Type] }>()`
- Use PascalCase for component names
- Use `defineModel()` for v-model bindings


### General Guidelines

- Write **descriptive variable and function names**
- Keep functions **small and focused**
- Add **JSDoc comments** for public APIs
- Write **unit tests** for new features
- Ensure **type safety** throughout

## 🧪 Testing

We use Vitest for unit testing:

```bash
# Run tests for a package
pnpm --filter @tresjs/core test

# Run tests with UI
pnpm --filter @tresjs/core test:ui

# Run tests in watch mode
pnpm --filter @tresjs/core test:watch
```

Please include tests for:
- New features
- Bug fixes
- Edge cases
- Breaking changes

## 📖 Documentation

When contributing features or fixes:

1. Update relevant documentation in the package
2. Add JSDoc comments to public APIs
3. Include usage examples where appropriate
4. Update the docs site if needed (in `apps/docs`)

## 🔄 Pull Request Process

1. **Create an issue** first for major features or changes
2. **Fork the repository** and create your branch from `main`
3. **Make your changes** following our code style guidelines
4. **Write or update tests** as needed
5. **Ensure all tests pass**: `pnpm test`
6. **Ensure linting passes**: `pnpm lint`
7. **Ensure type checking passes**: `pnpm typecheck`
8. **Commit using conventional commits**
9. **Push to your fork** and submit a pull request

### PR Guidelines

- Keep pull requests **scoped and small** to avoid overcomplicating the PR and making it harder to review. If you are working on a new feature, please consider splitting it into smaller PRs.
- Reference the issue number in your PR description
- Provide a clear description of the changes
- Include screenshots/videos for visual changes
- Update documentation as needed

> [!IMPORTANT]
> At least one core team member must review and approve the PR before merging.

## 🎯 Contribution Guidelines

### Keep Core Minimal

The `@tresjs/core` package should remain minimal and focused on the core Three.js/Vue integration. Consider adding complex features to:
- `@tresjs/cientos` for helpers and abstractions
- `@tresjs/post-processing` for effects
- A new package if it's a distinct feature set

### Bug Reports

When reporting bugs, please include:
- A clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Minimal reproduction (CodeSandbox, StackBlitz, etc.)
- Environment details (OS, browser, versions)

### Feature Requests

For new features:
- Open an issue first to discuss the feature
- Explain the use case and benefits
- Consider if it belongs in core or a separate package
- Be open to feedback and alternative approaches

## 💬 Community

- Join our [Discord server](https://discord.gg/UCr96AQmWn) for questions and discussions
- Follow [@tresjs_dev](https://twitter.com/tresjs_dev) on Twitter
- Check out [discussions](https://github.com/Tresjs/tres/discussions) for Q&A

## 📄 License

By contributing to TresJS, you agree that your contributions will be licensed under the [MIT License](./LICENSE).

## 🙏 Thank You

Thank you for contributing to TresJS! Every contribution, no matter how small, helps make the project better for everyone.
