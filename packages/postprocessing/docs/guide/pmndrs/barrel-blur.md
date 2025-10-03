# Barrel Blur

<DocsDemoGUI>
  <BarrelBlurDemo />
</DocsDemoGUI>

<details>
  <summary>Demo code</summary>

  <<< @/.vitepress/theme/components/pmdrs/BarrelBlurDemo.vue{0}
</details>

The `Barrel Blur` is a custom effect that applies a barrel distortion with chromatic aberration blur, providing a unique visual effect.

## Usage

The `<BarrelBlurPmndrs>` component is straightforward to use and provides customizable options to fine-tune the barrel blur effect.

```vue{3,11-14,23-27}
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { EffectComposerPmndrs, BarrelBlurPmndrs } from '@tresjs/post-processing'
import { NoToneMapping } from 'three'

const gl = {
  clearColor: '#4f4f4f',
  toneMapping: NoToneMapping,
}

const effectProps = {
  amount: 0.25,
  offset: [0.5, 0.5],
}
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[5, 5, 5]"/>

    <!-- Your scene -->

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
