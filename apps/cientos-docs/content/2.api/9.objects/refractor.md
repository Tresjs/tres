---
title: Refractor
description: Create real-time refractive (glass-like) surfaces in your scene.
---

::SceneControlsWrapper
  ::ObjectsRefractor
  ::
::

The `cientos` package provides an abstraction of the [Refractor class](https://github.com/mrdoob/three.js/blob/dev/examples/jsm/objects/Refractor.js), which creates a Mesh that renders what is behind it with a refractive distortion effect — useful for glass panels, water surfaces, and other transmissive materials. This Mesh extends from `Mesh` so all the default props can be passed as well.

## Usage

```vue
<script setup lang="ts">
import { Refractor } from '@tresjs/cientos'
</script>

<template>
  <TresCanvas shadows alpha>
    <TresPerspectiveCamera :position="[0, 2, 8]" />
    <OrbitControls />

    <!-- Place objects behind the refracting plane -->
    <TresMesh :position="[-2, 0, -2]">
      <TresTorusKnotGeometry />
      <TresMeshStandardMaterial color="hotpink" />
    </TresMesh>

    <Suspense>
      <Refractor color="#9ec8d4">
        <TresPlaneGeometry :args="[8, 5]" />
      </Refractor>
    </Suspense>
  </TresCanvas>
</template>
```

## Props

| Prop              | Description                                          | Default                    |
| :---------------- | :--------------------------------------------------- | -------------------------- |
| **color**         | Color tint blended with the refracted image          | `'#7f7f7f'`                |
| **textureWidth**  | Width of the internal render target texture          | `512`                      |
| **textureHeight** | Height of the internal render target texture         | `512`                      |
| **clipBias**      | Clip bias for the virtual camera projection          | `0`                        |
| **multisample**   | Number of MSAA samples for the render target         | `4`                        |
| **shader**        | Custom shader object to override the built-in shader | `Refractor.RefractorShader`|

::prose-warning
All the props except `color` are not reactive
::

## Custom refraction effect

You can provide your own shader by passing a full shader object with `uniforms`, `vertexShader`, and `fragmentShader`. The example below adds animated circular ripples emanating from the center of the surface, while preserving the color tint:

```vue
<script setup lang="ts">
import { Refractor } from '@tresjs/cientos'
import { useLoop } from '@tresjs/core'
import { shallowRef } from 'vue'

const refractorRef = shallowRef()

const customShader = {
  uniforms: {
    color: { value: null },
    tDiffuse: { value: null },
    textureMatrix: { value: null },
    time: { value: 0 },
  },
  vertexShader: /* glsl */`
    uniform mat4 textureMatrix;
    varying vec4 vUv;
    varying vec2 vPos;
    void main() {
      vUv = textureMatrix * vec4(position, 1.0);
      vPos = position.xy;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }`,
  fragmentShader: /* glsl */`
    uniform vec3 color;
    uniform sampler2D tDiffuse;
    uniform float time;
    varying vec4 vUv;
    varying vec2 vPos;
    float blendOverlay(float base, float blend) {
      return(base < 0.5 ? (2.0 * base * blend) : (1.0 - 2.0 * (1.0 - base) * (1.0 - blend)));
    }
    vec3 blendOverlay(vec3 base, vec3 blend) {
      return vec3(blendOverlay(base.r, blend.r), blendOverlay(base.g, blend.g), blendOverlay(base.b, blend.b));
    }
    void main() {
      float dist = length(vPos);
      float wave = sin(dist * 6.0 - time * 4.0) * 0.02;
      vec2 dir = dist > 0.001 ? normalize(vPos) : vec2(0.0);
      vec4 distortedUv = vUv + vec4(dir * wave, 0.0, 0.0);
      vec4 base = texture2DProj(tDiffuse, distortedUv);
      gl_FragColor = vec4(blendOverlay(base.rgb, color), 1.0);
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }`,
}

const { onBeforeRender } = useLoop()
onBeforeRender(({ elapsed }) => {
  const uniforms = refractorRef.value?.instance?.material?.uniforms
  if (uniforms?.time) { uniforms.time.value = elapsed }
})
</script>

<template>
  <Refractor
    ref="refractorRef"
    color="#9ec8d4"
    :shader="customShader"
  >
    <TresPlaneGeometry :args="[8, 5]" />
  </Refractor>
</template>
```

The Refractor shader uses the following configuration by default:

### Default shader

```js
const shader = {
  uniforms: {
    color: {
      value: null
    },
    tDiffuse: {
      value: null
    },
    textureMatrix: {
      value: null
    }
  },
  vertexShader: /* glsl */`
    uniform mat4 textureMatrix;
    varying vec4 vUv;

    void main() {
      vUv = textureMatrix * vec4( position, 1.0 );
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }`,
  fragmentShader: /* glsl */`
    uniform vec3 color;
    uniform sampler2D tDiffuse;
    varying vec4 vUv;

    float blendOverlay( float base, float blend ) {
      return( base < 0.5 ? ( 2.0 * base * blend ) : ( 1.0 - 2.0 * ( 1.0 - base ) * ( 1.0 - blend ) ) );
    }

    vec3 blendOverlay( vec3 base, vec3 blend ) {
      return vec3( blendOverlay( base.r, blend.r ), blendOverlay( base.g, blend.g ), blendOverlay( base.b, blend.b ) );
    }

    void main() {
      vec4 base = texture2DProj( tDiffuse, vUv );
      gl_FragColor = vec4( blendOverlay( base.rgb, color ), 1.0 );

      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }`
}
```
