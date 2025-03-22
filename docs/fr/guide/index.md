# Introduction

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

TresJS est écrit en TypeScript et est entièrement typé. Si vous utilisez Typescript, vous pouvez obtenir tous les bénéfices du typage. Assurez-vous seulement d'installer les types pour Three.

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

Si vous utilisez Vite, vous devez ajoutez ceci à votre `vite.config.ts`:

```ts [vite.config.ts]
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

Ceci est nécessaire afin que le compilateur de template fonctionne avec le moteur de rendu personnalisé et ne renvoie pas d'erreur dans la console. Pour plus d'informations, consultez [cet article](/guide/troubleshooting.html).

## Essayer en ligne

### Playground

Vous pouvez essayer TresJS en ligne en utilisant la [playground](https://play.tresjs.org/) officielle. Testez ici:

<iframe src="https://play.tresjs.org/" class="w-full rounded shadow-lg outline-none border-none aspect-4/3"></iframe>

### StackBlitz

Nous avons un nouveau starter [StackBlitz](https://stackblitz.com/) afin d'essayer TresJS en ligne. Testez ici:

![](/stackblitz-starter.png)

<StackBlitzEmbed projectId="tresjs-basic" />

## Labs

Nous avons un laboratoire de démonstration d'exemples créés avec TresJS. Consultez-le [ici](https://play.tresjs.org/).

![](/tresjs-lab.png)

## Motivation

[ThreeJS](https://threejs.org/) est une merveilleuse bibliothèque pour faire de superbes sites en 3D avec WebGL. C'est aussi une bibliothèque en perpétuelle évolution, ce qui rend complèxe le maintien de wrapper comme [TroisJS](https://troisjs.github.io/) afin de le garder constamment à jour.

L'écosytème React possède un impréssionnant **moteur de rendu personnalisé** appellé [React-three-fiber](https://docs.pmnd.rs/react-three-fiber) qui permet de créer des scènes 3D, de manière déclarative, avec des composants réutilisables et autonomes qui réagissent aux états.

Dans ma recherche d'un outil similaire dans l'écosytème VueJS j'ai trouvé cette incroyable bibliothèque nommée [Lunchbox](https://github.com/breakfast-studio/lunchboxjs) qui fonctionne de la même manière que R3F, il propose un [moteur de rendu personnalisé Vue3](https://vuejs.org/api/custom-renderer.html). Je contribue aussi à améliorer cette bibliothèque afin qu'elle devienne aussi mature et complète que R3F.

Le seul problème concerne le mélange des compilateurs et des moteurs de rendu en Vue3. C'est un sujet sur lequel la communauté Vue travaille encore. Pour plus d'informations voir [ici](https://github.com/vuejs/vue-loader/pull/1645).

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

Ces deux bibliothèques m'ont donc inspiré pour créer un moteur de rendu personnalisé Vue pour ThreeJS. Il s'appel **TresJS v2**.
