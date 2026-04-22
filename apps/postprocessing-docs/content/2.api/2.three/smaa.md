---
title: SMAA
description: Subpixel Morphological Antialiasing for smooth edges.
---

::DocsDemo
  ::ThreeSmaa
  ::
::

SMAA (Subpixel Morphological Antialiasing) is an antialiasing technique that aims to reduce the visual defects that occur when high-frequency detail is displayed on a lower-resolution screen. This effect can be used to smooth out jagged edges in your 3D scenes.

## Usage

```vue
<script setup lang="ts">
import { EffectComposer, SMAA } from '@tresjs/post-processing'
</script>

<template>
  <TresCanvas>
    <!-- Your scene -->

    <Suspense>
      <EffectComposer>
        <SMAA :width="1024" :height="768" />
      </EffectComposer>
    </Suspense>
  </TresCanvas>
</template>
```

## Props

| Prop     | Description                                                                                  | Default                               |
| -------- | -------------------------------------------------------------------------------------------- | ------------------------------------- |
| `width`  | The width of the render target. If not provided, defaults to the width of the renderer.      |                                       |
| `height` | The height of the render target. If not provided, defaults to the height of the renderer.    |                                       |

## Further Reading

See the [Three.js example](https://threejs.org/examples/?q=smaa#webgl_postprocessing_smaa).
