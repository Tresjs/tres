---
title: Brightness & Contrast
description: Adjust the brightness and contrast of your scene.
---

::DocsDemo
  ::PmndrsBrightnessContrast
  ::
::

The `BrightnessContrast` effect is part of the [`postprocessing`](https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/BrightnessContrastEffect.js~BrightnessContrastEffect.html) package.
It adjusts the brightness and contrast of your scene.

## Usage

The `<BrightnessContrastPmndrs>` component is easy to use and provides customizable options to suit different visual styles.

```vue
<script setup lang="ts">
import { BrightnessContrastPmndrs, EffectComposerPmndrs } from '@tresjs/post-processing'

const gl = {
  toneMapping: NoToneMapping,
}

const effectProps = {
  brightness: 0.25,
  contrast: -0.5,
  blendFunction: BlendFunction.SRC,
}
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera />

    <!-- Your scene -->

    <Suspense>
      <EffectComposerPmndrs>
        <BrightnessContrastPmndrs v-bind="effectProps" />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
```

## Props

| Prop            | Description                                                   | Default                  |
| --------------- | ------------------------------------------------------------- | ------------------------ |
| `blendFunction` | Defines how the effect blends with the original scene. See the [`BlendFunction`](https://pmndrs.github.io/postprocessing/public/docs/variable/index.html#static-variable-BlendFunction) options. | `BlendFunction.SRC`      |
| `brightness`    | The brightness factor, where 0 means no change. Range: `[-1.0, 1.0]` | `0`                |
| `contrast`      | The contrast factor, where 0 means no change. Range: `[-1.0, 1.0]`   | `0`                |

## Further Reading

For more details, see the [BrightnessContrastEffect documentation](https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/BrightnessContrastEffect.js~BrightnessContrastEffect.html).
