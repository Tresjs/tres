---
title: Grid
description: Shader-based grid plane with customizable cell and section lines.
---

::SceneControlsWrapper
  ::ShapesGrid
  ::
::

`<Grid />` creates a shader-based grid plane. It has customizable grid cell and section lines, as well as fade out.

## Usage

```vue{2, 10-21}
<script setup lang="ts">
import { Grid, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <TresCanvas clear-color="#222222">
    <TresPerspectiveCamera :position="[8, 10, 10]" :fov="25" />
    <OrbitControls />
    <Grid
      :args="[10.5, 10.5]"
      cell-color="#82dbc5"
      :cell-size="0.6"
      :cell-thickness="0.5"
      section-color="#fbb03b"
      :section-size="2"
      :section-thickness="1.3"
      :infinite-grid="true"
      :fade-from="0"
      :fade-distance="12"
      :fade-strength="1"
    />
  </TresCanvas>
</template>
```

## Props

| Prop                   | Description            | Default |
| :--------------------- | :--------------------- | ------- |
| **cellSize**           | Cell size | `0.5`      |
| **cellThickness**      | Thickness of cell lines | `0.5`   |
| **cellColor**          | Color of cell lines    | `'black'` |
| **sectionSize**        | Section size           | `1`      |
| **sectionThickness**   | Thickness of section lines | `1`   |
| **sectionColor**       | Color of cell lines    | `'blue'` |
| **followCamera**       | Whether to follow camera | `false`     |
| **infiniteGrid**       | Whether to display an infinite grid | `false` |
| **fadeDistance**       | Fade distance          | `100`    |
| **fadeStrength**       | Fade strength          | `1`    |
| **fadeFrom**           | Fade from camera (1) or origin (0) or in between | `1` |
| **side**               | Material side          | `THREE.BackSide` |
