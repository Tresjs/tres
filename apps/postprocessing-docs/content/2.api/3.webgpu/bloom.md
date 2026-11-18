---
title: Bloom
description: Add a glow around the bright areas of the scene.
---

::DocsDemo
  ::WebgpuBloom
  ::
::

`Bloom` adds a blurred copy of the bright areas of the scene to the image. It wraps three's `BloomNode`.

It is an **HDR** effect. It runs on linear scene colors, before tone mapping, so colors above `1` (such as an `emissiveIntensity` above `1`) glow more.

On a canvas with `alpha`, the glow adds to the color but not to the alpha. Do not rely on the glow over a transparent pixel: three r186 and newer hide it, and with older versions the result depends on the browser.

## Usage

```vue
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core/webgpu'
import { Bloom, EffectComposer } from '@tresjs/post-processing/webgpu'
</script>

<template>
  <TresCanvas>
    <!-- Your scene -->

    <EffectComposer>
      <Bloom :strength="1" :radius="0.4" :threshold="0.8" />
    </EffectComposer>
  </TresCanvas>
</template>
```

## Props

| Prop          | Description                                                                                       | Default |
| ------------- | ------------------------------------------------------------------------------------------------- | ------- |
| `strength`    | The strength of the glow.                                                                         | `1`     |
| `radius`      | How far the glow spreads. Range is [0, 1].                                                        | `0`     |
| `threshold`   | The luminance above which a pixel glows. `0` makes every pixel glow.                              | `0`     |
| `smoothWidth` | The width of the soft transition above `threshold`. Higher values fade the glow in more gradually. Keep it above `0`. | `0.01`  |

## Differences from BloomPmndrs

`Bloom` exposes the parameters of three's `bloom()` function and the `smoothWidth` uniform of `BloomNode`. Some `BloomPmndrs` props have no counterpart, because `BloomNode` uses fixed values for them.

| `BloomPmndrs`        | `Bloom`                                                                                                                     |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `intensity`          | `strength`                                                                                                                  |
| `luminanceThreshold` | `threshold`                                                                                                                 |
| `radius`             | `radius`. Always active, because `BloomNode` always blurs with mipmaps.                                                     |
| `mipmapBlur`         | Not available. `BloomNode` always blurs 5 mip levels.                                                                       |
| `kernelSize`         | Not available. `BloomNode` uses fixed kernel sizes (6, 10, 14, 18 and 22) for its 5 mip levels.                             |
| `luminanceSmoothing` | `smoothWidth`. Same role, with the `BloomNode` default of `0.01` instead of `0.025`.                                         |
| `blendFunction`      | Not available. The WebGPU family has no blend functions. See [Blending](/api/webgpu#blending).                              |

## Further Reading

See the [three.js example](https://threejs.org/examples/?q=bloom#webgpu_postprocessing_bloom).
