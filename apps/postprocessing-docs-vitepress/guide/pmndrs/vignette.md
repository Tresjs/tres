# Vignette

<DocsDemo>
  <VignetteDemo />
</DocsDemo>

Vignette is an effect that darkens the edges of the scene to make the center pop.

## Usage

```vue{2,11-18}
<script setup lang="ts">
import { EffectComposerPmndrs, VignettePmndrs } from '@tresjs/post-processing'
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera :position="[5, 5, 5]" />

    <!-- Your scene -->

    <Suspense>
      <EffectComposerPmndrs>
        <VignettePmndrs
          :darkness="0.9"
          :offset="0.2"
        />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
```

## Props

| Prop          | Description                                                  | Default                    |
| ------------- | ------------------------------------------------------------ | -------------------------- |
| technique     | Whether the noise should be multiplied with the input color. | VignetteTechnique.DEFAULT |
| blendFunction | The blend function to use.                                   | BlendFunction.NORMAL       |
| offset        | The offset value.                                            | 0.5                        |
| darkness      | The darkness value.                                          | 0.5                        |

## Further Reading
For more details, see the [VignetteEffect documentation](https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/VignetteEffect.js~VignetteEffect.html)
