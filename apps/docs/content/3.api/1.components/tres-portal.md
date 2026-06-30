---
title: TresPortal
description: Reparent declarative children into any Object3D or Scene target.
---

# TresPortal

`<TresPortal>` reparents its declarative children into a target `Object3D` (often a separate `Scene`) instead of the surrounding scene graph. It is a thin wrapper over Vue's built-in `<Teleport>`, so children remain fully reactive — adding, removing, or updating them works as usual.

It is the building block behind [`MeshPortalMaterial`](https://cientos.tresjs.org/api/materials/mesh-portal-material) in `@tresjs/cientos`.

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
`<TresPortal>` only handles **structural** reparenting — children are added to the target via `nodeOps`, and the target is also where `attach` resolves. So `<TresColor attach="background" />` or `<primitive :object="tex" attach="environment" />` inside a portal set the **target** scene's properties.

By itself it does **not** override the injected scene context: children's `useTres().scene` still returns the main scene, so imperative helpers like the cientos `<Environment>` component would target the main scene. A consumer can add this by `provide()`-ing a context whose `scene` is the target — `provide`/`inject` follows the mounted tree, so it reaches the portal's slot children through the `<Teleport>`. `MeshPortalMaterial` does exactly this, which is why `<Environment>` works inside it. Rendering the target scene (e.g. to a texture) is also the consumer's responsibility — `MeshPortalMaterial` does that via an FBO.
::
