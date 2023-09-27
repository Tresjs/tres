<script setup lang="ts">
import { ref } from 'vue'
import { TresCanvas, useRenderLoop } from '@tresjs/core'
import { ScrollControls, Stars, Box } from '@tresjs/cientos'

const boxRef = ref()
const progress = ref(0)

const { onLoop } = useRenderLoop()
onLoop(() => {
  if (boxRef.value) {
    boxRef.value.value.rotation.x = progress.value * 10
    boxRef.value.value.rotation.y = progress.value * 2
    boxRef.value.value.position.x = progress.value * 4.5
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
    <ScrollControls
      v-model="progress"
      :distance="2"
    />
    <Box
      ref="boxRef"
      :scale="0.5"
      :color="0xff00ff"
      :position="[-1, 1, 0]"
    />
  </TresCanvas>
</template>
