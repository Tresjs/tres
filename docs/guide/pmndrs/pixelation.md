# Pixelation

<DocsDemo>
  <PixelationDemo />
</DocsDemo>

Pixelation is an effect that pixelates the scene.

## Usage

```vue{2,11-15}
<script setup lang="ts">
import { EffectComposerPmndrs, PixelationPmndrs } from '@tresjs/post-processing'
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera :position="[5, 5, 5]" />

    <!-- Your scene -->

    <Suspense>
      <EffectComposerPmndrs>
        <PixelationPmndrs :granularity="15" />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
```

## Props

| Prop        | Description                    | Default |
| ----------- | ------------------------------ | ------- |
| granularity | The granularity of the pixels. | 30      |

## Further Reading
For more details, see the [PixelationEffect documentation](https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/PixelationEffect.js~PixelationEffect.html)
