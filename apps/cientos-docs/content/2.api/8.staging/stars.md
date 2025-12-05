---
title: Stars
description: Renders beautiful stars in the sky using Points and BufferGeometry.
---

::SceneWrapper
  ::StagingStars
  ::
::

`<Stars />` is a component that renders a stars in the sky of your scene. It is an abstraction that use Points, PointsMaterial and BufferGeometry to create a beautiful stars effect

## Usage

You can use `<Stars />` component without passing any props,

```vue{3,9}
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { Stars } from '@tresjs/cientos'
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera :position="[0, 3, 5]" />
    <Stars />
    <TresAmbientLight />
  </TresCanvas>
</template>
```

## Props

| Prop               | Description                                                            | Default |
| :----------------- | :--------------------------------------------------------------------- | ------- |
| **size**           | The size of the stars                        |   0.1      |
| **sizeAttenuation**           | keep the same size regardless distance.|   true      |
| **transparent**           | show transparency on the stars texture                                 | true     |
| **alphaTest**         | enables the WebGL to know when not to render the pixeltext.                                                | 0.01     |
| **alphaMap**  | texture of the stars | null      |
| **count**   | number of stars      | 5000    |
| **depth** | depth of star's shape                         | 50    |
| **radius**      | Radius of star's shape                            | 100    |
