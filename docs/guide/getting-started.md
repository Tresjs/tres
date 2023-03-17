# Instalation

::: warning
You’re browsing the documentation for TresJS v1. If you’re looking for the documentation for **v2**, please visit [https://tresjs.org](https://tresjs.org)
:::

Learn how to install TresJS

::: code-group

```bash [pnpm]
pnpm add three @tresjs/core@1.8.1 -D
```

```bash [npm]
npm install three @tresjs/core@1.8.1 -D
```

```bash [yarn]
yarn add three @tresjs/core@1.8.1 -D
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

### Nuxt

Soon.
