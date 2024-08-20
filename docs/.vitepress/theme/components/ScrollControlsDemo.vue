<script setup lang="ts">
import { ref } from 'vue'
import { TresCanvas, useRenderLoop } from '@tresjs/core'
import { Box, ScrollControls, Stars } from '@tresjs/cientos'
import { useControls } from '@tresjs/leches'
import '@tresjs/leches/styles'

const boxRef = ref()
const progress = ref(0)

useControls('fpsgraph')
useControls({
  progress: progress.value,
})

const { onLoop } = useRenderLoop()
onLoop(() => {
  if (boxRef.value) {
    boxRef.value.instance.rotation.x = progress.value * 10
    boxRef.value.instance.rotation.y = progress.value * 2
  }
})
</script>

<template>
  <TresCanvas
    class="important-absolute"
    clear-color="#333"
  >
    <TresPerspectiveCamera :position="[0, 2, 5]" />
    <Stars :radius="1" />
    <TresGridHelper :args="[10, 10]" />
    <ScrollControls />
    <Box
      :scale="0.5"
      :color="0xFF00FF"
      :position="[-1, 1, 0]"
    />
  </TresCanvas>
</template>
