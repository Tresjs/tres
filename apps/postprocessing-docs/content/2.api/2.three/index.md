---
title: Three Native Effects
description: Native Three.js post-processing effects.
---

Native Three.js effects are composed inside `<EffectComposer>`. They include the canonical passes shipped with Three.js itself (Unreal Bloom, Halftone, Glitch, Output, SMAA, Pixelation).

```vue
<script setup lang="ts">
import { EffectComposer, UnrealBloom } from '@tresjs/post-processing'
</script>

<template>
  <TresCanvas>
    <Suspense>
      <EffectComposer>
        <UnrealBloom />
      </EffectComposer>
    </Suspense>
  </TresCanvas>
</template>
```
