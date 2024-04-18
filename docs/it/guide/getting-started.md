# Installation

Learn how to install TresJS

::: code-group

```bash [pnpm]
pnpm add three @tresjs/core
```

```bash [npm]
npm install three @tresjs/core
```

```bash [yarn]
yarn add three @tresjs/core
```

:::

> Better use with Vue 3.x and composition API

## Typescript

TresJS is written in Typescript and it's fully typed. If you are using Typescript, you will get the full benefit of the typings. Just make sure you install the types for three.

::: code-group

```bash [npm]
npm install @types/three -D
```

```bash [yarn]
yarn add @types/three -D
```

```bash [pnpm]
pnpm add @types/three -D
```

:::

## Getting started

You can install TresJS as any other Vue plugin

```ts
import { createApp } from 'vue'
import Tres from '@tresjs/core'
import App from './App.vue'

export const app = createApp(App)

app.use(Tres)
app.mount('#app')
```

Or you can use it directly in your component

```vue
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <TresCanvas>
    <!-- Your scene here -->
  </TresCanvas>
</template>
```

::: tip
This is recommended for performance and bundle size reasons, tree-shaking will work better and you will only import the components that you use.
:::

## Vite

Since v2 is a custom renderer, we need to let the `vue-compiler` of your app know that the components of Tres are ok to be included to avoid the `[Vue warn]: Failed to resolve component` warning.

You just need to import and add the `templateCompilerOptions` from TresJS to your `vite.config.ts` inside of the vue plugin:

```ts
import { templateCompilerOptions } from '@tresjs/core'

export default defineConfig({
  plugins: [
    vue({
      // Other config
      ...templateCompilerOptions
    }),
  ]
})
```
