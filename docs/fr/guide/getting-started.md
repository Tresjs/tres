# Installation

Apprennez comment installer TresJS

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

> Meilleur usage avec Vue 3.x et Composition API

## Typescript

TresJS est écrit en TypeScript et est entièrement typé. Si vous utilisez Typescript, vous pouvez obtenir tous les bénéfices du typage. Assurez vous seulement d'installer les types pour Three.

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

## Commencer

Vous pouvez installer TresJS comme n'importe quel autre plugin Vue

```ts
import { createApp } from 'vue'
import Tres from '@tresjs/core'
import App from './App.vue'

export const app = createApp(App)

app.use(Tres)
app.mount('#app')
```

Ou vous pouvez l'utilisez directement dans vos composants

```vue
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <TresCanvas>
    <!-- Votre scene ici -->
  </TresCanvas>
</template>
```

::: tip
Ceci est recommandé pour des raisons de performances et de taille du projet. Le tree-shaking fonctionnera mieux et seuls les composants utilisé seront importés.
:::

## Vite

Depuis que v2 es un moteur de rendu personnalisé, il nous faut informer le `vue-compiler` de votre application que les composants de Tres sont autorisés à être importé sans retourné l'erreur : `[Vue warn]: Failed to resolve component`.

Vous devez seulement ajouter ceci à votre `vite.config.ts` dans le plugin Vue:

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