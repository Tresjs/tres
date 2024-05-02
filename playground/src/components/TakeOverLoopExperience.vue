<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { useControls } from '@tresjs/leches'

/* const { pause, resume } = useRender(({ renderer, scene, camera }) => {
  renderer.value.render(scene.value, camera.value)
}) */

const { isRenderPaused } = useControls({
  isRenderPaused: {
    value: false,
    type: 'boolean',
    label: 'Pause Render',
  },
})

watchEffect(() => {
  if (isRenderPaused.value) {
    pause()
  }
  else {
    resume()
  }
})
</script>

<template>
  <TresPerspectiveCamera :position="[3, 3, 3]" />
  <OrbitControls />
  <AnimatedObjectUseUpdate />
  <TresAmbientLight :intensity="1" /> />
  <TresGridHelper />
</template>
