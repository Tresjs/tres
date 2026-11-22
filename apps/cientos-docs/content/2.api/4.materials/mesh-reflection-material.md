---
title: Mesh Reflection Material
description: Makes floors or walls that reflect the objects in your Scene.
---

::SceneControlsWrapper
  ::MaterialsMeshReflectionMaterial
  ::
::

The `cientos` package provides a `<MeshReflectionMaterial />` component for making floors or walls that reflect the objects in your `Scene`.

The component is based on the excellent [Drei](https://github.com/pmndrs/drei) component of the same name.

It extends `THREE.MeshStandardMaterial` and accepts all the same props.

## Usage

```vue{3,16-19}
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { MeshReflectionMaterial } from '@tresjs/cientos'
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera :position="[3, 3, 3]" :look-at="[0, 0, 0]" />
    <TresMesh :rotation="[-Math.PI / 2, 0, 0]">
      <TresPlaneGeometry :args="[10, 10]" />
      <MeshReflectionMaterial
        :blur="[300, 100]"
        :mixBlur="30"
        :mixStrength="80"
        :mixContrast="1"
        color="#a0a0a0"
        metalness="0.5"
        roughness="1"
        mirror="0"
      />
    </TresMesh>
    <TresMesh :position="[0, 1, 0]">
      <TresBoxGeometry />
      <TresMeshStandardMaterial color="orange" />
    </TresMesh>
    <TresAmbientLight />
    <TresDirectionalLight :position="[0, 2, 4]" />
  </TresCanvas>
</template>
```

## Props

| Name | Description | Default |
| :--- | :--- | ---- |
| `resolution` | Length in pixels of one side of the square reflective textures | `256` |
| `mix` | Overall strength of the reflection | `1` |
| `sharpMix` | Strength of the sharp reflection on smooth surfaces | `1` |
| `sharpDepthScale` | Sharp reflection can be faded out by depth – distance from the reflective surface. `0` turns the fade off | `1` |
| `sharpDepthBias` | Sharp reflection depth falloff bias | `0` |
| `sharpDepthEdgeMin` | Sharp reflection depth falloff start | `0` |
| `sharpDepthEdgeMax` | Sharp reflection depth falloff end | `0.2` |
| `blurMixSmooth` | Strength of the blurred reflection on smooth surfaces | `1` |
| `blurMixRough` | Strength of the blurred reflection on rough surfaces | `1` |
| `blurDepthScale` | Blurred reflection can spread out by depth – distance from the reflective surface. `0` turns the spread off | `1` |
| `blurDepthBias` | Blurred reflection depth spread bias | `0` |
| `blurDepthEdgeMin` | Blurred reflection depth spread start | `0` |
| `blurDepthEdgeMax` | Blurred reflection depth spread end | `0.2` |
| `blurSize` | Size of the blur. If `[number, number]`, first number is width, second is height | `[0, 0]` |
| `distortionMap` | Texture for offsetting the reflection | `undefined` |
| `distortion` | Influence of `distortionMap` | `0` |
| `reflectorOffset` | Offsets the reflection | `0` |

The component renders a depth texture and runs the blur pass every frame. A depth scale of `0` turns off the effect in the shader, but not the render work.

The component does not support `reversedDepthBuffer`. It logs a warning and renders no reflection.

Additionally, the component extends `THREE.MeshStandardMaterial` and accepts all the same props including `color`, `roughness`, `metalness`, `map`, `normalMap`, `roughnessMap`, `metalnessMap`, and more.

## WebGPU

Import `MeshReflectionMaterial` from `@tresjs/cientos/webgpu` on a `TresCanvas` from `@tresjs/core/webgpu`. That version extends `MeshStandardNodeMaterial`, renders into a generic `RenderTarget` and has the same props. See [WebGPU](/getting-started/webgpu).

On WebGPU, `blurSize`, the depth scales and `distortionMap` are uniforms, so switching them on or off does not recompile the shader. A change to a texture map, such as `normalMap` or `roughnessMap`, still recompiles it. The material does not remount in either case.
