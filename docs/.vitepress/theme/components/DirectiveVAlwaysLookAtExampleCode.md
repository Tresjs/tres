```vue{4,6,20,23}
<script setup lang="ts">
import { shallowRef } from 'vue'
import { TresCanvas, useRenderLoop } from '@tresjs/core'
import { Box, vAlwaysLookAt } from '@tresjs/cientos'

const sphereRef = shallowRef()

const { onLoop } = useRenderLoop()

// here we update the position of the sphere and the camera will always follow the object
onLoop(({ elapsed }) => {
  if (sphereRef.value) {
    sphereRef.value.value.position.y = Math.sin(elapsed) * 1.5
  }
})
</script>
<template>
    <TresCanvas >
      <TresPerspectiveCamera :position="[0, 2, 5]"
        v-always-look-at="sphereRef"
      />
      <Sphere
        ref="sphereRef"
        :scale="0.5"
      />
  </TresCanvas>
</template>
```
