---
title: Kuwahara
description: Apply a painterly Kuwahara filter to your scene.
---

::DocsDemo
  ::PmndrsKuwahara
  ::
::

The `Kuwahara` effect applies a Kuwahara filter to your scene, providing a painterly effect. It smooths out an image while keeping the edges sharp by splitting the image into small sectors, checking each for differences, and using the part with the least variance — making the image look like a painting while preserving important detail.

## Usage

```vue
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { EffectComposerPmndrs, KuwaharaPmndrs } from '@tresjs/post-processing'
import { NoToneMapping } from 'three'

const gl = {
  clearColor: '#0ff000',
  toneMapping: NoToneMapping,
}
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[5, 5, 5]" />

    <!-- Your scene -->

    <Suspense>
      <EffectComposerPmndrs>
        <KuwaharaPmndrs :radius="1" :sector-count="4" />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
```

## Props

| Prop | Description | Default |
| --- | --- | --- |
| `blendFunction` | Defines how the effect blends with the original scene. | `BlendFunction.NORMAL` |
| `radius` | The radius of the Kuwahara filter. | `1` |
| `sectorCount` | The number of sectors used in the filter. Higher values improve quality but reduce performance. Maximum is `8`. | `4` |

::warning
It is normal to experience a drastic drop in FPS when you significantly increase the `radius`. A higher radius increases the number of calculations per pixel. Use `sectorCount` to find a balance between quality and performance — reduce `sectorCount` when increasing `radius`.
::

## Further Reading

For more details, see the [KuwaharaEffect documentation](https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/KuwaharaEffect.js~KuwaharaEffect.html).
