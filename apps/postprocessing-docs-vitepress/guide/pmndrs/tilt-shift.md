# Tilt Shift

<DocsDemoGUI>
  <TiltShiftDemo />
</DocsDemoGUI>

<details>
  <summary>Demo code</summary>

  <<< @/.vitepress/theme/components/pmdrs/TiltShiftDemo.vue{0}
</details>

The `TiltShift` effect is part of the [`postprocessing`](https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/TiltShiftEffect.js~TiltShiftEffect.html) package. It allows you to create a tilt-shift effect, simulating a shallow depth of field.

## Usage

The `<TiltShiftPmndrs>` component is straightforward to use and provides customizable options to fine-tune the tilt-shift effect.

```vue{3,11-14,23-27}
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { EffectComposerPmndrs, TiltShiftPmndrs } from '@tresjs/post-processing'
import { NoToneMapping } from 'three'

const gl = {
  clearColor: '#0ff000',
  toneMapping: NoToneMapping,
}

const effectProps = {
  focusArea: 0.7,
  feather: 0.1,
}
</script>

<template>
   <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[5, 5, 5]" />

    <!-- Your scene -->

    <Suspense>
      <EffectComposerPmndrs>
        <TiltShiftPmndrs v-bind="effectProps" />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
```

## Props

| Prop              | Description                                                                                                                                                                  | Default                  |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| **blendFunction** | Defines how the effect blends with the original scene. See the [`BlendFunction`](https://pmndrs.github.io/postprocessing/public/docs/variable/index.html#static-variable-BlendFunction) options. | `BlendFunction.NORMAL`   |
| **offset**        | The relative offset of the focus area. A positive value shifts the focus area upwards, while a negative value shifts it downwards. <br> Range: `[-0.5, 0.5]`.  | `0.0`                    |
| **rotation**      | The rotation of the focus area in radians. A positive rotation turns the focus area clockwise, while a negative rotation turns it counterclockwise. <br> Range: `[-π, π]`. | `0.0`                    |
| **focusArea**     | The relative size of the focus area. A higher value increases the size of the focus area, while a lower value reduces it. <br> Range: `[0, 1]`. | `0.4`                    |
| **feather**       | The softness of the focus area edges. A higher value makes the edges softer, while a lower value makes them sharper. <br> Range: `[0, 1]`.  | `0.3`                    |
| **kernelSize**    | The blur kernel size. A larger kernel size produces a more pronounced blur. <br> See the [`KernelSize`](https://pmndrs.github.io/postprocessing/public/docs/variable/index.html#static-variable-KernelSize) options.  | `KernelSize.MEDIUM`      |
| **resolutionScale** | The resolution scale. A higher value increases the effect's resolution, while a lower value reduces it, affecting quality and performance. <br> Range: `[0.1, 1]`.  | `0.5`                    |
| **resolutionX**   | The horizontal resolution. Use `Resolution.AUTO_SIZE` for automatic sizing based on the scene's resolution. | `Resolution.AUTO_SIZE`   |
| **resolutionY**   | The vertical resolution. Use `Resolution.AUTO_SIZE` for automatic sizing based on the scene's resolution. | `Resolution.AUTO_SIZE`   |

## Further Reading

For more details, see the [TiltShiftEffect documentation](https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/TiltShiftEffect.js~TiltShiftEffect.html).
