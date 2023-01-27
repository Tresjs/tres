<script setup lang="ts">
import { TresColor } from '@tresjs/core/dist/types'
import { shallowRef } from 'vue'

withDefaults(
  defineProps<{
    args?: number[]
    color?: TresColor
  }>(),
  {
    args: () => [0.5, 1, 32],
    color: '0xffffff',
  },
)

const ringRef = shallowRef()

defineExpose({
  value: ringRef,
})
</script>
<template>
  <TresMesh ref="ringRef" :rotation="[-Math.PI / 2, 0, 0]" v-bind="$attrs">
    <TresRingGeometry :args="args" />
    <slot>
      <TresMeshBasicMaterial :color="color" />
    </slot>
  </TresMesh>
</template>
