---
title: Mesh Discard Material
description: Hides the object it's attached to while keeping shadows and children visible.
---

`<MeshDiscardMaterial />` hides the object it's attached to. The object's shadows and children will be rendered.

## Usage

```vue{3,11}
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { MeshDiscardMaterial } from '@tresjs/cientos'
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera />
    <TresMesh>
      <TresBoxGeometry />
      <MeshDiscardMaterial />
    </TresMesh>
  </TresCanvas>
</template>
```

## WebGPU

Import `MeshDiscardMaterial` from `@tresjs/cientos/webgpu` on a `TresCanvas` from `@tresjs/core/webgpu`. That version extends `NodeMaterial` and works the same way: the object is hidden, and its shadows and children are rendered. See [WebGPU](/getting-started/webgpu).

```ts
import { MeshDiscardMaterial } from '@tresjs/cientos/webgpu'
```
