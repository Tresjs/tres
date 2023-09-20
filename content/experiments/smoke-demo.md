---
thumbnail: /smoke-demo.png
title: Smoke demo
author: jaime-bboyjt
status: published
description: A basic example of how to use the smoke and precipitation component with TresJS and cientos
tags: ['cientos', 'smoke', 'precipitation']
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
import { OrbitControls, Smoke, useGLTF, Precipitation } from '@tresjs/cientos'
import { BasicShadowMap, sRGBEncoding, NoToneMapping, Shape } from 'three'

console.log('jaime ~ Precipitation:', Precipitation)

const gl = {
  clearColor: '#333',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputEncoding: sRGBEncoding,
  toneMapping: NoToneMapping,
}

const { scene } = await useGLTF('https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/blender-cube.glb')
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[0, 0, 12]" />
    <Suspense>
      <Smoke
        :position="[-4, -2, 0]"
        :segments="8"
      />
    </Suspense>
    <Suspense>
      <Smoke
        :position="[-4, 2, 0]"
        :segments="8"
      />
    </Suspense>
    <Suspense>
      <Smoke
        :segments="8"
        color="#c4c4c4"
      />
    </Suspense>
    <Suspense>
      <Smoke
        :position="[4, -2, 0]"
        :segments="8"
      />
    </Suspense>
    <Suspense>
      <Smoke
        :position="[4, 2, 0]"
        :segments="8"
      />
    </Suspense>
    <primitive :object="scene" />
    <Precipitation
      :area="[15, 15, 15]"
      :size="0.1"
      :count="500"
      :speed="2"
      :randomness="0"
    />
    <TresGridHelper
      :size="10"
      :divisions="10"
      :position-y="-1"
    />
    <TresAmbientLight :intensity="1" />
    <TresDirectionalLight
      :intensity="1"
      :position="[2, 2, 2]"
    />
    <OrbitControls />
  </TresCanvas>
</template>
```
