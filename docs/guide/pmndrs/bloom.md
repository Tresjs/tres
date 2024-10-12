# Bloom

<DocsDemo>
  <BloomDemo />
</DocsDemo>

Bloom is an effect that simulates the way that bright objects in the real world can create a "glow" effect around themselves. The effect works by adding a blurred and brightened version of the scene to the final render. This can help to create a more realistic and visually appealing scene.

## Usage

```vue
<script setup lang="ts">
import { Bloom, EffectComposer } from '@tresjs/post-processing/pmndrs'
</script>

<template>
  <EffectComposer>
    <Bloom
      :radius="0.85"
      :intensity="4.0"
      :luminance-threshold="0.1"
      :luminance-smoothing="0.3"
      mipmap-blur
    />
  </EffectComposer>
</template>
```

## Props

| Prop                 | Description                                                                                          | Default                                                                                                                                        |
| -------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `blendFunction`      | The blend function of this effect. This prop is not reactive.                                        | [BlendFunction.SCREEN](https://github.com/pmndrs/postprocessing/blob/c3ce388be247916437a314f17748a75329d65df1/src/enums/BlendFunction.js#L40) |
| `intensity`          | The intensity of the bloom effect.                                                                   | `1`                                                                                                                                            |
| `kernelSize`         | The kernel size.                                                                                     | `KernelSize.LARGE`                                                                                                                             |
| `luminanceThreshold` | The luminance threshold. Raise this value to mask out darker elements in the scene. Range is [0, 1]. | `0.9`                                                                                                                                          |
| `luminanceSmoothing` | Controls the smoothness of the luminance threshold. Range is [0, 1].                                 | `0.025`                                                                                                                                        |
| `mipMapBlur`         | Enables mip map blur (UnrealBloom). This prop is not reactive.                                                                 | `false`                                                                                                                                        |

## Further Reading
see [postprocessing docs](https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/BloomEffect.js~BloomEffect.html)
