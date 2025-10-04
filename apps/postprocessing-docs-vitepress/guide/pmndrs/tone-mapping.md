# ToneMapping

<DocsDemoGUI>
  <ToneMappingDemo />
</DocsDemoGUI>

<details>
  <summary>Demo code</summary>

  <<< @/.vitepress/theme/components/pmdrs/ToneMappingDemo.vue{0}
</details>

The `ToneMapping` effect from the [`postprocessing`](https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/ToneMappingEffect.js~ToneMappingEffect.html) package provides an abstraction for various tone mapping algorithms to improve the visual rendering of HDR (high dynamic range) content. Tone mapping is used to map high-range brightness values to a range that is displayable on standard screens. This effect contributes significantly to the visual quality of your scene by controlling luminance and color balance.

::: info
If the colors in your scene look incorrect after adding the EffectComposer, it might be because tone mapping is deactivated by default, which is normal behavior. Add `<ToneMappingPmndrs>` manually as an effect at the end of the `<EffectComposerPmndrs>` to fix this.
:::

## Usage

The `<ToneMappingPmndrs>` component is easy to set up and comes with multiple tone mapping modes to suit different visual requirements. Below is an example of how to use it in a Vue application.

```vue{3,5,7-10,12-14,23-27}
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { EffectComposerPmndrs, ToneMappingPmndrs } from '@tresjs/post-processing'
import { NoToneMapping } from 'three'
import { ToneMappingMode } from 'postprocessing'

const gl = {
  toneMappingExposure: 1,
  toneMapping: NoToneMapping,
}

const effectProps = {
  mode: ToneMappingMode.AGX,
}
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[5, 5, 5]" />

    <!-- Your scene -->

    <Suspense>
      <EffectComposerPmndrs>
        <ToneMappingPmndrs v-bind="effectProps" />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
```

## Props

| Prop              | Description                                                                                                   | Default                                                                                           |
| ----------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| mode              | Tone mapping mode used, defined by [`ToneMappingMode`](https://pmndrs.github.io/postprocessing/public/docs/variable/index.html#static-variable-ToneMappingMode).                                                         | `ToneMappingMode.AGX`                                                                             |
| blendFunction     | Defines how the effect blends with the original scene. See the [`BlendFunction`](https://pmndrs.github.io/postprocessing/public/docs/variable/index.html#static-variable-BlendFunction) options.                                                               | `BlendFunction.SRC`                                                                               |
| resolution        | Resolution of the luminance texture (must be a power of two, e.g., 256, 512, etc.).                           | `256`                                                                                             |
| averageLuminance  | Average luminance value used in adaptive calculations. Only applicable to `ToneMappingMode.REINHARD2`                        | `1.0`                                                                                             |
| middleGrey        | Factor to adjust the balance of grey in luminance calculations. Only applicable to `ToneMappingMode.REINHARD2`               | `0.6`                                                                                             |
| minLuminance      | Lower luminance limit, used to avoid overexposure effects in dark scenes. Only applicable to `ToneMappingMode.REINHARD2`     | `0.01`                                                                                            |
| whitePoint        | White point for tone mapping, used to balance luminance values. Only applicable to `ToneMappingMode.REINHARD2`               | `4.0`                                                                                             |

## Further Reading
For more details, see the [ToneMappingEffect documentation](https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/ToneMappingEffect.js~ToneMappingEffect.html)
