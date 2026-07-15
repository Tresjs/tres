---
title: Scanline
description: Simulate scanlines reminiscent of old CRT displays.
---

::DocsDemo
  ::PmndrsScanline
  ::
::

The `Scanline` effect simulates scanlines reminiscent of old CRT displays, creating a nostalgic or stylized visual effect for your scene. This effect can enhance the retro aesthetic of your project or add a unique visual touch.

## Usage

```vue
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { EffectComposerPmndrs, ScanlinePmndrs } from '@tresjs/post-processing'
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
        <ScanlinePmndrs
          :density="1.25"
          :opacity="0.65"
          :scroll-speed="0.05"
        />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
```

## Props

| Prop | Description | Default |
| --- | --- | --- |
| `blendFunction` | Defines how the effect blends with the original scene. | `BlendFunction.OVERLAY` |
| `density` | The density of the scanlines. Higher values increase the frequency of lines. | `1.25` |
| `opacity` | The opacity of the scanlines. | `1.0` |
| `scrollSpeed` | The speed at which the scanlines scroll vertically. Set to `0` for static scanlines. | `0.0` |

## Further Reading

For more details, see the [ScanlineEffect documentation](https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/ScanlineEffect.js~ScanlineEffect.html).
