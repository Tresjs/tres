<script setup lang="ts">
import { Vector3 } from 'three'
const { onBeforeRender } = useLoop()

onBeforeRender(({ elapsed, camera }) => {
  if (!camera.value) { return }
  camera.value.position.lerp(new Vector3().set(Math.sin(elapsed / 5), 0, 12 + Math.cos(elapsed / 5) / 2), 0.05)
  camera.value.lookAt(0, 0, 0)
})
</script>

<template>
  <TresPerspectiveCamera :position="[5, 2, 15]" :look-at="[0, 0, 0]" :fov="30" />
</template>