---
title: Circle Shadow
description: Cheap, texture-based radial gradient shadow on a plane geometry.
---

::SceneControlsWrapper
  ::LightShadowCircleShadow
  ::
::

`<CircleShadow />` is a cheap, texture-based radial gradient on a `THREE.PlaneGeometry`.

## Usage

```vue{2,15}
<script setup lang="ts">
import { CircleShadow, OrbitControls } from "@tresjs/cientos";
import { TresCanvas } from "@tresjs/core";
</script>

<template>
  <TresCanvas clear-color="#82DBC5">
    <TresPerspectiveCamera />
    <OrbitControls />
    <TresGroup :position-y="-0.5">
      <TresMesh :position-y="1">
        <TresBoxGeometry />
        <TresMeshToonMaterial color="orange" />
      </TresMesh>
      <CircleShadow :scale="1.5" />
    </TresGroup>
    <TresAmbientLight />
    <TresDirectionalLight :position="[0, 2, 4]" />
  </TresCanvas>
</template>

```

## Props

All props are optional.

| Name | Description | Default |
| :--- | :--- | ------- |
| `color` | Color of the shadow as a `Color \| number \| string` | `'black'` |
| `opacity` | Opacity of the shadow | `0.5` |
| `offset` | Placement of the first radial gradient color stop. `0.0` is the center of the circle. `1.0` is edge. | `0` |
| `fog` | Whether the material is affected by fog | `false` |
| `depthWrite` | Whether rendering the material has any effect on the depth buffer | `false` |
