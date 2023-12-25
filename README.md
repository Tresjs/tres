![repository-banner.png](/public/repo-banner.png)

<p align="center">
  <a href="https://www.npmjs.com/package/@tresjs/cientos"><img src="https://img.shields.io/npm/v/@tresjs/cientos/latest?color=FBB03B" alt="npm package"></a>
  <a href="https://www.npmjs.com/package/@tresjs/cientos"><img src="https://img.shields.io/npm/dm/@tresjs/cientos?color=FBB03B" alt="npm downloads"></a>
  <a href="https://discord.gg/UCr96AQmWn"><img src="https://img.shields.io/badge/chat-discord-purple?style=flat&logo=discord" alt="discord chat"></a>
</p>
<br/>

# Cientos

> Collection of useful helpers and fully functional, ready-made abstractions for Tres

- 💡 Build a 3D scene working only with Vue components.
- ⚡️ Powered by Vite
- 🥰 It brings all the updated features of ThreeJS right away regardless the version
- 🦾 Fully Typed

Cientos (the Spanish word for "hundreds", pronounced /θjentos/ ) is a collection of useful ready-to-go helpers and components that are not part of the core package. The name uses the word used in Spanish to multiply by 100, to refer to the potential reach of the package to hold an amazing abstraction.

The cientos package uses `three-stdlib` module under the hood instead of the three/examples/jsm module. This means that you don't need to extend the catalog of components using the extend method from the `core`, cientos does it for you.

It just works. 💯

## Installation

```bash
pnpm i @tresjs/cientos
```

## Docs

Checkout the [docs](https://cientos.tresjs.org/)

## Demos

- [Stackblitz Collection](https://stackblitz.com/@alvarosabu/collections/tresjs)

## Contributing

We are open to contributions, please read the [contributing guide](/CONTRIBUTING.md) to get started.

### Build

To build the package run:

```bash
pnpm run build
```

### Playground

To run the playground run, is a great way to test the components and helpers locally:

First, install dependencies

```
pnpm i
```

And then to run the development server on http://localhost:5173

```bash
pnpm run playground
```

### Test

TODO...

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

Be the first to support this project [here](https://github.com/sponsors/alvarosabu) ☺️.
