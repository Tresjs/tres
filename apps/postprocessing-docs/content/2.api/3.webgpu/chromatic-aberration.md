---
title: Chromatic Aberration
description: Split the color channels towards the edges of the screen.
---

::DocsDemo
  ::WebgpuChromaticAberration
  ::
::

`ChromaticAberration` moves the red, green and blue channels apart, more towards the edges of the screen, like a cheap lens. It wraps three's `ChromaticAberrationNode`.

It is an **HDR** effect, so it runs before tone mapping, like a lens in front of the camera.

## Usage

```vue
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core/webgpu'
import { ChromaticAberration, EffectComposer } from '@tresjs/post-processing/webgpu'
</script>

<template>
  <TresCanvas>
    <!-- Your scene -->

    <EffectComposer>
      <ChromaticAberration :strength="1.5" :center="[0.5, 0.5]" />
    </EffectComposer>
  </TresCanvas>
</template>
```

## Props

| Prop       | Description                                                                         | Default      |
| ---------- | ----------------------------------------------------------------------------------- | ------------ |
| `strength` | The strength of the channel split.                                                  | `1`          |
| `center`   | The center of the effect in screen UV, from `[0, 0]` to `[1, 1]`. A `Vector2` or a tuple. | `[0.5, 0.5]` |
| `scale`    | The scale step between the color channels.                                         | `1.1`        |

## Differences from ChromaticAberrationPmndrs

The two effects use different models. `ChromaticAberrationPmndrs` moves the channels by a fixed `offset`. Three's `ChromaticAberrationNode` scales the red and blue channels away from `center`, so the split grows towards the edges of the screen. Its parameters are `strength`, `center` and `scale`, and `ChromaticAberration` exposes all of them.

| `ChromaticAberrationPmndrs`            | Why it is not available                                                         |
| -------------------------------------- | ------------------------------------------------------------------------------- |
| `offset`                               | `ChromaticAberrationNode` has no fixed offset. Use `strength` and `scale`.      |
| `radialModulation`, `modulationOffset` | `ChromaticAberrationNode` is always radial, from `center`.                      |
| `blendFunction`                        | The WebGPU family has no blend functions. See [Blending](/api/webgpu#blending). |

## Further Reading

See the [three.js example](https://threejs.org/examples/?q=chromatic#webgpu_postprocessing_ca).
