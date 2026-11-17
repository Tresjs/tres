---
title: Film
description: Add animated film grain.
---

::DocsDemo
  ::WebgpuFilm
  ::
::

`Film` adds animated noise to the image, like film grain. It wraps three's `FilmNode`.

It is an **LDR** effect. It runs after tone mapping, so the grain looks the same with every tone mapping.

## Usage

The grain moves with time, so it only animates while the canvas renders. Use `render-mode="always"`, or invalidate the canvas each frame.

```vue
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core/webgpu'
import { EffectComposer, Film } from '@tresjs/post-processing/webgpu'
</script>

<template>
  <TresCanvas render-mode="always">
    <!-- Your scene -->

    <EffectComposer>
      <Film :intensity="0.5" />
    </EffectComposer>
  </TresCanvas>
</template>
```

## Props

| Prop        | Description                                                   | Default |
| ----------- | ------------------------------------------------------------- | ------- |
| `intensity` | The mix between the input and the grained image. Range is [0, 1]. | `1`     |

## Differences from the WebGL components

There is no `Film` in the root entry. The closest effect is `NoisePmndrs`.

Three's `FilmNode` also takes a `uv` node for custom grain coordinates. `Film` does not expose it, because a prop holds a value, not a node. To use it, write your own effect with [`defineEffect`](/api/webgpu#defineeffect).
