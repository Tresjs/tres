# Color Average

<DocsDemoGUI>
  <ColorAverageDemo />
</DocsDemoGUI>

The `ColorAverage` effect is part of the [`postprocessing`](https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/ColorAverageEffect.js~ColorAverageEffect.html) package. It averages the colors of the scene, creating a unique visual effect. This effect can be used to achieve a variety of artistic styles.

## Usage

The `<ColorAveragePmndrs>` component is easy to use and provides customizable options to suit different visual styles.

```vue{6,15-18,40-44}
<script setup lang="ts">
import { Environment, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { NoToneMapping } from 'three'
import { BlendFunction } from 'postprocessing'
import { ColorAveragePmndrs, EffectComposerPmndrs } from '@tresjs/post-processing'

const gl = {
  clearColor: '#ffffff',
  toneMapping: NoToneMapping,
  multisampling: 8,
  envMapIntensity: 10,
}

const effectProps = reactive({
  blendFunction: BlendFunction.NORMAL,
  opacity: 0.5
})
</script>

<template>
  <TresCanvas
    v-bind="gl"
  >
    <TresPerspectiveCamera
      :position="[5, 2, 15]"
      :look-at="[0, 0, 0]"
    />
    <OrbitControls auto-rotate />

    <TresMesh :position="[0, 3.5, 0]">
      <TresBoxGeometry :args="[2, 2, 2]" />
      <TresMeshPhysicalMaterial color="#8B0000" :roughness=".25" />
    </TresMesh>

    <Suspense>
      <Environment background preset="shangai" />
    </Suspense>

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
| blendFunction     | Defines the [`BlendFunction`](https://pmndrs.github.io/postprocessing/public/docs/variable/index.html#static-variable-BlendFunction) used for the effect.                                                               | `BlendFunction.NORMAL`    |
| opacity           | Sets the opacity of the color average effect.                                                                 | `1`                       |

## Further Reading
For more details, see the [ColorAverage documentation](https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/ColorAverageEffect.js~ColorAverageEffect.html)
