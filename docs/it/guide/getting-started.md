# Installazione

Scopri come installare TresJS

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

> Meglio usarlo con Vue 3.x e Composition API

## Typescript

TresJS è scritto in Typescript ed è completamente tipizzato. Se stai usando Typescript, otterrai tutti i vantaggi delle definizioni dei tipi. Assicurati solo di installare i tipi per Three.

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

## Primi passi

Puoi installare TresJS come qualsiasi altro plugin Vue

```ts
import { createApp } from "vue";
import Tres from "@tresjs/core";
import App from "./App.vue";

export const app = createApp(App);

app.use(Tres);
app.mount("#app");
```

Oppure puoi usarlo direttamente nel tuo componente

```vue
<script setup lang="ts">
import { TresCanvas } from "@tresjs/core";
</script>

<template>
  <TresCanvas>
    <!-- Ecco la tua scena -->
  </TresCanvas>
</template>
```

::: tip
Questo è consigliato per motivi di prestazioni e dimensioni del bundle, il tree-shaking funzionerà meglio e importerai solo i componenti che effettivamente usi.
:::

## Vite

Poiché la v2 è un renderer personalizzato, dobbiamo far sapere al `vue-compiler` della tua app che i componenti di Tres sono pronti per essere inclusi e per evitare l'avviso `[Vue warn]: Failed to resolve component`.

Devi solo importare e aggiungere le `templateCompilerOptions` da TresJS al tuo `vite.config.ts` all'interno del plugin vue:

```ts
import { templateCompilerOptions } from "@tresjs/core";

export default defineConfig({
  plugins: [
    vue({
      // Altre config
      ...templateCompilerOptions,
    }),
  ],
});
```
