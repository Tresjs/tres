<!-- eslint-disable no-console -->
<script setup lang="ts">
import { useLoop } from '@tresjs/core'

/* const { invalidate } = useTres() */

const sphereRef = ref()
useLoop((state) => {
  if (!sphereRef.value) { return }
  sphereRef.value.position.y += Math.sin(state.elapsed) * 0.01
})
/* useLoop(() => {
  console.count('before renderer')
}, -1)

useLoop(() => {
  console.count('after renderer')
}, 2)

useLoop((state) => {
  if (!sphereRef.value) { return }
  console.log('this should be just before render')
  sphereRef.value.position.y += Math.sin(state.elapsed) * 0.01
})

useLoop(({ ctx }) => {
  console.log('this should replace the renderer', ctx)
  ctx.renderer.value.render(ctx.scene.value, ctx.camera.value)
}, 1) */
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
