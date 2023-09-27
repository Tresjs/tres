<script setup lang="ts">
import { ref } from 'vue'
import { TresCanvas, useRenderLoop } from '@tresjs/core'
import { ScrollControls, Stars, Sphere, Box } from '@tresjs/cientos'

const scRef = ref()
const boxRef = ref()
const progress = ref(0)

const { onLoop } = useRenderLoop()
onLoop(() => {
  if (boxRef.value) {
    boxRef.value.value.rotation.x = progress.value * 10
    boxRef.value.value.rotation.y = progress.value * 2
  }
})
</script>

<template>
  <TresCanvas
    clear-color="#333"
    class="important-absolute"
  >
    <TresPerspectiveCamera :position="[0, 2, 5]" />
    <Stars :radius="1" />
    <TresGridHelper :args="[10, 10]" />
    <Sphere
      :scale="0.1"
      :position="[1, 2, 0]"
    />
    <ScrollControls
      ref="scRef"
      v-model="progress"
      :distance="20"
      :smooth-scroll="0.1"
    >
      <Box
        ref="boxRef"
        :scale="0.5"
        :color="0xff00ff"
        :position="[-1, 1, 0]"
      />
    </ScrollControls>
  </TresCanvas>
</template>
