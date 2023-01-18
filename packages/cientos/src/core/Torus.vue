<script setup lang="ts">
import { TresColor } from '@tresjs/core/dist/types'
import { shallowRef } from 'vue'

withDefaults(
  defineProps<{
    args?: number[]
    color?: TresColor
  }>(),
  {
    args: () => [1, 1, 16, 80],
    color: '0xffffff',
  },
)

const torusRef = shallowRef()

defineExpose({
  value: torusRef,
})
</script>
<template>
  <TresMesh ref="torusRef" v-bind="$attrs">
    <TresTorusGeometry :args="args" />
    <slot>
      <TresMeshBasicMaterial :color="color" />
    </slot>
  </TresMesh>
</template>
