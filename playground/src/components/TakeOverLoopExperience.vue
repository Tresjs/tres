<script setup lang="ts">
import { useLoop } from '@tresjs/core'

import { OrbitControls } from '@tresjs/cientos'
import { useControls } from '@tresjs/leches'

const { render, pause, resume } = useLoop()
render(({ renderer, scene, camera }) => {
  renderer.render(scene, camera)
})

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
