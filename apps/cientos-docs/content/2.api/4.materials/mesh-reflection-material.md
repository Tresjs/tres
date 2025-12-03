---
title: Mesh Reflection Material
description: Makes floors or walls that reflect the objects in your Scene.
---

::SceneWrapper
  ::MaterialsMeshReflectionMaterial
  ::
::

The `cientos` package provides a `<MeshReflectionMaterial />` component for making floors or walls that reflect the objects in your `Scene`.

The component is based on the excellent [Drei](https://github.com/pmndrs/drei) component of the same name.

It extends `THREE.MeshStandardMaterial` and accepts all the same props.

## Usage

```vue{3,16-19}
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { MeshReflectionMaterial } from '@tresjs/cientos'
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera :position="[3, 3, 3]" :look-at="[0, 0, 0]" />
    <TresMesh :rotation="[-Math.PI / 2, 0, 0]">
      <TresPlaneGeometry :args="[10, 10]" />
      <MeshReflectionMaterial
        :blur="[300, 100]"
        :mixBlur="30"
        :mixStrength="80"
        :mixContrast="1"
        color="#a0a0a0"
        metalness="0.5"
        roughness="1"
        mirror="0"
      />
    </TresMesh>
    <TresMesh :position="[0, 1, 0]">
      <TresBoxGeometry />
      <TresMeshStandardMaterial color="orange" />
    </TresMesh>
    <TresAmbientLight />
    <TresDirectionalLight :position="[0, 2, 4]" />
  </TresCanvas>
</template>
```

## Props

No props are required. The component extends `THREE.MeshStandardMaterial` and accepts all the same props plus additional reflection-specific properties.