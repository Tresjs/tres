---
title: Mesh Reflection Material
description: Makes floors or walls that reflect the objects in your Scene.
---

::SceneWrapper
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
| `sharpDepthScale` | Sharp reflection can be faded out by depth – distance from the reflective surface. Performance note: if the value is greater than `0`, a depth texture will be created | `1` |
| `sharpDepthBias` | Sharp reflection depth falloff bias | `0` |
| `sharpDepthEdgeMin` | Sharp reflection depth falloff start | `0` |
| `sharpDepthEdgeMax` | Sharp reflection depth falloff end | `0.2` |
| `blurMixSmooth` | Strength of the blurred reflection on smooth surfaces | `1` |
| `blurMixRough` | Strength of the blurred reflection on rough surfaces | `1` |
| `blurDepthScale` | Blurred reflection can spread out by depth – distance from the reflective surface. Performance note: if the value is greater than `0`, depth texture will be rendered | `1` |
| `blurDepthBias` | Blurred reflection depth spread bias | `0` |
| `blurDepthEdgeMin` | Blurred reflection depth spread start | `0` |
| `blurDepthEdgeMax` | Blurred reflection depth spread end | `0.2` |
| `blurSize` | Size of the blur. If `[number, number]`, first number is width, second is height. Performance note: if other than `[0, 0]` or `0`, a blur texture will be rendered | `[0, 0]` |
| `distortionMap` | Texture for offsetting the reflection | `undefined` |
| `distortion` | Influence of `distortionMap` | `0` |
| `reflectorOffset` | Offsets the reflection | `0` |

Additionally, the component extends `THREE.MeshStandardMaterial` and accepts all the same props including `color`, `roughness`, `metalness`, `map`, `normalMap`, `roughnessMap`, `metalnessMap`, and more.
