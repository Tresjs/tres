---
title: Holographic Material
description: A simple to use holographic material for TresJS with vibrant colors, dynamic scanlines, and futuristic brilliance.
---

::SceneControlsWrapper
  ::MaterialsHolographicMaterial
  ::
::

## A simple to use holographic material for TresJS

Dive into a world of mesmerizing holographic wonders with the HolographicMaterial for vanilla Three.js. This enchanting Three.js material brings your virtual reality experiences to life, infusing them with a burst of vibrant colors, dynamic scanlines, and a touch of futuristic brilliance.

While this material operates independently of any post-processing, it achieves an enhanced visual appeal when coupled with bloom effects. The utilization of bloom proves particularly effective in rendering a captivating glow effect, especially in areas where overexposure is prevalent.

::prose-note
This component ports Anderson Mancini's threejs-vanilla-holographic-material to TresJS. All credit goes to him.
::

## Usage

```vue{3,10}
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { HolographicMaterial, Sphere } from '@tresjs/cientos'

</script>
<template>
  <TresCanvas>
    <TresPerspectiveCamera :position="[3, 3, 3]" :look-at=[0,0,0] />
    <Sphere :scale="0.5">
      <HolographicMaterial />
    </Sphere>
    <TresAmbientLight />
  </TresCanvas>
</template>
```

## WebGPU

Import `HolographicMaterial` from `@tresjs/cientos/webgpu` on a `TresCanvas` from `@tresjs/core/webgpu`. That version uses a TSL node material and has the same props. See [WebGPU](/getting-started/webgpu).

```ts
import { HolographicMaterial } from '@tresjs/cientos/webgpu'
```

With additive blending, overlapping parts look a little darker than with `WebGLRenderer`, and so does the hologram on a light background. `WebGPURenderer` adds colors in linear color space, and `WebGLRenderer` adds them in sRGB. On a black background, one layer looks the same with both renderers.

## Props

| Prop                   | Description                                                   | Type                                                | default   |
| :--------------------- | :------------------------------------------------------------ | --------------------------------------------------- | --------- |
| **fresnelAmount**      | Value of the Fresnel effect. Ranges from 0.0 to 1.0.          | `Number`                                            | `0.45`    |
| **fresnelOpacity**     | Opacity of the Fresnel effect. Ranges from 0.0 to 1.0.        | `Number`                                            | `1.0`    |
| **scanlineSize**       | Size of the scanlines. Ranges from 1 to 15.                   | `Number`                                            | `8.0`       |
| **hologramBrightness** | Brightness of the hologram. Ranges from 0.0 to 2.0.           | `Number`                                            | `0.7`       |
| **signalSpeed**        | Speed of the signal effect. Ranges from 0.0 to 2.0.           | `Number`                                            | `0.45`      |
| **hologramColor**      | Specifies the color of the hologram.                          | `String`                                            | `"#00d5ff"` |
| **enableBlinking**     | Enables or disables the blinking effect.                      | `Boolean`                                           | `true`      |
| **hologramOpacity**    | Specifies the opacity of the hologram.                        | `Number`                                            | `1.0`       |
| **blinkFresnelOnly**   | Enables or disables the blinking effect for the Fresnel only. | `Boolean`                                           | `true`      |
| **enableAdditive**     | Enables or disables the Additive Blend Mode.                  | `Boolean`                                           | `true`      |
| **side**               | Specifies side for the material, as String.                   | `THREE.FrontSide, THREE.BackSide, THREE.DoubleSide` | `FrontSide` |
