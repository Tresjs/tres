# Brightness & Contrast

<DocsDemoGUI>
  <BrightnessContrastDemo />
</DocsDemoGUI>

<details>
  <summary>Demo code</summary>

  <<< @/.vitepress/theme/components/pmdrs/BrightnessContrastDemo.vue{0}
</details>

The `BrightnessContrast` effect is part of the [`postprocessing`](https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/BrightnessContrastEffect.js~BrightnessContrastEffect.html) package.
It adjusts the brightness and contrast of your scene.

## Usage

The `<BrightnessContrastPmndrs>` component is easy to use and provides customizable options to suit different visual styles.

```vue{2,9-13,27-31}
<script setup lang="ts">
import { EffectComposerPmndrs, BrightnessContrastPmndrs } from '@tresjs/post-processing/pmndrs'

const gl = {
  toneMapping: NoToneMapping,
  multisampling: 8,
}

const effectProps = {
  brightness:0.25,
  contrast: -0.5,
  blendFunction: BlendFunction.SRC,
}
</script>

<template>
  <TresCanvas
    v-bind="gl"
  >
    <TresPerspectiveCamera />

    <TresMesh :position="[0, .5, 0]">
      <TresBoxGeometry :args="[2, 2, 2]" />
      <TresMeshPhysicalMaterial color="black" :roughness=".25" />
    </TresMesh>

    <Suspense>
      <EffectComposerPmndrs>
        <BrightnessContrastPmndrs v-bind="effectProps" />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
```

## Props

| Prop          | Description                                                   | Default                     |
| ------------- | ------------------------------------------------------------- | --------------------------- |
| blendFunction | Defines how the effect blends with the original scene. See the [`BlendFunction`](https://pmndrs.github.io/postprocessing/public/docs/variable/index.html#static-variable-BlendFunction) options.       | `BlendFunction.SRC`      |
| brightness    | The brightness factor, where 0 means no change.  <br> Range: `[-1.0, 1.0]`                 | `0`                         |
| contrast      | The contrast factor, where 0 means no change. <br> Range: `[-1.0, 1.0]`                   | `0`                         |

## Further Reading
For more details, see the [BrightnessContrast documentation](https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/BrightnessContrastEffect.js~BrightnessContrastEffect.html)
