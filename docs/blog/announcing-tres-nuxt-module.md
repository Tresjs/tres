---
sidebar: false
---

![Announcing TresJS Nuxt Module](/blog/tresjs-nuxt-module.png)

---

# Announcing Nuxt Module `@tresjs/nuxt` <i class="i-logo-nuxt" /> 🎉

We are absolutetly thriller to announce to the community the release of most anticipated **Nuxt module for TresJS** 🎉 .

Special thanks to [NuxtJS](https://nuxtjs.org/) and [DanielRoe](https://twitter.com/danielcroe) for the support and for the amazing work they are doing for the Vue community.

1. Add `@tresjs/nuxt` dependency to your project

```bash
# Using pnpm
pnpm add @tresjs/nuxt

# Using yarn
yarn add @tresjs/nuxt

# Using npm
npm install @tresjs/nuxt
```

2. Add `@tresjs/nuxt` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: ["@tresjs/nuxt"],
});
```

## What's Nuxt? 🔥

We took advantage of the [Nuxt module system](https://nuxt.com/docs/guide/going-further/modules) to create a module that will allow you to use TresJS in your Nuxt app with 0-to-none configuration enjoying all the DX perks that comes with Nuxt like:

### Auto import components and composables from the TresJS ecosystem 

You don't need to import the components or composables from the TresJS ecosystem anymore, they will be auto-imported for you. This is a huge improvement for the DX, you can just start using the components and composables without worrying about importing them.

You just need to install the packages you want to use and they will be auto-imported by the module 🧙🏼‍♂️.

```bash
# Using pnpm
pnpm add @tresjs/cientos @tresjs/post-processing
```

#### Before 

```vue
<script setup lang="ts">
import { TresCanvas, useRenderLoop } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import { EffectComposer, Bloom } from '@tresjs/post-processing'
const { onLoop } = useRenderLoop()

</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera :position="[5, 5, 5]" />
    <OrbitControls />
    <TresMesh :position="[-2, 2, 0]" :rotation="[0, Math.PI, 0]">
      <TresConeGeometry :args="[1, 1.5, 3]" />
      <TresMeshToonMaterial color="#82DBC5" />
    </TresMesh>
    <EffectComposer>
      <Bloom />
    </EffectComposer>
    <TresAmbientLight :intensity="1" />
    <TresDirectionalLight :position="[0, 2, 4]" :intensity="1" />
  </TresCanvas>
</template>
```
  

#### After 🥹

```vue
<script setup lang="ts">
const { onLoop } = useRenderLoop()

</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera :position="[5, 5, 5]" />
    <OrbitControls />
    <TresMesh :position="[-2, 2, 0]" :rotation="[0, Math.PI, 0]">
      <TresConeGeometry :args="[1, 1.5, 3]" />
      <TresMeshToonMaterial color="#82DBC5" />
    </TresMesh>
    <EffectComposer>
      <Bloom />
    </EffectComposer>
    <TresAmbientLight :intensity="1" />
    <TresDirectionalLight :position="[0, 2, 4]" :intensity="1" />
  </TresCanvas>
</template>
```


## Share your work 🎨

We want to see what you are creating with TresJS and nuxt, so please share your work with us in our [Discord server](https://discord.gg/UCr96AQmWn) where we have a `#Showcase` area or in our [Twitter](https://twitter.com/tresjs_dev) 😊.

Happy coding! 🚀
