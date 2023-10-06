# Stats

[stats.js](https://github.com/mrdoob/stats.js/) is a JavaScript performance monitor, made by [mrdoob](https://github.com/mrdoob). stats.js provides a simple info box that will help you monitor your code performance.

**Cientos** provides a component called `Stats` that creates a panel without effort or configuration in the top left corner where you'll be able to monitor your app.

## Basic usage

```vue{3,8}
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { Stats } from '@tresjs/cientos'
</script>

<template>
  <TresCanvas>
    <Stats />
  </TresCanvas>
</template>
```

## Props

| Prop          | Type     | Default | Description  |
| :------------ | -------- | ------- | ------------ |
| **showPanel** | `number` | `0`     | FPS monitor. |

- 0: FPS Frames rendered in the last second. The higher the number the better.
- 1: MS Milliseconds needed to render a frame. The lower the number the better.
- 2: MB MBytes of allocated memory. (Run Chrome with --enable-precise-memory-info)
- 3+: CUSTOM User-defined panel support. For more info please check [stats.js](https://github.com/mrdoob/stats.js/).