# Chromatic Aberration

<DocsDemo>
  <ChromaticAberrationDemo />
</DocsDemo>

The `ChromaticAberration` effect is part of the [`postprocessing`](https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/ChromaticAberrationEffect.js~ChromaticAberrationEffect.html) package. It simulates the dispersion of light as it passes through a lens, creating subtle or dramatic color fringing effects at the edges of objects. This effect can enhance the visual appeal of your scene by adding a realistic lens effect or a stylized touch.

## Usage

The `<ChromaticAberrationPmndrs>` component is easy to use and provides customizable options to suit different visual styles.

```vue{2,38-46}
<script setup lang="ts">
import { EffectComposerPmndrs, ChromaticAberrationPmndrs } from '@tresjs/post-processing/pmndrs'
import { Vector2 } from 'three'

const gl = {
  toneMapping: NoToneMapping,
  multisampling: 8,
}

const offset = new Vector2(0.07, 0.07)
</script>

<template>
  <TresCanvas
    v-bind="gl"
  >
    <TresPerspectiveCamera
      :position="[5, 5, 5]"
      :look-at="[0, 0, 0]"
    />

    <template
      v-for="i in 4"
      :key="i"
    >
      <TresMesh
        :position="[((i - 1) - (4 - 1) / 2) * 1.5, 0, 0]"
      >
        <TresBoxGeometry
          :width="4"
          :height="4"
          :depth="4"
        />
        <TresMeshStandardMaterial color="#1C1C1E" />
      </TresMesh>
    </template>

    <Suspense>
      <EffectComposerPmndrs>
        <ChromaticAberrationPmndrs
          :offset
          radial-modulation
          :modulation-offset="0"
        />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
```

## Props

| Prop              | Description                                                                                                   | Default                   |
| ----------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------- |
| blendFunction     | Defines the [`BlendFunction`](https://pmndrs.github.io/postprocessing/public/docs/variable/index.html#static-variable-BlendFunction) used for the effect.                                                               | `BlendFunction.SRC`       |
| offset            | The color offset vector determining the intensity and direction of chromatic aberration.                     | `Vector2(0.01, 0.01)`     |
| radialModulation  | Enables radial modulation to vary the effect intensity based on distance from the center.                    | `false`                   |
| modulationOffset  | Specifies the modulation offset when `radialModulation` is **enabled**.                                          | `0.15`                    |

::: info
The `modulationOffset` property is functional only when `radialModulation` is enabled.
:::

## Further Reading
see [postprocessing docs](https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/ToneMappingEffect.js~ToneMappingEffect.html)
