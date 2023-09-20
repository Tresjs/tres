---
thumbnail: /galaxy-generator.png
title: Galaxy Generator 🪐
slug: galaxy-generator
author: alvarosabu
status: published
description: Animated galaxy from ThreeJS Journey done with TresJS
tags: ['particles', 'shaders', 'glsl']
---

::galaxy-generator
::

::the-info

![Galaxy Generator](/galaxy-generator.png)

# Galaxy Generator

Author: [@**alvarosabu**](https://twitter.com/alvarosabu).

> Galaxy generator from [ThreeJS Journey](https://threejs-journey.com/lessons/animated-galaxy) done with TresJS

```vue
// App.vue
<script setup lang="ts">
import { TresCanvas, useRenderLoop } from '@tresjs/core'
import { BasicShadowMap, SRGBColorSpace, NoToneMapping, Color, AdditiveBlending, BufferAttribute } from 'three'
import gsap from 'gsap'

import { OrbitControls, useTweakPane } from '@tresjs/cientos'

import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'

const gl = {
  clearColor: 'black',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const parameters = {
  count: 30000,
  size: 20,
  radius: 5,
  branches: 5,
  spin: 4,
  randomness: 0.13,
  randomnessPower: 7.5,
  insideColor: '#b5f28d',
  outsideColor: '#1b3984',
}

const colorInside = new Color(parameters.insideColor)
const colorOutside = new Color(parameters.outsideColor)

const positions = new Float32Array(parameters.count * 3)
const colors = new Float32Array(parameters.count * 3)
const scales = new Float32Array(parameters.count)
const randomness = new Float32Array(parameters.count * 3)

for (let i = 0; i < parameters.count; i++) {
  const i3 = i * 3

  const radius = Math.random() * parameters.radius
  /*  const spinAngle = radius * parameters.spin */
  const spinAngle = 0
  const branchAngle = ((i % parameters.branches) * Math.PI * 2) / parameters.branches

  positions[i3] = Math.cos(branchAngle) * radius // x
  positions[i3 + 1] = 0 // y
  positions[i3 + 2] = Math.sin(branchAngle) * radius // z

  const randomX = Math.random() ** parameters.randomnessPower * (Math.random() < 0.5 ? -1 : 1)
  const randomY = Math.random() ** parameters.randomnessPower * (Math.random() < 0.5 ? -1 : 1)
  const randomZ = Math.random() ** parameters.randomnessPower * (Math.random() < 0.5 ? -1 : 1)

  randomness[i3] = randomX
  randomness[i3 + 1] = randomY
  randomness[i3 + 2] = randomZ

  const mixedColor = colorInside.clone()
  mixedColor.lerp(colorOutside, radius / parameters.radius)

  colors[i3 + 0] = mixedColor.r // R
  colors[i3 + 1] = mixedColor.g // G
  colors[i3 + 2] = mixedColor.b // B

  scales[i] = Math.random()
}

const shader = {
  transparent: true,
  depthWrite: false,
  blending: AdditiveBlending,
  vertexColors: true,
  vertexShader,
  fragmentShader,
  uniforms: {
    uTime: { value: 0 },
    uSize: {
      value: parameters.size,
    },
  },
}

function updateGalaxy() {
  if (bufferRef.value) {
    const colorInside = new Color(parameters.insideColor)
    const colorOutside = new Color(parameters.outsideColor)

    const positions = new Float32Array(parameters.count * 3)
    const colors = new Float32Array(parameters.count * 3)
    const scales = new Float32Array(parameters.count)
    const randomness = new Float32Array(parameters.count * 3)
    for (let i = 0; i < parameters.count; i++) {
      const i3 = i * 3

      const radius = Math.random() * parameters.radius
      /*  const spinAngle = radius * parameters.spin */
      const spinAngle = 0
      const branchAngle = ((i % parameters.branches) * Math.PI * 2) / parameters.branches

      positions[i3] = Math.cos(branchAngle) * radius // x
      positions[i3 + 1] = 0 // y
      positions[i3 + 2] = Math.sin(branchAngle) * radius // z

      const randomX = Math.random() ** parameters.randomnessPower * (Math.random() < 0.5 ? -1 : 1)
      const randomY = Math.random() ** parameters.randomnessPower * (Math.random() < 0.5 ? -1 : 1)
      const randomZ = Math.random() ** parameters.randomnessPower * (Math.random() < 0.5 ? -1 : 1)

      randomness[i3] = randomX
      randomness[i3 + 1] = randomY
      randomness[i3 + 2] = randomZ

      const mixedColor = colorInside.clone()
      mixedColor.lerp(colorOutside, radius / parameters.radius)

      colors[i3 + 0] = mixedColor.r // R
      colors[i3 + 1] = mixedColor.g // G
      colors[i3 + 2] = mixedColor.b // B

      scales[i] = Math.random()
    }
    bufferRef.value.geometry.setAttribute('position', new BufferAttribute(positions, 3))
    bufferRef.value.geometry.setAttribute('aRandomness', new BufferAttribute(randomness, 3))
    bufferRef.value.geometry.setAttribute('color', new BufferAttribute(colors, 3))
    bufferRef.value.geometry.setAttribute('aScale', new BufferAttribute(scales, 1))
  }
}

const bufferRef = ref(null)

const { onLoop } = useRenderLoop()

onLoop(({ elapsed }) => {
  if (bufferRef.value) {
    bufferRef.value.material.uniforms.uTime.value = elapsed
  }
})

const { pane } = useTweakPane()

pane
  .addInput(parameters, 'count', {
    min: 0,
    max: 100000,
  })
  .on('change', updateGalaxy)
pane
  .addInput(parameters, 'size', {
    min: 0.01,
    max: 40,
    step: 1,
  })
  .on('change', updateGalaxy)
pane
  .addInput(parameters, 'radius', {
    min: 0.1,
    max: 20,
    step: 0.01,
  })
  .on('change', updateGalaxy)
pane
  .addInput(parameters, 'branches', {
    min: 2,
    max: 10,
    step: 1,
  })
  .on('change', updateGalaxy)
pane
  .addInput(parameters, 'spin', {
    min: -5,
    max: 5,
    step: 0.01,
  })
  .on('change', updateGalaxy)
pane
  .addInput(parameters, 'randomness', {
    min: 0.1,
    max: 0.2,
    step: 0.01,
  })
  .on('change', updateGalaxy)
pane.addInput(parameters, 'randomnessPower', { min: 1, max: 10, step: 0.001 }).on('change', updateGalaxy)
pane.addInput(parameters, 'insideColor').on('change', updateGalaxy)
pane.addInput(parameters, 'outsideColor').on('change', updateGalaxy)
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[3, 3, 3]" />
    <TresPoints ref="bufferRef">
      <TresBufferGeometry
        :position="[positions, 3]"
        :a-scale="[scales, 1]"
        :color="[colors, 3]"
        :a-randomness="[randomness, 3]"
      />
      <TresShaderMaterial v-bind="shader" />
    </TresPoints>
    <OrbitControls />
  </TresCanvas>
</template>
```

## Shaders

Now we need to create the shaders. Shaders are written in GLSL, a C-like language for writing shaders.

```
// vertex.glsl
uniform float uSize;
uniform float uTime;

attribute float aScale;
attribute vec3 aRandomness;

varying vec3 vColor;

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    //Spin
    float angle = atan(modelPosition.x, modelPosition.z);
    float distanceToCenter = length(modelPosition.xz);
    float angleOffset = (1.0 / distanceToCenter) * uTime * 0.2;
    angle += angleOffset;

    modelPosition.x = distanceToCenter * cos(angle);
    modelPosition.z = distanceToCenter * sin(angle);

    // Randomness
    modelPosition.xyz += aRandomness;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;

    gl_PointSize = uSize * aScale;

    // Size attenuation
    gl_PointSize *= ( 1.0 / - viewPosition.z);

    // Color
    vColor = color;

}
```

```
// fragment.glsl
varying vec3 vColor;

void main()
{
    // Disc
    float strength = distance(gl_PointCoord, vec2(0.5));
    strength = 1.0 - strength;
    strength = pow(strength, 5.0);

    // Color
    vec3 color = mix(vec3(0.0), vColor, strength);
    gl_FragColor = vec4(color, 1.0);
}
```

::
