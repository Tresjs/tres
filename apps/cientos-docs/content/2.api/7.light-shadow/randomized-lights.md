---
title: Randomized Lights
description: Creates multiple lights and jiggles them for softer shadows.
---

::SceneWrapper
  ::LightShadowRandomizedLights
  ::
::

`<RandomizedLights />` internally creates multiple lights and jiggles them. You would normally add it as a child of `<AccumulativeShadows />`.

It is based on this [Drei component](http://drei.docs.pmnd.rs/staging/randomized-light).

## Usage

```vue{4,16-23}
<script setup lang="ts">
import { TresCanvas } from "@tresjs/core";
import {
  RandomizedLights,
  AccumulativeShadows,
  OrbitControls,
  Plane,
} from "@tresjs/cientos";
</script>

<template>
  <TresCanvas shadows>
    <TresPerspectiveCamera :position="[0, 3, 5]" />
    <OrbitControls />
    <AccumulativeShadows :blend="100" color="#fbb03b" once :position-y="-1">
      <RandomizedLights
        :ambient="0.25"
        :bias="0.001"
        :count="8"
        :intensity="Math.PI"
        :map-size="1024"
        :position="[5, 5, -10]"
        :radius="2"
      />
    </AccumulativeShadows>
    <TresMesh cast-shadow>
      <TresBoxGeometry />
      <TresMeshToonMaterial color="orange" />
    </TresMesh>
    <Plane :position="[0, -2, 0]" receive-shadow :args="[10, 10]">
      <TresMeshStandardMaterial />
    </Plane>
    <TresAmbientLight />
  </TresCanvas>
</template>

```

## Props

| Prop | Description | Default |
| - | - | - |
| `count` | Number of lights | `8`|
| `radius` | Radius of the jiggle, higher values make softer light | `1` |
| `intensity` | Light intensity | `Math.PI` |
| `ambient` | "Ambient occlusion" to directional light ratio, lower values mean less AO | `0.5` |
| `castShadow` | If the lights cast shadows | `true` |
| `bias` | Default shadow bias | `0` |
| `mapSize` | Size of the lights' shadow map | `512` |
| `size` | Size of the lights' shadow camera frustum | `10` |
| `near` | Lights' shadow camera near value | `0.5` |
| `far` | Lights' shadow camera far value | `500` |
| `position` | Position | `[5, 5, -10]` |
