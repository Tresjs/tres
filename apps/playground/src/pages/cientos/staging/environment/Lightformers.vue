<script setup lang="ts">
import { useControls } from '@tresjs/leches'
import { useLoop } from '@tresjs/core'
import { ref } from 'vue'
import { Lightformer } from '@tresjs/cientos'

const { lightformers } = useControls({
  lightformers: false,
})

const lightformerRef = ref(null)

const { onBeforeRender } = useLoop()

onBeforeRender(({ elapsed }) => {
  if (lightformerRef.value) {
    lightformerRef.value.mesh.position.y = Math.sin(elapsed) * 2
  }
})
</script>

<template>
  <TresGroup v-if="lightformers">
    <Lightformer
      ref="lightformerRef"
      :intensity="1"
      color="red"
      form="ring"
      :rotation-x="Math.PI / 2"
      :position="[0, 5, -9]"
      :scale="[10, 10, 1]"
    />
    <Lightformer
      :intensity="4"
      :rotation-y="Math.PI / 2"
      :position="[-5, 1, -1]"
      :scale="[20, 0.1, 1]"
    />
    <Lightformer
      :rotation-y="Math.PI / 2"
      :position="[-5, -1, -1]"
      :scale="[20, 0.5, 1]"
    />
    <Lightformer
      :rotation-y="-Math.PI / 2"
      :position="[10, 1, 0]"
      :scale="[20, 11, 1]"
    />
  </TresGroup>
</template>
