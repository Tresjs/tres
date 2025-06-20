<script setup lang="ts">
import { useLoop } from '@tresjs/core'

const groupRef = shallowRef()
const showRef = shallowRef(false)
const parentNameRef = shallowRef('')
useLoop().onBeforeRender(({ elapsed }) => {
  showRef.value = Math.floor(elapsed) % 2 === 1
  parentNameRef.value = groupRef.value?.parent.name || ''
})

defineExpose({
  show: showRef,
  instance: groupRef,
})
</script>

<template>
  <TresGroup v-if="showRef" ref="groupRef">
    <TresMesh>
      <TresBoxGeometry :args="[1, 1, 1]" />
      <TresMeshNormalMaterial />
    </TresMesh>
  </TresGroup>
</template>
