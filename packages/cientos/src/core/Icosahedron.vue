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

const icosahedronRef = shallowRef()

defineExpose({
  value: icosahedronRef,
})
</script>
<template>
  <TresMesh ref="icosahedronRef" v-bind="$attrs">
    <TresIcosahedronGeometry :args="args" />
    <slot>
      <TresMeshBasicMaterial :color="color" />
    </slot>
  </TresMesh>
</template>
