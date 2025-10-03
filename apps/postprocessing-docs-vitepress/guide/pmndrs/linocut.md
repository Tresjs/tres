# Linocut

<DocsDemoGUI>
  <LinocutDemo />
</DocsDemoGUI>

<details>
  <summary>Demo code</summary>

  <<< @/.vitepress/theme/components/pmdrs/LinocutDemo.vue{0}
</details>

The `Linocut` effect is a custom shader effect inspired by traditional linocut and woodcut printmaking. It transforms the scene into a high-contrast black-and-white composition, featuring bold lines and intricate patterns that replicate the handcrafted aesthetic of relief printing techniques.

## Usage

The `<LinocutPmndrs>` component is straightforward to use and provides customizable options to fine-tune the linocut effect.

```vue{3,11-16,25-29}
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { EffectComposerPmndrs, LinocutPmndrs } from '@tresjs/post-processing'
import { NoToneMapping } from 'three'

const gl = {
  clearColor: '#4f4f4f',
  toneMapping: NoToneMapping,
}

const effectProps = {
  scale: 0.85,
  noiseScale: 0.0,
  center: [0.5, 0.5],
  rotation: 0.0,
}
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[5, 5, 5]" />

    <!-- Your scene -->

    <Suspense>
      <EffectComposerPmndrs>
        <LinocutPmndrs v-bind="effectProps" />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
```

## Props

| Prop           | Description                                                                                                                                                                  | Default                  |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| **scale**      | Line width control. A value between 0 and 1.                                                                                                                                 | `0.85`                   |
| **noiseScale** | Noise intensity. A value between 0 and 1.                                                                                                                                    | `0.0`                    |
| **center**     | Center of rotation (normalized coordinates). A `Vector2` value or an array of two numbers where both values are between 0 and 1.                                              | `[0.5, 0.5]`             |
| **rotation**   | Rotation angle (in radians). A value between -π and π.                                                                                                                       | `0.0`                    |
| **blendFunction** | Defines how the effect blends with the original scene. See the [`BlendFunction`](https://pmndrs.github.io/postprocessing/public/docs/variable/index.html#static-variable-BlendFunction) options. | `BlendFunction.NORMAL`   |

## Further Reading

For an example of the linocut effect in WebGL, see the [Linocut Effect on Shadertoy](https://www.shadertoy.com/view/4XVcDV).
