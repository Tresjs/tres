# Instalación

Aprende como instalar TresJS

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

> Mejor uso con Vue 3.x y composition API

## Empezando

Puedes instalar TresJS como cualquier otro Vue plugin

```ts
import { createApp } from 'vue'
import App from './App.vue'

import Tres from '@tresjs/core'

export const app = createApp(App)

app.use(Tres)
app.mount('#app')
```

### Nuxt

Pronto.
