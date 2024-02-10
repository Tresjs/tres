# Installation

Erfahre, wie du TresJS installieren kannst

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

> Besser mit Vue 3.x und Composition API

## Typescript

TresJS ist in Typescript geschrieben und vollständig typisiert. Wenn du Typescript verwendest, wirst du alle Vorteile der Typisierung genießen. Stelle nur sicher, dass du die Typen für Three installierst.


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

## Loslegen

Du kannst TresJS wie jedes andere Vue-Plugin installieren


```ts
import { createApp } from 'vue'
import Tres from '@tresjs/core'
import App from './App.vue'

export const app = createApp(App)

app.use(Tres)
app.mount('#app')
```

Oder du kannst es direkt in deiner Komponente verwenden

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

::: Tipp
Dies wird aus Gründen der Leistung und der Paketgröße empfohlen, da das Tree-Shaking besser funktionieren wird und du nur die Komponenten importierst, die du verwendest.
:::


## Vite

Da die Version 2 ein benutzerdefinierter Renderer ist, müssen wir dem `vue-compiler` deiner Anwendung mitteilen, dass die Tres-Komponenten einbezogen werden dürfen, um die Warnung `[Vue warn]: Failed to resolve component` zu vermeiden.

Du musst dies lediglich zu deiner `vite.config.ts`-Datei innerhalb des Vue-Plugins hinzufügen:





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