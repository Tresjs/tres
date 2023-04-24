---
thumbnail: /smoke-demo.png
title: Smoke demo
author: jaime-bboyjt
description: A basic example of how to use the smoke component effect with TresJS and cientos
tags: ['cientos', 'smoke', 'shape-geometry']
---

::smoke-demo
::

::the-info

![Smoke](/smoke-demo.png)

# Smoke

Author: [@**jaimebboyjt**](https://twitter.com/jaimebboyjt).

> This is a basic example of how to use shaders with TresJS.

```vue
// App.vue
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, Smoke } from '@tresjs/cientos'
import { BasicShadowMap, sRGBEncoding, NoToneMapping, Shape } from 'three'

const gl = {
  clearColor: '#333',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputEncoding: sRGBEncoding,
  toneMapping: NoToneMapping,
}
const x = 0,
  y = 0

const heartShape = new Shape()
// here we draw the heart shape
heartShape.moveTo(x + 5, y + 5)
heartShape.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y)
heartShape.bezierCurveTo(x - 6, y, x - 6, y + 7, x - 6, y + 7)
heartShape.bezierCurveTo(x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19)
heartShape.bezierCurveTo(x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7)
heartShape.bezierCurveTo(x + 16, y + 7, x + 16, y, x + 10, y)
heartShape.bezierCurveTo(x + 7, y, x + 5, y + 5, x + 5, y + 5)
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[0, 0, 5]" />
    <!-- here define the positions of smokes -->
    <Suspense>
      <Smoke :position="[-4, -2, 0]" :segments="8" />
    </Suspense>
    <Suspense>
      <Smoke :position="[-4, 2, 0]" :segments="8" />
    </Suspense>
    <Suspense>
      <Smoke :segments="8" color="#c4c4c4" />
    </Suspense>
    <Suspense>
      <Smoke :position="[4, -2, 0]" :segments="8" />
    </Suspense>
    <Suspense>
      <Smoke :position="[4, 2, 0]" :segments="8" />
    </Suspense>
    <TresMesh ref="boxRef" :scale="0.1" :rotation="[0, 0, Math.PI]">
      <TresShapeGeometry :args="[heartShape]" />
      <TresMeshBasicMaterial color="#FBB03B" />
    </TresMesh>
    <TresMesh :position="[-0.9, -0.75, 0]">
      <TresBoxGeometry :args="[0.2, 0.2, 0.2]" />
    </TresMesh>
    <TresMesh :position="[-0.1, -0.75, 0]">
      <TresBoxGeometry :args="[0.2, 0.2, 0.2]" />
    </TresMesh>
    <TresAmbientLight :intensity="1" />
    <TresDirectionalLight :intensity="1" :position="[2, 2, 2]" />
    <OrbitControls />
  </TresCanvas>
</template>
```
