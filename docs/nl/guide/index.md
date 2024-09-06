# Introductie

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

TresJS is geschreven in Typescript en is volledig getypt. Als u Typescript gebruikt, profiteert u optimaal van de typmogelijkheden. Zorg ervoor dat u de types voor threejs installeert.

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

Als je Vite gebruikt, dan hoef je alleen `templateCompilerOptions` toe te voegen en te importeren van TresJS asan je `vite.config.ts`in de vue plugin:

```ts
import { templateCompilerOptions } from '@tresjs/core'

export default defineConfig({
  plugins: [
    vue({
      // Andere config
      ...templateCompilerOptions
    }),
  ],
})
```

Dit is nodig om de template compiler te laten werken met de custom renderer, zodat deze geen waarschuwingen op de console genereert. Voor meer informatie, kijk [hier](/nl/guide/troubleshooting.html).

## Probeer het online

### Speelplaats

Je kan TresJS proberen via de officiele [Speelplaats](https://play.tresjs.org/). Check it out:

<iframe src="https://play.tresjs.org/" class="w-full rounded shadow-lg outline-none border-none aspect-4/3"></iframe>

### StackBlitz

We hebben een gloednieuwe [StackBlitz](https://stackblitz.com/) starter om TresJS online te proberen. Bekijk het hier:

![](/stackblitz-starter.png)

## Labs

We hebben ook een showcaselab met voorbeelden gemaakt met TresJS. Bekijk het [hier](https://lab.tresjs.org/).

![](/tresjs-lab.png)

## Motivatie

[ThreeJS](https://threejs.org/) is een prachtige bibliotheek waarmee u geweldige **WebGL** 3D-websites kunt maken. Het is ook een bibliotheek die voortdurend wordt bijgewerkt, wat het moeilijk maakt voor wrapper-onderhouders zoals [TroisJS](https://troisjs.github.io/) om alle verbeteringen bij te houden.

Het React ecosysteem heeft een indrukwekkende **custom render** oplossing genaamd [React-three-fiber](https://docs.pmnd.rs/react-three-fiber) waarmee u uw scènes declaratief kunt bouwen met herbruikbare, op zichzelf staande componenten die op de state reageren.

In mijn zoektocht naar iets soortgelijks in het VueJS-ecosysteem vond ik deze geweldige bibliotheek genaamd [Lunchbox](https://github.com/breakfast-studio/lunchboxjs), die met hetzelfde concept werkt als R3F, het biedt een [custom Vue3 Renderer](https://vuejs.org/api/custom-renderer.html). Ik draag ook bij aan het verbeteren van deze bibliotheek, zodat deze net zo volwassen en rijk aan functies wordt als R3F.

Het enige probleem hiermee is dat het mixen van compilers-renderers in Vue 3 iets is waar de Vue-gemeenschap nog steeds aan werkt - zie [hier] (https://github.com/vuejs/vue-loader/pull/1645) voor meer informatie.

```ts
// Voorbeeld Vite setup
import { createApp as createLunchboxApp } from 'lunchboxjs'
import { createApp } from 'vue'
import App from './App.vue'
import LunchboxApp from './LunchboxApp.vue'

// html app
const app = createApp(App)
app.mount('#app')

// lunchbox app
const lunchboxApp = createLunchboxApp(LunchboxApp)
// Ervan uitgaande dat er een element is met ID `lunchbox` in je HTML app
lunchboxApp.mount('#lunchbox')
```

Dus ik werd door beide bibliotheken geïnspireerd om een aangepaste Vue-renderer voor ThreeJS te maken. Dat is **TresJS v2**.
