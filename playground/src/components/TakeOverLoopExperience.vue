<script setup lang="ts">
import { useLoop } from '@tresjs/core'

import { OrbitControls } from '@tresjs/cientos'
import { useControls } from '@tresjs/leches'
import { set } from '@vueuse/core'

const { render, pauseRender, resumeRender } = useLoop()

const { off } = render(({ renderer, scene, camera }) => {
  renderer.render(scene, camera)
})

const { isRenderPaused } = useControls({
  isRenderPaused: {
    value: false,
    type: 'boolean',
    label: 'Pause Render',
  },
})

const { unregisterRender } = useControls({
  unregisterRender: {
    value: false,
    type: 'boolean',
    label: 'Unregister render callback',
  },
})

watchEffect(() => {
  if (unregisterRender.value) {
    off()
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

const showGrid = ref(true)

setTimeout(() => {
  showGrid.value = false
}, 10000)
</script>

<template>
  <TresPerspectiveCamera :position="[3, 3, 3]" />
  <OrbitControls make-default />
  <AnimatedObjectUseUpdate />
  <TresGridHelper v-if="showGrid" />
  <TresAmbientLight :intensity="1" />
</template>
