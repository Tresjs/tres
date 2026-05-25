<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { Vector3 } from 'three'

const { onBeforeRender } = useLoop()

// Zoom the camera out on smaller viewports so the car stays fully framed
const breakpoints = useBreakpoints(breakpointsTailwind)
const cameraDistance = computed(() => {
  if (breakpoints.smaller('sm').value) { return 25 }
  if (breakpoints.smaller('md').value) { return 20 }
  if (breakpoints.smaller('lg').value) { return 14 }
  return 25
})

const target = new Vector3()

onBeforeRender(({ elapsed, camera }) => {
  if (!camera.value) { return }
  target.set(Math.sin(elapsed / 5), 0, cameraDistance.value + Math.cos(elapsed / 5) / 2)
  camera.value.position.lerp(target, 0.05)
  camera.value.lookAt(0, 0, 0)
})
</script>

<template>
  <TresPerspectiveCamera :position="[5, 2, 15]" :look-at="[0, 0, 0]" :fov="30" />
</template>