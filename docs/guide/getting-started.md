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

## Getting started

You can install TresJS as any other Vue plugin

```ts
import { createApp } from 'vue'
import App from './App.vue'

import Tres from '@tresjs/core'

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
This is recommended for performance and bundle size reasons, Three-shaking will work better and you will only import the components that you use.
:::

### Nuxt

Nuxt official module `@tresjs/nuxt` is comming soon, planned for the Q2 of 2023 ;)

![Roadmap](/nuxt-roadmap.png)
