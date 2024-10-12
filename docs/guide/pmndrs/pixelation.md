# Pixelation

<DocsDemo>
  <PixelationDemo />
</DocsDemo>

Pixelation is an effect that pixelates the scene.

## Usage

```vue
<script setup lang="ts">
import { EffectComposer, Pixelation } from '@tresjs/post-processing/pmndrs'
</script>

<template>
  <EffectComposer>
    <Pixelation />
  </EffectComposer>
</template>
```

## Props

| Prop        | Description                    | Default |
| ----------- | ------------------------------ | ------- |
| granularity | The granularity of the pixels. | 30      |

## Further Reading
see [postprocessing docs](https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/PixelationEffect.js~PixelationEffect.html)
