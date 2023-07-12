# Instalación

Aprende como instalar TresJs

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

TresJs esta escrito en Typescript. Si estas usando Typescript, tendrás muchos beneficios para los tipados. No olvides de instalar los tipos para Threejs

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

Puedes registrar TresJs como cualquier otro Vue plugin

```ts
import { createApp } from 'vue'
import App from './App.vue'

import TresJs from '@tresjs/core'

export const app = createApp(App)

app.use(TresJs)
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

Desde la v2 Tresjs usa `custom-renderer` y

Desde la **TresJs v2**, se esta usando una solución llamada Vue Custom renderer dentro de la instancia principal de la aplicación de vue, Vue no reconocerá por defecto los componentes dentro del componente `TresCanvas`. Incluso si estos no afectan al desarrollo de nuestra escena, mostrará warning en la consola

para solucionarlo solo necesitas ir a tu `vite.config.ts` y añade la siguiente configuración:

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { templateCompilerOptions } from '@tresjs/core'

export default defineConfig({
  plugins: [
    vue({
      // Other config
      ...templateCompilerOptions,
    }),
  ],
})
```

```

```
