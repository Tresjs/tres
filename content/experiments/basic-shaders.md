---
thumbnail: /basic-shaders.png
title: Basic Shaders
slug: basic-shaders
author: alvarosabu
status: published
description: Demo of using shaders with TresJS
tags: ['basic', 'shaders', 'glsl']
---

::basic-shaders
::

::the-info

![Basic Shaders](/basic-shaders.png)

# Basic Shaders

Author: [@**alvarosabu**](https://twitter.com/alvarosabu).

> This is a basic example of how to use shaders with TresJS.

```vue
// App.vue
<script setup lang="ts">
import { Vector2 } from 'three'
import { TresCanvas, TresInstance, useRenderLoop } from '@tresjs/core'
import { OrbitControls, useTweakPane } from '@tresjs/cientos'
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'

const blobRef: Ref<TresInstance | null> = ref(null)
const materialRef: Ref<TresInstance | null> = ref(null)
const uniforms = {
  uTime: { value: 0 },
  uAmplitude: { value: new Vector2(0.1, 0.1) },
  uFrequency: { value: new Vector2(20, 5) },
}

useTweakPane()

const { onLoop, resume } = useRenderLoop()
resume()
onLoop(({ _delta, elapsed }) => {
  if (blobRef.value) {
    blobRef.value.material.uniforms.uTime.value = elapsed
  }
})
</script>

<template>
  <TresCanvas
    clear-color="#111"
    shadows
    alpha
  >
    <TresPerspectiveCamera :position="[11, 11, 11]" />
    <OrbitControls />
    <TresMesh
      ref="blobRef"
      :position="[0, 4, 0]"
    >
      <TresSphereGeometry :args="[2, 32, 32]" />
      <TresShaderMaterial
        ref="materialRef"
        :vertex-shader="vertexShader"
        :fragment-shader="fragmentShader"
        :uniforms="uniforms"
      />
    </TresMesh>
    <TresMesh :rotation="[-Math.PI / 2, 0, 0]">
      <TresPlaneGeometry :args="[10, 10, 10, 10]" />
      <TresMeshBasicMaterial color="#444" />
    </TresMesh>
  </TresCanvas>
</template>
```

## Shaders

Now we need to create the shaders. Shaders are written in GLSL, a C-like language for writing shaders.

```
// vertex.glsl
uniform vec2 uAmplitude;
uniform vec2 uFrequency;
uniform float uTime;

varying vec2 vUv;

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    modelPosition.y += sin(modelPosition.x * uFrequency.x - uTime) * uAmplitude.x;
    modelPosition.x += cos(modelPosition.y * uFrequency.y - uTime) * uAmplitude.y;

    vec4 viewPosition = viewMatrix * modelPosition;
    gl_Position = projectionMatrix * viewPosition;
    vUv = uv;
}
```

```
// fragment.glsl
precision mediump float;
varying vec2 vUv;

void main() {
    gl_FragColor = vec4(1.0, vUv.y, 0.5, 1.0);
}
```

::
