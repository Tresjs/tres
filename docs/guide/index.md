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

TresJS is written in Typescript and it's fully typed. If you are using Typescript, you will get the full benefit of the typings. Just make sure you install the types for three.

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

If you are using Vite, you have add the following to your `vite.config.ts`:

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

This is required to make the template compiler work with the custom renderer and not throw warnings on the console. For more info check [here](/guide/troubleshooting.html).

## Try it online

### Sandbox

You can try TresJS online using the official [sandbox](https://play.tresjs.org/). Check it out:

<iframe src="https://play.tresjs.org/" class="w-full rounded shadow-lg outline-none border-none aspect-4/3"></iframe>

### StackBlitz

We have a brand new [StackBlitz](https://stackblitz.com/) starter to try TresJS online. Check it out:

![](/stackblitz-starter.png)

<StackBlitzEmbed projectId="tresjs-basic" />

## Playground

We also have a playground where you can try TresJS online. Check it out [here](https://playground.tresjs.org/).

![](/public/playground.png)

## Motivation

[ThreeJS](https://threejs.org/) is a wonderful library to create awesome **WebGL** 3D websites. Is also a constantly updated library that makes hard for wrapper maintainers like [TroisJS](https://troisjs.github.io/) to keep up with all the enhancements.

React ecosystem has an impresive **custom render** solution called [React-three-fiber](https://docs.pmnd.rs/react-three-fiber) that allows you build your scenes declaratively with re-usable, self-contained components that react to state.

In my search for something similar in the VueJS ecosystem, I found this amazing library called [Lunchbox](https://github.com/breakfast-studio/lunchboxjs) which works with the same concept that R3F, it provides a [custom Vue3 Renderer](https://vuejs.org/api/custom-renderer.html). I'm also contributing to improve this library so it gets as mature and feature-rich as R3F.

The only problem is, mixing compilers renderers in Vue 3 is something the Vue community is still working on - see [here](https://github.com/vuejs/vue-loader/pull/1645) for more information.

```ts
// Example Vite setup
import { createApp } from 'vue'
import { createApp as createLunchboxApp } from 'lunchboxjs'
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

So I was inspired by both libraries to create a Vue custom renderer for ThreeJS. That's **TresJS v2**.

