---
title: Soft Shadows
description: Injects percent closer soft shadows (PCSS) into THREE's shader chunk.
---

::SceneWrapper
  ::LightShadowSoftShadows
  ::
::

Injects percent closer soft shadows (pcss) into THREE's shader chunk. Mounting/unmounting this component or changing its props will cause all shaders to be recompiled.

## Usage

```vue{2,18}
<script setup lang="ts">
import { SoftShadows, Levioso, TorusKnot, Plane } from "@tresjs/cientos";
import { TresCanvas } from "@tresjs/core";
</script>

<template>
  <TresCanvas shadows clear-color="#82DBC5">
    <Levioso :speed="4" :range="[0, 0.7]" :rotation-factor="9">
      <TorusKnot cast-shadow :scale="0.45">
        <TresMeshStandardMaterial color="orange" />
      </TorusKnot>
    </Levioso>
    <Plane :position="[0, -2, 0]" receive-shadow :args="[10, 10]">
      <TresMeshStandardMaterial />
    </Plane>
    <TresDirectionalLight cast-shadow :position="[0, 3, 0]" />
    <TresAmbientLight :intensity="0.5" />
    <SoftShadows />
  </TresCanvas>
</template>
```

## Props

| Name | Description | Default |
| :--- | :--- | ------- |
| size | Size of the light source (the larger the softer the light) | `25` |
| samples | Number of samples (more samples less noise but more expensive) | `10` |
| focus | Depth focus, use it to shift the focal point (where the shadow is the sharpest) | `0` (the beginning) |