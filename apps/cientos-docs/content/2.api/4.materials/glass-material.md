---
title: Mesh Glass Material
description: Makes a geometry look like glass by re-defining the MeshPhysicalMaterial.
---

::SceneWrapper
  ::MaterialsGlassMaterial
  ::
::

The `cientos` package provides a new`<MeshGlassMaterial />` component that makes a geometry look like glass. This is achieved by re-defining the `MeshPhysicalMaterial`.

## Usage

### You can use it like you normally do with TresJs

```vue{2,10}
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { MeshGlassMaterial } from '@tresjs/cientos'
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera :position="[3, 3, 3]" :look-at="[0, 0, 0]" />
    <TresMesh>
      <TresTorusGeometry />
      <MeshGlassMaterial />
    </TresMesh>
    <TresAmbientLight />
    <TresDirectionalLight :position="[0, 2, 4]" />
  </TresCanvas>
</template>
```

## WebGPU

Import `MeshGlassMaterial` from `@tresjs/cientos/webgpu` on a `TresCanvas` from `@tresjs/core/webgpu`. That version is a `MeshPhysicalNodeMaterial` with the same glass values, and it takes the same props. See [WebGPU](/getting-started/webgpu).

```ts
import { MeshGlassMaterial } from '@tresjs/cientos/webgpu'
```

The version from the root entry renders as a plain standard material under `WebGPURenderer`, without transmission.

## Props

No props are required. Both versions accept `THREE.MeshStandardMaterial` props together with the glass-related clearcoat, IOR, transmission, attenuation and specular props. They start with these glass values: `roughness` 0, `clearcoat` 0.5, `transmission` 1 and `thickness` 0.5.

### You can also replace the material of an existing mesh like this:

```vue{4,6-15,20}
<script setup lang="ts">
import { ref, shallowRef, watch } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { MeshGlassMaterial, Box } from '@tresjs/cientos'

const glassMaterialRef = shallowRef()
const boxRef = shallowRef()

watch(glassMaterialRef, value => {
  // For good practice we dispose the old material
  boxRef.value.instance.material.dispose()

  // We assign the new MeshGlassMaterialClass
  boxRef.value.instance.material = value.MeshGlassMaterialClass
})
</script>
<template>
  <TresMesh>
    <TresTorusGeometry />
    <MeshGlassMaterial ref="glassMaterialRef" />
  </TresMesh>
  <!-- Mesh to be replaced -->
  <TresMesh ref="boxRef">
    <TresBoxGeometry />
    <MeshBasicMaterial  />
  </TresMesh>
</template>
```
## Tips

- For more fine tuning effects you can provide an environment map texture as an envMap and play with the intensity to achieve a more realistic effect

- Another good option is to provide a normal texture as clearcoatNormalMap to add different results
