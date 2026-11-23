---
title: SMAA
description: Subpixel morphological anti-aliasing for the WebGPU composer.
---

::DocsDemo
  ::WebgpuSmaa
  ::
::

`SMAA` (subpixel morphological anti-aliasing) finds the edges in the image and blends along them. It keeps edges sharper than [FXAA](/api/webgpu/fxaa), for a higher cost. It wraps three's `SMAANode`.

It is an **LDR** effect. It runs after tone mapping, so it finds the edges you see and keeps bright HDR edges smooth. LDR effects run in slot order, so put `SMAA` before `Film` to keep the grain sharp.

## Usage

Turn off the canvas `antialias` when you use SMAA, so the edges are not anti-aliased twice.

```vue
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core/webgpu'
import { EffectComposer, SMAA } from '@tresjs/post-processing/webgpu'
</script>

<template>
  <TresCanvas :antialias="false">
    <!-- Your scene -->

    <EffectComposer>
      <SMAA />
    </EffectComposer>
  </TresCanvas>
</template>
```

## Props

`SMAA` has no props. It reads the size of the image every frame.

## Differences from SMAA and SMAAPmndrs

`SMAA` has no props, because three's `SMAANode` takes no parameters. It uses the same settings as the `SMAAPmndrs` defaults: the `MEDIUM` preset (edge threshold `0.1`, 8 search steps) and color edge detection.

| Prop                                    | Why it is not available                                                         |
| --------------------------------------- | ------------------------------------------------------------------------------- |
| `width`, `height` (three family `SMAA`) | `SMAANode` reads the size of the image every frame, so you do not set it.       |
| `preset`                                | `SMAANode` uses fixed `MEDIUM` values (edge threshold `0.1`, 8 search steps).   |
| `edgeDetectionMode`                     | `SMAANode` always detects edges from the color.                                 |
| `predicationMode`                       | `SMAANode` has no predication.                                                  |
| `opacity`, `blendFunction`              | The WebGPU family has no blend functions. See [Blending](/api/webgpu#blending). |

## Further Reading

See the [three.js example](https://threejs.org/examples/?q=smaa#webgpu_postprocessing_smaa).
