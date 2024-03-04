```vue
<script setup lang="ts">
import { shallowRef, watch } from 'vue'

const sphereRef = shallowRef()

watch(sphereRef, (value) => {
  console.log(value) // Really for a log?!!! 😫
})
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera :position="[0, 2, 5]" />
    <Sphere
      ref="sphereRef"
      :scale="0.5"
    />
    <OrbitControls />
  </TresCanvas>
</template>
```
