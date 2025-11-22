---
title: Levioso (Float)
description: Make content float like magic with smooth animations.
---

# Levioso (Float)

::SceneWrapper
  ::AbstractionsLevioso
  ::
::

![Leviosa](https://media.giphy.com/media/HaCFT5ghY6L1m/giphy.gif)

The `cientos` package provides a `<Levioso />` wrapper that makes its content … float, just like Magic 🪄✨

## Usage

```vue{3,11,13}
<script setup lang="ts">
import { TresCanvas } from "@tresjs/core";
import { Levioso, OrbitControls, Box } from "@tresjs/cientos";

</script>

<template>
  <TresCanvas :clear-color="0x82dbc5">
    <TresPerspectiveCamera :position="[0, 0, 5]" :look-at="[0, 0, 0]" />
    <OrbitControls />
    <Levioso :speed="4">
      <Box />
    </Levioso>
    <TresAmbientLight :intensity="1" />
    <TresDirectionalLight :intensity="1" :position="[2, 2, 2]" />
    <TresGridHelper :position="[0, -1, 0]" />
  </TresCanvas>
</template>

```

## Props

| Prop             | Description                                          | Default       |
| :--------------- | :--------------------------------------------------- | ------------- |
| `speed`          | Floating speed, higher it rocks more 🤘.              | `1`           |
| `rotationFactor` | Factor for Euler rotation.                           | `1`           |
| `floatFactor`    | Factor for Up/down movement.                         | `1`           |
| `range`          | Range of y-axis values the object will float within. | `[-0.1, 0.1]` |
