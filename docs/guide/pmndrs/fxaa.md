# FXAA

<DocsDemoGUI>
  <FXAADemo />
</DocsDemoGUI>

<details>
  <summary>Demo code</summary>

  <<< @/.vitepress/theme/components/pmdrs/FXAADemo.vue{0}
</details>

The `FXAAEffect` effect is part of the [`postprocessing`](https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/FXAAEffect.js~FXAAEffect.html) package.
FXAA offers a performance-optimized anti-aliasing solution that smooths jagged edges while maintaining excellent performance. However, its quality may be modest at times, occasionally resulting in a slightly blurred appearance.

  <a href="https://x.com/Miamiamia0103/status/1490355292487487494" target="_blank" class="flex flex-col gap-[7.5px] items-center justify-center">
    <img src="https://pbs.twimg.com/media/FK7MziPWUAYdHfu?format=jpg&name=large" alt="@Miamiamia0103 illustration" class="w-4/5">
    <span class="text-xs">
      Illustration credit @Miamiamia0103
    </span>
  </a>

## Usage

The `<FXAAPmndrs>` component is easy to use and provides customizable options to suit different visual styles.

:::info
When using the `<EffectComposerPmndrs>` pipeline, enabling native antialiasing with the [`antialias`](https://docs.tresjs.org/api/tres-canvas.html#props) props on `<TresCanvas>` is unnecessary.
:::

```vue{2,12-14,23-27}
<script setup lang="ts">
import { EffectComposerPmndrs, FXAAPmndrs } from '@tresjs/post-processing/pmndrs'

const gl = {
  toneMapping: NoToneMapping,
  antialias: false,
}
// It is not required to add `antialias: false` for
// the <TresCanvas> context, as it is automatically
// disabled when using `<EffectComposerPmndrs>`.

const effectProps = {
  samples: 24
}
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera />

    <!-- Your scene -->

    <Suspense>
      <EffectComposerPmndrs>
        <FXAAPmndrs v-bind="effectProps" />
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
| samples | The maximum amount of edge detection samples.             | `12`        |
| minEdgeThreshold | The minimum edge detection threshold. <br> Range: `[0.0, 1.0]`.             | `0.0312`        |
| maxEdgeThreshold | The maximum edge detection threshold. <br> Range: `[0.0, 1.0]`.             | `0.125`        |
| subpixelQuality | The subpixel blend quality. Range: `[0.0, 1.0]`.             | `0.75`        |

## Further Reading
For more details, see the [FXAAEffect documentation](https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/FXAAEffect.js~FXAAEffect.html)
