<script setup lang="ts">
import { TresColor } from '@tresjs/core/dist/types'
import { shallowRef } from 'vue'

withDefaults(
  defineProps<{
    args?: number[]
    color?: TresColor
  }>(),
  {
    args: () => [1, 1, 12],
    color: '0xffffff',
  },
)

const coneRef = shallowRef()

defineExpose({
  value: coneRef,
})
</script>
<template>
  <TresMesh ref="coneRef" v-bind="$attrs">
    <TresConeGeometry :args="args" />
    <slot>
      <TresMeshBasicMaterial :color="color" />
    </slot>
  </TresMesh>
</template>
