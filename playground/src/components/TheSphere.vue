<!-- eslint-disable no-console -->
<script setup lang="ts">
import { useLoop } from '@tresjs/core'

/* const { invalidate } = useTres() */

const sphereRef = ref()

/* useLoop(() => {
  console.log('before renderer')
}, -1)

useLoop(() => {
  console.log('after renderer')
}, 1) */

useLoop((state) => {
  if (!sphereRef.value) { return }
  console.log('state', state)
  sphereRef.value.position.y += Math.sin(state.elapsed) * 0.01
})
</script>

<template>
  <TresMesh
    ref="sphereRef"
    :position="[2, 2, 0]"
    name="sphere"
    cast-shadow
  >
    <TresSphereGeometry />
    <TresMeshToonMaterial color="#FBB03B" />
  </TresMesh>
</template>
