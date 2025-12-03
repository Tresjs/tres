---
title: Sampler
description: Distribute instances on mesh surfaces using MeshSurfaceSampler.
---

::SceneWrapper
  ::AbstractionsSampler
  ::
::

Declarative abstraction around MeshSurfaceSampler & InstancedMesh. It samples points from the passed mesh and transforms an InstancedMesh's matrix to distribute instances on the points.

::UAlert{type="warning" description="Available in version 3.7.0 and above"}
::

## Usage

```vue{2,11-20}
<script setup lang="ts">
import { OrbitControls, Sampler } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <TresCanvas clear-color="#82DBC5">
    <TresPerspectiveCamera :position="[0, 0.5, 5]" />
    <OrbitControls />

    <Sampler :count="50">
      <TresMesh>
        <TresTorusGeometry />
      </TresMesh>

      <TresInstancedMesh :args="[null!, null!, 1000]">
        <TresBoxGeometry :args="[0.1, 0.1, 0.1]" />
        <TresMeshNormalMaterial />
      </TresInstancedMesh>
    </Sampler>
    <TresGridHelper :args="[10, 10]" />
  </TresCanvas>
</template>

```

## Props

| Props        | Description                                                        |
|--------------|--------------------------------------------------------------------|
| mesh         | **Mesh** Surface mesh from which to sample                         |
| count        | **Number** Number of samples                                       |
| instanceMesh | **InstanceMesh** InstanceMesh to scatter                           |
| weight       | **String** A vertex attribute to be used as a weight when sampling |
| transform    | **Function** A function that can be used as a custom sampling      |


## useSurfaceSampler

A hook to obtain the result of the <Sampler /> as a buffer. Useful for driving anything other than InstancedMesh via the Sampler.

```vue{2,10}
<script setup lang="ts">
import { OrbitControls, useSurfaceSampler } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { ref, watch } from 'vue'

const torusRef = ref()
const instancesRef = ref()

watch(torusRef, (value) => {
  useSurfaceSampler(value, 50, instancesRef.value, 'color')
})
</script>

<template>
  <TresCanvas clear-color="#82DBC5">
    <TresPerspectiveCamera :position="[0, 0.5, 5]" />
    <OrbitControls />

    <TresMesh ref="torusRef">
      <TresTorusGeometry />
    </TresMesh>

    <TresInstancedMesh
      ref="instancesRef"
      :args="[null!, null!, 1_000]"
    >
      <TresSphereGeometry :args="[0.1, 32, 32]" />
      <TresMeshNormalMaterial />
    </TresInstancedMesh>

    <TresGridHelper :args="[10, 10]" />
  </TresCanvas>
</template>
```