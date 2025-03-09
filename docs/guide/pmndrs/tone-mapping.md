# ToneMapping

<DocsDemoGUI>
  <ToneMappingDemo />
</DocsDemoGUI>

The `ToneMapping` effect from the [`postprocessing`](https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/ToneMappingEffect.js~ToneMappingEffect.html) package provides an abstraction for various tone mapping algorithms to improve the visual rendering of HDR (high dynamic range) content. Tone mapping is used to map high-range brightness values to a range that is displayable on standard screens. This effect contributes significantly to the visual quality of your scene by controlling luminance and color balance.

::: info
If the colors in your scene look incorrect after adding the EffectComposer, it might be because tone mapping is deactivated by default, which is normal behavior. Add `<ToneMappingPmndrs>` manually as an effect at the end of the `<EffectComposerPmndrs>` to fix this.
:::

## Usage

The `<ToneMappingPmndrs>` component is easy to set up and comes with multiple tone mapping modes to suit different visual requirements. Below is an example of how to use it in a Vue application.

```vue{2,4,7-8,32-36}
<script setup lang="ts">
import { EffectComposerPmndrs, ToneMappingPmndrs } from '@tresjs/post-processing/pmndrs'
import { onUnmounted, shallowRef } from 'vue'
import { ToneMappingMode } from 'postprocessing'

const gl = {
  toneMappingExposure: 1,
  toneMapping: NoToneMapping,
  multisampling: 8,
}

const modelRef = shallowRef(null)

const { scene: model } = await useGLTF('https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/realistic-pokeball/scene.gltf', { draco: true })

onUnmounted(() => {
  dispose(modelRef.value)
})
</script>

<template>
  <TresCanvas
    v-bind="gl"
  >
    <TresPerspectiveCamera
      :position="[5, 5, 5]"
      :look-at="[0, 0, 0]"
    />

    <primitive ref="modelRef" :object="model" />

    <Suspense>
      <EffectComposerPmndrs>
        <ToneMappingPmndrs :mode="ToneMappingMode.AGX" />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
```

## Props

| Prop              | Description                                                                                                   | Default                                                                                           |
| ----------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| mode              | Tone mapping mode used, defined by [`ToneMappingMode`](https://pmndrs.github.io/postprocessing/public/docs/variable/index.html#static-variable-ToneMappingMode).                                                         | `ToneMappingMode.AGX`                                                                             |
| blendFunction     | Defines the [`BlendFunction`](https://pmndrs.github.io/postprocessing/public/docs/variable/index.html#static-variable-BlendFunction) used for the effect.                                                               | `BlendFunction.SRC`                                                                               |
| resolution        | Resolution of the luminance texture (must be a power of two, e.g., 256, 512, etc.).                           | `256`                                                                                             |
| averageLuminance  | Average luminance value used in adaptive calculations. Only applicable to `ToneMappingMode.REINHARD2`                        | `1.0`                                                                                             |
| middleGrey        | Factor to adjust the balance of grey in luminance calculations. Only applicable to `ToneMappingMode.REINHARD2`               | `0.6`                                                                                             |
| minLuminance      | Lower luminance limit, used to avoid overexposure effects in dark scenes. Only applicable to `ToneMappingMode.REINHARD2`     | `0.01`                                                                                            |
| whitePoint        | White point for tone mapping, used to balance luminance values. Only applicable to `ToneMappingMode.REINHARD2`               | `4.0`                                                                                             |

## Further Reading
For more details, see the [Tone Mapping documentation](https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/ToneMappingEffect.js~ToneMappingEffect.html)
