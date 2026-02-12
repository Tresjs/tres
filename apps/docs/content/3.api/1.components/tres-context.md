---
title: <Context />
description: Internal context component used by TresCanvas for advanced setups.
---

## Component Overview

`<Context />` is the internal component that powers `<TresCanvas />`. It mounts the TresJS renderer and scene using a **provided canvas element** instead of creating one for you.

::note
This component is exported for advanced use cases only. In most apps you should keep using `<TresCanvas />`.
::

## When to Use It

Use `<Context />` only if you already own the WebGL canvas (or must integrate with a host framework that provides one) and you still want TresJS to manage the Three.js scene, render loop, and events.

## Usage

```vue [app.vue]
<script setup lang="ts">
import { ref } from 'vue'
import { Context } from '@tresjs/core'

const canvasRef = ref<HTMLCanvasElement>()
</script>

<template>
  <canvas ref="canvasRef" class="w-full h-full">
    <Context v-if="canvasRef" :canvas="canvasRef">
      <TresPerspectiveCamera :position="[3, 3, 3]" />
      <!-- Your scene content here -->
    </Context>
  </canvas>
</template>
```

## Notes

- You must pass a valid `canvas` element.
- Canvas sizing and styling are **your** responsibility.
- Props and events match `<TresCanvas />`, so you can reuse the same API surface.
