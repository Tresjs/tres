---
title: WebGPU
description: Explore experimental WebGPU rendering capabilities in TresJS.
---

::warning
**Experimental Feature**: WebGPU support in TresJS is experimental and requires modern browser support. WebGPU is still being developed and may have breaking changes.
::

## What is WebGPU?

[WebGPU](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API) is the next-generation graphics API for the web, designed to provide high-performance 3D graphics and general-purpose computing capabilities directly in web browsers. It offers several advantages over WebGL:

### **Key Benefits**
- **Better Performance**: More efficient GPU utilization and reduced CPU overhead
- **Modern GPU Features**: Access to compute shaders, advanced texturing, and modern GPU capabilities
- **Unified API**: Single API for both graphics and compute operations
- **Better Debugging**: Improved error handling and debugging capabilities
- **Future-Proof**: Designed for modern GPU architectures

### **Browser Support**
WebGPU is currently supported in:
- **Chrome/Edge**: Stable support (Chrome 113+)
- **Firefox**: Behind experimental flag
- **Safari**: Experimental support in Safari Technology Preview

::note
Check current WebGPU browser support at [Can I Use WebGPU](https://caniuse.com/webgpu) and the official [WebGPU support matrix](https://github.com/gpuweb/gpuweb/wiki/Implementation-Status).
::

## Usage with TresJS

TresJS supports WebGPU through Three.js's WebGPU renderer. You can enable WebGPU by providing a custom renderer factory to the `<TresCanvas>` component.

### Basic Setup

```vue [basic-webgpu.vue]
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { WebGPURenderer } from 'three/webgpu'
import type { TresRendererSetupContext } from '@tresjs/core'

// Create WebGPU renderer factory
const createWebGPURenderer = (ctx: TresRendererSetupContext) => {
  const renderer = new WebGPURenderer({
    canvas: toValue(ctx.canvas),
    // WebGPU specific configuration
    alpha: true,
    antialias: true,
  })
  return renderer
}
</script>

<template>
  <TresCanvas :renderer="createWebGPURenderer">
    <TresPerspectiveCamera :position="[3, 3, 3]" />
    <TresBoxGeometry :args="[1, 1, 1]" />
    <TresMeshBasicMaterial color="hotpink" />
    <!-- Your 3D scene here -->
  </TresCanvas>
</template>
```

### Advanced WebGPU Example

:::examples-web-gpu
:::

::code-preview{class="[&>div]:*:my-0 [&>div]:*:w-full"}
  :::code-tree{default-value="app.vue"}

  ```vue [components/HologramCube.vue]
  <script setup lang="ts">
  import { isMesh } from '@tesjs/core'
  import { useGLTF } from '@tresjs/cientos'
  import { add, cameraProjectionMatrix, cameraViewMatrix, color, Fn, hash, mix, normalView, positionWorld, sin, timerGlobal, uniform, varying, vec3, vec4 } from 'three/tsl'
  import { AdditiveBlending, DoubleSide, MeshBasicNodeMaterial } from 'three/webgpu'

  const { nodes } = useGLTF('https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/blender-cube.glb', { draco: true })

  const model = computed(() => nodes.value.BlenderCube)
  /**
  * Material
  */
  const material = new MeshBasicNodeMaterial({
    transparent: true,
    side: DoubleSide,
    depthWrite: false,
    blending: AdditiveBlending,
  })
  // Position
  const glitchStrength = varying(0)
  material.vertexNode = Fn(() => {
    const glitchTime = timerGlobal().sub(positionWorld.y.mul(0.5))
    glitchStrength.assign(add(
      sin(glitchTime),
      sin(glitchTime.mul(3.45)),
      sin(glitchTime.mul(8.76)),
    ).div(3).smoothstep(0.3, 1))
    const glitch = vec3(
      hash(positionWorld.xz.abs().mul(9999)).sub(0.5),
      0,
      hash(positionWorld.yx.abs().mul(9999)).sub(0.5),
    )
    positionWorld.xyz.addAssign(glitch.mul(glitchStrength.mul(0.5)))
    return cameraProjectionMatrix.mul(cameraViewMatrix).mul(positionWorld)
  })()
  // Color
  const colorInside = uniform(color('#ff6088'))
  const colorOutside = uniform(color('#4d55ff'))
  material.colorNode = Fn(() => {
    const stripes = positionWorld.y.sub(timerGlobal(0.02)).mul(20).mod(1).pow(3)
    const fresnel = normalView.dot(vec3(0, 0, 1)).abs().oneMinus()
    const falloff = fresnel.smoothstep(0.8, 0.2)
    const alpha = stripes.mul(fresnel).add(fresnel.mul(1.25)).mul(falloff)
    const finalColor = mix(colorInside, colorOutside, fresnel.add(glitchStrength.mul(0.6)))
    return vec4(finalColor, alpha)
  })()

  watch(model, (newModel) => {
    newModel.traverse((child) => {
      if (isMesh(child)) {
        child.material = material
      }
    })
  })
  </script>

  <template>
    <primitive v-if="model" :object="model" />
  </template>
```
  ```vue [app.vue]
  <script setup lang="ts">
  import { TresCanvas } from '@tresjs/core'
  import { WebGPURenderer } from 'three/webgpu'
  import type { ShadowMapType, ToneMapping } from 'three'
  import type { TresRendererSetupContext } from '@tresjs/core'

  import HologramCube from './HologramCube.vue'

  const createWebGPURenderer = (ctx: TresRendererSetupContext) => {
    const renderer = new WebGPURenderer({
      canvas: toValue(ctx.canvas),
      // WebGPU specific configuration
      alpha: true,
      antialias: true,
    })
    return renderer
  }
  </script>

  <template>
    <TresCanvas :renderer="createWebGPURenderer">
      <TresPerspectiveCamera
        :position="[3, 3, 3]"
        :look-at="[0, 0, 0]"
      />
      <Suspense>
        <HologramCube />
      </Suspense>
    </TresCanvas>
  </template>
  ```
