# SMAA

<DocsDemoGUI>
  <SMAADemo />
</DocsDemoGUI>

<details>
  <summary>Demo code</summary>

  <<< @/.vitepress/theme/components/pmdrs/SMAADemo.vue{0}
</details>

The `SMAAEffect` effect is part of the [`postprocessing`](https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/SMAAEffect.js~SMAAEffect.html) package. **SMAA** (Subpixel Morphological Antialiasing) is a post-processing antialiasing technique that uses look-up tables to detect edges accurately, preserving texture details while minimizing false positives.

:::info
**SMAA** generally provides superior visual quality compared to [FXAA](/guide/pmndrs/fxaa), though it is slightly less performant. Note that **SMAA** is distinct from **MSAA**.
:::

## Usage

The `<SMAAPmndrs>` component is easy to use and provides customizable options to suit different visual styles.

:::info
When using the `<EffectComposerPmndrs>` pipeline, enabling native antialiasing with the [`antialias`](https://docs.tresjs.org/api/tres-canvas.html#props) props on `<TresCanvas>` is unnecessary.
:::

```vue{2-3,13-15,24-28}
<script setup lang="ts">
import { EffectComposerPmndrs, SMAAPmndrs } from '@tresjs/post-processing'
import type { SMAAPreset } from 'postprocessing'

const gl = {
  toneMapping: NoToneMapping,
  antialias: false,
}
// It is not required to add `antialias: false` for
// the <TresCanvas> context, as it is automatically
// disabled when using `<EffectComposerPmndrs>`.

const effectProps = {
  preset: SMAAPreset.HIGH
}
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera />

    <!-- Your scene -->

    <Suspense>
      <EffectComposerPmndrs>
        <SMAAPmndrs v-bind="effectProps" />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
```

## Props

| Prop          | Description                                                         | Default                     |
| ------------- | ------------------------------------------------------------------- | --------------------------- |
| blendFunction | Defines how the effect blends with the original scene. See the [`BlendFunction`](https://pmndrs.github.io/postprocessing/public/docs/variable/index.html#static-variable-BlendFunction) options.             | `BlendFunction.SRC`        |
| opacity | The opacity of the effect.             | `1`        |
| preset | Define the quality and performance trade-offs. See the [`SMAAPreset`](https://pmndrs.github.io/postprocessing/public/docs/variable/index.html#static-variable-SMAAPreset) options. | `SMAAPreset.MEDIUM` |
| edgeDetectionMode | Define the edge detection modes. See the [`EdgeDetectionMode`](https://pmndrs.github.io/postprocessing/public/docs/variable/index.html#static-variable-EdgeDetectionMode) options. | `EdgeDetectionMode.COLOR` |
| predicationMode | Define the edge detection modes. See the [`PredicationMode`](https://pmndrs.github.io/postprocessing/public/docs/variable/index.html#static-variable-PredicationMode) options. | `PredicationMode.DISABLED` |
| debug | Define the debug mode. <br> Options: <br> - `0` : OFF <br> - `1` : EDGES <br> - `2` : WEIGHTS | `0` (OFF) |

## Further Reading
For more details, see the [SMAAEffect documentation](https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/SMAAEffect.js~SMAAEffect.html)
