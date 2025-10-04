# Sepia

<DocsDemoGUI>
  <SepiaDemo />
</DocsDemoGUI>

<details>
  <summary>Demo code</summary>

  <<< @/.vitepress/theme/components/pmdrs/SepiaDemo.vue{0}
</details>

The `Sepia` effect is part of the [`postprocessing`](https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/SepiaEffect.js~SepiaEffect.html) package. It applies a sepia tone to the scene, giving it a warm, antique appearance. This effect can enhance the visual appeal of your scene by adding a vintage or stylized touch.

## Usage

The `<SepiaPmndrs>` component is easy to use and provides customizable options to suit different visual styles.

```vue{3,17-21}
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { EffectComposerPmndrs, SepiaPmndrs } from '@tresjs/post-processing'
import { NoToneMapping } from 'three'

const gl = {
  toneMapping: NoToneMapping,
}
</script>

<template>
  <TresCanvas v-bind="gl" >
    <TresPerspectiveCamera :position="[5, 5, 5]" />

    <!-- Your scene -->

    <Suspense>
      <EffectComposerPmndrs>
        <SepiaPmndrs :intensity="2" />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
```

## Props

| Prop              | Description                                                                                                   | Default                   |
| ----------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------- |
| blendFunction     | Defines how the effect blends with the original scene. See the [`BlendFunction`](https://pmndrs.github.io/postprocessing/public/docs/variable/index.html#static-variable-BlendFunction) options.        | `BlendFunction.NORMAL`       |
| intensity         | The intensity of the sepia effect.                                                                            | `1.0`                     |

## Further Reading
For more details, see the [SepiaEffect documentation](https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/SepiaEffect.js~SepiaEffect.html)
