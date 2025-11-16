---
title: Screen Quad
description: A triangle that fills the screen for full-screen fragment shader work.
---

# ScreenQuad

::SceneWrapper
  ::ShapesScreenQuad
  ::
::

A triangle that fills the screen when using a THREE.OrthographicCamera. Useful for full-screen fragment shader work.

## Usage

```vue
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { ScreenQuad } from '@tresjs/cientos'
</script>

<template>
  <TresCanvas>
    <TresOrthographicCamera />
     <ScreenQuad>
        <TresMeshToonMaterial color="orange" />
      </ScreenQuad>
  </TresCanvas>
</template>
```

## References

* [Why a triangle?](https://www.cginternals.com/en/blog/2018-01-10-screen-aligned-quads-and-triangles.html)
* [Simple postprocessing in THREE.js](https://luruke.medium.com/simple-postprocessing-in-three-js-91936ecadfb7)