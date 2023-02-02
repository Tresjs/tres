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

const dodecahedronRef = shallowRef()

defineExpose({
  value: dodecahedronRef,
})
</script>
<template>
  <TresMesh ref="dodecahedronRef" v-bind="$attrs">
    <TresDodecahedronGeometry :args="args" />
    <slot>
      <TresMeshBasicMaterial :color="color" />
    </slot>
  </TresMesh>
</template>
