# CLAUDE.md

TresJS is a Vue-based declarative 3D custom renderer for Three.js

## Key Packages

- **@tresjs/core** (`packages/core`): The core library implementing the Vue custom renderer for Three.js
- **@tresjs/cientos** (`packages/cientos`): Collection of helpers and abstractions (controls, loaders, staging, materials, shapes)
- **@tresjs/post-processing** (`packages/postprocessing`): Post-processing effects library built on pmndrs/postprocessing
- **@tresjs/leches** (`packages/leches`): Tasty GUI for Vue controls 🍰
- **@tresjs/eslint-config** (`packages/eslint-config`): Shared ESLint configuration for the ecosystem
- **@tresjs/nuxt** (`packages/nuxt`): Nuxt module integration


## Versioning

Version increments follow conventional commits:
- `feat:` → minor bump
- `fix:` → patch bump
- `BREAKING CHANGE:` or `feat!:` → major bump


### Workspace Dependencies
Packages use pnpm's `workspace:*` protocol for internal dependencies. The catalog in `pnpm-workspace.yaml` manages shared dependency versions (Three.js, Vue, Vite, etc.).

## Research & Documentation

- **NEVER hallucinate or guess URLs**
- ALWAYS try accessing the `llms.txt` or `llms-full.txt` file first to find relevant documentation. EXAMPLE: `https://ui.nuxt.com/llms.txt` or `https://docs.tresjs.org/llms-full.txt`
  - If it exists, it will contain other links to the documentation for the LLMs used in this project
- ALWAYS follow existing links in table of contents or documentation indices
- Verify examples and patterns from documentation before using