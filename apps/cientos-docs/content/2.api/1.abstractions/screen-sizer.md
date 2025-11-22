---
title: ScreenSizer
description: Scale objects to screen space where 1 unit equals 1 pixel.
---

# ScreenSizer

::SceneWrapper
  ::AbstractionsScreenSizer
  ::
::

Adds a `<TresObject3D />` wrapper that scales to "screen space". By default `1` THREE world unit will be translated to 1 screen pixel.

E.g. a BoxGeometry with a height, width, and depth of 100 each, will be scaled to 100 screen pixels in each dimension.

## Usage

```vue{3,10,15}
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, ScreenSizer } from '@tresjs/cientos'
</script>

<template>
  <TresCanvas clear-color="#3f3f3f">
    <TresPerspectiveCamera :position="[10, 10, 10]" />
    <OrbitControls />
    <ScreenSizer>
      <TresMesh>
        <TresBoxGeometry :args="[100, 100, 100]" />
        <TresMeshNormalMaterial />
      </TresMesh>
    </ScreenSizer>
    <TresMesh :position-x="5">
      <TresBoxGeometry />
      <TresMeshNormalMaterial />
    </TresMesh>
    <TresGridHelper :args="[10, 10]" />
  </TresCanvas>
</template>
```

## Props

Inherits all props from `THREE.Object3D`.
