---
title: FXAA
description: Performance-optimized anti-aliasing that smooths jagged edges in post-processing.
---

::DocsDemo
  ::PmndrsFxaa
  ::
::

The `FXAAEffect` effect is part of the [`postprocessing`](https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/FXAAEffect.js~FXAAEffect.html) package.
FXAA offers a performance-optimized anti-aliasing solution that smooths jagged edges while maintaining excellent performance. However, its quality may be modest at times, occasionally resulting in a slightly blurred appearance.

## Usage

The `<FXAAPmndrs>` component is easy to use and provides customizable options to suit different visual styles.

::note
When using the `<EffectComposerPmndrs>` pipeline, enabling native antialiasing with the [`antialias`](https://docs.tresjs.org/api/tres-canvas.html#props) prop on `<TresCanvas>` is unnecessary.
::

```vue
<script setup lang="ts">
import { EffectComposerPmndrs, FXAAPmndrs } from '@tresjs/post-processing'

const gl = {
  antialias: false,
}
// It is not required to add `antialias: false` for
// the <TresCanvas> context, as it is automatically
// disabled when using `<EffectComposerPmndrs>`.

const effectProps = {
  samples: 24,
}
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera />

    <!-- Your scene -->

    <Suspense>
      <EffectComposerPmndrs>
        <FXAAPmndrs :samples="effectProps.samples" />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
```

## Props

| Prop                 | Description                                                                                                                                                                                                                                                    | Default             |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| `blendFunction`      | Defines how the effect blends with the original scene. See the [`BlendFunction`](https://pmndrs.github.io/postprocessing/public/docs/variable/index.html#static-variable-BlendFunction) options.                                                               | `BlendFunction.SRC` |
| `opacity`            | The opacity of the effect.                                                                                                                                                                                                                                     | `1`                 |
| `samples`            | The maximum amount of edge detection samples.                                                                                                                                                                                                                  | `12`                |
| `minEdgeThreshold`   | The minimum edge detection threshold. Range: `[0.0, 1.0]`.                                                                                                                                                                                                     | `0.0312`            |
| `maxEdgeThreshold`   | The maximum edge detection threshold. Range: `[0.0, 1.0]`.                                                                                                                                                                                                     | `0.125`             |
| `subpixelQuality`    | The subpixel blend quality. Range: `[0.0, 1.0]`.                                                                                                                                                                                                               | `0.75`              |

## Further Reading

For more details, see the [FXAAEffect documentation](https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/FXAAEffect.js~FXAAEffect.html).
