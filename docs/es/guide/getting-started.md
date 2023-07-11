# Instalación

Aprende como instalar TresJS

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

> Recomendado para usar con Vue 3.x y composition API

## Typescript

TresJs esta escrito en Typescript. Si estas usando Typescript, tendrás muchos beneficios para los tipados. Asegúrate de instalar los tipados para Threejs

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

O puedes usarlo directamente en el componente

```vue
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
</script>
<template>
  <TresCanvas>
    <!-- Aquí va tu escena -->
  </TresCanvas>
</template>
```

::: tip
Esta es la forma recomendada para obtener mejor rendimiento, tree-shaking será mejor porque solo se importarán los componentes que se usaran
:::

## Vite

Since v2 is a custom renderer, we need to let the `vue-compiler` of your app know that the components of Tres are ok to be included to avoid the `[Vue warn]: Failed to resolve component` warning.

You just need to add this to your `vite.config.ts` inside of the vue plugin:

```ts
export default defineConfig({
  plugins: [vue({
    template: {
      compilerOptions: {
        isCustomElement: tag => tag.startsWith('Tres') && tag !== 'TresCanvas',
      },
    },
  }),
})
```
