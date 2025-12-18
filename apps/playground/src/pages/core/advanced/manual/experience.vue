<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { useTres } from '@tresjs/core'
import BlenderCube from '@/components/BlenderCube.vue'

const { advance } = useTres()

onMounted(() => {
  advance()
})
</script>

<template>
  <TresPerspectiveCamera
    :position="[5, 5, 5]"
    :look-at="[0, 0, 0]"
  />
  <BlenderCube @ready="advance" />

  <TresGridHelper />
  <OrbitControls @change="advance" />
  <TresAmbientLight :intensity="1" />
  <TresDirectionalLight
    :position="[0, 8, 4]"
    :intensity="0.7"
  />
</template>
