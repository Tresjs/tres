```vue{3,9}
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { Box, vAlwaysLookAt } from '@tresjs/cientos'
</script>
<template>
    <TresCanvas >
      <TresPerspectiveCamera :position="[0, 2, 5]" />
      <Box
        v-always-look-at="new Vector3(0, 0, 0)"
      />
  </TresCanvas>
</template>
```
