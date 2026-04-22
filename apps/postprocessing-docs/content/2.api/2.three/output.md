---
title: Output
description: Final pass for sRGB color space conversion and tone mapping.
---

The `<Output />` is usually the last pass in the chain and performs sRGB color space conversion and tone mapping.

## Usage

```vue
<script setup lang="ts">
import { EffectComposer, Output } from '@tresjs/post-processing'
</script>

<template>
  <TresCanvas>
    <!-- Your scene -->

    <Suspense>
      <EffectComposer>
        <!-- other passes -->
        <Output />
      </EffectComposer>
    </Suspense>
  </TresCanvas>
</template>
```

## Further Reading

See the [Three.js docs](https://threejs.org/docs/#manual/en/introduction/How-to-use-post-processing).
