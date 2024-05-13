<script setup lang="ts">
import { useLoop } from '@tresjs/core'

import { OrbitControls } from '@tresjs/cientos'
import { useControls } from '@tresjs/leches'

const { render, pauseRender, resumeRender } = useLoop()

const takeOverCb = ({ renderer, scene, camera }) => {
/*   console.log('Taking over the loop') */
  renderer.render(scene, camera)
}
const { off } = render(takeOverCb)

const { isRenderPaused } = useControls({
  isRenderPaused: {
    value: false,
    type: 'boolean',
    label: 'Pause Render',
  },
})

const { unregister } = useControls({
  unregister: {
    value: false,
    type: 'boolean',
    label: 'Unregister render callback',
  },
})

watchEffect(() => {
  if (unregister.value) {
    off(takeOverCb)
  }
})

watchEffect(() => {
  if (isRenderPaused.value) {
    pauseRender()
  }
  else {
    resumeRender()
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
