# Installation

Erfahre, wie du TresJS installieren kannst.

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

TresJS ist in Typescript geschrieben und vollständig typisiert. Installiere die Typdeklarationen für Three um alle Vorteile von Typescript zu genießen.

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

Du kannst TresJS wie jedes andere Vue-Plugin installieren.

```ts
import { createApp } from 'vue'
import Tres from '@tresjs/core'
import App from './App.vue'

export const app = createApp(App)

app.use(Tres)
app.mount('#app')
```

Oder du kannst es direkt in deiner Komponente verwenden.

```vue
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <TresCanvas>
    <!-- Deine Szene lebt hier -->
  </TresCanvas>
</template>
```

::: tip
Aufgrund von Performance und Bundlegröße ist dieser Ansatz zu empfehlen, da durch das Tree-Shaking nur die tatsächlich verwendeten Komponenten importiert werden.
:::

## Vite

Da die Version 2 ein benutzerdefinierter Renderer ist, müssen wir dem `vue-compiler` deiner Anwendung mitteilen, die Tres-Komponenten miteinzubeziehen, um die Warnung `[Vue warn]: Failed to resolve component` zu vermeiden.

Du musst lediglich Folgendes zu deiner `vite.config.ts`-Datei innerhalb des Vue-Plugins hinzufügen:

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
