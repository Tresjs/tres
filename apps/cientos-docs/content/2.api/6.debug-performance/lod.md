---
title: LOD
description: Level of Detail - show meshes with more or less geometry based on distance from camera.
---

::SceneWrapper
  ::DebugPerformanceLOD
  ::
::

Level of Detail - show meshes with more or less geometry based on distance from the camera.

`<LOD />` is a wrapper for THREE's [LOD](https://threejs.org/docs/?q=LOD#api/en/objects/LOD) class.

## Usage

```vue
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { LOD } from '@tresjs/cientos'
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera :position="[0, 2, 5]" />
    <LOD :levels="[0, 5, 10]">
      <!-- High detail mesh - shown when close -->
      <TresMesh>
        <TresSphereGeometry :args="[1, 32, 32]" />
        <TresMeshStandardMaterial color="red" />
      </TresMesh>
      <!-- Medium detail mesh - shown at mid distance -->
      <TresMesh>
        <TresSphereGeometry :args="[1, 16, 16]" />
        <TresMeshStandardMaterial color="orange" />
      </TresMesh>
      <!-- Low detail mesh - shown when far -->
      <TresMesh>
        <TresSphereGeometry :args="[1, 8, 8]" />
        <TresMeshStandardMaterial color="yellow" />
      </TresMesh>
    </LOD>
    <TresAmbientLight />
    <TresDirectionalLight :position="[0, 2, 4]" />
  </TresCanvas>
</template>
```

## Props

| Prop               | Description                                                            | Default |
| :----------------- | :--------------------------------------------------------------------- | ------- |
| **levels**           |  `number[]` - The distances at which to display each level of detail. There should be one `levels` value for each `LOD` child. |         |
| **hysteresis**           | Threshold used to avoid flickering at LOD boundaries, as a fraction of distance. | `0.0` |