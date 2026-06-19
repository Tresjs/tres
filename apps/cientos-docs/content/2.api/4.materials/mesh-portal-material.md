---
title: Mesh Portal Material
description: Render a separate child scene into a portal surface, perspective-correct and masked by the mesh. Ported from drei.
---

::SceneControlsWrapper
  ::MaterialsMeshPortalMaterial
  ::
::

The `cientos` package provides a `<MeshPortalMaterial />` component that renders its
declarative children into a private off-main scene and projects that scene onto the
host mesh as a perspective-correct window.

Children declared inside the component render into the **portal scene**, not the main
scene. The portal scene is rendered to a frame buffer each frame using the active
camera, so contents sit in world-space (move the camera and you get parallax through
the surface, not a flat decal). The mesh geometry masks the result, and `blend`
cross-fades between the world (`0`) and the portal (`1`).

::prose-note
This component is a port of the [drei MeshPortalMaterial](https://drei.docs.pmnd.rs/portals/mesh-portal-material){target="_blank"}. All credit goes to the original authors.
::

## Usage

```vue
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { MeshPortalMaterial, OrbitControls } from '@tresjs/cientos'
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera :position="[0, 0, 6]" />
    <OrbitControls />
    <TresMesh>
      <TresPlaneGeometry :args="[3, 4]" />
      <MeshPortalMaterial :blend="0">
        <!-- children render INTO the portal scene -->
        <TresAmbientLight :intensity="0.5" />
        <TresMesh :position="[0, 0, -1]">
          <TresTorusKnotGeometry :args="[0.6, 0.25, 128, 32]" />
          <TresMeshStandardMaterial color="#fbb03b" />
        </TresMesh>
      </MeshPortalMaterial>
    </TresMesh>
  </TresCanvas>
</template>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `blend` | `number` | `0` | `0` = world only, `1` = portal only; cross-fades between. |
| `resolution` | `number` | `512` | Frame buffer resolution for the portal render. |
| `worldUnits` | `boolean` | `false` | Keep portal contents in world units instead of host-relative. |
| `renderPriority` | `number` | `0` | Render-loop priority for the blend takeover. Applied at mount — changing it later requires a remount. |

::prose-note
**Limitations (MVP):** `blur` (edge fade) and pointer-event forwarding into the
portal scene are not yet implemented. Scene-context helpers such as `Environment`
declared inside the portal currently affect the main scene, not the portal scene.
WebGPU is not yet supported.
::
