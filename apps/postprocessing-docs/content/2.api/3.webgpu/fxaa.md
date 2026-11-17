---
title: FXAA
description: Fast approximate anti-aliasing for the WebGPU composer.
---

::DocsDemo
  ::WebgpuFxaa
  ::
::

`FXAA` (fast approximate anti-aliasing) smooths jagged edges in one cheap pass. It wraps three's `FXAANode`. It can also blur thin lines and small text. For sharper edges, use [SMAA](/api/webgpu/smaa).

It is an **LDR** effect. It runs after tone mapping, on display colors, so it finds the edges the viewer sees.

## Usage

Turn off the canvas `antialias` when you use FXAA, so the edges are not anti-aliased twice.

```vue
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core/webgpu'
import { EffectComposer, FXAA } from '@tresjs/post-processing/webgpu'
</script>

<template>
  <TresCanvas :antialias="false">
    <!-- Your scene -->

    <EffectComposer>
      <FXAA />
    </EffectComposer>
  </TresCanvas>
</template>
```

## Props

`FXAA` has no props.

## Differences from FXAAPmndrs

`FXAA` has no props, because three's `FXAANode` takes no parameters. Its tuning values are constants in the shader.

| `FXAAPmndrs`               | Why it is not available                                                                         |
| -------------------------- | ----------------------------------------------------------------------------------------------- |
| `minEdgeThreshold`         | `FXAANode` uses a fixed contrast threshold of `0.0312`.                                         |
| `maxEdgeThreshold`         | `FXAANode` uses a fixed relative threshold of `0.063`.                                          |
| `subpixelQuality`          | `FXAANode` uses a fixed subpixel blending of `1`.                                               |
| `samples`                  | `FXAANode` always takes 6 edge search steps. The step count is fixed when the shader compiles. |
| `opacity`, `blendFunction` | The WebGPU family has no blend functions. See [Blending](/api/webgpu#blending).                 |
