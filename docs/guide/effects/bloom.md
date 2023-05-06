# Bloom

<ClientOnly>
<BloomDemo style="aspect-ratio: 16/9; height: auto; margin: 2rem 0; border-radius: 8px; overflow:hidden;"  />
</ClientOnly>

Bloom is an effect that simulates the way that bright objects in the real world can create a "glow" effect around themselves. The effect works by adding a blurred and brightened version of the scene to the final render. This can help to create a more realistic and visually appealing scene.

## Usage

```vue
<script setup lang="ts">
import { EffectComposer, Bloom } from '@tresjs/post-processing'
</script>

<template>
  <EffectComposer>
    <Bloom :luminance-threshold="0.1" :luminance-smoothing="0.3" mipmap-blur :intensity="4.0" :radius="0.85" />
  </EffectComposer>
</template>
```

## Props

| Prop                 | Description                                                                                          | Default            |
| -------------------- | ---------------------------------------------------------------------------------------------------- | ------------------ |
| `intensity`          | The intensity of the bloom effect.                                                                   | `1`                |
| `blurPass`           | An efficient, incremental blur pass.                                                                 |                    |
| `width`              | The width of the render.                                                                             |                    |
| `height`             | The height of the render.                                                                            |                    |
| `kernelSize`         | The kernel size.                                                                                     | `KernelSize.LARGE` |
| `luminanceThreshold` | The luminance threshold. Raise this value to mask out darker elements in the scene. Range is [0, 1]. | `0.9`              |
| `luminanceSmoothing` | Controls the smoothness of the luminance threshold. Range is [0, 1].                                 | `0.025`            |
| `mipMapBlur`         | Enables mip map blur. (UnrealBloom)                                                                  | `false`            |
