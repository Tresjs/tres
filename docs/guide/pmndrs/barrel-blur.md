# Barrel Blur

<DocsDemo>
  <BarrelBlurDemo />
</DocsDemo>

The `Barrel Blur` is a custom effect that applies a barrel distortion with chromatic aberration blur, providing a unique visual effect.

## Usage

The `<BarrelBlurPmndrs>` component is straightforward to use and provides customizable options to fine-tune the barrel blur effect.

```vue{4,12-15,40-44}
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { Environment, OrbitControls, RoundedBox } from '@tresjs/cientos'
import { EffectComposerPmndrs, BarrelBlurPmndrs } from '@tresjs/post-processing'

const gl = {
  clearColor: '#4f4f4f',
  toneMapping: NoToneMapping,
  multisampling: 8,
}

const effectProps = {
  amount: 0.25,
  offset: [0.5, 0.5],
}
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera
      :position="[5, 5, 5]"
      :look-at="[0, 0, 0]"
    />
    <OrbitControls auto-rotate />

    <Suspense>
      <Environment preset="shangai" />
    </Suspense>

    <RoundedBox :args="[2, 2, 2, 2, 0.25]">
      <TresMeshPhysicalMaterial
        color="white"
        :metalness=".9"
        :roughness=".5"
        :clearcoat="1.0"
        :clearcoatRoughness="0.1"
      />
    </RoundedBox>

    <Suspense>
      <EffectComposerPmndrs>
        <BarrelBlurPmndrs v-bind="effectProps" />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
```

## Props

| Prop           | Description                                                                                                                                                                  | Default                  |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| **amount**     | The intensity of the barrel distortion. A value between 0 (no distortion) and 1 (maximum distortion).                                                                         | `0.1`                    |
| **offset**     | The offset of the barrel distortion center. A `Vector2` value or an array of two numbers where both values are between 0 and 1.    | `[0.5, 0.5]`             |
| **blendFunction** | Defines how the effect blends with the original scene. See the [`BlendFunction`](https://pmndrs.github.io/postprocessing/public/docs/variable/index.html#static-variable-BlendFunction) options. | `BlendFunction.NORMAL`   |

## Further Reading

For an example of the barrel blur effect in WebGL, see the [Barrel Blur Effect on Shadertoy](https://www.shadertoy.com/view/lc3BW8).
