---
title: ScreenSpace
description: Position objects in front of the camera with CSS-like positioning.
---

::SceneWrapper
  ::AbstractionsScreenSpace
  ::
::

`<ScreenSpace />` wraps its children in a `<TresGroup />` and positions them in front of the active camera at `:depth`.

Additionally, the `top`, `bottom`, `left`, `right` props can be used to position them similarly to CSS `position: absolute` property when using a `PerspectiveCamera` or an `OrtographicCamera`.

## Usage

```vue{2,11,16}
<script setup lang="ts">
import { OrbitControls, ScreenSpace } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <TresCanvas clear-color="#333">
    <TresPerspectiveCamera />
    <OrbitControls />

    <ScreenSpace :depth="5">
      <TresMesh>
        <TresTorusGeometry />
        <TresMeshNormalMaterial />
      </TresMesh>
    </ScreenSpace>

    <TresGridHelper :args="[10, 10]" />
  </TresCanvas>
</template>

```

## Props

| Prop     | Description                                                 | Default                                 |
| :------- | :---------------------------------------------------------- | --------------------------------------- |
| `depth`  | Distance from the camera                                    | `-1`                                    |
| `top`    | Similar to CSS `top` property. Cannot be used with `bottom` | `0.5` (vertical center of the screen)   |
| `bottom` | Similar to CSS `bottom` property. Cannot be used with `top` |                                         |
| `left`   | Similar to CSS `left` property. Cannot be used with `right` | `0.5` (horizontal center of the screen) |
| `right`  | Similar to CSS `right` property. Cannot be used with `left` |                                         |
