---
title: Helper
description: Handles instantiation, updates, and removal/disposal of THREE Helpers.
---

::SceneWrapper
  ::DebugPerformanceHelper
  ::
::

`<Helper />` handles instantiation, updates, and removal/disposal of THREE Helpers.

## Usage

```vue{3, 13}
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { Helper } from '@tresjs/cientos'
import { BoxHelper } from 'three'
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera :position="[3, 3, 3]" />
    <TresMesh ref="boxRef">
      <TresBoxGeometry />
      <TresMeshNormalMaterial />
      <Helper :type="BoxHelper" :args="[0xff0000]" />
    </TresMesh>
    <TresAmbientLight />
  </TresCanvas>
</template>
```

## Props

| Prop                | Description                                                                                   | Default     |
| :------------------ | :-------------------------------------------------------------------------------------------- | ----------- |
| **type**         | Helper constructor - required |       |
| **args**         | Helper constructor args | `[]` |
