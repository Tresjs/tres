<script setup lang="ts">
import { useRender } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'

useRender(({ renderer, scene, camera }) => {
  /* console.log('this should replace the renderer', renderer.value) */
  renderer.value.render(scene.value, camera.value)
})
</script>

<template>
  <TresPerspectiveCamera :position="[3, 3, 3]" />
  <OrbitControls />
  <AnimatedObjectUseFrame />
  <TresAmbientLight :intensity="1" />
  <TresGridHelper />
</template>
