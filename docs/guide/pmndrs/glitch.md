# Glitch

<DocsDemo>
  <GlitchDemo />
</DocsDemo>

Glitch is an effect that simulates that simulates digital glitches, which are random or intentional errors that occur in digital media such as images, videos, or audio. The effect can be used to create a distorted or disrupted appearance, with elements of the scene appearing to shift or flicker in a chaotic manner.

The `<Glitch />` pass in TresJS allows you to add this effect to your 3D scenes, and provides several parameters that can be tweaked to achieve the desired glitchy look, such as delay, duration, strength, mode, and more. The end result can be a unique and striking visual style that adds an extra layer of interest to your 3D scenes.

::: warning
This effect may potentially cause epileptic seizures in people with photosensitive epilepsy. Viewer discretion is advised.
:::

## Usage

```vue{2,11-15}
<script setup lang="ts">
import { EffectComposerPmndrs, GlitchPmndrs } from '@tresjs/post-processing'
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera :position="[5, 5, 5]" />

    <!-- Your scene -->

    <Suspense>
      <EffectComposerPmndrs>
        <GlitchPmndrs />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
```

## Props

| Prop                        | Description                                                                                                        | Default                                                                                                                                        |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `blendFunction`             | The blend function of this effect.                                                      | [BlendFunction.NORMAL](https://github.com/pmndrs/postprocessing/blob/3fbe7b770f826019933b1386d27ebc04315feb00/src/enums/BlendFunction.js#L36) |
| `delay`                     | The minimum and maximum delay between glitch activations in seconds.                                               | `[1.5, 3.5]`                                                                                                                                   |
| `duration`                  | The minimum and maximum duration of a glitch in seconds.                                                           | `[0.6, 1.0]`                                                                                                                                   |
| `strength`                  | The strength of weak and strong glitches.                                                                          | `[0.3, 1.0]`                                                                                                                                   |
| `mode`                      | The glitch mode. Can be DISABLED, SPORADIC, CONSTANT_MILD, or CONSTANT_WILD.                                       | `GlitchMode.SPORADIC`                                                                                                                          |
| `active`                    | Turn the effect on and off.                                                                                        | `undefined`                                                                                                                                    |
| `ratio`                     | The threshold for strong glitches.                                                                                 | `0.85`                                                                                                                                         |
| `columns`                   | The scale of the blocky glitch columns.                                                                            | `0.05`                                                                                                                                         |
| `chromaticAberrationOffset` | A chromatic aberration offset. If provided, the glitch effect will influence this offset.                          | `undefined`                                                                                                                                    |
| `perturbationMap`           | A perturbation map. If none is provided, a noise texture will be created.                                          | `undefined`                                                                                                                                    |
| `dtSize`                    | The size of the generated noise map. Will be ignored if a perturbation map is provided.                            | `64`                                                                                                                                           |

## Further Reading
For more details, see the [GlitchEffect documentation](https://pmndrs.github.io/postprocessing/public/docs/class/src/effects/GlitchEffect.js~GlitchEffect.html)
