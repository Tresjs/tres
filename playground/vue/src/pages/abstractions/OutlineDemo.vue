<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, Outline } from '@tresjs/cientos'

const thickness = shallowRef(1)
const color = shallowRef('black')
let elapsed = 0
let intervalId: ReturnType<typeof setInterval>
onMounted(() => {
  intervalId = setInterval(() => {
    elapsed += 0.01 * 1000 / 30
    thickness.value = (1 + Math.sin(elapsed)) * 5

    color.value = Math.cos(elapsed) > 0 ? 'blue' : 'orange'
  }, 1000 / 30)
})

onUnmounted(() => clearInterval(intervalId))
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera :position="[0, 0, 10]" />
    <OrbitControls />
    <TresMesh>
      <TresTorusKnotGeometry />
      <TresMeshBasicMaterial />
      <Outline :thickness="thickness" :color="color" />
    </TresMesh>
  </TresCanvas>
</template>
