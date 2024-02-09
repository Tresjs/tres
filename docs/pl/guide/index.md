# Wstęp

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

TresJS jest napisane w języku TypeScript i jest w pełni otypowane. Jeśli używasz TypeScript, będziesz korzystać z pełnych korzyści z typowań. Po prostu upewnij się, że zainstalujesz typy dla Three.

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

Jeśli używasz Vite, musisz dodać następujący kod do swojego pliku `vite.config.ts`:

```ts
import { templateCompilerOptions } from '@tresjs/core'

export default defineConfig({
  plugins: [
    vue({
      // Other config
      ...templateCompilerOptions
    }),
  ],
}),
```

To jest wymagane, aby kompilator szablonów działał z niestandardowym renderem i nie generował ostrzeżeń na konsoli. Aby uzyskać więcej informacji, sprawdź [tutaj](/pl/guide/troubleshooting.html).

## Wypróbuj to online

### Sandbox

Możesz wypróbować TresJS online za pomocą oficjalnego [sandbox](https://play.tresjs.org/). Sprawdź to:

<iframe src="https://play.tresjs.org/" class="w-full rounded shadow-lg outline-none border-none aspect-4/3"></iframe>

### StackBlitz

Mamy zupełnie nowy starter w [StackBlitz](https://stackblitz.com/) by wypróbować TresJS online. Sprawdź to:

![](/stackblitz-starter.png)

<StackBlitzEmbed projectId="tresjs-basic" />

## Playground

Mamy także plac zabaw, gdzie możesz wypróbować TresJS online. Sprawdź to [aquí](https://playground.tresjs.org/).

![](/playground.png)

## Motivación

[ThreeJS](https://threejs.org/) to wspaniała biblioteka do tworzenia niesamowitych witryn 3D przy użyciu WebGL. Jest to także stale aktualizowana biblioteka, co sprawia, że utrudnia utrzymanie wrapperów, takich jak [TroisJS](https://troisjs.github.io/).

W ekosystemie React mamy imponujące rozwiązanie custom render o nazwie **custom render** o nazwie [React-three-fiber](https://docs.pmnd.rs/react-three-fiber) które pozwala budować sceny deklaratywnie za pomocą komponentów wielokrotnego użytku, samodzielnych, reagujących na stan.

W poszukiwaniu czegoś podobnego w ekosystemie VueJS natrafiłem na niesamowitą bibliotekę o nazwie [Lunchbox](https://github.com/breakfast-studio/lunchboxjs) która działa według tego samego konceptu co R3F. Oferuje [własny renderer Vue3](https://vuejs.org/api/custom-renderer.html). Przyczyniam się również do poprawy tej biblioteki, aby była równie dojrzała i bogata w funkcje co R3F.

EJedynym problemem jest to, że mieszanie renderów kompilatorów w Vue 3 to coś, nad czym społeczność Vue wciąż pracuje - zobacz [tutaj](https://github.com/vuejs/vue-loader/pull/1645) po więcej informacji.

```ts
// Example Vite setup
import { createApp } from "vue";
import { createApp as createLunchboxApp } from "lunchboxjs";
import App from "./App.vue";
import LunchboxApp from "./LunchboxApp.vue";

// html app
const app = createApp(App);
app.mount("#app");

// lunchbox app
const lunchboxApp = createLunchboxApp(LunchboxApp);
// assuming there's an element with ID `lunchbox` in your HTML app
lunchboxApp.mount("#lunchbox");
```

Tak więc zainspirowany obiema bibliotekami, postanowiłem stworzyć własny renderer Vue dla ThreeJS. Oto **TresJS v2**.
