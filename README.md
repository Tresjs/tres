![repo-banner](https://github.com/Tresjs/.github/raw/main/.github/tres-banner.png)

<p align="center">
  <a href="https://www.npmjs.com/package/@tresjs/core"><img src="https://img.shields.io/npm/v/@tresjs/core?color=%2382DBCA&logo=data:image/svg%2bxml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTExLjY4NTQgMy40MjkxNkMxMi4wNzM4IDIuNzgxODIgMTMuMDEyIDIuNzgxODIgMTMuNDAwNCAzLjQyOTE1TDE5LjE3NzEgMTMuMDU2OUMxOS41NzcgMTMuNzIzNSAxOS4wOTY5IDE0LjU3MTQgMTguMzE5NiAxNC41NzE0SDYuNzY2MjRDNS45ODg5NCAxNC41NzE0IDUuNTA4ODMgMTMuNzIzNSA1LjkwODc1IDEzLjA1NjlMMTEuNjg1NCAzLjQyOTE2WiIgZmlsbD0iIzgyREJDNSIvPgo8cGF0aCBkPSJNMTUuNjg1NyAxMC41NDI5QzE1LjY4NTcgOS45OTA1OSAxNi4xMzM0IDkuNTQyODggMTYuNjg1NyA5LjU0Mjg4SDI2QzI2LjU1MjIgOS41NDI4OCAyNyA5Ljk5MDU5IDI3IDEwLjU0MjlWMTkuODU3MkMyNyAyMC40MDk0IDI2LjU1MjIgMjAuODU3MiAyNiAyMC44NTcySDE2LjY4NTdDMTYuMTMzNCAyMC44NTcyIDE1LjY4NTcgMjAuNDA5NCAxNS42ODU3IDE5Ljg1NzJWMTAuNTQyOVoiIGZpbGw9IiM0RjRGNEYiLz4KPGNpcmNsZSBjeD0iMTYiIGN5PSIyMiIgcj0iNiIgZmlsbD0iI0VGQUMzNSIvPgo8L3N2Zz4K" alt="npm package"></a>
  <a href="https://www.npmjs.com/package/@tresjs/core"><img src="https://img.shields.io/npm/dm/@tresjs/core?color=%2382DBCA" alt="npm downloads"></a>
  <a href="https://discord.gg/UCr96AQmWn"><img src="https://img.shields.io/badge/chat-discord-purple?style=flat&logo=discord" alt="discord chat"></a>
  <a href="https://app.netlify.com/sites/tresjs-docs/deploys"><img src="https://api.netlify.com/api/v1/badges/5a59eb67-67f1-4c9d-bdf4-2f9a5899a531/deploy-status" alt="netlify status"></a>
</p>

# TresJS Ecosystem

> Declarative ThreeJS using Vue Components

- 💡 Build 3D scene as they were Vue components
- 🥰 It brings all the updated features of ThreeJS right away regardless the version
- 🦾 Fully Typed

Tres (Spanish word for "three", pronounced `/tres/` ) is a way of creating ThreeJS scenes with Vue components in a declarative fashion.

It's build on-top of a [Vue Custom Renderer](https://vuejs.org/api/custom-renderer.html#createrenderer) and it's powered by Vite.

The goal is to provide the Vue's community an easy way of building 3D scenes with Vue, always up to date with the latest ThreeJS features and with 0-to-none maintenance.

## Installation

```bash
pnpm install @tresjs/core three
```

## Docs

Checkout the [docs](https://tresjs.org)

## Demos

- [Stackblitz Collection](https://stackblitz.com/@alvarosabu/collections/tresjs)

## Ecosystem

| Package                                                      | Version                                                                                                            | Downloads                                                                                        |
| ------------------------------------------------------------ | :----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| [Tres](https://github.com/TresJS/tres)                       | ![tres version](https://img.shields.io/npm/v/@tresjs/core/latest.svg?label=%20&color=%2382DBCA)                    | ![tres downloads](https://img.shields.io/npm/dm/@tresjs/core?color=%2382DBCA)                    |
| [Cientos](https://github.com/TresJS/cientos)                 | ![cientos version](https://img.shields.io/npm/v/@tresjs/cientos/latest.svg?label=%20&color=%23f19b00)              | ![cientos downloads](https://img.shields.io/npm/dm/@tresjs/cientos?color=%23f19b00)              |
| [Post-processing](https://github.com/TresJS/post-processing) | ![post-processing version](https://img.shields.io/npm/v/@tresjs/post-processing/latest.svg?label=%20&color=ff7bac) | ![post-processing downloads](https://img.shields.io/npm/dm/@tresjs/post-processing?color=ff7bac) |
| [Nuxt](https://github.com/TresJS/nuxt)                       | ![nuxt version](https://img.shields.io/npm/v/@tresjs/nuxt/latest.svg?label=%20&color=4f4f4f&logo=nuxt.js)          | ![nuxt downloads](https://img.shields.io/npm/dm/@tresjs/nuxt?color=4f4f4f&logo=nuxt.js)          |
| [TresLeches 🍰](https://github.com/TresJS/leches)            | ![tresleches version](https://img.shields.io/npm/v/@tresjs/leches/latest.svg?label=%20&color=ffffff)               | ![tresleches downloads](https://img.shields.io/npm/dm/@tresjs/leches?color=ffffff)               |

## 🛠️ Development

### Prerequisites

- Node.js (v18 or later)
- pnpm (v8 or later)
- Git

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/tresjs/tres.git
   cd tres
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

### Package Management with PNPM

This repository uses PNPM as its primary package manager, providing efficient dependency management and disk space usage. The workspace is configured in `pnpm-workspace.yaml` and includes all packages in the `packages/` directory.

Common PNPM commands:

```bash
# Install dependencies
pnpm install

# Add a dependency to a specific package
pnpm add <package> --filter @tresjs/cientos

# Run a script in a specific package
pnpm --filter @tresjs/cientos <script>
```

### Development with NX

While PNPM manages our packages, we use NX to optimize our development workflow. NX provides powerful features for:

- Intelligent caching
- Affected package detection
- Dependency graph visualization
- Parallel task execution
- Project-specific configurations

#### Common NX Commands

```bash
# Build all packages
pnpm build

# Build a specific package
pnpm build @tresjs/cientos

# Run tests for affected packages
pnpm nx affected:test

# Show dependency graph
pnpm nx graph

# Run commands only on affected packages
pnpm nx affected --target=build
```

#### Development Workflows

```bash
# Start development mode for a package
pnpm dev @tresjs/cientos

# Run tests in watch mode
pnpm test:watch @tresjs/cientos

# Lint all packages
pnpm lint

# Format all packages
pnpm format

# Check types
pnpm typecheck
```

For more advanced NX usage, we recommend exploring:

- [NX Documentation](https://nx.dev/docs)
- [NX Cache](https://nx.dev/concepts/how-caching-works)
- [NX Affected](https://nx.dev/concepts/affected)
- [NX Project Configuration](https://nx.dev/concepts/project-configuration)

### Repository Administration

For repository administrators, we provide the `monocubo` tool to help manage the monorepo. This tool assists with:

- Package migration
- Dependency management
- Repository maintenance
- Release coordination

See the [monocubo package](tools/monocubo) for detailed documentation and usage instructions.

## Contribution

> [!WARNING]
> WIP

We are open to contributions, please read the [contributing guide](/CONTRIBUTING.md) to get started.

## License

[MIT](/LICENSE)

## Sponsors

<p align="center">
  <a target="_blank" href="https://github.com/sponsors/tresjs">
    <img alt="sponsors" src="./sponsorkit/sponsors.png">
  </a>
</p>
