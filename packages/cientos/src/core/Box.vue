<script setup lang="ts">
import { TresColor } from '@tresjs/core/dist/types'
import { shallowRef } from 'vue'

withDefaults(
  defineProps<{
    args?: number[]
    color?: TresColor
  }>(),
  {
    args: () => [1, 1, 1],
    color: '0xffffff',
  },
)

const boxRef = shallowRef()

defineExpose({
  value: boxRef,
})
</script>
<template>
  <TresMesh ref="boxRef" v-bind="$attrs">
    <TresBoxGeometry :args="args" />
    <slot>
      <TresMeshBasicMaterial :color="color" />
    </slot>
  </TresMesh>
</template>
