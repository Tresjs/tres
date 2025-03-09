# Tilt Shift

<DocsDemoGUI>
  <TiltShiftDemo />
</DocsDemoGUI>

The `TiltShift` effect is part of the [`postprocessing`](https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/TiltShiftEffect.js~TiltShiftEffect.html) package. It allows you to create a tilt-shift effect, simulating a shallow depth of field.

## Usage

The `<TiltShiftPmndrs>` component is straightforward to use and provides customizable options to fine-tune the tilt-shift effect.

```vue{3,21-24,49-53}
<script setup lang="ts">
import { Environment, OrbitControls } from '@tresjs/cientos'
import { EffectComposerPmndrs, TiltShiftPmndrs } from '@tresjs/post-processing'
import { NoToneMapping } from 'three'

const colors = [
  '#FF5733',
  '#33FF57',
  '#3357FF',
  '#FF33A1',
  '#33FFF5',
  '#FF5733',
  '#FF8D33',
]

const gl = {
  toneMapping: NoToneMapping,
  multisampling: 8,
}

const effectProps = {
  focusArea: 0.7,
  feather: 0.1,
}
</script>

<template>
   <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[0, 4, 8]" />
    <OrbitControls auto-rotate />

    <template v-for="index in 50" :key="index">
      <TresMesh :position="[(index % 10) * 3 - 13.5, 0, Math.floor(index / 10) * 3 - 7.5]" :scale="[2, Math.random() * 5 + 2, 2]">
        <TresBoxGeometry :args="[1, 1, 1]" />
        <TresMeshPhysicalMaterial
          :color="colors[index % colors.length]"
          :roughness="0.35"
          :metalness="0.5"
          :clearcoat="0.3"
          :clearcoatRoughness="0.25"
        />
      </TresMesh>
    </template>

    <Suspense>
      <Environment background :blur=".35" preset="snow" />
    </Suspense>

    <Suspense>
      <EffectComposerPmndrs>
        <TiltShiftPmndrs v-bind="effectProps" />
      </EffectComposerPmndrs>
    </Suspense>

    <TresGridHelper :position="[0, -3.5, 0]" :args="[30, 15]" />
  </TresCanvas>
</template>
```

## Props

| Prop              | Description                                                                                                                                                                  | Default                  |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| **blendFunction** | Defines how the effect blends with the original scene. <br> See the [`BlendFunction`](https://pmndrs.github.io/postprocessing/public/docs/variable/index.html#static-variable-BlendFunction) options. | `BlendFunction.NORMAL`   |
| **offset**        | The relative offset of the focus area. A positive value shifts the focus area upwards, while a negative value shifts it downwards. <br> Range: `[-0.5, 0.5]`.  | `0.0`                    |
| **rotation**      | The rotation of the focus area in radians. A positive rotation turns the focus area clockwise, while a negative rotation turns it counterclockwise. <br> Range: `[-π, π]`. | `0.0`                    |
| **focusArea**     | The relative size of the focus area. A higher value increases the size of the focus area, while a lower value reduces it. <br> Range: `[0, 1]`. | `0.4`                    |
| **feather**       | The softness of the focus area edges. A higher value makes the edges softer, while a lower value makes them sharper. <br> Range: `[0, 1]`.  | `0.3`                    |
| **kernelSize**    | The blur kernel size. A larger kernel size produces a more pronounced blur. <br> See the [`KernelSize`](https://pmndrs.github.io/postprocessing/public/docs/variable/index.html#static-variable-KernelSize) options.  | `KernelSize.MEDIUM`      |
| **resolutionScale** | The resolution scale. A higher value increases the effect's resolution, while a lower value reduces it, affecting quality and performance. <br> Range: `[0.1, 1]`.  | `0.5`                    |
| **resolutionX**   | The horizontal resolution. Use `Resolution.AUTO_SIZE` for automatic sizing based on the scene's resolution. | `Resolution.AUTO_SIZE`   |
| **resolutionY**   | The vertical resolution. Use `Resolution.AUTO_SIZE` for automatic sizing based on the scene's resolution. | `Resolution.AUTO_SIZE`   |

## Further Reading

For more details, see the [TiltShift documentation](https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/TiltShiftEffect.js~TiltShiftEffect.html).
