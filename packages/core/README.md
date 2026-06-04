<p align="center">
  <a href="https://npmx.dev/package/@tresjs/core"><img src="https://npmx.dev/api/registry/badge/version/@tresjs/core" alt="version"></a>
  <a href="https://www.npmjs.com/package/@tresjs/core"><img src="https://img.shields.io/npm/dm/@tresjs/core?color=82DBA1" alt="npm downloads"></a>
  <a href="https://tresjs.org/discord"><img src="https://img.shields.io/badge/chat-discord-purple?style=flat&logo=discord" alt="discord chat"></a>
</p>
<br/>

# TresJS Core

> Declarative ThreeJS using Vue Components

- 💡 Build 3D scenes with Vue components
- ⚡️ Powered by Vite
- 🎨 Vue custom renderer for Three.js
- 🥰 Always up-to-date with the latest Three.js features
- 🦾 Fully Typed

TresJS is a Vue custom renderer that lets you build Three.js scenes declaratively using Vue components. Any Three.js class can be used as a component by prefixing it with `Tres` (e.g., `<TresMesh>`, `<TresBoxGeometry>`).

## Installation

```bash
pnpm i @tresjs/core three
```

## TypeScript

Install Three.js type definitions:

```bash
pnpm i @types/three -D
```

### Vite Configuration

Add the template compiler options to your `vite.config.ts` to make the custom renderer work and avoid console warnings:

```ts
import { templateCompilerOptions } from '@tresjs/core'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    vue({
      ...templateCompilerOptions,
    }),
  ],
})
```

## Docs

Checkout the [docs](https://docs.tresjs.org/)

### Build

To build the package run:

```bash
pnpm run build
```

### Test

```bash
pnpm run test
```

### Playground

To run the playground:

```bash
pnpm run playground
```

## License

[MIT](/LICENSE)
