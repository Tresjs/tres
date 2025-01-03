# Vignette

<DocsDemo>
  <VignetteDemo />
</DocsDemo>

Vignette is an effect that darkens the edges of the scene to make the center pop.

## Usage

```vue
<script setup lang="ts">
import { EffectComposerPmndrs, VignettePmndrs } from '@tresjs/post-processing'
</script>

<template>
  <EffectComposerPmndrs>
    <VignettePmndrs
      :darkness="0.9"
      :offset="0.2"
    />
  </EffectComposerPmndrs>
</template>
```

## Props

| Prop          | Description                                                 | Default                    |
| ------------- | ----------------------------------------------------------- | -------------------------- |
| technique     | Whether the noise should be multiplied with the input color. | VignetteTechnique.DEFAULT |
| blendFunction | The blend function to use. This prop is not reactive. | BlendFunction.NORMAL       |
| offset        | The offset value.                                           | 0.5                        |
| darkness      | The darkness value.                                         | 0.5                        |

## Further Reading
see [postprocessing docs](https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/VignetteEffect.js~VignetteEffect.html)
