---
title: Noise
description: Add Gaussian noise to simulate film grain or TV static.
---

::DocsDemo
  ::PmndrsNoise
  ::
::

Noise is an effect that adds Gaussian noise to the scene. This can be used to simulate a variety of effects, such as static on a TV or film grain.

## Usage

```vue
<script setup lang="ts">
import { EffectComposerPmndrs, NoisePmndrs } from '@tresjs/post-processing'
import { BlendFunction } from 'postprocessing'
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera :position="[5, 5, 5]" />

    <!-- Your scene -->

    <Suspense>
      <EffectComposerPmndrs>
        <NoisePmndrs
          premultiply
          :blend-function="BlendFunction.SCREEN"
        />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
```

## Props

| Prop | Description | Default |
| --- | --- | --- |
| `blendFunction` | The blend function of this effect. | `BlendFunction.SCREEN` |
| `premultiply` | Indicates whether noise will be multiplied with the input colors prior to blending. | `false` |

## Further Reading

For more details, see the [NoiseEffect documentation](https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/NoiseEffect.js~NoiseEffect.html).
