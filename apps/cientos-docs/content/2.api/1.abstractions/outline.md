---
title: Outline
description: Create inverted-hull outlines using parent geometry.
---

::SceneWrapper
  ::AbstractionsOutline
  ::
::

`<Outline />` creates an inverted-hull outline using its parent's geometry. Supported parents are `<TresMesh>` and `<TresSkinnedMesh>`.

## Usage

```vue{3,15,20}
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, Outline } from '@tresjs/cientos'
</script>

<template>
  <TresCanvas clear-color="#4f4f4f">
    <TresPerspectiveCamera />
    <OrbitControls />
    <TresAmbientLight :intensity="3.14" />
    <TresPointLight :intensity="50" :position="[2, 2, 0]" />
    <TresMesh :position-x="-0.75">
      <TresBoxGeometry />
      <TresMeshPhongMaterial />
      <Outline :thickness="7.5" color="#82dbc5" />
    </TresMesh>
    <TresMesh :position-x="0.75">
      <TresSphereGeometry :args="[0.5]" />
      <TresMeshPhongMaterial />
      <Outline :thickness="7.5" color="#fbb03b" />
    </TresMesh>
  </TresCanvas>
</template>

```

## Props

| Props        | Description                                                        | Default |
|--------------|--------------------------------------------------------------------| ------- |
| color        | Outline color                                                      | `'black'` |
| screenspace  | Whether line thickness is independent of zoom                      | `false` |
| opacity      | Outline opacity                                                    | `1` |
| transparent  | Outline transparency                                               | `false` |
| thickness    | Outline thickness                                                  | `0.05` |
| angle        | Geometry crease angle (`0` is no crease).  See [BufferGeometryUtils.toCreasedNormals](https://threejs.org/docs/#examples/en/utils/BufferGeometryUtils.toCreasedNormals) | `Math.PI` |
