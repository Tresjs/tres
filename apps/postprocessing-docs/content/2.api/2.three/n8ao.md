---
title: N8AO
description: Screen-space ambient occlusion that darkens corners, crevices and contact areas.
---

::DocsDemo
  ::ThreeN8ao
  ::
::

The `<N8AO />` component wraps `N8AOPass` from [`n8ao`](https://github.com/N8python/n8ao), an ambient occlusion (AO) pass with good temporal stability. AO darkens the areas that nearby geometry blocks from light, such as corners, crevices and the contact areas below objects. It gives depth to scenes that look flat.

The demo starts in the `Split` render mode: the left half has no AO, the right half has AO.

## Usage

`N8AOPass` renders the scene itself, so it replaces the `RenderPass` of the composer. Set `without-render-pass` on `<EffectComposer>`, or the scene renders two times each frame.

```vue
<script setup lang="ts">
import { EffectComposer, N8AO, SMAA } from '@tresjs/post-processing'
</script>

<template>
  <TresCanvas>
    <!-- Your scene -->

    <Suspense>
      <EffectComposer without-render-pass>
        <N8AO :ao-radius="2" :intensity="3" />
        <SMAA />
      </EffectComposer>
    </Suspense>
  </TresCanvas>
</template>
```

::warning
Without a `RenderPass`, `<N8AO />` is the only pass that draws the scene. Do not remove it with `v-if`. To compare the scene with and without AO, set `renderMode` to `2` (No AO) or `3` (Split).
::

::note
Hardware antialiasing does not work with AO. Add `<SMAA />` after the AO pass instead.
::

::note
The pass converts its output to sRGB. If a later pass also converts color space, for example `<Output />`, set `gammaCorrection` to `false`.
::

## Props

| Prop                   | Description                                                                                                                       | Default    |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `aoRadius`             | Radius of the occlusion in world units (in pixels when `screenSpaceRadius` is `true`). Use one or two magnitudes less than the scene size. | `5`        |
| `distanceFalloff`      | How fast the occlusion fades with distance, as a ratio of `aoRadius`. Lower values reduce halos.                                   | `1`        |
| `intensity`            | Darkens the occlusion, applied as `pow(ao, intensity)`. `2` is subtle, `5` is strong.                                              | `5`        |
| `color`                | Color of the occlusion, in sRGB. Keep it dark.                                                                                     | `0x000000` |
| `aoSamples`            | Number of AO samples per pixel. Changing it recompiles the shaders.                                                                | `16`       |
| `denoiseSamples`       | Number of denoise samples per pixel. Changing it recompiles the shaders.                                                           | `8`        |
| `denoiseRadius`        | Radius of the denoise filter.                                                                                                      | `12`       |
| `denoiseIterations`    | Number of denoise passes.                                                                                                          | `2`        |
| `halfRes`              | Computes the AO at half resolution, then upscales it. Usually 2x to 4x faster.                                                     | `false`    |
| `depthAwareUpsampling` | Uses depth-aware upscaling in `halfRes` mode. Without it, the AO bleeds over edges.                                                | `true`     |
| `screenSpaceRadius`    | Reads `aoRadius` in pixels and `distanceFalloff` as a ratio of it. Useful when the camera moves across scales.                    | `false`    |
| `aoTones`              | Splits the AO into this number of tones, for toon shading. `0` keeps it continuous.                                                | `0`        |
| `renderMode`           | Debug view: `0` Combined, `1` AO only, `2` No AO, `3` Split, `4` Split AO.                                                          | `0`        |
| `gammaCorrection`      | Applies sRGB conversion to the output.                                                                                             | `true` |

## Advanced settings

The component exposes the n8ao `pass` through a template ref. Use it for settings that have no prop, for example the quality presets:

```vue
<script setup lang="ts">
const n8ao = ref()

watch(() => n8ao.value?.pass, (pass) => {
  pass?.setQualityMode('Neural-Medium')
})
</script>

<template>
  <N8AO ref="n8ao" />
</template>
```

A quality preset sets `aoSamples`, `denoiseSamples` and `denoiseRadius`. When one of these props changes later, the new prop value replaces the preset value. The `watch` runs again when the pass is created again, for example after a camera change, so the preset stays applied.

## Further Reading

See the [n8ao repository](https://github.com/N8python/n8ao) for a description of each setting and for performance notes.
