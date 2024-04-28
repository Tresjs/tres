<!-- eslint-disable no-console -->
<script setup lang="ts">
import { useFrame } from '@tresjs/core'

const sphereRef = ref()
const { pause, isActive, resume } = useFrame((state) => {
  if (!sphereRef.value) { return }
  sphereRef.value.position.y += Math.sin(state.elapsed) * 0.01
})

function onSphereClick() {
  console.log('sphere clicked', { isActive })

  if (isActive.value) {
    pause()
  }
  else {
    resume()
  }
}
/* useFrame(() => {
  console.count('before renderer')
}, -1)

useFrame(() => {
  console.log('this should be just before render')
}, 1)

useFrame((state) => {
  if (!sphereRef.value) { return }
  console.count('after renderer')
  sphereRef.value.position.y += Math.sin(state.elapsed) * 0.01
}, 2) */
</script>

<template>
  <TresMesh
    ref="sphereRef"
    :position="[2, 2, 0]"
    name="sphere"
    cast-shadow
    @click="onSphereClick"
  >
    <TresSphereGeometry />
    <TresMeshToonMaterial color="#FBB03B" />
  </TresMesh>
</template>
