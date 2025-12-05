---
title: Quadratic Bezier Line
description: Renders a Line2 between start and end points with an optional control point.
---

::SceneWrapper
  ::ShapesQuadraticBezierLine
  ::
::

`<QuadraticBezierLine />` renders a `<Line2 />` between start and end points, with an optional control point.

## Usage

```vue
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { QuadraticBezierLine } from '@tresjs/cientos'
import { Vector3 } from 'three'
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera :position="[3, 3, 3]" />
    <QuadraticBezierLine
      :start="new Vector3(-1, 0, 0)"
      :end="new Vector3(1, 0, 0)"
      :mid="new Vector3(0, 1, 0)"
      :segments="50"
      color="orange"
      :line-width="3"
    />
    <TresAmbientLight />
  </TresCanvas>
</template>
```

## Props

`<QuadraticBezierLine />` inherits all props but `points` from `<Line2 />`.

| Prop         | Type      | Description                                                                   | Default        | Required |
| ------------ | --------- | ----------------------------------------------------------------------------- | -------------- | ---- |
| `start` | `Vector3 \| [number, number, number]` | Starting point |        | yes |
| `end` | `Vector3 \| [number, number, number]` | Ending point |            | yes |
| `mid` | `Vector3 \| [number, number, number]` | Control point |           | no |
| `segments`     | `number`  | Number of segments in the resulting curve (higher = smoother) | 20 | no |
