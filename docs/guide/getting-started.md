# Installation

Learn how to install TresJS

::: code-group

```bash [pnpm]
pnpm add three @tresjs/core -D
```

```bash [npm]
npm install three @tresjs/core -D
```

```bash [yarn]
yarn add three @tresjs/core -D
```

:::

> Better use with Vue 3.x and composition API

## Getting started

You can install TresJS like any other Vue plugin

```ts
import { createApp } from 'vue'
import App from './App.vue'

import Tres from '@tresjs/core'

export const app = createApp(App)

app.use(Tres)
app.mount('#app')
```

### Nuxt

Coming soon.
