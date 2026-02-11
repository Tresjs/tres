---
title: EffectComposer
description: The main composer component for Three.js native post-processing effects.
---

The `EffectComposer` component is the entry point for adding native [Three.js post-processing](https://threejs.org/examples/?q=postprocessing) effects to your scene. Use this when you need effects not available in the pmndrs implementation or prefer the Three.js approach.

## Usage

Wrap your effects inside `EffectComposer` as children. Three.js effects use their original names without any suffix.

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

## Props

| Prop               | Description                                              | Default     |
| ------------------ | -------------------------------------------------------- | ----------- |
| `enabled`          | Enable or disable the effect composer.                   | `true`      |
| `renderTarget`     | Custom `WebGLRenderTarget` for the composer.             | `undefined` |
| `withoutRenderPass`| Skip adding the default `RenderPass` automatically.      | `false`     |

## Slots

| Slot      | Description                                          |
| --------- | ---------------------------------------------------- |
| `default` | Place your Three.js effect components here.          |

## Exposed

The component exposes the underlying `EffectComposer` instance via template ref:

```vue
<script setup lang="ts">
import { shallowRef } from 'vue'

const composerRef = shallowRef()

// Access the composer instance
// composerRef.value?.composer
</script>

<template>
  <EffectComposer ref="composerRef">
    <!-- effects -->
  </EffectComposer>
</template>
```
