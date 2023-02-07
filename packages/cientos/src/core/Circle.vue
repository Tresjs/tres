<script setup lang="ts">
import { TresColor } from '@tresjs/core/dist/types'
import { shallowRef } from 'vue'

withDefaults(
  defineProps<{
    args?: number[]
    color?: TresColor
  }>(),
  {
    args: () => [1, 32],
    color: '0xffffff',
  },
)

const circleRef = shallowRef()

defineExpose({
  value: circleRef,
})
</script>
<template>
  <TresMesh ref="circleRef" v-bind="$attrs">
    <TresCircleGeometry :args="args" />
    <slot>
      <TresMeshBasicMaterial :color="color" />
    </slot>
  </TresMesh>
</template>
