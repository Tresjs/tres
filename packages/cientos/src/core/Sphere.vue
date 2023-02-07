<script setup lang="ts">
import { TresColor } from '@tresjs/core/dist/types'
import { shallowRef } from 'vue'

withDefaults(
  defineProps<{
    args?: number[]
    color?: TresColor
  }>(),
  {
    args: () => [2, 32, 16],
    color: '0xffffff',
  },
)

const sphereRef = shallowRef()

defineExpose({
  value: sphereRef,
})
</script>
<template>
  <TresMesh ref="sphereRef" v-bind="$attrs">
    <TresSphereGeometry :args="args" />
    <slot>
      <TresMeshBasicMaterial :color="color" />
    </slot>
  </TresMesh>
</template>
