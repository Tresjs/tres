---
title: Point Material
description: Extends THREE.PointsMaterial to render points as dots rather than squares.
---

::SceneWrapper
  ::MaterialsPointMaterial
  ::
::

`<PointMaterial />` extends `THREE.PointsMaterial`. It renders the points as dots, rather than the default squares.

::UAlert{icon="i-lucide-info" title="Info" description="N.B., stacking order and transparency of objects using THREE.PointsMaterial and by extension PointMaterial can be somewhat unintuitive, especially when combined with other on-screen objects. Please see discussions at threejs.org for more infomation."}
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

## Props

All [`THREE.PointsMaterial` properties](https://threejs.org/docs/#api/en/materials/PointsMaterial) are inherited by `PointMaterial`.
