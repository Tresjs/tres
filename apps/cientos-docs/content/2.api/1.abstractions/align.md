---
title: Align
description: Calculate and align children within their parent using bounding boxes.
---

::SceneControlsWrapper
  ::AbstractionsAlign
  ::
::

Calculates a bounding box around its children and aligns them as a group within their parent. The component measures its contents and realigns on every frame unless `cacheKey` is set.

## Usage

```vue{2,13,18}
<script setup lang="ts">
import { Align, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <TresCanvas clear-color="#222">
    <TresPerspectiveCamera />
    <OrbitControls />

    <TresAxesHelper :scale="2" />

    <Align top right back>
      <TresMesh>
        <TresBoxGeometry />
        <TresMeshNormalMaterial />
      </TresMesh>
    </Align>
  </TresCanvas>
</template>

```

## Props

All props are optional.

| Prop         | Description                         | Default |
| ------------ | ----------------------------------- | ------- |
| `top`        | If `true`, aligns bounding box bottom to `0` on the y-axis | `false` |
| `bottom`     | If `true`, aligns bounding box top to `0` on the y-axis. | `false` |
| `left`       | If `true`, aligns bounding box right to `0` on the x-axis. | `false` |
| `right`      | If `true`, aligns bounding box left to `0` on the x-axis. | `false` |
| `front`      | If `true`, aligns bounding box back to `0` on the z-axis. | `false` |
| `back`       | If `true`, aligns bounding box front to `0` on the z-axis. | `false` |
| `disable`    | If `true`, disables alignment on all axes. | `false` |
| `disableX`   | If `true`, disables alignment on the x-axis. | `false` |
| `disableY`   | If `true`, disables alignment on the y-axis. | `false` |
| `disableZ`   | If `true`, disables alignment on the z-axis. | `false` |
| `precise`    | See [Box3.setFromObject](https://threejs.org/docs/index.html?q=box3#api/en/math/Box3.setFromObject). | `true` |
| `onAlign`    | Callback that fires when updating, after measurement. | |
| `cacheKey`   | If set, component will only update when `cacheKey`'s value changes. If unset, component will update every frame. | `undefined` |

## AlignCallbackOptions

```ts
export interface AlignCallbackOptions {
  /** The next parent above <Align /> */
  parent: Object3D
  /** The outmost container group of the <Align/> component */
  container: Object3D
  width: number
  height: number
  depth: number
  boundingBox: Box3
  boundingSphere: Sphere
  center: Vector3
  verticalAlignment: number
  horizontalAlignment: number
  depthAlignment: number
}
```
