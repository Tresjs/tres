---
title: Lens Distortion
description: Apply a lens distortion effect to simulate realistic camera optics.
---

::DocsDemo
  ::PmndrsLensDistortion
  ::
::

The `LensDistortion` effect applies a lens distortion effect to your scene, providing flexibility for creating realistic camera effects.

## Usage

```vue
<script setup lang="ts">
import { EffectComposerPmndrs, LensDistortionPmndrs } from '@tresjs/post-processing'
import { Vector2 } from 'three'
import { TresCanvas } from '@tresjs/core'
import { NoToneMapping } from 'three'

const gl = {
  toneMapping: NoToneMapping,
}
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[5, 5, 5]" />

    <!-- Your scene -->

    <Suspense>
      <EffectComposerPmndrs>
        <LensDistortionPmndrs
          :distortion="new Vector2(0.5, 0.5)"
          :principal-point="new Vector2(0.0, 0.0)"
          :focal-length="new Vector2(0.5, 0.5)"
          :skew="0"
        />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
```

## Props

| Prop | Description | Default |
| --- | --- | --- |
| `distortion` | The distortion effect strength. Accepts `Vector2` or `[number, number]`. | `[0.0, 0.0]` |
| `principalPoint` | The center point. Accepts `Vector2` or `[number, number]`. | `[0.0, 0.0]` |
| `focalLength` | The focal length. Accepts `Vector2` or `[number, number]`. | `[1.0, 1.0]` |
| `skew` | The skew value. | `0` |

## Further Reading

For more details, see the [LensDistortionEffect documentation](https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/LensDistortionEffect.js~LensDistortionEffect.html).
