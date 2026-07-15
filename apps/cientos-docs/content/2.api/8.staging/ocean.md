---
title: Ocean
description: Wrapper for the Three.js Water add-on with sky reflection support.
---

::SceneControlsWrapper
::StagingOcean
::
::

`<Ocean />` is a wrapper for the [Three.js `Water` add-on](https://threejs.org/examples/?q=ocean#webgl_shaders_ocean).

::prose-warning
Ocean comes with a default texture, so it needs to be wrapped in a Suspense component.
::

## Usage

```vue{3, 9}
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { Ocean } from '@tresjs/cientos'
</script>

<template>
  <TresCanvas>
    <Suspense>
      <Ocean />
    </Suspense>
  </TresCanvas>
</template>
```

### SKY

`<Ocean />` works hand in hand with the Sky component, detecting the position of the sun and reflecting on the water.
(`<Sky />` is not required for making this component work.)

### Fog

The `<Ocean />` component also reacts when there's [Fog](https://threejs.org/docs/index.html?q=fog#api/en/scenes/Fog) or [FogExp2](https://threejs.org/docs/index.html?q=fog#api/en/scenes/FogExp2) in your scene.

## Custom Geometry

You can use custom geometry by adding it as a child.

```vue{3, 9-11}
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { Ocean } from '@tresjs/cientos'
</script>

<template>
  <TresCanvas>
    <Suspense>
      <Ocean>
        <TresCircleGeometry :args="[50, 16]" />
      </Ocean>
    </Suspense>
  </TresCanvas>
</template>
```

## Props

::prose-tip
Props marked with ✅ support reactive changes at runtime. Props marked with ❌ are only read at construction time and cannot be changed after the component is mounted.
::

| Prop                | Description                                                                                            | Default                                                                                                                  | Reactive |
| :------------------ | :----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | :------: |
| **textureWidth**    | Width of the mirror texture                                                                            | `512`                                                                                                                    |    ❌    |
| **textureHeight**   | Height of the mirror texture                                                                           | `512`                                                                                                                    |    ❌    |
| **waterNormals**    | URL of the water normal texture                                                                        | [Water_1_M_Normal.jpg](https://raw.githubusercontent.com/Tresjs/assets/main/textures/water-normals/Water_1_M_Normal.jpg) |    ❌    |
| **sunDirection**    | Sun direction to be reflected on the water                                                             | `Vector3(0,0,0)`                                                                                                         |    ❌    |
| **sunColor**        | Sun color to be reflected on the water                                                                 | `0xffffff`                                                                                                               |    ✅    |
| **waterColor**      | Water color                                                                                            | `0x001e0f`                                                                                                               |    ✅    |
| **distortionScale** | Distortion scale on reflected objects                                                                  | `3.7`                                                                                                                    |    ✅    |
| **size**            | Size of the water normals                                                                              | `1`                                                                                                                      |    ✅    |
| **clipBias**        | Clip bias for the render target                                                                        | `0.0`                                                                                                                    |    ❌    |
| **alpha**           | Alpha transparency of the water                                                                        | `1.0`                                                                                                                    |    ✅    |
| **side**            | Which side of the mesh renders the water                                                               | `FrontSide`                                                                                                              |    ❌    |
| **speed**           | Animation speed multiplier applied to the wave animation. Higher values make the water animate faster. | `1`                                                                                                                      |    ✅    |
