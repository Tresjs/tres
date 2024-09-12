# Einführung

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

## Vite

Wenn du Vite verwendest, solltest du Folgendes zu deiner `vite.config.ts` hinzufügen:

```ts
import { templateCompilerOptions } from '@tresjs/core'

export default defineConfig({
  plugins: [
    vue({
      // Other config
      ...templateCompilerOptions
    }),
  ],
})
```

Das ist notwendig, damit der Templatecompiler mit dem benutzerdefinierten Renderer funktioniert und keine Warnungen in der Konsole ausgibt. Für weitere Informationen siehe [hier](/de/guide/troubleshooting.html).

## Probiere es online aus

### Playground

Du kannst TresJS online mit der offiziellen [Playground](https://play.tresjs.org/) ausprobieren:

<iframe src="https://play.tresjs.org/" class="w-full rounded shadow-lg outline-none border-none aspect-4/3"></iframe>

### StackBlitz

Wir haben einen neuen [StackBlitz](https://stackblitz.com/) Startpunkt, um TresJS online zu testen:

![](/stackblitz-starter.png)

## Labs

Wir haben auch ein Showroom-Labor mit Beispielen, die mit TresJS erstellt wurden. Probiere es [hier](https://lab.tresjs.org/) aus.

![](/tresjs-lab.png)

## Motivation

[Three.js](https://threejs.org/) ist eine wunderbare Bibliothek für die Erstellung von erstaunlichen 3D-Webseiten mit WebGL. Sie wird konstant weiterentwickelt, was es für die Maintainer von Wrappern wie [TroisJS](https://troisjs.github.io/) schwierig macht, mit allen Verbesserungen Schritt zu halten.

Das React-Ökosystem hat eine beeindruckendes **custom Rendering** Projekt namens [react-three-fiber](https://docs.pmnd.rs/react-three-fiber), das es dir ermöglicht, deine Szenen deklarativ mit wiederverwendbaren, reaktiven Komponenten zu bauen.

Auf der Suche nach etwas Ähnlichem im VueJS-Ökosystem fand ich eine erstaunliche Bibliothek namens [Lunchbox](https://github.com/breakfast-studio/lunchboxjs), die mit demselben Konzept wie R3F arbeitet und einen [custom Vue3-Renderer](https://vuejs.org/api/custom-renderer.html) bereitstellt. Ich habe seinerzeit auch dazu beigetragen, diese Bibliothek zu verbessern, damit sie so ausgereift und funktionsreich wie R3F wird.

Das einzige Problem ist, dass die Kombination von Compilern und Renderern in Vue3-Templates etwas ist, an dem die Vue-Community noch arbeitet. Mehr Informationen dazu findest du [hier](https://github.com/vuejs/vue-loader/pull/1645).

```ts
// Example Vite setup
import { createApp as createLunchboxApp } from 'lunchboxjs'
import { createApp } from 'vue'
import App from './App.vue'
import LunchboxApp from './LunchboxApp.vue'

// html app
const app = createApp(App)
app.mount('#app')

// lunchbox app
const lunchboxApp = createLunchboxApp(LunchboxApp)
// assuming there's an element with ID `lunchbox` in your HTML app
lunchboxApp.mount('#lunchbox')
```

Von diesen beiden Bibliotheken inspiriert, entschied ich mich dazu einen eigenen Vue-Renderer für Three.js zu erstellen. Das ist **TresJS v2**.
