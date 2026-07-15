<script setup>
import { shallowRef } from 'vue'
import { useLoop } from '@tresjs/core'

const boxRef = shallowRef()

const { onBeforeRender } = useLoop()

onBeforeRender(({ elapsed }) => {
  if (boxRef.value) {
    boxRef.value.rotation.y = elapsed * 0.5
    boxRef.value.rotation.x = elapsed * 0.2
  }
})
</script>

<template>
  <TresMesh ref="boxRef">
    <TresBoxGeometry :args="[1, 1, 1]" />
    <TresMeshStandardMaterial color="orange" transparent />
  </TresMesh>
</template>
