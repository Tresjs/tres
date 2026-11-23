---
title: API Reference
description: Browse all post-processing effects grouped by library.
---

`@tresjs/post-processing` exposes three families of effects:

- **[Pmndrs](/api/pmndrs)**: 28 effects powered by [pmndrs/postprocessing](https://github.com/pmndrs/postprocessing).
- **[Three](/api/three)**: 6 post-processing passes from the Three.js addons.
- **[WebGPU](/api/webgpu)**: `EffectComposer` and `defineEffect` for the WebGPU `TresCanvas`, from `@tresjs/post-processing/webgpu`.

Pick the one that matches your effect. Pmndrs effects use `<EffectComposerPmndrs>` and three effects use `<EffectComposer>`. With the `TresCanvas` from `@tresjs/core/webgpu`, use the `<EffectComposer>` from `@tresjs/post-processing/webgpu`.
