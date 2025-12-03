---
title: Cubic Bezier Line
description: Renders a Line2 between start and end points with two control points.
---

::SceneWrapper
  ::ShapesCubicBezierLine
  ::
::

`<CubicBezierLine />` renders a `<Line2 />` between start and end points, with additional 2 control points.

## Usage

```vue
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { CubicBezierLine } from '@tresjs/cientos'
import { Vector3 } from 'three'
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera :position="[3, 3, 3]" />
    <CubicBezierLine
      :start="new Vector3(-1, 0, 0)"
      :end="new Vector3(1, 0, 0)"
      :midA="new Vector3(-0.5, 1, 0)"
      :midB="new Vector3(0.5, 1, 0)"
      :segments="50"
      color="orange"
      :line-width="3"
    />
    <TresAmbientLight />
  </TresCanvas>
</template>
```

## Props

`<CubicBezierLine />` inherits all props but `points` from `<Line2 />`.

| Prop         | Type      | Description                                                                   | Default        |
| ------------ | --------- | ----------------------------------------------------------------------------- | -------------- |
| `start` | `Vector3 \| [number, number, number]` | Starting point |            |
| `end` | `Vector3 \| [number, number, number]` | Ending point |            |
| `midA` | `Vector3 \| [number, number, number]` | First control point |            |
| `midB` | `Vector3 \| [number, number, number]` | Second control point |            |
| `segments`     | `number`  | Number of segments in the resulting curve (higher = smoother) | 20             |