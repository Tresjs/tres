<script setup lang="ts">
import { TresColor } from '@tresjs/core/dist/types'
import { shallowRef } from 'vue'

withDefaults(
  defineProps<{
    args?: number[]
    color?: TresColor
  }>(),
  {
    args: () => [1, 1],
    color: '0xffffff',
  },
)

const planeRef = shallowRef()

defineExpose({
  value: planeRef,
})
</script>
<template>
  <TresMesh ref="planeRef" :rotation="[-Math.PI / 2, 0, 0]" v-bind="$attrs">
    <TresPlaneGeometry :args="args" />
    <slot>
      <TresMeshBasicMaterial :color="color" />
    </slot>
  </TresMesh>
</template>
