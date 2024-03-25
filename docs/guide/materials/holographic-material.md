# HolographicMaterial

<DocsDemo>
  <HolographicMaterialDemo />
</DocsDemo>

A simple to use holographic material for threejs

Dive into a world of mesmerizing holographic wonders with the HolographicMaterial for vanilla three.js. This enchanting three.js material brings your virtual reality experiences to life, infusing them with a burst of vibrant colors, dynamic scanlines, and a touch of futuristic brilliance.

While this material operates independently of any post-processing, it achieves an enhanced visual appeal when coupled with bloom effects. The utilization of bloom proves particularly effective in rendering a captivating glow effect, especially in areas where overexposure is prevalent.

:::info
This is an integration of the Anderson Mancini [threejs-vanilla-holographic-material](https://github.com/ektogamat/threejs-vanilla-holographic-material). All credits for him.
:::

## Usage

```vue{3,10}
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { HolographicMaterial, Sphere } from '@tresjs/cientos'

</script>
<template>
  <TresCanvas>
    <TresPerspectiveCamera :position="[3, 3, 3]" />
    <Sphere :scale="0.5">
      <HolographicMaterial />
    </Sphere>
    <TresAmbientLight />
  </TresCanvas>
</template>
```

### You can also replace the material of an existing mesh like this:

<<< @/.vitepress/theme/components/GlassMaterialDemo.vue{3,9-12}

## props

| Prop                   | Description                                                         | Type                                                | default   |
| :--------------------- | :------------------------------------------------------------------ | --------------------------------------------------- | --------- |
| **fresnelAmount**      | Controls the value of the Fresnel effect. Ranges from 0.0 to 1.0.   | `Number`                                            | 0.45      |
| **fresnelOpacity**     | Controls the opacity of the Fresnel effect. Ranges from 0.0 to 1.0. | `Number`                                            | 1.0       |
| **scanlineSize**       | Controls the size of the scanlines. Ranges from 1 to 15.            | `Number`                                            | 8.0       |
| **hologramBrightness** | Controls the brightness of the hologram. Ranges from 0.0 to 2.0.    | `Number`                                            | 1.2       |
| **signalSpeed**        | Controls the speed of the signal effect. Ranges from 0.0 to 2.0.    | `Number`                                            | 0.45      |
| **hologramColor**      | Specifies the color of the hologram.                                | `String`                                            | "#00d5ff" |
| **enableBlinking**     | Enables or disables the blinking effect.                            | `Boolean`                                           | true      |
| **hologramOpacity**    | Specifies the opacity of the hologram.                              | `Number`                                            | 1.0       |
| **enableBlinking**     | Enables or disables the blinking effect.                            | `Boolean`                                           | true      |
| **blinkFresnelOnly**   | Enables or disables the blinking effect for the Fresnel only.       | `Boolean`                                           | true      |
| **enableAdditive**     | Enables or disables the Additive Blend Mode.                        | `Boolean`                                           | true      |
| **side**               | Specifies side for the material, as String.                         | `THREE.FrontSide, THREE.BackSide, THREE.DoubleSide` | FrontSide |
