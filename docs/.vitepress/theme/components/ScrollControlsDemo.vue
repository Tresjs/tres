<script setup lang="ts">
import { ref } from 'vue'
import { TresCanvas, useRenderLoop } from '@tresjs/core'
import { ScrollControls, Stars, Sphere, Box } from '@tresjs/cientos'
import { SRGBColorSpace, NoToneMapping } from 'three'
import { useControls } from '@tresjs/leches'
import '@tresjs/leches/styles'

const scRef = ref()
const sphereRef = ref()
const boxRef = ref()
const progress = ref(0)

const gl = {
  clearColor: '#333',
  alpha: true,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

useControls('fpsgraph')
useControls({
  progress: progress.value,
})

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
    class="important-absolute"
    clear-color="#333"
  >
    <TresPerspectiveCamera :position="[0, 2, 5]" />
    <Stars :radius="1" />
    <TresGridHelper :args="[10, 10]" />
    <ScrollControls />
    <Box
      :scale="0.5"
      :color="0xff00ff"
      :position="[-1, 1, 0]"
    />
  </TresCanvas>
</template>
