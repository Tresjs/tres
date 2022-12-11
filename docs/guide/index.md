# Introduction

<FirstScene style="aspect-ratio: 16/9; height: auto; margin: 2rem 0; border-radius: 8px; overflow:hidden;"/>

```
npm install three @tresjs/core -D
```

or if you use yarn

```
yarn add three @tresjs/core -D
```

pnpm users

```
pnpm add three @tresjs/core -D
```

## Try it online

You can fork this template example on [StackBlitz](https://stackblitz.com/edit/tresjs-basic?file=src/App.vue) and play with it 😋 without installing anything locally.

<StackBlitzEmbed projectId="tresjs-basic" />

## Motivation

[ThreeJS](https://threejs.org/) is a wonderfull library to create awesome **WebGL** 3D websites. Is also a constantly updated library that makes hard for wrapper mantainers like [TroisJS](https://troisjs.github.io/) to keep up with all the enhancements.

React ecosystem has an impresive **custom render** solution called [React-three-fiber](https://docs.pmnd.rs/react-three-fiber) that allows you build your scenes declaratively with re-usable, self-contained components that react to state.

In my search for something similar in the VueJS ecosystem, I found this amazing library called [Lunchbox](https://github.com/breakfast-studio/lunchboxjs) which works with the same concept that R3F, it provides a [custom Vue3 Renderer](https://vuejs.org/api/custom-renderer.html). I'm also contrubuiting to improve this library so it gets as mature and feature-rich as R3F.

The only problem is, mixing different renderers in Vue 3 is something the Vue community is still working on - see [here](https://github.com/vuejs/vue-loader/pull/1645) for more information.

Until there is a solution similar to [React Reconciliation](https://reactjs.org/docs/reconciliation.html) you will need to create 2 separate `Apps` which might be not ideal.

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

So I was inspired by both libraries to create something that wouldn't require creating a **custom renderer** but intelligent enough to generate Vue components based on the ThreeJS constructors with 0-to-none manteinance required `three:latest`. That's **TresjS**.
