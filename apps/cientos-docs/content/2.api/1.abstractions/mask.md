---
title: Mask
description: Cut out areas of the screen using the stencil buffer.
---

::SceneControlsWrapper
  ::AbstractionsMask
  ::
::

`<Mask/>` uses the stencil buffer to cut out areas of the screen.

::prose-warning
To use `<Mask />` you *must* add `:stencil="true"` to your `<TresCanvas />`.

`<Mask />` relies on the [`stencil buffer`](https://threejs.org/docs/#api/en/renderers/WebGLRenderer). In recent versions of THREE.js, by default, the stencil buffer is not created.
::

## Usage

```vue{2, 16-19}
<script setup lang="ts">
import { Mask, OrbitControls, useMask } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <TresCanvas :stencil="true" clear-color="#4f4f4f">
    <TresPerspectiveCamera />
    <OrbitControls />

    <TresGroup :scale="2">
      <TresMesh>
        <TresRingGeometry :args="[0.95, 1, 64]" />
        <TresMeshBasicMaterial color="white" />
      </TresMesh>
      <Mask :id="1">
        <TresCircleGeometry />
        <TresMeshBasicMaterial color="#fbb03b" />
      </Mask>
    </TresGroup>

    <TresMesh :position-z="-1">
      <TresBoxGeometry />
      <TresMeshNormalMaterial v-bind="useMask(1)" />
    </TresMesh>

    <TresMesh :position-z="-3">
      <TresBoxGeometry />
      <TresMeshNormalMaterial v-bind="useMask(1)" />
    </TresMesh>

    <TresMesh :position-z="-5">
      <TresBoxGeometry />
      <TresMeshNormalMaterial />
    </TresMesh>
  </TresCanvas>
</template>

```

## Props

| Prop           | Description                                                                                                                                                            | Default              |
| :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| **`id`**    | Id of the stencil buffer to use. Each mask must have a `number` id. Multiple masks can refer to the same id. | |
| **`colorWrite`** | Whether the colors of the mask's own material will leak through. | `false` |
| **`depthWrite`** | Whether the depth of the mask's own material will leak through. | `false` |

## useMask

Composable that returns the stencil configuration to apply a mask to a material. Use it with `v-bind` on materials that should be affected by the mask.

**Parameters:**
- `id` - The mask id to use (number or Ref)
- `inverse` - Whether to invert the mask (boolean or Ref), defaults to `false`

```vue
<TresMeshNormalMaterial v-bind="useMask(1)" />
```
