# Installatie

Leer hoe je TresJS installeert

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

> Beter gebruik met Vue 3.x en de composition API

## Typescript

TresJS is geschreven in Typescript en is volledig getypt. Als u Typescript gebruikt, profiteert u optimaal van de typmogelijkheden. Zorg ervoor dat u de types voor threejs installeert.

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

## Aan de slag

Je kan TresJS installeren als elke andere Vue plugin

```ts
import { createApp } from 'vue'
import Tres from '@tresjs/core'
import App from './App.vue'

export const app = createApp(App)

app.use(Tres)
app.mount('#app')
```

Of je kan het direct gebruiken in je component

```vue
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <TresCanvas>
    <!-- Je scene komt hier -->
  </TresCanvas>
</template>
```

::: tip
Dit wordt aanbevolen vanwege de prestaties en de bundelgrootte. tree-shaking werkt beter en je importeert alleen de componenten die je gebruikt.
:::

## Vite

Omdat v2 een custom renderer is, moeten we de `vue-compiler` van uw app laten weten dat de componenten van Tres mogen worden opgenomen om de waarschuwing `[Vue warn]: Failed to solve component` te vermijden.

Je hoeft alleen maar de `templateCompilerOptions` van TresJS te importeren en toe te voegen aan uw `vite.config.ts` in de vue plugin:

```ts
import { templateCompilerOptions } from '@tresjs/core'

export default defineConfig({
  plugins: [
    vue({
      // Andere config
      ...templateCompilerOptions
    }),
  ]
})
```
