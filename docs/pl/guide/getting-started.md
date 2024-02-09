# Instalacja

Dowiedz się, jak zainstalować TresJS

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

> Zalecane do użytku z Vue 3.x i Composition API

## Typescript

TresJS zostało napisane w TypeScript i jest w pełni otypowane. Jeśli korzystasz z TypeScript, będziesz czerpać pełne korzyści z typowań. Upewnij się tylko, że zainstalujesz typy dla Three.

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

## Rozpoczęcie

Możesz zainstalować TresJS tak samo, jak każdy inny plugin Vue

```ts
import { createApp } from "vue";
import Tres from "@tresjs/core";
import App from "./App.vue";

export const app = createApp(App);

app.use(Tres);
app.mount("#app");
```

Możesz również używać go bezpośrednio w swoim komponencie

```vue
<script setup lang="ts">
import { TresCanvas } from "@tresjs/core";
</script>

<template>
  <TresCanvas>
    <!-- Your scene here -->
  </TresCanvas>
</template>
```

::: tip
Jest to zalecane ze względów wydajności i rozmiaru paczki. Działa to lepiej przy tree-shaking, importujesz tylko te komponenty, których używasz.
:::

## Vite

Ponieważ v2 to niestandardowy renderer, musimy poinformować `vue-compiler` twojej aplikacji, że komponenty Tres są dołączane, aby uniknąć ostrzeżenia `[Vue warn]: Failed to resolve component`.

Wystarczy dodać to do swojego pliku `vite.config.ts` wewnątrz pluginu Vue:

```ts
import { templateCompilerOptions } from "@tresjs/core";

export default defineConfig({
  plugins: [
    vue({
      // Other config
      ...templateCompilerOptions,
    }),
  ],
});
```
