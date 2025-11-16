---
title: Bake Shadows
description: Bakes shadows in the first frame for performance optimization.
---

# BakeShadows

::SceneWrapper
  ::LightShadowBakeShadows
  ::
::

**Cientos** provides a component called `BakeShadows`. Basically this component set the renderer.shadowMap.autoUpdate to `false`, so the shadows are casted just in the first frame which is really great for performance, the downside of this method is that the shadows will not be updated.

## Basic usage

::UAlert{icon="i-lucide-message-square-warning" title="Warning" description="You have to set the shadows in the TresCanvas (renderer), your light sources and objects to receive and cast accordantly as you normally would do."}
::

```vue{2,26}
<script setup lang="ts">
import { BakeShadows } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { shallowRef } from 'vue'

const cubeRef = shallowRef()

function onLoop({ elapsed }: { elapsed: number }) {
  if (cubeRef.value) {
    cubeRef.value.rotation.y = elapsed * 0.5
    cubeRef.value.rotation.x = elapsed * 0.5
  }
}
</script>

<template>
  <TresCanvas
    clear-color="#82DBC5"
    shadows
    @loop="onLoop"
  >
    <TresPerspectiveCamera
      :position="[0, 2, 5]"
      :look-at="[0, 0, 0]"
    />
    <BakeShadows />
    <TresMesh
      ref="cubeRef"
      cast-shadow
    >
      <TresBoxGeometry />
      <TresMeshStandardMaterial color="orange" />
    </TresMesh>
    <TresMesh
      receive-shadow
      :position="[0, -2, 0]"
      :rotation-x="-Math.PI / 2"
    >
      <TresPlaneGeometry :args="[5, 5]" />
      <TresMeshStandardMaterial :color="0xF7F7F7" />
    </TresMesh>
    <TresDirectionalLight
      cast-shadow
      :position="[0, 10, 0]"
    />
  </TresCanvas>
</template>

```