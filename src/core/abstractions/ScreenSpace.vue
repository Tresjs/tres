<script setup lang="ts">
import { shallowRef } from 'vue'
import { useLoop } from '@tresjs/core'

export interface ScreenSpaceProps {
  depth?: number
}

withDefaults(defineProps<ScreenSpaceProps>(), {
  depth: -1,
})

const outerRef = shallowRef()

useLoop().onBeforeRender(({ camera }) => {
  if (outerRef.value) {
    outerRef.value.quaternion.copy(camera.quaternion)
    outerRef.value.position.copy(camera.position)
  }
})

defineExpose({ instance: outerRef })
</script>

<template>
  <TresGroup ref="outerRef">
    <TresGroup :position-z="-depth">
      <slot></slot>
    </TresGroup>
  </TresGroup>
</template>
