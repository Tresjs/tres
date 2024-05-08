![Repo banner](public/nuxt-tres-banner.png)

# @tresjs/nuxt

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

Official Nuxt module for TresJS. Build 3D scenes as they were Vue components.

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
  <!-- - [🏀 Online playground](https://stackblitz.com/github/@tresjs/nuxt?file=playground%2Fapp.vue) -->
- [📖 &nbsp;Documentation](https://tresjs.org/guide/nuxt.html)

## Features

- 🤓 Auto-import components and composables from the [TresJS ecosystem](https://github.com/orgs/Tresjs/repositories)
- `TresCanvas` client only, you don't need to add `.client` to the component name or `<ClientOnly />`
- Automatically configures vue compiler to support TresJS components, see [why](https://tresjs.org/guide/troubleshooting.html#failed-resolve-component-trescomponent-%F0%9F%A4%94)?
- All the DX Magic that comes with Nuxt ✨
-  NEW v2: TresJS nuxt devtools.

## Quick Setup

1. Add `@tresjs/nuxt` dependency to your project

```bash
npx nuxi@latest module add tresjs
```

2. Add `@tresjs/nuxt` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: ['@tresjs/nuxt'],
})
```

That's it! You can now use `@tresjs/nuxt` in your Nuxt app ✨

If you want to use the any package from the TresJS ecosystem, you can install the packages you want to use and they will be auto-imported by the module 🧙🏼‍♂️.

```bash
# Using pnpm
pnpm add @tresjs/cientos @tresjs/post-processing
```

## Devtools

![Devtools](/public/tresjs-nuxt-devtools.png)

TresJS nuxt module comes with a devtools extension that allows you to inspect the 3D scene and measure performance.

To activate the devtools, you need to add the `devtools` option to the `tres` section of `nuxt.config.ts`.

```js
export default defineNuxtConfig({
  modules: ['@tresjs/nuxt', '@nuxt/devtools'],
  tres: {
    devtools: true,
  },
})
```

## GLSL shaders support

TresJS nuxt module comes with a vite plugin that allows you to import GLSL shaders as strings. It uses [`vite-plugin-glsl`](https://github.com/UstymUkhman/vite-plugin-glsl) under the hood.

```js
export default defineNuxtConfig({
  modules: ['@tresjs/nuxt', '@nuxt/devtools'],
  tres: {
    glsl: true,
  },
})
```

With this option enabled, you can import GLSL shaders as strings in your components.

```vue
<script setup lang="ts">
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'

const uniforms = {
  uTime: { value: 0 },
  uAmplitude: { value: new Vector2(0.1, 0.1) },
  uFrequency: { value: new Vector2(20, 5) },
}
</script>

<template>
  <TresMesh
    :position="[0, 4, 0]"
  >
    <TresSphereGeometry :args="[2, 32, 32]" />
    <TresShaderMaterial
      :vertex-shader="vertexShader"
      :fragment-shader="fragmentShader"
      :uniforms="uniforms"
    />
  </TresMesh>
</template>
```

## Development

```bash
# Install dependencies
npm install

# Generate type stubs
npm run dev:prepare

# Develop with the playground
npm run dev

# Build the playground
npm run dev:build

# Run ESLint
npm run lint

# Run Vitest
npm run test
npm run test:watch

# Release new version
npm run release
```

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/@tresjs/nuxt/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/@tresjs/nuxt
[npm-downloads-src]: https://img.shields.io/npm/dm/@tresjs/nuxt.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/@tresjs/nuxt
[license-src]: https://img.shields.io/npm/l/@tresjs/nuxt.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/@tresjs/nuxt
[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com
