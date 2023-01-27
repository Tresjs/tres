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

const tetrahedronRef = shallowRef()

defineExpose({
  value: tetrahedronRef,
})
</script>
<template>
  <TresMesh ref="tetrahedronRef" :rotation="[-Math.PI / 2, 0, 0]" v-bind="$attrs">
    <TresTetrahedronGeometry :args="args" />
    <slot>
      <TresMeshBasicMaterial :color="color" />
    </slot>
  </TresMesh>
</template>
