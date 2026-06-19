---
title: TresPortal
description: Reparent declarative children into any Object3D or Scene target.
---

# TresPortal

`<TresPortal>` reparents its declarative children into a target `Object3D` (often a separate `Scene`) instead of the surrounding scene graph. It is a thin wrapper over Vue's built-in `<Teleport>`, so children remain fully reactive — adding, removing, or updating them works as usual.

It is the building block behind [`MeshPortalMaterial`](https://cientos.tresjs.org) in `@tresjs/cientos`.

::examples-portal
::

## Usage

```vue
<script setup lang="ts">
import { TresCanvas, TresPortal } from '@tresjs/core'
import { Scene } from 'three'

const target = new Scene()
</script>

<template>
  <TresCanvas>
    <TresPortal :to="target">
      <TresMesh>
        <TresBoxGeometry />
        <TresMeshNormalMaterial />
      </TresMesh>
    </TresPortal>
  </TresCanvas>
</template>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `to` | `Object3D` | — | Target object/scene to reparent children into. Required. |
| `disabled` | `boolean` | `false` | When `true`, children render in place (main scene). |

::note
Reparenting is **structural** only. Children's `useTres().scene` still resolves to the main scene (Vue slot ownership), so scene-context helpers like `Environment` declared inside a portal affect the main scene. Rendering the target scene (e.g. to a texture) is the consumer's responsibility — `MeshPortalMaterial` does this via an FBO.
::
