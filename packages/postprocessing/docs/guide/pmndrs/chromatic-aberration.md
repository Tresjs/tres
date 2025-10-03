# Chromatic Aberration

<DocsDemoGUI>
  <ChromaticAberrationDemo />
</DocsDemoGUI>

<details>
  <summary>Demo code</summary>

  <<< @/.vitepress/theme/components/pmdrs/ChromaticAberrationDemo.vue{0}
</details>

The `ChromaticAberration` effect is part of the [`postprocessing`](https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/ChromaticAberrationEffect.js~ChromaticAberrationEffect.html) package. It simulates the dispersion of light as it passes through a lens, creating subtle or dramatic color fringing effects at the edges of objects. This effect can enhance the visual appeal of your scene by adding a realistic lens effect or a stylized touch.

## Usage

The `<ChromaticAberrationPmndrs>` component is easy to use and provides customizable options to suit different visual styles.

```vue{2,10-14,23-27}
<script setup lang="ts">
import { EffectComposerPmndrs, ChromaticAberrationPmndrs } from '@tresjs/post-processing'
import { Vector2 } from 'three'
import { NoToneMapping } from 'three'

const gl = {
  toneMapping: NoToneMapping,
}

const effectProps = {
  offset: new Vector2(0.07, 0.07),
  radialModulation: true,
  modulationOffset: 0
}
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[5, 5, 5]" />

    <!-- Your scene -->

    <Suspense>
      <EffectComposerPmndrs>
        <ChromaticAberrationPmndrs v-bind="effectProps" />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
```

## Props

| Prop              | Description                                                                                                   | Default                   |
| ----------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------- |
| blendFunction     | Defines how the effect blends with the original scene. See the [`BlendFunction`](https://pmndrs.github.io/postprocessing/public/docs/variable/index.html#static-variable-BlendFunction) options.                                                               | `BlendFunction.SRC`       |
| offset            | The color offset vector determining the intensity and direction of chromatic aberration.                     | `Vector2(0.01, 0.01)`     |
| radialModulation  | Enables radial modulation to vary the effect intensity based on distance from the center.                    | `false`                   |
| modulationOffset  | Specifies the modulation offset when `radialModulation` is **enabled**.                                          | `0.15`                    |

::: info
The `modulationOffset` property is functional only when `radialModulation` is enabled.
:::

## Further Reading
For more details, see the [ChromaticAberrationEffect documentation](https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/ChromaticAberrationEffect.js~ChromaticAberrationEffect.html)
