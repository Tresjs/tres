---
title: Edges
description: Render visible edges of objects with enhanced visual quality.
---

# Edges

::SceneWrapper
  ::AbstractionsEdges
  ::
::

The `cientos` package provides an abstraction of [EdgesGeometry](https://threejs.org/docs/#api/en/geometries/EdgesGeometry) from Three.js, `<Edges>` is specifically designed for rendering visible edges of objects in a scene graph. This enhances the visual quality by highlighting contours and providing a stylized appearance which contributes to the artistic aspect of 3D visualizations.

## Usage

```vue{3,12}
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { Box, Edges, OrbitControls } from '@tresjs/cientos'
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera :position="[0, 2, 5]" />
    <OrbitControls />
    <Box>
      <TresMeshBasicMaterial />
      <Edges />
    </Box>
  </TresCanvas>
</template>
```

## Props

`<Edges>` is based on [LineSegments](https://threejs.org/docs/#api/en/objects/LineSegments) & [Line](https://threejs.org/docs/#api/en/objects/Line) and supports all of its props.

| Prop              | Description                                          | Default                   |
| :---------------- | :--------------------------------------------------- | ------------------------- |
| **color**        | `THREE.Color` — Color of the edges. <br> More informations : [TresColor](https://docs.tresjs.org/api/instances-arguments-and-props.html#colors) — [THREE.Color](https://threejs.org/docs/#api/en/math/Color) | `#ff0000`                   |
| **threshold**        | `number` — An edge is only rendered if the angle (in degrees) between the face normals of the adjoining faces exceeds this value  | `1`                   |
