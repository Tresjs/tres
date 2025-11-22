---
title: Fit
description: Uniformly scale and position children to fit into a defined space.
---

# Fit

::SceneWrapper
  ::AbstractionsFit
  ::
::

`<Fit />` uniformly scales and positions its children as a group. By default, it fits its children into a 1 × 1 × 1 box at the world origin.

Alternatively, the children can be fit into a `Box3` or an `Object3D`.

Or the children can simply be resized. With `<Fit />` the children are scaled relative to the center of their calculated bounding box.

## Usage

```vue{2,20,27}
<script setup lang="ts">
import { Fit, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { BoxGeometry, MeshNormalMaterial } from 'three'

const positions: number[][] = []
for (let y = 100; y <= 120; y += 10) {
  for (let x = 100; x <= 120; x += 10) {
    positions.push([x, y, 9999])
  }
}
const geom = new BoxGeometry()
const mat = new MeshNormalMaterial()
</script>

<template>
  <TresCanvas clear-color="#4F4F4F">
    <TresPerspectiveCamera :position="[1, 1, 1]" />
    <OrbitControls />
    <Fit>
      <TresMesh
        v-for="(pos, index) in positions"
        :key="index"
        :position="pos"
        :args="[geom, mat]"
      />
    </Fit>
    <TresGridHelper :args="[1, 1]" />
  </TresCanvas>
</template>

```

## Props

| Name | Description |
| :--- | :---------- |
| **into** | If `into` is:<ul><li>omitted or explicitly `undefined`: position/scale children to fit into a 1 × 1 × 1 `Box3` at world origin.</li><li>`null`: turn off `<Fit />`; reset scale/position of children.</li><li>`number`: convert argument to `Vector3(number, number, number)`.</li><li>`[number, number, number]`: convert argument to `Vector3`.</li><li>`Vector3`: position/scale children to fit inside a `Box3` of size `Vector3` at target objects' cumulative center.</li><li>`Box3`: position/scale children to fit inside `Box3`.</li><li>`Object3D`: position/scale children to fit inside calculated `Box3`. [See `THREE.Box3.setFromObject`](https://threejs.org/docs/#api/en/math/Box3.setFromObject). `<Fit />` must not contain the `Object3D` and vice-versa.</li></ul><br>default:<br>`new Box3(new Vector3(-0.5, -0.5, -0.5), new Vector3(0.5, 0.5, 0.5))` |
| **precise** | [See `precise` argument in `THREE.Box3.setFromObject`](https://threejs.org/docs/index.html?q=box3#api/en/math/Box3.setFromObject)<br><br>default:<br>`false` |
