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

### Custom Effects (`src/core/pmndrs/custom/`)
Custom shader-based effects for specialized use cases

### Composables
Both pmndrs and three implementations include composables for effect management in their respective `composables/` directories.

`src/util/n8ao.ts` holds the logic shared by `N8AOPmndrs` and `N8AO`: typed wrappers for the untyped `n8ao` package and the `useN8AO` composable that adds, configures and disposes the pass.

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
