---
title: Pixelation
description: Pixelate the scene for a retro pixel art look.
---

::DocsDemo
  ::ThreePixelation
  ::
::

Pixelation is an effect that pixelates the scene.

## Usage

```vue
<script setup lang="ts">
import { EffectComposer, Pixelation } from '@tresjs/post-processing'
</script>

<template>
  <TresCanvas>
    <!-- Your scene -->

    <Suspense>
      <EffectComposer>
        <Pixelation :pixel-size="8" />
      </EffectComposer>
    </Suspense>
  </TresCanvas>
</template>
```

## Props

| Prop                 | Description                                                                   | Default |
| -------------------- | ----------------------------------------------------------------------------- | ------- |
| `pixelSize`          | The size of the pixels. Larger values result in a more pixelated appearance.  | `30`    |
| `depthEdgeStrength`  | The strength of the depth edges.                                              | `1.0`   |
| `normalEdgeStrength` | The strength of the normal edges.                                             | `0.5`   |

## Further Reading

See the [Three.js example](https://threejs.org/examples/?q=pixe#webgl_postprocessing_pixel).
