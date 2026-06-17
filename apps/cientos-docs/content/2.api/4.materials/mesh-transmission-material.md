---
title: Mesh Transmission Material
description: A glass-like transmission material with chromatic aberration, distortion, and backside support. Ported from drei.
---

::SceneControlsWrapper
  ::MaterialsMeshTransmissionMaterial
  ::
::

The `cientos` package provides a `<MeshTransmissionMaterial />` component that produces high-quality glass and transmission effects.

The material renders the scene into a buffer texture each frame to simulate refraction, chromatic aberration, distortion, and anisotropic blur, effects that `<TresMeshPhysicalMaterial>` alone cannot achieve.

::prose-note
This component is a port of the [drei MeshTransmissionMaterial](https://drei.docs.pmnd.rs/shaders/mesh-transmission-material){target="_blank"}. All credit goes to the original authors.
::

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

| Prop | Description | Type | Default |
| :--- | :--- | :--- | :---: |
| `transmission` | Glass opacity (maps to the internal `_transmission` uniform) | `number` | `1` |
| `thickness` | Thickness of the glass volume | `number` | `0` |
| `roughness` | Surface roughness | `number` | `0` |
| `chromaticAberration` | Chromatic aberration intensity | `number` | `0.03` |
| `anisotropicBlur` | Anisotropic blur amount | `number` | `0.1` |
| `distortion` | Distortion amount | `number` | `0` |
| `distortionScale` | Scale of the distortion noise | `number` | `0.5` |
| `temporalDistortion` | Animates the distortion over time | `number` | `0` |
| `ior` | Index of refraction | `number` | `1.5` |
| `color` | Base color of the glass | `TresColor` | `white` |
| `clearcoat` | Clearcoat layer intensity | `number` | `0` |
| `clearcoatRoughness` | Clearcoat roughness | `number` | `0` |
| `attenuationDistance` | Distance at which light is attenuated through the volume | `number` | `Infinity` |
| `attenuationColor` | Color the light shifts to as it passes through the volume | `TresColor` | `white` |
| `backside` | Render back faces into a separate buffer for proper glass thickness | `boolean` | `false` |
| `backsideThickness` | Thickness used during the backside pass | `number` | `0` |
| `resolution` | Resolution of the FBO render target in pixels | `number` | `256` |
| `backsideResolution` | Resolution of the backside FBO. Defaults to `resolution` | `number` | `resolution` |
| `background` | Override the scene background during the FBO pass | `THREE.Color \| null` | `undefined` |
| `buffer` | Supply your own render-target texture, skipping the internal FBO pass | `THREE.Texture \| null` | `undefined` |
| `samples` | Number of refraction samples. **Baked at compile time — changing requires remount.** | `number` | `6` |
| `transmissionSampler` | Use THREE's built-in transmission sampler instead of an FBO pass. **Baked at compile time.** | `boolean` | `false` |

The component extends `THREE.MeshPhysicalMaterial` and accepts all the same props.

## Tips

- An `<Environment>` or `envMap` on the scene is strongly recommended. Without one, the material will render dark.
- `samples` and `transmissionSampler` are baked into the shader at compile time. Changing them at runtime triggers a remount automatically.
- Enable `backside` with a non-zero `backsideThickness` for more convincing thick-glass effects.
- Lower `resolution` (e.g. `128`) improves performance at the cost of refraction sharpness.
