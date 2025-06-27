---
title: Tweakpane
description: How to use tweakpane to control your scene
author: alvarosabu
thumbnail: /recipes/tweakpane.png
difficulty: 0
---

# Tweakpane

To make it easier to control the parameters of your scene, you can use [Tweakpane](https://tweakpane.github.io/docs/). In this guide, we will show you how to use Tweakpane to control the parameters of your scene.

<StackBlitzEmbed project-id="tweakpane" />

## Installation

First, you need to install Tweakpane:

```bash
pnpm add tweakpane
```

Additionally install type defs

```bash
$ pnpm add -D @tweakpane/core
```

## Usage

In this example, we will create a simple scene with a cube and use Tweakpane to control background color and the cube material `wireframe` property.

```vue
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { Pane } from 'tweakpane'

import { ref } from 'vue'

const state = reactive({
  clearColor: '#c0ffee',
  wireframe: false
})

const pane = new Pane()

pane.addInput(state, 'clearColor')
pane.addInput(state, 'wireframe')
</script>

<template>
  <TresCanvas :clear-color="state.clearColor">
    <TresMesh>
      <TresBoxGeometry />
      <TresMeshNormalMaterial :wireframe="state.wireframe" />
    </TresMesh>
  </TresCanvas>
</template>
```
