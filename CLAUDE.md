# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TresJS is a Vue-based declarative 3D rendering library built on top of Three.js. It uses a custom Vue renderer to create Three.js scenes using Vue components. This is a monorepo containing multiple packages managed by pnpm and optimized with NX.

## Key Packages

- **@tresjs/core** (`packages/core`): The core library implementing the Vue custom renderer for Three.js
- **@tresjs/cientos** (`packages/cientos`): Collection of helpers and abstractions (controls, loaders, staging, materials, shapes)
- **@tresjs/post-processing** (`packages/postprocessing`): Post-processing effects library built on pmndrs/postprocessing
- **@tresjs/leches** (`packages/leches`): Tasty GUI for Vue controls 🍰
- **@tresjs/eslint-config** (`packages/eslint-config`): Shared ESLint configuration for the ecosystem
- **@tresjs/nuxt** (`packages/nuxt`): Nuxt module integration

## Apps

- **docs** (`apps/docs`): Main documentation site (Nuxt + Nuxt UI Pro)
- **playground** (`apps/playground`): Development testing sandbox
- **cientos-docs-vitepress** (`apps/cientos-docs-vitepress`): Legacy Cientos documentation

## Architecture & Standards

Package and app-specific details are in their respective CLAUDE.md files:

**Packages:**
- **@tresjs/core**: [packages/core/CLAUDE.md](packages/core/CLAUDE.md)
- **@tresjs/cientos**: [packages/cientos/CLAUDE.md](packages/cientos/CLAUDE.md)
- **@tresjs/post-processing**: [packages/postprocessing/CLAUDE.md](packages/postprocessing/CLAUDE.md)
- **@tresjs/leches**: [packages/leches/CLAUDE.md](packages/leches/CLAUDE.md)
- **@tresjs/nuxt**: [packages/nuxt/CLAUDE.md](packages/nuxt/CLAUDE.md)
- **@tresjs/eslint-config**: [packages/eslint-config/CLAUDE.md](packages/eslint-config/CLAUDE.md)

**Apps:**
- **docs**: [apps/docs/CLAUDE.md](apps/docs/CLAUDE.md) - UI standards, Nuxt UI v4 preferences
- **playground**: [apps/playground/CLAUDE.md](apps/playground/CLAUDE.md)
- **cientos-docs-vitepress**: [apps/cientos-docs-vitepress/CLAUDE.md](apps/cientos-docs-vitepress/CLAUDE.md)


## Code Style & Standards

@./.claude/typescript.md

@./.claude/vue.md

## Release Process

Uses NX release with conventional commits:

```bash
# Version packages (without GitHub release)
pnpm nx release version

# Version with GitHub release
pnpm nx release --skip-publish

# Specific version
pnpm nx release version 1.2.3
```

After versioning, publishing happens via GitHub Actions "Publish" workflow.

Version increments follow conventional commits:
- `feat:` → minor bump
- `fix:` → patch bump
- `BREAKING CHANGE:` or `feat!:` → major bump

## Important Notes

### Workspace Dependencies
Packages use `workspace:*` protocol for internal dependencies. The catalog in `pnpm-workspace.yaml` manages shared dependency versions (Three.js, Vue, Vite, etc.).

### Build Configuration
Each package has its own Vite config. Core and Cientos build as libraries with `vite-plugin-dts` for type generation.


## Research & Documentation

- **NEVER hallucinate or guess URLs**
- ALWAYS try accessing the `llms.txt` or `llms-full.txt` file first to find relevant documentation. EXAMPLE: `https://ui.nuxt.com/llms.txt` or `https://docs.tresjs.org/llms-full.txt`
  - If it exists, it will contain other links to the documentation for the LLMs used in this project
- ALWAYS follow existing links in table of contents or documentation indices
- Verify examples and patterns from documentation before using
-