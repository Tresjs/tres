# Fish Eye

<DocsDemoGUI>
  <FishEyeDemo />
</DocsDemoGUI>

<details>
  <summary>Demo code</summary>

  <<< @/.vitepress/theme/components/pmdrs/FishEyeDemo.vue{0}
</details>

The `FishEye` is a custom effect simulates the wide-angle distortion of a fish-eye lens. Common in photography and videography, it creates a hemispherical view with a unique, immersive visual experience. The distortion bends the image outward from the center, creating a bubble-like appearance.

## Usage

The `<FishEyePmndrs>` component is straightforward to use and provides customizable options to fine-tune the fish-eye effect.

```vue{3,11-16,25-29}
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { EffectComposerPmndrs, FishEyePmndrs } from '@tresjs/post-processing'
import { BlendFunction } from 'postprocessing'

const gl = {
  clearColor: '#4f4f4f',
  toneMapping: NoToneMapping,
}

const effectProps = {
  blendFunction: BlendFunction.NORMAL,
  lensS: [1.0, 0.65],
  lensF: [0.25, 1.0],
  scale: 0.85,
}
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[5, 5, 5]" />

    <!-- Your scene -->

    <Suspense>
      <EffectComposerPmndrs>
        <FishEyePmndrs v-bind="effectProps" />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
```

## Props

| Prop           | Description                                                                                                                                                                  | Default                  |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| **blendFunction** | Defines how the effect blends with the original scene. See the [`BlendFunction`](https://pmndrs.github.io/postprocessing/public/docs/variable/index.html#static-variable-BlendFunction) options. | `BlendFunction.NORMAL`   |
| **lensS**      | The lens scale. <br> A `Vector2` value or an array of two numbers. (ex: `[0.5, .75]`)                                                                                                              | `Vector2(1.0, 1.0)`             |
| **lensF**      | The lens factor. <br> A `Vector2` value or an array of two numbers. (ex: `[0.0, 0.5]`)                                                                                     | `Vector2(0.0, 1.0)`             |
| **scale**      | The scale of the effect. A `number`.                                                                                                                                           | `1.0`                    |

## Further Reading

For an example of the fish-eye effect in WebGL, see the [Fish Eye Effect on Shadertoy](https://www.shadertoy.com/view/MXyBRy).
