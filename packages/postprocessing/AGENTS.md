# @tresjs/post-processing

Post-processing effects library for TresJS built on pmndrs/postprocessing.

## Overview

This package provides a collection of ready-made post-processing effects as Vue components for TresJS. It allows you to build visual effects using declarative Vue components without writing shader code.

## Organization

Effects are organized in [src/core/](src/core/) by implementation:

### pmndrs Effects (`src/core/pmndrs/`)
Effects powered by the pmndrs/postprocessing library:

- **EffectComposerPmndrs.vue**: Main composer for pmndrs effects
- **Bloom Effects**: BloomPmndrs, BarrelBlurPmndrs
- **Color Effects**: BrightnessContrastPmndrs, ChromaticAberrationPmndrs, ColorAveragePmndrs, ColorDepthPmndrs, HueSaturationPmndrs, SepiaPmndrs, ToneMappingPmndrs
- **Distortion Effects**: FishEyePmndrs, LensDistortionPmndrs, ShockWavePmndrs
- **Artistic Effects**: ASCIIPmndrs, DotScreenPmndrs, GridPmndrs, KuwaharaPmndrs, LinocutPmndrs, PixelationPmndrs, ScanlinePmndrs
- **Depth Effects**: DepthOfFieldPmndrs, DepthPickingPassPmndrs, N8AOPmndrs (ambient occlusion)
- **Quality Effects**: FXAAPmndrs, SMAAPmndrs
- **Special Effects**: GlitchPmndrs, GodRaysPmndrs, NoisePmndrs, OutlinePmndrs, TexturePmndrs, TiltShiftPmndrs, VignettePmndrs

### Three.js Effects (`src/core/three/`)
Effects using Three.js native post-processing:

- **EffectComposer.vue**: Main composer for Three.js effects
- **Glitch.vue**: Glitch distortion effect
- **Halftone.vue**: Halftone print effect
- **N8AO.vue**: Ambient occlusion. Renders the scene itself, so use it with `<EffectComposer without-render-pass>`
- **Output.vue**: Output pass for final rendering
- **Pixelation.vue**: Pixelation effect
- **SMAA.vue**: SMAA anti-aliasing
- **UnrealBloom.vue**: Unreal-style bloom effect

### WebGPU Effects (`src/core/webgpu/`)
The `@tresjs/post-processing/webgpu` entry ([src/webgpu.ts](src/webgpu.ts)), built on `useRenderPipeline` from `@tresjs/core/webgpu`:

- **EffectComposer.vue**: Collects the effects in slot order and provides them to `RenderPipelineHost`. It also sorts after updates of the components between itself and an effect, so a wrapper that moves its own effects is seen.
- **RenderPipelineHost.ts**: Calls `useRenderPipeline` and builds `outputNode` from the scene pass. An effect change calls `rebuild()`, so the `setup` and `main` callbacks run again in a new session. `enabled: false` unmounts it, so core restores the default render function.
- **defineEffect.ts**: Returns an effect component. Each prop is a uniform of that instance; a prop change writes `.value` and never rebuilds the graph.
- **graph.ts**: Slot order (a walk of the composer's rendered tree), the chain build, and disposal. The build chains the `hdr` effects, then `renderOutput()` and the `ldr` effects, and returns the `outputColorTransform` value: `false` only when an `ldr` effect exists, because then the chain applies `renderOutput()` itself. A build owns only the nodes it created (node `id` is higher than before the build), so shared nodes and the scene pass are never disposed.

The tests run against core's source (aliases in [vitest.config.ts](vitest.config.ts)) and core's test utils, so they use the real `useRenderPipeline`.

Code that the root entry reaches must not import `three/webgpu`, `three/tsl` or `@tresjs/core/webgpu`. [scripts/check-entries.mjs](scripts/check-entries.mjs) fails the build if it does. Only `src/webgpu.ts` imports `src/core/webgpu/`.

### Custom Effects (`src/core/pmndrs/custom/`)
Custom shader-based effects for specialized use cases

### Composables
Both pmndrs and three implementations include composables for effect management in their respective `composables/` directories.

`src/util/n8ao.ts` holds the logic shared by `N8AOPmndrs` and `N8AO`: types for the untyped `n8ao` package, its lazy loader, and the `useN8AO` composable that adds, configures and disposes the pass. `n8ao` is loaded with a dynamic `import()`, because a static import puts its neural model in every app bundle. A disabled placeholder pass holds the position in the chain while it loads.

## Key Features

- **Vue component-based**: Build effects using declarative Vue components
- **Type-safe**: Full TypeScript support
- **Dual implementation**: Choose between pmndrs/postprocessing or Three.js native
- **Composable API**: Use composables for programmatic control

## Usage Pattern

```vue
<script setup lang="ts">
import { BloomPmndrs, EffectComposerPmndrs } from '@tresjs/post-processing'
</script>

<template>
  <TresCanvas>
    <!-- Your 3D scene -->
    <EffectComposerPmndrs>
      <BloomPmndrs :intensity="1.5" />
    </EffectComposerPmndrs>
  </TresCanvas>
</template>
```

## Development

```bash
# Development mode (runs playground)
pnpm --filter @tresjs/post-processing dev

# Build library
pnpm --filter @tresjs/post-processing build
```

## Documentation

Full documentation available at [post-processing.tresjs.org](https://post-processing.tresjs.org/)
