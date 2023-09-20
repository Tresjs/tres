---
thumbnail: /mouse-parallax.png
title: Mouse Parallax
author: jaime-bboyjt
description: A star like recreation with shaders, pam camera controls and stars component
tags: ['stars', 'mouse-parallax', 'fragment-shader']
---

::mouse-parallax
::

::the-info

![mouse-parallax](/mouse-parallax.png)

# Basic Shaders

Author: [@**jaimebboyjt**](https://twitter.com/jaimebboyjt).

> A star like recreation with shaders, pam camera controls and stars component

```vue
// App.vue
<script setup lang="ts">
import { BasicShadowMap, sRGBEncoding, NoToneMapping } from 'three'
import { TresCanvas, useRenderLoop } from '@tresjs/core'

import { MouseParallax, Stars } from '@tresjs/cientos'

import Vertex from './shaders/vertex.glsl'
import Fragment from './shaders/fragment.glsl'

const gl = {
  clearColor: '#111',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputEncoding: sRGBEncoding,
  toneMapping: NoToneMapping,
}

// Shaders
const shader = {
  vertexShader: Vertex,
  fragmentShader: Fragment,
  uniforms: {
    uTime: { value: 0 },
  },
}
const { onLoop } = useRenderLoop()

onLoop(() => {
  shader.uniforms.uTime.value += 0.01
})
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[0, 0, 7.5]" :fov="75" :near="0.1" :far="1000" />
    <!-- This create a really good-looking pam effect -->
    <MouseParallax :factor="1" />
    <!-- It's really easy add stars in TresJs -->
    <Stars />
    <TresMesh :scale="2" :position="[0.5, 0.5, 0]" cast-shadow>
      <TresSphereGeometry :args="[1, 30, 30]" />
      <TresShaderMaterial v-bind="shader" />
    </TresMesh>
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
```

## Shaders

Now we need to create the shaders. Shaders are written in GLSL, a C-like language for writing shaders.

```
// vertex.glsl
varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec3 vRotateLayer;
uniform float uTime;

// this is a common function to rotate the matrices
mat2 rotate(float a) {
    float s = sin(a);
    float c = cos(a);
    return mat2(c, -s, s, c);
}

void main(){
gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    vUv = uv;
    vPosition = position;
    mat2 rot = rotate(uTime);
    vec3 newPos = position;
    newPos.xz = rot*newPos.xz;
    vRotateLayer = newPos;
    vNormal = normal;
}
```

```
// fragment.glsl
precision mediump float;
varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec3 vRotateLayer;
uniform highp float uTime;

// PerlinNoise

// function to create differents layers for the perlin noises
float layer(vec4 p){
float sum = 0.;
float amp = 1.;
float scale = 1.;
for(int i=0;i<6; i++){
    sum += snoise(p*scale)*amp;
    p.w += 100.;
    amp *= 0.9;
    scale *= 2.;
}
return sum;
}
// magical function that return us the color of the sun
  vec3 SunColor(float b){
    b*= 0.25;
    return (vec3(b, b*b, b*b*b*b)/0.25)*0.6;
  }

void main(){
        vec3 viewDirection = normalize(cameraPosition - vPosition);
        // we apply a fresnel effect
        float fresnel =  dot(viewDirection, vNormal);
        vec4 p = vec4(vPosition * 3., uTime * 0.1);
        float noisy = layer(p);
        float colx = noisy * SunColor(noisy).r * 4. +0.9;
        float coly = noisy * SunColor(noisy).g * 4. +0.9;

        gl_FragColor = vec4(vec3(colx, coly, noisy),1.);
        // we rotate the matrices
        gl_FragColor += vRotateLayer.r *0.25;
        gl_FragColor *= vec4(vec3(fresnel),1.);
}
```

::
