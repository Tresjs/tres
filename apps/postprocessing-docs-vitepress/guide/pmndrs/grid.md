# Grid

<DocsDemoGUI>
  <GridDemo />
</DocsDemoGUI>

<details>
  <summary>Demo code</summary>

  <<< @/.vitepress/theme/components/pmdrs/GridDemo.vue{0}
</details>

The `GridEffect` effect is part of the [`postprocessing`](https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/GridEffect.js~GridEffect.html) package.
It renders a grid that can be scaled or adjusted to achieve a variety of visual effects.

## Usage

The `<GridPmndrs>` component is easy to use and provides customizable options to suit different visual styles.

```vue{2,8-12,21-25}
<script setup lang="ts">
import { EffectComposerPmndrs, GridPmndrs } from '@tresjs/post-processing'

const gl = {
  toneMapping: NoToneMapping,
}

const effectProps = {
  blendFunction: BlendFunction.OVERLAY,
  scale: 0.25,
  lineWidth: 0.1,
}
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera />

    <!-- Your scene -->

    <Suspense>
      <EffectComposerPmndrs>
        <GridPmndrs v-bind="effectProps" />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
```

## Props

| Prop          | Description                                                         | Default                     |
| ------------- | ------------------------------------------------------------------- | --------------------------- |
| blendFunction | Defines how the effect blends with the original scene. See the [`BlendFunction`](https://pmndrs.github.io/postprocessing/public/docs/variable/index.html#static-variable-BlendFunction) options.             | `BlendFunction.OVERLAY`        |
| scale         | The grid scale, which can be used to adjust the spacing effect.     | `1.0`                       |
| lineWidth     | The width of the lines in the grid pattern.                                | `1.0`                       |

## Further Reading
For more details, see the [GridEffect documentation](https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/GridEffect.js~GridEffect.html)
