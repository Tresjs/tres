# Dot Screen

<DocsDemoGUI>
  <DotScreenDemo />
</DocsDemoGUI>

<details>
  <summary>Demo code</summary>

  <<< @/.vitepress/theme/components/pmdrs/DotScreenDemo.vue{0}
</details>

The `DotScreen` effect is part of the [`postprocessing`](https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/DotScreenEffect.js~DotScreenEffect.html) package. It allows you to create a dot screen effect, providing flexibility for artistic effects.

## Usage

The `<DotScreenPmndrs>` component is straightforward to use and provides customizable options to fine-tune the dot screen effect.

```vue{3,11-14,23-27}
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { DotScreenPmndrs, EffectComposerPmndrs } from '@tresjs/post-processing'
import { NoToneMapping } from 'three'

const gl = {
  clearColor: '#ffffff',
  toneMapping: NoToneMapping,
}

const effectProps = {
  angle: 1.57,
  scale: 1.25
}
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[5, 5, 5]" />

    <!-- Your scene -->

    <Suspense>
      <EffectComposerPmndrs>
        <DotScreenPmndrs v-bind="effectProps" />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
```

## Props

| Prop           | Description                                                                                                                                                                  | Default                  |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| **angle**      | The angle of the dot pattern *(in radians)*.    | `1.57`                   |
| **scale**      | The scale of the dot pattern.                 | `1.0`                    |
| **blendFunction** | Defines how the effect blends with the original scene. See the [`BlendFunction`](https://pmndrs.github.io/postprocessing/public/docs/variable/index.html#static-variable-BlendFunction) options. | `BlendFunction.NORMAL`      |

## Further Reading

For more details, see the [DotScreenEffect documentation](https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/DotScreenEffect.js~DotScreenEffect.html).
