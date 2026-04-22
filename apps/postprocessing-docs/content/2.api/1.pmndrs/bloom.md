---
title: Bloom
description: Simulate the glow of bright objects in a scene.
---

::DocsDemo
  ::PmndrsBloom
  ::
::

Bloom is an effect that simulates the way bright objects in the real world create a "glow" around themselves. The effect works by adding a blurred and brightened version of the scene to the final render, producing a more realistic and visually appealing result.

## Usage

```vue
<script setup lang="ts">
import { BloomPmndrs, EffectComposerPmndrs } from '@tresjs/post-processing'
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera :position="[5, 5, 5]" />

    <!-- Your scene -->

    <Suspense>
      <EffectComposerPmndrs>
        <BloomPmndrs
          :radius="0.85"
          :intensity="4.0"
          :luminance-threshold="0.1"
          :luminance-smoothing="0.3"
          mipmap-blur
        />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
```

## Props

| Prop                 | Description                                                                                          | Default                                                                                                                                        |
| -------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `blendFunction`      | The blend function of this effect.                                                                   | [BlendFunction.SCREEN](https://github.com/pmndrs/postprocessing/blob/c3ce388be247916437a314f17748a75329d65df1/src/enums/BlendFunction.js#L40) |
| `intensity`          | The intensity of the bloom effect.                                                                   | `1`                                                                                                                                            |
| `kernelSize`         | The kernel size.                                                                                     | `KernelSize.LARGE`                                                                                                                             |
| `luminanceThreshold` | The luminance threshold. Raise this value to mask out darker elements in the scene. Range is [0, 1]. | `0.9`                                                                                                                                          |
| `luminanceSmoothing` | Controls the smoothness of the luminance threshold. Range is [0, 1].                                 | `0.025`                                                                                                                                        |
| `mipMapBlur`         | Enables mip map blur (UnrealBloom).                                                                  | `false`                                                                                                                                        |

## Further Reading

For more details, see the [BloomEffect documentation](https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/BloomEffect.js~BloomEffect.html).
