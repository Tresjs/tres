---
title: Holographic Material
description: A simple to use holographic material for TresJS with vibrant colors, dynamic scanlines, and futuristic brilliance.
---

# HolographicMaterial

::SceneWrapper
  ::MaterialsHolographicMaterial
  ::
::

## A simple to use holographic material for TresJS

Dive into a world of mesmerizing holographic wonders with the HolographicMaterial for vanilla three.js. This enchanting three.js material brings your virtual reality experiences to life, infusing them with a burst of vibrant colors, dynamic scanlines, and a touch of futuristic brilliance.

While this material operates independently of any post-processing, it achieves an enhanced visual appeal when coupled with bloom effects. The utilization of bloom proves particularly effective in rendering a captivating glow effect, especially in areas where overexposure is prevalent.

::UAlert{icon="i-lucide-info" color="neutral" title="Info" description="This component ports Anderson Mancini's threejs-vanilla-holographic-material to TresJS. All credit goes to him."}
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

## Props

| Prop                   | Description                                                   | Type                                                | default   |
| :--------------------- | :------------------------------------------------------------ | --------------------------------------------------- | --------- |
| **fresnelAmount**      | Value of the Fresnel effect. Ranges from 0.0 to 1.0.          | `Number`                                            | `0.45`    |
| **fresnelOpacity**     | Opacity of the Fresnel effect. Ranges from 0.0 to 1.0.        | `Number`                                            | `1.0`    |
| **scanlineSize**       | Size of the scanlines. Ranges from 1 to 15.                   | `Number`                                            | `8.0`       |
| **hologramBrightness** | Brightness of the hologram. Ranges from 0.0 to 2.0.           | `Number`                                            | `1.2`       |
| **signalSpeed**        | Speed of the signal effect. Ranges from 0.0 to 2.0.           | `Number`                                            | `0.45`      |
| **hologramColor**      | Specifies the color of the hologram.                          | `String`                                            | `"#00d5ff"` |
| **enableBlinking**     | Enables or disables the blinking effect.                      | `Boolean`                                           | `true`      |
| **hologramOpacity**    | Specifies the opacity of the hologram.                        | `Number`                                            | `1.0`       |
| **blinkFresnelOnly**   | Enables or disables the blinking effect for the Fresnel only. | `Boolean`                                           | `true`      |
| **enableAdditive**     | Enables or disables the Additive Blend Mode.                  | `Boolean`                                           | `true`      |
| **side**               | Specifies side for the material, as String.                   | `THREE.FrontSide, THREE.BackSide, THREE.DoubleSide` | `FrontSide` |