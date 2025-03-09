# Color Average

<DocsDemoGUI>
  <ColorAverageDemo />
</DocsDemoGUI>

<details>
  <summary>Demo code</summary>

  <<< @/.vitepress/theme/components/pmdrs/ColorAverageDemo.vue{0}
</details>

The `ColorAverage` effect is part of the [`postprocessing`](https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/ColorAverageEffect.js~ColorAverageEffect.html) package. It averages the colors of the scene, creating a unique visual effect. This effect can be used to achieve a variety of artistic styles.

## Usage

The `<ColorAveragePmndrs>` component is easy to use and provides customizable options to suit different visual styles.

```vue{4,11-13,20-24}
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { NoToneMapping } from 'three'
import { ColorAveragePmndrs, EffectComposerPmndrs } from '@tresjs/post-processing'

const gl = {
  clearColor: '#ff0000',
  toneMapping: NoToneMapping,
}

const effectProps = reactive({
  opacity: 0.5
})
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[5, 5, 5]"/>

    <Suspense>
      <EffectComposerPmndrs>
        <ColorAveragePmndrs v-bind="effectProps" />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
```

## Props

| Prop              | Description                                                                                                   | Default                   |
| ----------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------- |
| blendFunction     | Defines how the effect blends with the original scene. See the [`BlendFunction`](https://pmndrs.github.io/postprocessing/public/docs/variable/index.html#static-variable-BlendFunction) options.                                                               | `BlendFunction.NORMAL`    |
| opacity           | Sets the opacity of the color average effect.                                                                 | `1`                       |

## Further Reading
For more details, see the [ColorAverage documentation](https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/ColorAverageEffect.js~ColorAverageEffect.html)
