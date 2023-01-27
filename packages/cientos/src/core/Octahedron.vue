<script setup lang="ts">
import { TresColor } from '@tresjs/core/dist/types'
import { shallowRef } from 'vue'

withDefaults(
  defineProps<{
    args?: number[]
    color?: TresColor
  }>(),
  {
    args: () => [1, 0],
    color: '0xffffff',
  },
)

const octahedronRef = shallowRef()

defineExpose({
  value: octahedronRef,
})
</script>
<template>
  <TresMesh ref="octahedronRef" v-bind="$attrs">
    <TresOctahedronGeometry :args="args" />
    <slot>
      <TresMeshBasicMaterial :color="color" />
    </slot>
  </TresMesh>
</template>
