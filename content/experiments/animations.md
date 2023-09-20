---
thumbnail: /animations.png
title: Animations
slug: animations
author: alvarosabu
status: published
description: A basic example of how to animate a geometry using useRendererLoop composable
tags: ['basic', 'animations', 'useRendererLoop']
---

::basic-animations
::

::the-info

![Basic Animations](/animations.png)

# Basic Animations

Author: [@**alvarosabu**](https://twitter.com/alvarosabu).

> This is a basic example of how to animate a geometry using useRendererLoop composable. It includes a sphere, a plane and a camera with orbit controls.

```vue
<script setup lang="ts">
import { TresCanvas, TresInstance, useRenderLoop } from '@tresjs/core'
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from 'three'

import { OrbitControls } from '@tresjs/cientos'
import { ShallowRef } from 'vue'

const gl = {
  clearColor: '#82DBC5',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const boxRef: ShallowRef<TresInstance | null> = shallowRef(null)

const { onLoop } = useRenderLoop()

onLoop(({ delta, elapsed }) => {
  if (boxRef.value) {
    boxRef.value.rotation.y += delta
    boxRef.value.rotation.z = elapsed * 0.2
  }
})

const camera = ref(null)

watchEffect(() => {
  if (camera.value) {
    camera.value.lookAt(0, 0, 0)
  }
})

const transformState = shallowReactive({
  mode: 'translate',
  size: 1,
  axis: 'XY',
  showX: true,
  showY: true,
  showZ: true,
})
</script>

<template>
  <TresCanvas v-bind="gl">
    <!--  <OrbitControls /> -->
    <TresPerspectiveCamera
      ref="camera"
      :position="[3, 3, 3]"
    />
    <OrbitControls make-default />
    <TresMesh
      ref="boxRef"
      :scale="1"
    >
      <TresBoxGeometry :args="[1, 1, 1]" />
      <TresMeshNormalMaterial />
    </TresMesh>
    <TresAmbientLight :intensity="1" />
    <TresDirectionalLight
      :position="[0, 2, 4]"
      :intensity="2"
    />
  </TresCanvas>
</template>
```

::
