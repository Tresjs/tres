---
title: Linocut
description: Transform your scene into a high-contrast black-and-white linocut print aesthetic.
---

::DocsDemo
  ::PmndrsLinocut
  ::
::

The `Linocut` effect is a custom shader inspired by traditional linocut and woodcut printmaking. It transforms the scene into a high-contrast black-and-white composition, featuring bold lines and intricate patterns that replicate the handcrafted aesthetic of relief printing techniques.

## Usage

```vue
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { EffectComposerPmndrs, LinocutPmndrs } from '@tresjs/post-processing'
import { NoToneMapping } from 'three'

const gl = {
  clearColor: '#4f4f4f',
  toneMapping: NoToneMapping,
}
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[5, 5, 5]" />

    <!-- Your scene -->

    <Suspense>
      <EffectComposerPmndrs>
        <LinocutPmndrs
          :scale="0.85"
          :noise-scale="0.0"
          :center="[0.5, 0.5]"
          :rotation="0.0"
        />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
```

## Props

| Prop | Description | Default |
| --- | --- | --- |
| `scale` | Line width control. A value between 0 and 1. | `0.85` |
| `noiseScale` | Noise intensity. A value between 0 and 1. | `0.0` |
| `center` | Center of rotation (normalized coordinates). Accepts `Vector2` or `[number, number]`. | `[0.5, 0.5]` |
| `rotation` | Rotation angle in radians. A value between -π and π. | `0.0` |
| `blendFunction` | Defines how the effect blends with the original scene. | `BlendFunction.NORMAL` |

## Further Reading

For an example of the linocut effect in WebGL, see the [Linocut Effect on Shadertoy](https://www.shadertoy.com/view/4XVcDV).
