<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { useTres } from '@tresjs/core'
import BlenderCube from '../../../components/BlenderCube.vue'

const { renderer } = useTres()

onMounted(() => {
  renderer.advance()
})
</script>

<template>
  <TresPerspectiveCamera
    :position="[5, 5, 5]"
    :look-at="[0, 0, 0]"
  />
  <BlenderCube />

  <TresGridHelper />
  <OrbitControls @change="renderer.advance" />
  <TresAmbientLight :intensity="1" />
  <TresDirectionalLight
    :position="[0, 8, 4]"
    :intensity="0.7"
  />
</template>
