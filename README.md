![repo-banner](/public/repo-banner.png)

<p align="center">
  <a href="https://www.npmjs.com/package/@tresjs/core"><img src="https://img.shields.io/npm/v/@tresjs/core/latest?color=%2382DBCA" alt="npm package"></a>
  <a href="https://discord.gg/UCr96AQmWn"><img src="https://img.shields.io/badge/chat-discord-purple?style=flat&logo=discord" alt="discord chat"></a>
</p>

# TresJS `@tresjs/core`

> Declarative ThreeJS using Vue Components

- 💡 Build 3D scene as they were Vue components
- ⚡️ Powered by Vite
- 🥰 It brings all the updated features of ThreeJS right away regardless the version
- 🦾 Fully Typed

Tres (Spanish word for "three", pronounced `/tres/` ) is a way of creating ThreeJS scenes with Vue components in a declarative fashion.

It's build on-top of a [Vue Custom Renderer](https://vuejs.org/api/custom-renderer.html#createrenderer) and it's powered by Vite.

The goal is to provide the Vue's community an easy way of building 3D scenes with Vue, always up to date with the latest ThreeJS features and with 0-to-none mantainance.

## Installation

```bash
pnpm install @tresjs/core three
```

## Docs

Checkout the [docs](https://tresjs.org)

## Demos

- [Stackblitz Collection](https://stackblitz.com/@alvarosabu/collections/tresjs)

## Ecosystem

| Package                     | Version                                                                                            |
| --------------------------- | :------------------------------------------------------------------------------------------------- |
| [Tres](packages/tres)       | ![tres version](https://img.shields.io/npm/v/@tresjs/core/latest.svg?label=%20&color=%2382DBCA)    |
| [Cientos](packages/cientos) | ![cientos version](https://img.shields.io/npm/v/@tresjs/cientos/latest.svg?label=%20&color=%23f19b00) |
| [Post-processing](packages/post-processing) | ![post-processing version](https://img.shields.io/npm/v/@tresjs/post-processing/latest.svg?label=%20&color=%ff7bac00) |

## Contribution

We are open to contributions, please read the [contributing guide](/CONTRIBUTING.md) to get started.

### Setup

```
pnpm install --shamefully-hoist
```

### Playground

To run the small playground

```
pnpm run playground
```

### Build lib

To build the core as library mode just use

```
pnpm run build
```

### Docs

To run de docs in dev mode

```bash
pnpm run docs:dev
```

To build them

```bash
pnpm run docs:build
```

## License

[MIT](/LICENSE)

## Sponsors

Be the first to support this project [here](https://github.com/sponsors/alvarosabu) ☺️
