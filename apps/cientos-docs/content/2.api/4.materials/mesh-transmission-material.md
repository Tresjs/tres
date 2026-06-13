---
title: Mesh Transmission Material
description: A glass-like transmission material with chromatic aberration, distortion, and backside support. Ported from drei.
---

The `cientos` package provides a `<MeshTransmissionMaterial />` component that produces high-quality glass and transmission effects. It is a port of the [drei component of the same name](https://drei.docs.pmnd.rs/shaders/mesh-transmission-material).

The material renders the scene into a buffer texture each frame and uses that texture to simulate refraction, chromatic aberration, distortion, and anisotropic blur — effects that `<TresMeshPhysicalMaterial>` alone cannot achieve.

## Usage

```vue{3,10-16}
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { MeshTransmissionMaterial, Environment } from '@tresjs/cientos'
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera :position="[0, 0, 5]" />
    <Environment preset="city" />
    <TresMesh>
      <TresTorusKnotGeometry :args="[1, 0.3, 128, 32]" />
      <MeshTransmissionMaterial
        :transmission="1"
        :thickness="0.5"
        :chromatic-aberration="0.03"
        :resolution="512"
      />
    </TresMesh>
  </TresCanvas>
</template>
```

## Props

| Prop | Description | Default |
| :--- | :--- | :---: |
| `transmission` | Glass opacity (maps to the internal `_transmission` uniform) | `1` |
| `thickness` | Thickness of the glass volume | `0` |
| `roughness` | Surface roughness | `0` |
| `chromaticAberration` | Chromatic aberration intensity | `0.03` |
| `anisotropicBlur` | Anisotropic blur amount | `0.1` |
| `distortion` | Distortion amount | `0` |
| `distortionScale` | Scale of the distortion noise | `0.5` |
| `temporalDistortion` | Animates the distortion over time | `0` |
| `ior` | Index of refraction | `1.5` |
| `color` | Base color of the glass | `white` |
| `clearcoat` | Clearcoat layer intensity | `0` |
| `clearcoatRoughness` | Clearcoat roughness | `0` |
| `attenuationDistance` | Distance at which light is attenuated through the volume | `Infinity` |
| `attenuationColor` | Color the light shifts to as it passes through the volume | `white` |
| `backside` | Render back faces into a separate buffer for proper glass thickness | `false` |
| `backsideThickness` | Thickness used during the backside pass | `0` |
| `resolution` | Resolution of the FBO render target in pixels | `256` |
| `backsideResolution` | Resolution of the backside FBO. Defaults to `resolution` | `resolution` |
| `background` | Override the scene background during the FBO pass | `undefined` |
| `buffer` | Supply your own render-target texture, skipping the internal FBO pass | `undefined` |
| `samples` | Number of refraction samples. **Baked at compile time — changing requires remount.** | `6` |
| `transmissionSampler` | Use THREE's built-in transmission sampler instead of an FBO pass. **Baked at compile time.** | `false` |

## Notes

- An `<Environment>` or `envMap` on the scene is strongly recommended. Without one, the material will render dark.
- `samples` and `transmissionSampler` are compiled into the shader. Changing them at runtime triggers a remount (controlled via the component's internal `:key`).
- For an R3F / drei developer, the Vue prop names are kebab-case equivalents of the React ones: `:chromatic-aberration` instead of `chromaticAberration`, `:anisotropic-blur` instead of `anisotropicBlur`, etc.
