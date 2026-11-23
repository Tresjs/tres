---
title: Point Material
description: Extends THREE.PointsMaterial to render points as dots rather than squares.
---

::SceneWrapper
  ::MaterialsPointMaterial
  ::
::

`<PointMaterial />` extends `THREE.PointsMaterial`. It renders the points as dots, rather than the default squares.

::prose-warning
N.B., stacking order and transparency of objects using THREE.PointsMaterial and by extension PointMaterial can be somewhat unintuitive, especially when combined with other on-screen objects. Please see discussions at threejs.org for more infomation.
::

## Usage

```vue{3, 12-14}
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { PointMaterial, OrbitControls } from '@tresjs/cientos'
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera :position="[3, 3, 3]" :look-at="[0, 0, 0]" />
    <OrbitControls />
    <TresPoints>
      <TresIcosahedronGeometry :args="[1, 4]" />
      <PointMaterial
        :size="5"
        color="orange"
      />
    </TresPoints>
    <TresAmbientLight />
  </TresCanvas>
</template>
```

## WebGPU

Import `PointMaterial` from `@tresjs/cientos/webgpu` on a `TresCanvas` from `@tresjs/core/webgpu`. That version extends `PointsNodeMaterial` and has the same props. See [WebGPU](/getting-started/webgpu).

WebGPU draws `Points` at 1 pixel only. To draw points with a size, put the material on a `TresSprite`. Set `count` to the number of points, and give the material a `positionNode` that reads one position per instance:

```vue
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core/webgpu'
import { OrbitControls, PointMaterial } from '@tresjs/cientos/webgpu'
import { InstancedBufferAttribute, MathUtils } from 'three'
import { instancedBufferAttribute } from 'three/tsl'

const count = 1000
const positions = new Float32Array(Array.from({ length: count * 3 }, () => MathUtils.randFloatSpread(8)))
const positionNode = instancedBufferAttribute(new InstancedBufferAttribute(positions, 3))
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera :position="[10, 10, 10]" />
    <OrbitControls />
    <TresSprite :count="count" :frustum-culled="false">
      <PointMaterial :size="10" color="orange" transparent :position-node="positionNode" />
    </TresSprite>
  </TresCanvas>
</template>
```

- Set `frustum-culled` to `false`. The sprite bounds cover one quad at its origin, not the points.
- Raycasting finds the sprite as one quad at its origin, not each point.
- `vertexColors` has no effect, because the sprite quad has no `color` attribute. For one color per point, give a `colorNode` with `instancedBufferAttribute`.
- On `TresPoints`, the WebGPU version draws 1 pixel points and logs one warning.
- Set `transparent` to get round dots. With `transparent` off, both versions draw squares.

## Props

All [`THREE.PointsMaterial` properties](https://threejs.org/docs/#api/en/materials/PointsMaterial) are inherited by `PointMaterial`.
