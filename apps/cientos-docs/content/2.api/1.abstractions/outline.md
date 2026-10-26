---
title: Outline
description: Create inverted-hull outlines using parent geometry.
---

::SceneControlsWrapper
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

## WebGPU

Import `Outline` from `@tresjs/cientos/webgpu` on a `TresCanvas` from `@tresjs/core/webgpu`. That version uses a `MeshBasicNodeMaterial` and has the same props. See [WebGPU](/getting-started/webgpu).

```ts
import { Outline } from '@tresjs/cientos/webgpu'
```

The outline can differ a little from `WebGLRenderer`:

- The WebGL version pushes the vertices along the normals of the geometry. The WebGPU version uses the normals after morph targets and skinning. You see the difference on skinned or morphed parents.
- When `screenspace` is off, the WebGPU version takes the direction of the offset from the instance normal. With a non-uniform instance scale, the direction can differ a little.
- `WebGPURenderer` tone-maps the whole frame, so it ignores `toneMapped`.

## Props

| Props        | Description                                                        | Default |
|--------------|--------------------------------------------------------------------| ------- |
| color        | Outline color                                                      | `'black'` |
| screenspace  | `true`: `thickness` is in world units, so the outline gets thinner with distance. `false`: `thickness` is in pixels at any distance | `false` |
| opacity      | Outline opacity                                                    | `1` |
| transparent  | Outline transparency                                               | `false` |
| thickness    | Outline thickness                                                  | `0.05` |
| angle        | Geometry crease angle (`0` is no crease).  See [BufferGeometryUtils.toCreasedNormals](https://threejs.org/docs/#examples/en/utils/BufferGeometryUtils.toCreasedNormals) | `Math.PI` |
| toneMapped   | Apply the renderer tone mapping to the outline. `WebGPURenderer` ignores it | `true` |
| polygonOffset | Use a depth offset, to stop the outline fighting with the parent surface | `false` |
| polygonOffsetFactor | Size of the depth offset                                     | `0` |
| renderOrder  | Render order of the outline mesh                                   | `0` |
