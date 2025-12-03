---
title: Tube
description: Short-cut for a TubeGeometry and a MeshBasicMaterial with a Mesh object.
---

::SceneWrapper
  ::ShapesTube
  ::
::

The `cientos` package provides a `<Tube />` component that serves as a short-cut for a `TubeGeometry`.

Reference: [TubeGeometry](https://threejs.org/docs/?q=tube#api/en/geometries/TubeGeometry)

## Usage

```vue
<script setup lang="ts">
import { Tube } from '@tresjs/cientos'
import { CubicBezierCurve3, Vector3 } from 'three'
import { ref } from 'vue'

const tubePath = ref(new CubicBezierCurve3(
  new Vector3(-1, 0, 0),
  new Vector3(-0.5, -1, 0),
  new Vector3(0.5, 1, 0),
  new Vector3(1, 0, 0),
))
</script>

<template>
  <!-- TubeGeometry needs a curve path to be construct -->
  <Tube :args="[tubePath, 20, 0.2, 8, false]" color="orange" />

  <!-- Tube with a custom material transformations -->
  <Tube ref="tubeRef" :args="[tubePath, 20, 0.2, 8, false]" :position="[0, 4, 0]">
    <TresMeshToonMaterial color="orange" />
  </Tube>
</template>
```

## Args

```
type CurveType = QuadraticBezierCurve3 | CubicBezierCurve3 | CatmullRomCurve3 | LineCurve3

args: [
  path: CurveType,
  tubularSegments: number,
  radius: number,
  radialSegments: number,
  closed: boolean
]
```