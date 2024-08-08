# Introduzione

<ClientOnly>
    <div style="aspect-ratio: 16/9; height: auto; margin: 2rem 0; border-radius: 8px; overflow:hidden;">
      <FirstScene />
    </div>
</ClientOnly>

::: code-group

```bash [npm]
npm install @tresjs/core three
```

```bash [yarn]
yarn add @tresjs/core three
```

```bash [pnpm]
pnpm add @tresjs/core three
```

:::

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

## Vite

Se stai usando Vite devi solo importare e aggiungere le `templateCompilerOptions` da TresJS al tuo `vite.config.ts` all'interno del plugin vue:

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

Questo è necessario per far funzionare il compilatore dei template con il renderer personalizzato in modo che non lanci avvisi sulla console. Per ulteriori informazioni, controlla [qui](/guide/troubleshooting.html).

## Prova online

### Playground

Puoi provare TresJS online usando il [playground](https://play.tresjs.org/) ufficiale. Dai un'occhiata:

<iframe src="https://play.tresjs.org/" class="w-full rounded shadow-lg outline-none border-none aspect-4/3"></iframe>

### StackBlitz

We have a brand new [StackBlitz](https://stackblitz.com/) starter to try TresJS online. Check it out:

![](/stackblitz-starter.png)

## Labs

Abbiamo un nuovo starter di StackBlitz per provare TresJS online. Dai un'occhiata [qui](https://playground.tresjs.org/):

![](/tresjs-lab.png)

## Motivazione

[ThreeJS](https://threejs.org/) è una meravigliosa libreria nata per creare fantastici siti web 3D **WebGL**. È anche una libreria che viene costantemente aggiornata, il che rende difficile per i maintainers dei wrapper come [TroisJS](https://troisjs.github.io/) tenere il passo con tutti gli miglioramenti.

L'ecosistema React ha una soluzione di **render personalizzato** impressionante chiamata [React-three-fiber](https://docs.pmnd.rs/react-three-fiber) che ti consente di costruire le tue scene in modo dichiarativo con componenti riutilizzabili e autocontenuti che reagiscono allo stato.

Nella mia ricerca di qualcosa di simile nell'ecosistema VueJS, ho trovato questa incredibile libreria chiamata [Lunchbox](https://github.com/breakfast-studio/lunchboxjs), che funziona con lo stesso concetto di R3F, fornisce un [renderer personalizzato Vue3](https://vuejs.org/api/custom-renderer.html). Sto anche contribuendo a migliorare questa libreria in modo che diventi matura e ricca di funzionalità come R3F.

L'unico problema è che mescolare i renderer dei compilatori in Vue 3 è qualcosa su cui la comunità Vue sta ancora lavorando - vedi [qui](https://github.com/vuejs/vue-loader/pull/1645) per ulteriori informazioni.

```ts
// Esempio Vite setup
import { createApp } from "vue";
import { createApp as createLunchboxApp } from "lunchboxjs";
import App from "./App.vue";
import LunchboxApp from "./LunchboxApp.vue";

// html app
const app = createApp(App);
app.mount("#app");

// lunchbox app
const lunchboxApp = createLunchboxApp(LunchboxApp);
// assumendo ci sia un elemento con ID `lunchbox` nella tua app HTML
lunchboxApp.mount("#lunchbox");
```

Sono stato ispirato da entrambe le librerie a creare un renderer personalizzato Vue per ThreeJS. Questo è **TresJS v2**.
