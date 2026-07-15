---
title: Pmndrs Effects
description: Effects powered by pmndrs/postprocessing.
---

Pmndrs effects wrap the excellent [pmndrs/postprocessing](https://github.com/pmndrs/postprocessing) library. They are composed inside `<EffectComposerPmndrs>` and use the `Pmndrs` suffix to distinguish them from native Three.js effects.

```vue
<script setup lang="ts">
import { BloomPmndrs, EffectComposerPmndrs } from '@tresjs/post-processing'
</script>

<template>
  <TresCanvas>
    <Suspense>
      <EffectComposerPmndrs>
        <BloomPmndrs />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>
```
