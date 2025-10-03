# Kuwahara (Watercolor Painting)

<DocsDemoGUI>
  <KuwaharaDemo />
</DocsDemoGUI>

<details>
  <summary>Demo code</summary>

  <<< @/.vitepress/theme/components/pmdrs/KuwaharaDemo.vue{0}
</details>

The `Kuwahara` effect is part of the [`postprocessing`](https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/KuwaharaEffect.js~KuwaharaEffect.html) package. It allows you to apply a Kuwahara filter to your scene, providing a painterly effect.

The Kuwahara effect smooths out an image while keeping the edges sharp. It splits the image into small parts, checks each part for differences, and uses the part with the least differences. This makes the image look like a painting, reducing noise but keeping important details.

## Usage

The `<KuwaharaPmndrs>` component is straightforward to use and provides customizable options to fine-tune the Kuwahara effect.

```vue{3,11-14,23-27}
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { EffectComposerPmndrs, KuwaharaPmndrs } from '@tresjs/post-processing'
import { NoToneMapping } from 'three'

const gl = {
  clearColor: '#0ff000',
  toneMapping: NoToneMapping,
}

const effectProps = {
  radius: 1,
  sectorCount: 4,
}
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[5, 5, 5]" />

    <!-- Your scene -->

    <Suspense>
      <EffectComposerPmndrs>
        <KuwaharaPmndrs v-bind="effectProps" />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
```

## Props

| Prop           | Description                                                                                                                                                                  | Default                  |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| **radius**     | The intensity of the Kuwahara effect. A value between `0` (no effect) and `1` (maximum effect).                                                                               | `1`                      |
| **blendFunction** | Defines how the effect blends with the original scene. See the [`BlendFunction`](https://pmndrs.github.io/postprocessing/public/docs/variable/index.html#static-variable-BlendFunction) options. | `BlendFunction.NORMAL`   |
| **sectorCount** | The number of sectors used in the Kuwahara filter. Higher values can improve the quality of the effect but may reduce performance. <br> It is preferable that the value is an **`Integer`**. <br> The maximum value is **`8`**.  | `4`                      |

::: warning
It is normal to experience a drastic drop in FPS when you significantly increase the `radius` in the Kuwahara effect. This is because a higher `radius` increases the number of calculations performed for each pixel, which can be very costly in terms of performance. If you decide to have a higher radius due to aesthetic constraints or other reasons, the `sectorCount` value has been integrated to counteract the frame drop.

The `sectorCount` value in the shader determines the number of sectors used to calculate the variance and average color in the Kuwahara effect. It divides the space around each pixel into several sectors to perform these calculations. A higher number of sectors can improve the quality of the effect but also increases the computational cost. Therefore, the `sectorCount` value helps find a good compromise between rendering quality and performance.

Therefore, you should reduce the `sectorCount` value if you decide to increase the `radius` and you experience frame drops.
:::

## Further Reading

Inspired by and based on the post [On Crafting Painterly Shaders](https://blog.maximeheckel.com/posts/on-crafting-painterly-shaders/).
