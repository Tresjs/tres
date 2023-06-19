# Introduction

<ClientOnly>
    <FirstScene style="aspect-ratio: 16/9; height: auto; margin: 2rem 0; border-radius: 8px; overflow:hidden;"/>
</ClientOnly>

This is the documentation for the `v2.0.0` of TresJS. If you are looking for the documentation for the version 1, check [V1 TresJS](https://v1.tresjs.org/).

::: code-group

```bash [npm]
npm install three @tresjs/core
```

```bash [yarn]
yarn add three @tresjs/core
```

```bash [pnpm]
pnpm add three @tresjs/core
```

:::

## Typescript

TresJS is written in Typescript and it's fully typed. If you are using Typescript, you will get the full benefit of the typings. Just make sure you install the types for three.

::: code-group

```bash [npm]
npm install @three/types -D
```

```bash [yarn]
yarn add @three/types -D
```

```bash [pnpm]
pnpm add @three/types -D
```

:::



## Try it online

We have a brand new [StackBlitz](https://stackblitz.com/) starter to try TresJS online. Check it out:

![](/stackblitz-starter.png)

<StackBlitzEmbed projectId="tresjs-basic" />

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

So I was inspired by both libraries to create ~~something that wouldn't require creating a **custom renderer** but intelligent enough to generate Vue components based on the ThreeJS constructors with 0-to-none manteinance required `three:latest`. That's **TresjS v1**~~.

Although v1 was a decent solution 😄, it has some limitations that would only be solved by creating a proper **custom renderer**. After several POCs, I decided to create a new version of TresJS that would be based on a Vue custom renderer but saving the user to do any weird stuff. That's **TresJS v2**.

To learn more how to migrate from v1, check the [migration guide](/guide/migration-guide.html).
