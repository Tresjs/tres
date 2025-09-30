<script setup lang="ts">
import { Box, ScrollControls, Stars } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { ref } from 'vue'

const boxRef = ref()
const progress = ref(0)

function onLoop() {
  if (boxRef.value) {
    boxRef.value.instance.rotation.x = progress.value * 10
    boxRef.value.instance.rotation.y = progress.value * 2
    boxRef.value.instance.position.x = progress.value * 4.5
  }
}
</script>

<template>
  <TresCanvas
    class="important-absolute"
    clear-color="#333"
    @loop="onLoop"
  >
    <TresPerspectiveCamera :position="[0, 2, 5]" />
    <Stars :radius="1" />
    <TresGridHelper :args="[10, 10]" />
    <ScrollControls
      v-model="progress"
      :distance="0"
    />
    <Box
      ref="boxRef"
      :scale="0.5"
      :color="0xFF00FF"
      :position="[-1, 1, 0]"
    />
  </TresCanvas>
</template>
