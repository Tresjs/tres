---
title: Wobble Material
description: Makes a geometry wobble and wave around with customizable speed and factor.
---

::SceneControlsWrapper
  ::MaterialsWobbleMaterial
  ::
::

The `cientos` package provides a `<MeshWobbleMaterial />` component that makes a geometry wobble and wave around.

## Usage

```vue{3,11-15}
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { MeshWobbleMaterial } from '@tresjs/cientos'
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera :position="[3, 3, 3]" :look-at="[0, 0, 0]" />
    <TresMesh>
      <TresTorusGeometry />
      <MeshWobbleMaterial
        color="#f25042"
        :speed="1"
        :factor="0.6"
      />
    </TresMesh>
    <TresAmbientLight />
    <TresDirectionalLight :position="[0, 2, 4]" />
  </TresCanvas>
</template>
```

## WebGPU

Import `MeshWobbleMaterial` from `@tresjs/cientos/webgpu` on a `TresCanvas` from `@tresjs/core/webgpu`. That version extends `MeshStandardNodeMaterial` and has the same props. See [WebGPU](/getting-started/webgpu).

```ts
import { MeshWobbleMaterial } from '@tresjs/cientos/webgpu'
```

The shading can differ a little from `WebGLRenderer`. The WebGL version rotates the normal in view space, which is only right when the camera does not tilt. The WebGPU version rotates the normal of the geometry.

## Props

| Prop            | Description                                                                               | Default     |
| :-------------- | :---------------------------------------------------------------------------------------- | ----------- |
| **speed** | how fast the wobble effect would be.                | `1`     |
| **factor**      | how strong the wobble effect will deform the geometry                                                                    | `1` |

 This material extends `THREE.MeshStandardMaterial` and accepts all the same props plus additional reflection-specific properties.
