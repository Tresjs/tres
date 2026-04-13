---
title: Custom Shader Material
description: Extends Three.js' material library with your own Vertex and Fragment shaders.
---

::SceneWrapper
  ::MaterialsCustomShaderMaterial
  ::
::

The `cientos` package provides `<TresCustomShaderMaterial />` component which is a wrapper around the [`three-custom-shader-material`](https://github.com/FarazzShaikh/THREE-CustomShaderMaterial) class. As states in the repo, it _"lets you extend Three.js' material library with your own Vertex and Fragment shaders"_.

## Usage

```vue{2,13-27}
<script setup lang="ts">
import { TresCustomShaderMaterial } from '@tresjs/cientos'
import { shallowRef } from 'vue'

const customShaderMaterialRef = shallowRef()
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera :position="[3, 3, 3]" />
    <TresMesh>
      <TresBoxGeometry />
      <TresCustomShaderMaterial
        ref="customShaderMaterialRef"
        :vertex-shader="vertexShader"
        :fragment-shader="fragmentShader"
        :uniforms="{
          u_time: { value: 0 },
          u_color: { value: new THREE.Color(0.2, 0.0, 0.1) },
          u_resolution: { value: new THREE.Vector2() }
        }"
        :transparent="true"
        :side="THREE.DoubleSide"
        base-material="MeshLambertMaterial"
        silent
        :map="texture"
        :color="0xff0000"
      />
    </TresMesh>
    <TresAmbientLight />
  </TresCanvas>
</template>
```

## Props

Being a wrapper around the `CustomShaderMaterial` class, the `<TresCustomShaderMaterial />` component accepts all the props that the class does. You can find the full list of props in the [official repo](https://github.com/FarazzShaikh/THREE-CustomShaderMaterial).
