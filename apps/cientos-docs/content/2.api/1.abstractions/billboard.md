---
title: Billboard
description: Make objects always face the camera automatically.
---

::SceneControlsWrapper
  ::AbstractionsBillboard
  ::
::

Adds a `THREE.Group` that always faces the camera.

## Usage

```vue{2,10,14}
<script setup lang="ts">
import { Billboard, Box, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <TresCanvas clear-color="#333333">
    <OrbitControls />
    <TresPerspectiveCamera :position="[0, 0, 10]" />
    <Billboard>
      <Box :scale="[0.5, 0.5, 0.001]">
        <TresMeshNormalMaterial />
      </Box>
    </Billboard>
  </TresCanvas>
</template>

```

## Props

| Prop             | Description                                          | Default       |
| :--------------- | :--------------------------------------------------- | ------------- |
| `autoUpdate`     | Whether the `<Billboard />` should face the camera automatically on every frame.       | `true`  |
| `lockX`          | Whether to lock the x-axis.                          | `false` |
| `lockY`          | Whether to lock the y-axis.                          | `false` |
| `lockZ`          | Whether to lock the z-axis.                          | `false` |
