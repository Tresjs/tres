---
title: CubeCamera
description: Render environment maps for reflective objects.
---

::SceneWrapper
  ::ObjectsCubeCamera
  ::
::

`<CubeCamera />` creates a `THREE.CubeCamera` and uses it to render an environment map of your scene. The environment map is then applied to component's children.

`<CubeCamera />` makes its children invisible while rendering to the internal buffer so that they are not included in the reflection.

## Usage

```vue{2,10,15}
<script setup lang="ts">
import { CubeCamera, OrbitControls } from '@tresjs/cientos'
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera :position="[0, 2, 5]" />
    <OrbitControls />

    <CubeCamera :resolution="256" :frames="Infinity">
      <TresMesh>
        <TresSphereGeometry :args="[1, 32, 32]" />
        <TresMeshStandardMaterial :metalness="1" :roughness="0" />
      </TresMesh>
    </CubeCamera>

    <TresAmbientLight :intensity="0.5" />
    <TresDirectionalLight :position="[0, 2, 4]" />
  </TresCanvas>
</template>
```

## Props

| Prop             | Description                                          | Default       |
| :--------------- | :--------------------------------------------------- | ------------- |
| `frames`         | Number of frames to render. Set to `1` for a static scene. `Infinity` to update continuously.  | `Infinity`    |
| `resolution`     | Resolution of the FBO                                | `255`         |
| `near`           | Camera near                                          | `0.1`         |
| `far`            | Camera far                                           | `1000`        |
| `envMap`         | Custom environment map that is temporarily set as the scene's background | |
| `fog`            | Custom fog that is temporarily set as the scene's fog | |
