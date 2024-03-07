# Instalación

Aprende cómo instalar TresJS

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

> Mejor usar con Vue 3.x y Composition API

## Typescript

TresJS está escrito en Typescript y está completamente tipado. Si estás utilizando Typescript, obtendrás todos los beneficios de los tipos. Solo asegúrate de instalar los tipos para three.

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

Puedes instalar TresJS como cualquier otro complemento de Vue

```ts
import { createApp } from 'vue'
import Tres from '@tresjs/core'
import App from './App.vue'

export const app = createApp(App)

app.use(Tres)
app.mount('#app')
```

O puedes usarlo directamente en tu componente

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
Esto es recomendado por razones de rendimiento y tamaño del paquete, el tree-shaking funcionará mejor y solo importarás los componentes que uses.
:::

## Vite

Dado que la versión 2 es un renderizador personalizado, necesitamos informar al `vue-compiler` de tu aplicación que los componentes de Tres están permitidos para ser incluidos y evitar la advertencia `[Vue warn]: Failed to resolve component`.

Solo necesitas agregar esto a tu archivo `vite.config.ts` dentro del plugin de Vue:

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