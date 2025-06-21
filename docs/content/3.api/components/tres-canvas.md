---
title: <TresCanvas />
description: The TresCanvas component is the main component for rendering 3D scenes.
---

## Component Overview

TresCanvas creates the necessary Three.js environment and bridges the gap between Vue's reactivity system and Three.js's imperative rendering approach. It is responsible for:

- Creating and configuring the WebGL canvas element
- Setting up the Three.js scene, camera, and renderer
- Establishing the render loop
- Providing the shared context to all child components
- Handling user events through a comprehensive event system
- Managing memory and disposal of Three.js objects

## Usage

```vue [app.vue]
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <TresCanvas shadows>
    <TresPerspectiveCamera :position="[5,5,5]" />
    <!-- Your scene content here -->
  </TresCanvas>
</template>
```
