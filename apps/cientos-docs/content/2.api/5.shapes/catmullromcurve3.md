---
title: CatmullRomCurve3
description: Allows you to make smooth 3D lines using Catmull-Rom curves.
---

::SceneWrapper
  ::ShapesCatmullRomCurve3
  ::
::

The `cientos` package provides a `<CatmullRomCurve3 />` component that allows you to make smooth(ish) 3D lines.

`<CatmullRomCurve3 />` wraps [Three.js's `CatmullRomCurve3`](https://threejs.org/docs/index.html?q=catmu#api/en/extras/curves/CatmullRomCurve3) functionality, but applies it to Cientos' `<Line2 />` under the hood, meaning you can use [all the props from `<Line2 />`.](line2#props)

## Usage

```vue{3,10-14}
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { CatmullRomCurve3 } from '@tresjs/cientos'
import { Vector3 } from 'three'
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera :position="[3, 3, 3]" />
    <CatmullRomCurve3
      :points="[new Vector3(-1, 0, 0), new Vector3(0, 1, 0), new Vector3(1, 0, 0)]"
      :segments="50"
      color="orange"
      :line-width="3"
    />
    <TresAmbientLight />
  </TresCanvas>
</template>
```

## Props

| Prop         | Type      | Description                                                                   | Default        |
| ------------ | --------- | ----------------------------------------------------------------------------- | -------------- |
| points  | `Array<Vector3 \| [number, number, number]>` | Curve's control points |            |
| segments     | `number`  | Number of segments in the resulting curve (higher = smoother) | 20             |
| closed       | `boolean` | The curve will loop back onto itself when this is true.                       | false          |
| curveType    | `'centripetal' \| 'chordal' \| 'catmullrom'` | Curve type                                 | 'centripetal'  |
| tension      | `number`  | Catmullrom's tension, when curveType is 'catmullrom'                          | 0.5            |
| vertexColors    | `TresColor[]`            | Vertex colors, if using                                                    | null           |
| color           | `TresColor`              | Color for the line – multiplies vertex colors                              | 'white'        |
| lineWidth       | `number`                 | Width of the line – in world units with size attenuation, pixels otherwise | 1              |
| worldUnits      | `boolean`                | Whether the line width is in world units or pixels                         | false          |
| alphaToCoverage | `boolean`                | Enables alpha to coverage. Can only be used with MSAA-enabled contexts (meaning when the renderer was created with antialias parameter set to true).                                                               | false          |
| dashed          | `boolean`                | Whether the line is dashed                                                 | false          |
| dashSize        | `number`                 | Dash size                                                                  | 1              |
| gapSize         | `number`                 | Gap size in dashed line                                                    | 1              |
| dashScale       | `number`                 | Scale of the dashes/gaps                                                   | 1              |
| dashOffset      | `number`                 | Dash offset                                                                | 0              |