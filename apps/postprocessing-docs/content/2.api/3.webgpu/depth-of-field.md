---
title: Depth of Field
description: Blur the scene in front of and behind the focus distance.
---

::DocsDemo
  ::WebgpuDepthOfField
  ::
::

`DepthOfField` blurs the parts of the scene that are far from the focal plane, like a camera lens. It wraps three's `DepthOfFieldNode`.

It reads the depth of the scene pass, so it needs no extra setup. It is an **HDR** effect, so bright areas make bright bokeh.

## Usage

```vue
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core/webgpu'
import { DepthOfField, EffectComposer } from '@tresjs/post-processing/webgpu'
</script>

<template>
  <TresCanvas>
    <!-- Your scene -->

    <EffectComposer>
      <DepthOfField :focus-distance="6.5" :focal-length="3" :bokeh-scale="4" />
    </EffectComposer>
  </TresCanvas>
</template>
```

## Props

All distances are in world units.

| Prop            | Description                                                                                  | Default |
| --------------- | -------------------------------------------------------------------------------------------- | ------- |
| `focusDistance` | The distance from the camera to the focal plane.                                             | `1`     |
| `focalLength`   | How far an object can be from the focal plane before it is fully out of focus.               | `1`     |
| `bokehScale`    | The size of the bokeh.                                                                       | `1`     |

## Differences from DepthOfFieldPmndrs

`DepthOfField` exposes the parameters of three's `dof()` function. They are in world units.

| `DepthOfFieldPmndrs`                            | `DepthOfField`                                                                                       |
| ----------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `worldFocusDistance`                            | `focusDistance`                                                                                      |
| `worldFocusRange`                               | `focalLength`                                                                                        |
| `bokehScale`                                    | `bokehScale`                                                                                         |
| `focusDistance`, `focusRange`                   | Not available. They are in normalized depth, from 0 to 1. `DepthOfFieldNode` only takes world units. |
| `resolutionScale`, `resolutionX`, `resolutionY` | Not available. `DepthOfFieldNode` always blurs at half resolution.                                   |
| `blendFunction`                                 | Not available. The WebGPU family has no blend functions. See [Blending](/api/webgpu#blending).       |

## Further Reading

See the [three.js example](https://threejs.org/examples/?q=dof#webgpu_postprocessing_dof).
