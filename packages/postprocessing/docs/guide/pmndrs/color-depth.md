# Color Depth

<DocsDemoGUI>
  <ColorDepthDemo />
</DocsDemoGUI>

<details>
  <summary>Demo code</summary>

  <<< @/.vitepress/theme/components/pmdrs/ColorDepthDemo.vue{0}
</details>

The `ColorDepthEffect` effect is part of the [`postprocessing`](https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/ColorDepthEffect.js~ColorDepthEffect.html) package.
It renders a ColorDepth that can be scaled or adjusted to achieve a variety of visual effects.

## Usage

The `<ColorDepthPmndrs>` component is easy to use and provides customizable options to suit different visual styles.

```vue{2,8-12,21-25}
<script setup lang="ts">
import { EffectComposerPmndrs, ColorDepthPmndrs } from '@tresjs/post-processing'

const gl = {
  toneMapping: NoToneMapping,
}

const effectProps = {
  blendFunction: BlendFunction.NORMAL,
  bits: 8,
  opacity: 0.75,
}
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera />

    <!-- Your scene -->

    <Suspense>
      <EffectComposerPmndrs>
        <ColorDepthPmndrs v-bind="effectProps" />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
```

## Props

| Prop          | Description                                                         | Default                     |
| ------------- | ------------------------------------------------------------------- | --------------------------- |
| blendFunction | Defines how the effect blends with the original scene. See the [`BlendFunction`](https://pmndrs.github.io/postprocessing/public/docs/variable/index.html#static-variable-BlendFunction) options.             | `BlendFunction.NORMAL`        |
| bits          | The color bit depth. The color bit depth represents the virtual color bits. Each channel uses a quarter of the total, except alpha.                                                | `16`                 |
| opacity       | The opacity of the effect.                                         | `1`                 |

## Further Reading
For more details, see the [ColorDepthEffect documentation](https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/ColorDepthEffect.js~ColorDepthEffect.html)
