<script setup lang="ts">
import { TresColor } from '@tresjs/core/dist/types'
import { shallowRef } from 'vue'

withDefaults(
  defineProps<{
    args?: number[]
    color?: TresColor
  }>(),
  {
    args: () => [1, 0.4, 64, 8],
    color: '0xffffff',
  },
)

const torusKnotRef = shallowRef()

defineExpose({
  value: torusKnotRef,
})
</script>
<template>
  <TresMesh ref="torusKnotRef" v-bind="$attrs">
    <TresTorusKnotGeometry :args="args" />
    <slot>
      <TresMeshBasicMaterial :color="color" />
    </slot>
  </TresMesh>
</template>
