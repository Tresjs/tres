# SAO

<DocsDemo>
  <SAOThreeDemo />
</DocsDemo>

SAO (Scalable Ambient Occlusion) adds realistic ambient occlusion to the scene by darkening areas where surfaces are close together, such as corners and crevices. It produces soft, contact-like shadows that enhance depth perception.

## Usage

```vue
<script setup lang="ts">
import { EffectComposer, SAO } from '@tresjs/post-processing'
</script>

<template>
  <EffectComposer>
    <SAO :sao-intensity="0.005" :sao-scale="5" />
  </EffectComposer>
</template>
```

## Props

| Prop               | Description                                                                                          | Default |
|--------------------|------------------------------------------------------------------------------------------------------|---------|
| `output`           | Visualization mode. `0` = composited AO, `1` = raw AO texture, `2` = normal buffer.                 | `0`     |
| `saoBias`          | Bias for the AO calculation. Higher values reduce self-occlusion artifacts.                          | `0.5`   |
| `saoIntensity`     | Intensity of the ambient occlusion effect.                                                           | `0.0025`|
| `saoScale`         | Scale factor for the AO distance-dependent falloff.                                                  | `1`     |
| `saoKernelRadius`  | Radius of the AO sampling kernel in world-space units.                                               | `100`   |
| `saoMinResolution`  | Minimum resolution threshold for AO samples.                                                         | `0`     |
| `saoBlur`          | Whether to apply a depth-limited blur to reduce noise.                                               | `true`  |
| `saoBlurRadius`    | Kernel radius for the depth-limited Gaussian blur.                                                   | `8`     |
| `saoBlurStdDev`    | Standard deviation of the Gaussian blur kernel.                                                      | `4`     |
| `saoBlurDepthCutoff`| Depth cutoff factor for the blur to prevent blurring across edges.                                   | `0.01`  |

## Further Reading

see [Three.js example](https://threejs.org/examples/?q=sao#webgl_postprocessing_sao)
