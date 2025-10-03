# Lens Distortion

<DocsDemoGUI>
  <LensDistortionDemo />
</DocsDemoGUI>

<details>
  <summary>Demo code</summary>

  <<< @/.vitepress/theme/components/pmdrs/LensDistortionDemo.vue{0}
</details>

The `LensDistortion` effect is part of the [`postprocessing`](https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/LensDistortionEffect.js~LensDistortionEffect.html) package. It allows you to apply a lens distortion effect to your scene, providing flexibility for creating realistic camera effects.

## Usage

The `<LensDistortionPmndrs>` component is straightforward to use and provides customizable options to fine-tune the distortion effect of your visuals.

```vue{2,12-17,26-30}
<script setup lang="ts">
import { EffectComposerPmndrs, LensDistortionPmndrs } from '@tresjs/post-processing'
import { Vector2 } from 'three'
import { TresCanvas } from '@tresjs/core'
import { NoToneMapping } from 'three'

const gl = {
  clearColor: '#0ff000',
  toneMapping: NoToneMapping,
}

const effectProps = {
  distortion: new Vector2(0.5, 0.5),
  principalPoint: new Vector2(0.0, 0.0),
  focalLength: new Vector2(0.5, 0.5),
  skew: 0,
}
</script>

<template>
   <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[5, 5, 5]" />

    <!-- Your scene -->

    <Suspense>
      <EffectComposerPmndrs>
        <LensDistortionPmndrs v-bind="effectProps" />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
```

## Props

| Prop           | Description                                                                                                                                                                  | Default                  |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| **distortion** | The distortion effect strength. <br> Accepts `Vector2` or `[number, number]`.                                                                                                      | `[0.0, 0.0]`             |
| **principalPoint** | The center point. <br> Accepts `Vector2` or `[number, number]`.                                                                                                               | `[0.0, 0.0]`             |
| **focalLength** | The focal length. <br> Accepts `Vector2` or `[number, number]`.                                                                                                                  | `[1.0, 1.0]`             |
| **skew**        | The skew value.                                                                                                                                               | `0`                      |

## Further Reading

For more details, see the [LensDistortionEffect documentation](https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/LensDistortionEffect.js~LensDistortionEffect.html).
