---
title: Wobble Material
description: Makes a geometry wobble and wave around with customizable speed and factor.
---

::SceneWrapper
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

## Props

| Prop            | Description                                                                               | Default     |
| :-------------- | :---------------------------------------------------------------------------------------- | ----------- |
| **speed** | how fast the wobble effect would be.                | `1`     |
| **camfactorera**      | how strong the wobble effect will deform the geometry                                                                    | `1` |

 This material extends `THREE.MeshStandardMaterial` and accepts all the same props plus additional reflection-specific properties.

