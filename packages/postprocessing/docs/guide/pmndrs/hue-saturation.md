# Hue & Saturation

<DocsDemoGUI>
  <HueSaturationDemo />
</DocsDemoGUI>

<details>
  <summary>Demo code</summary>

  <<< @/.vitepress/theme/components/pmdrs/HueSaturationDemo.vue{0}
</details>

The `HueSaturation` effect is part of the [`postprocessing`](https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/HueSaturationEffect.js~HueSaturationEffect.html) package. It allows you to adjust the hue and saturation of your scene, providing flexibility for color grading and artistic effects.

## Usage

The `<HueSaturationPmndrs>` component is straightforward to use and provides customizable options to fine-tune the hue and saturation of your visuals.

```vue{2,11-15,24-28}
<script setup lang="ts">
import { EffectComposerPmndrs, HueSaturationPmndrs } from '@tresjs/post-processing'
import { BlendFunction } from 'postprocessing'
import { NoToneMapping } from 'three'

const gl = {
  clearColor: '#00ff00',
  toneMapping: NoToneMapping,
}

const effectProps = {
  saturation: 1,
  hue: -Math.PI,
  blendFunction: BlendFunction.SRC,
}
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[5, 5, 5]" />

    <!-- Your scene -->

    <Suspense>
      <EffectComposerPmndrs>
        <HueSaturationPmndrs v-bind="effectProps" />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
```

## Props

| Prop           | Description                                                                                                                                                                  | Default                  |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| **saturation** | The saturation adjustment. A value of `0.0` results in grayscale, while `1.0` leaves saturation unchanged. Range: `[0.0, 1.0]`.                                               | `0.0`                    |
| **hue**        | The hue adjustment in radians. Values range from `[-π, π]` (or `[0, 2π]` for a full rotation).                                                                               | `0.0`                    |
| **blendFunction** | Defines how the effect blends with the original scene. See the [`BlendFunction`](https://pmndrs.github.io/postprocessing/public/docs/variable/index.html#static-variable-BlendFunction) options. | `BlendFunction.SRC`      |

## Further Reading

For more details, see the [HueSaturationEffect documentation](https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/HueSaturationEffect.js~HueSaturationEffect.html).
