# Nuxt module `@tresjs/nuxt`

![TresJS Nuxt Module](/nuxt-stones.png)

<a href="https://www.npmjs.com/package/@tresjs/nuxt"><img src="https://img.shields.io/npm/v/@tresjs/nuxt/latest?color=%2382DBCA" alt="npm package"></a>

A official Nuxt module for TresJS is here 🎉.

Repository is [here](https://github.com/Tresjs/nuxt)

## Installation

::: code-group

```bash [pnpm]
pnpm add three @tresjs/nuxt
```

```bash [npm]
npm install three @tresjs/nuxt
```

```bash [yarn]
yarn add three @tresjs/nuxt
```

:::

## Features

- 🤓 Auto-import components and composables from the [TresJS ecosystem](https://github.com/orgs/Tresjs/repositories)
- `TresCanvas` client only, you don't need to add `.client` to the component name or `<ClientOnly />`
- Automatically configures vue compiler to support TresJS components, see [why](/guide/troubleshooting)
- All the DX Magic that comes with Nuxt ✨

## Usage

 Add `@tresjs/nuxt` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: ['@tresjs/nuxt'],
})
```

That's it! You can now use `@tresjs/nuxt` in your Nuxt app ✨

If you want to use the any package from the TresJS ecosystem, you can install the packages you want to use and they will be auto-imported by the module 🧙🏼‍♂️.

| Package                     | Version                                                                                            |
| --------------------------- | :------------------------------------------------------------------------------------------------- |
| [Cientos](https://github.com/Tresjs/cientos) | ![cientos version](https://img.shields.io/npm/v/@tresjs/cientos/latest.svg?label=%20&color=%23f19b00) |
| [Post-processing](https://github.com/Tresjs/post-processing) | ![post-processing version](https://img.shields.io/npm/v/@tresjs/post-processing/latest.svg?label=%20&color=ff69b4) |

```bash
# Using pnpm
pnpm add @tresjs/cientos @tresjs/post-processing
```
