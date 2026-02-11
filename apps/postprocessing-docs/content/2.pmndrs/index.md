---
title: EffectComposerPmndrs
description: The main composer component for pmndrs-based post-processing effects.
---

The `EffectComposerPmndrs` component is the entry point for adding [pmndrs/postprocessing](https://github.com/pmndrs/postprocessing) effects to your scene. It manages the render pipeline and provides the effect composer context to all child effect components.

This is the **recommended** implementation for most use cases due to its optimized multi-pass rendering pipeline.

## Usage

Wrap your effects inside `EffectComposerPmndrs` as children. All pmndrs effects are suffixed with `Pmndrs`.

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

## Props

| Prop               | Description                                               | Default         |
| ------------------ | --------------------------------------------------------- | --------------- |
| `enabled`          | Enable or disable the effect composer.                    | `true`          |
| `depthBuffer`      | Whether the main render targets should have a depth buffer. | `undefined` (auto) |
| `disableNormalPass`| Disable the normal pass for performance if not needed.    | `false`         |
| `stencilBuffer`    | Whether the main render targets should have a stencil buffer. | `undefined` (auto) |
| `resolutionScale`  | The resolution scale for the depth downsampling pass.     | `undefined`     |
| `autoClear`        | Whether the renderer should auto clear before rendering.  | `true`          |
| `multisampling`    | Number of MSAA samples. Requires WebGL 2.                 | `0`             |
| `frameBufferType`  | The type of the frame buffer.                             | `HalfFloatType` |

## Events

| Event    | Description                                      | Payload          |
| -------- | ------------------------------------------------ | ---------------- |
| `render` | Emitted after each render pass of the composer.  | `EffectComposer` |

## Slots

| Slot      | Description                                      |
| --------- | ------------------------------------------------ |
| `default` | Place your pmndrs effect components here.        |

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
  <EffectComposerPmndrs ref="composerRef">
    <!-- effects -->
  </EffectComposerPmndrs>
</template>
```
