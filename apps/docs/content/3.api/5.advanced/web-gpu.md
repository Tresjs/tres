---
title: WebGPU
description: Render TresJS scenes with WebGPU, node materials and TSL.
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

Import `TresCanvas` from `@tresjs/core/webgpu`. It creates a Three.js `WebGPURenderer` for you, and node materials work as template tags.

::note
`@tresjs/core/webgpu` is available since `@tresjs/core` v5.10. On older versions, see [Without the WebGPU entry](#without-the-webgpu-entry).
::

```vue [basic-webgpu.vue]
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core/webgpu'
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera :position="[3, 3, 3]" :look-at="[0, 0, 0]" />
    <TresMesh>
      <TresBoxGeometry :args="[1, 1, 1]" />
      <TresMeshStandardNodeMaterial color="hotpink" />
    </TresMesh>
    <TresDirectionalLight :position="[3, 5, 2]" />
  </TresCanvas>
</template>
```

The root import `@tresjs/core` does not change: its `TresCanvas` still uses `WebGLRenderer`.

### What the WebGPU entry gives you

| | `@tresjs/core` | `@tresjs/core/webgpu` |
| -- | -- | -- |
| Default renderer | `WebGLRenderer` | `WebGPURenderer` |
| Node materials as tags (`<TresMeshStandardNodeMaterial>`) | No, needs `extend()` | Yes |
| `useTres().renderer` type | `WebGLRenderer \| Renderer` | `WebGPURenderer` |

All other exports (`useLoop`, `useTresContext`, `extend`, type guards, ...) are the same in both entries.

### Node materials as tags

Importing `@tresjs/core/webgpu` adds every class of `three/webgpu` to the [catalogue](/api/components/tres-objects), so node materials are Tres components. Their node props take TSL nodes:

```vue
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core/webgpu'
import { color, mix, positionLocal, sin, time } from 'three/tsl'

const colorNode = mix(
  color('#82dbc5'),
  color('#fbb03b'),
  sin(time.add(positionLocal.y.mul(4))).mul(0.5).add(0.5),
)
</script>

<template>
  <TresCanvas>
    <TresMesh>
      <TresTorusKnotGeometry :args="[0.6, 0.2, 128, 32]" />
      <TresMeshStandardNodeMaterial :color-node="colorNode" :roughness="0.3" />
    </TresMesh>
  </TresCanvas>
</template>
```

The tags are typed. Import anything from `@tresjs/core/webgpu` once in your app, and the editor knows `<TresMeshStandardNodeMaterial>` and its props.

### Typed `useTres`

Import `useTres` from `@tresjs/core/webgpu` in components inside the canvas. The `renderer` is typed as `WebGPURenderer`, so you do not need a cast:

```ts
import { useTres } from '@tresjs/core/webgpu'

const { renderer } = useTres()
console.log(renderer.backend) // WebGPURenderer-only API, no cast
```

### Standard materials and GLSL

- Standard materials still work. `WebGPURenderer` converts `<TresMeshStandardMaterial>`, `<TresMeshBasicMaterial>`, `<TresMeshPhysicalMaterial>` and the other built-in materials to their node versions.
- `ShaderMaterial`, `RawShaderMaterial` and `onBeforeCompile` (GLSL) do not work with `WebGPURenderer`. Write the shader with [TSL](https://github.com/mrdoob/three.js/wiki/Three.js-Shading-Language) and a node material instead.

### Mixed imports are safe

`three` and `three/webgpu` share their core classes. `Mesh` from `three` and `Mesh` from `three/webgpu` are the same class, so you can mix both import paths in one app.

### WebGL2 fallback

When the browser does not support WebGPU, `WebGPURenderer` uses its WebGL2 backend. Node materials and TSL still work on that backend. To check which backend runs:

```ts
const { renderer } = useTres()
const isWebGPU = 'isWebGPUBackend' in renderer.backend
```

If the renderer cannot start at all, `TresCanvas` emits `error` with a `TresRendererError`:

```vue
<TresCanvas @error="(error) => console.error(error.message)">
```

### Custom renderer options

You do not need the `renderer` prop for the normal case. The WebGPU `TresCanvas` passes `antialias`, `alpha`, `depth`, `stencil`, `powerPreference` and `logarithmicDepthBuffer` to `WebGPURenderer`.

For other `WebGPURenderer` options (for example `samples`, `trackTimestamp` or `forceWebGL`), give your own factory:

```vue
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core/webgpu'
import type { TresRendererSetupContext } from '@tresjs/core/webgpu'
import { WebGPURenderer } from 'three/webgpu'

const createRenderer = (ctx: TresRendererSetupContext) => new WebGPURenderer({
  canvas: toValue(ctx.canvas),
  antialias: true,
  trackTimestamp: true,
})
</script>

<template>
  <TresCanvas :renderer="createRenderer">
    <!-- Your scene -->
  </TresCanvas>
</template>
```

### Cientos

`@tresjs/cientos` is built for `WebGLRenderer`. Components that do not write their own shaders (controls, loaders, most shapes and staging helpers) are expected to work under `WebGPURenderer`, but not all of them are tested yet. Components built on GLSL shaders do not work: `MeshWobbleMaterial`, `MeshDiscardMaterial`, `PointMaterial`, `HolographicMaterial`, `MeshReflectionMaterial`, `MeshTransmissionMaterial`, `MeshPortalMaterial`, `CustomShaderMaterial`, `AccumulativeShadows`, `ContactShadows`, `Lensflare`, `Reflector`, `Refractor`, `Ocean`, `Sparkles`, `Grid` and `Outline`. A `@tresjs/cientos/webgpu` entry with TSL versions is planned.

### Without the WebGPU entry

On versions before v5.10, or to keep the root `TresCanvas`, pass a renderer factory and add the node classes to the catalogue yourself:

```vue
<script setup lang="ts">
import { extend, TresCanvas } from '@tresjs/core'
import type { TresRendererSetupContext } from '@tresjs/core'
import * as THREE_WEBGPU from 'three/webgpu'

// Makes <TresMeshStandardNodeMaterial> and the other node classes available as tags
extend(THREE_WEBGPU)

const createWebGPURenderer = (ctx: TresRendererSetupContext) => new THREE_WEBGPU.WebGPURenderer({
  canvas: toValue(ctx.canvas),
  antialias: true,
})
</script>

<template>
  <TresCanvas :renderer="createWebGPURenderer">
    <!-- Your scene -->
  </TresCanvas>
</template>
```

Here `useTres().renderer` is typed as `WebGLRenderer | Renderer`, so check it with the `isWebGPURenderer` [type guard](/api/utils/type-guards) before you use WebGPU-only APIs.

### Advanced WebGPU Example

:::examples-web-gpu
:::

::code-preview{class="[&>div]:*:my-0 [&>div]:*:w-full"}
  :::code-tree{default-value="app.vue"}

  ```vue [components/HologramCube.vue]
  <script setup lang="ts">
  import { isMesh } from '@tresjs/core/webgpu'
  import type { TresObject } from '@tresjs/core/webgpu'
  import { useGLTF } from '@tresjs/cientos'
  import { add, cameraProjectionMatrix, cameraViewMatrix, color, Fn, hash, mix, normalView, positionWorld, sin, time, uniform, varying, vec3, vec4 } from 'three/tsl'
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
  const glitchStrength = varying(uniform(0))
  material.vertexNode = Fn(() => {
    const glitchTime = time.sub(positionWorld.y.mul(0.5))
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
    const stripes = positionWorld.y.sub(time.mul(0.02)).mul(20).mod(1).pow(3)
    const fresnel = normalView.dot(vec3(0, 0, 1)).abs().oneMinus()
    const falloff = fresnel.smoothstep(0.8, 0.2)
    const alpha = stripes.mul(fresnel).add(fresnel.mul(1.25)).mul(falloff)
    const finalColor = mix(colorInside, colorOutside, fresnel.add(glitchStrength.mul(0.6)))
    return vec4(finalColor, alpha)
  })()

  watch(model, (newModel) => {
    newModel?.traverse((child: TresObject) => {
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
  import { TresCanvas } from '@tresjs/core/webgpu'
  import { OrbitControls } from '@tresjs/cientos'

  import HologramCube from './HologramCube.vue'
  </script>

  <template>
    <TresCanvas>
      <TresPerspectiveCamera
        :position="[3, 3, 3]"
        :look-at="[0, 0, 0]"
      />
      <Suspense>
        <HologramCube />
      </Suspense>
      <OrbitControls />
      <TresAmbientLight :intensity="1" />
    </TresCanvas>
  </template>
  ```
