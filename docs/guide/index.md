# Post-processing

> Apply post-processing effects to your 3D scenes with ease.

![Post-processing banner](/tres-post-processing-banner.png)

Post-processing, in simple terms, consist in applying visual effects to your 3D scenes after they have been rendered. It allows you to add beautiful effects such as depth-of-field, bloom, motion blur, and many more.

The `post-processing` package leverages both the excellent work done by the pmndrs [postprocessing](https://github.com/pmndrs/postprocessing) package and native [Three.js post-processing effects](https://threejs.org/examples/?q=postprocessing#webgl_postprocessing). Providing you with an easy-to-use, Vue-centric solution that makes the developer experience (DX) smoother and more delightful.

Post-processing used to be not an easy task, but fortunately, now it is. 😜

::: info
This package is not required to use with the core library, but it can make your DX significally better, specially for complex scenes.
:::

## Installation

::: code-group

```bash [npm]
npm install @tresjs/post-processing
```

```bash [yarn]
yarn add @tresjs/post-processing
```

```bash [pnpm]
pnpm add @tresjs/post-processing
```

:::

## Basic Usage

You can import post-processing effects from both pmndrs and native Three.js. All effects are now available under the unified `@tresjs/post-processing` namespace.

### Using native Three.js effects

```vue{2,9-14}
<script setup lang="ts">
import { EffectComposer, Glitch, UnrealBloom } from '@tresjs/post-processing'
</script>

<template>
  <TresCanvas shadows alpha>
    <TresPerspectiveCamera :args="[45, 1, 0.1, 1000]" />

    <Suspense>
      <EffectComposer>
        <UnrealBloom />
        <Glitch />
      </EffectComposer>
    </Suspense>
  </TresCanvas>
</template>
```

### Using Pmndrs effects

You can also use Pmndrs `postprocessing` effects, but you need to use the `EffectComposerPmndrs` component instead of `EffectComposer` and suffix the effects with `Pmndrs`.

```vue{2,9-14}
<script setup lang="ts">
import { BloomPmndrs, EffectComposerPmndrs, GlitchPmndrs } from '@tresjs/post-processing'
</script>

<template>
  <TresCanvas shadows alpha>
    <TresPerspectiveCamera :args="[45, 1, 0.1, 1000]" />

    <Suspense>
      <EffectComposerPmndrs>
        <BloomPmndrs />
        <GlitchPmndrs />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
```
