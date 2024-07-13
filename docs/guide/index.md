# Post-processing

![Post-processing banner](/banner.png)

> Post-processing, in simple terms, consist in applying visual effects to your 3D scenes after they have been rendered. It allows you to add beautiful effects such as depth-of-field, bloom, motion blur, and many more. These effects can greatly enhance the overall look and feel of your projects, making them more immersive and visually captivating.

The `post-processing` package leverages the excellent work done by the pmndrs [postprocessing](https://github.com/pmndrs/postprocessing) package , providing you with an easy-to-use, Vue-centric solution that makes the developer experience (DX) smoother and more delightful.

Because Post-processing, is not an easy task, fortunate now it is 😜.

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

```ts
import { Bloom, DepthOfField, EffectComposer } from '@tresjs/post-processing'
```

Now you can use the `EffectComposer` component in your scene.

```html
<template>
  <TresCanvas shadows alpha>
    <TresPerspectiveCamera :args="[45," 1, 0.1, 1000] />
    <EffectComposer>
      <DepthOfField />
      <Bloom />
    </EffectComposer>
  </TresCanvas>
</template>
```
