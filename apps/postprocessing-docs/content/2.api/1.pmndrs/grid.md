---
title: Grid
description: Render an adjustable grid overlay that can be scaled for various visual effects.
---

::DocsDemo
  ::PmndrsGrid
  ::
::

The `GridEffect` effect is part of the [`postprocessing`](https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/GridEffect.js~GridEffect.html) package.
It renders a grid that can be scaled or adjusted to achieve a variety of visual effects.

## Usage

The `<GridPmndrs>` component is easy to use and provides customizable options to suit different visual styles.

```vue
<script setup lang="ts">
import { EffectComposerPmndrs, GridPmndrs } from '@tresjs/post-processing'
import { BlendFunction } from 'postprocessing'

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
        <GridPmndrs
          :blend-function="effectProps.blendFunction"
          :scale="effectProps.scale"
          :line-width="effectProps.lineWidth"
        />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
```

## Props

| Prop            | Description                                                                                                                                                                                                                                                      | Default                 |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `blendFunction` | Defines how the effect blends with the original scene. See the [`BlendFunction`](https://pmndrs.github.io/postprocessing/public/docs/variable/index.html#static-variable-BlendFunction) options.                                                                 | `BlendFunction.OVERLAY` |
| `scale`         | The grid scale, which can be used to adjust the spacing effect.                                                                                                                                                                                                  | `1.0`                   |
| `lineWidth`     | The width of the lines in the grid pattern.                                                                                                                                                                                                                      | `1.0`                   |

## Further Reading

For more details, see the [GridEffect documentation](https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/GridEffect.js~GridEffect.html).
