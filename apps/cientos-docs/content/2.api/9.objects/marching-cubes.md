---
title: MarchingCubes
description: Create organic blob-like shapes using metaballs.
---

::SceneControlsWrapper
  ::ObjectsMarchingCubes
  ::
::

`<MarchingCubes />` is a wrapper around [THREE's Marching Cubes](https://threejs.org/examples/#webgl_marchingcubes).

It includes 3 components:

* `<MarchingCubes />` – container element for `<MarchingCube />`s and `<MarchingPlane />`s
* `<MarchingCube />` - an individual metaball
* `<MarchingPlane />` – optional bounding plane that interacts with the metaballs

## Usage

```vue{2,15-23}
<script setup lang="ts">
import { MarchingCube, MarchingCubes, MarchingPlane, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { NoToneMapping, Vector3 } from 'three'

const rand = () => (Math.random() - 0.5) * 1.25
const positions = Array.from({ length: 40 }, () => new Vector3(rand(), rand(), rand()))
</script>

<template>
  <TresCanvas clear-color="#222" :tone-mapping="NoToneMapping">
    <TresPerspectiveCamera />
    <OrbitControls />

    <MarchingCubes :resolution="40" :max-poly-count="40000">
      <MarchingPlane plane-type="y" />
      <MarchingCube
        v-for="position, i of positions"
        :key="i"
        :position="position"
      />
      <TresMeshPhongMaterial specular="#111111" :shininess="30" color="#049ef4" :reflectivity="1" />
    </MarchingCubes>

    <TresAxesHelper />
    <TresDirectionalLight color="#ffffff" :intensity="3" :position="[0, 200, 0]" />
    <TresDirectionalLight color="#ffffff" :intensity="3" :position="[100, 200, 100]" />
  </TresCanvas>
</template>
```

## Props

| Prop | Description | Default |
| :----| :---------- | ------- |
| `resolution` | Resolution of the marching cube field. Higher resolution produces smoother meshes at the cost of performance and memory. | `28` |
| `maxPolyCount` | Maximum number of polygons to generate.  | `10000` |
| `enableUvs` | Whether UVs are enabled. | `false` |
| `enableColors` | Whether vertex colors are enabled. | `false` |

## MarchingCube Props

| Prop | Description | Default |
| :----| :---------- | ------- |
| `strength` | How strongly this cube affects the marching cube field. | `0.5` |
| `subtract` | How quickly strength moves to `0` over distance. | `12` |

## MarchingPlane Props

| Prop | Description | Default |
| :----| :---------- | ------- |
| `planeType` | Which axis the plane appears on. `'x' \| 'y' \| 'z'` | `'x'` |
| `strength` | How strongly this plane affects the marching cube field. | `0.5` |
| `subtract` | How quickly strength moves to `0` over distance. | `12` |
