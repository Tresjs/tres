<script setup lang="ts">
import { TresColor } from '@tresjs/core/dist/types'
import { QuadraticBezierCurve3, Vector3 } from 'three'
import { shallowRef } from 'vue'

withDefaults(
  defineProps<{
    args?: any[]
    color?: TresColor
  }>(),
  {
    args: () => [
      new QuadraticBezierCurve3(new Vector3(-1, 0, 0), new Vector3(0, 1, 0), new Vector3(1, 0, 0)),
      20,
      0.2,
      8,
      false,
    ],
    color: '0xffffff',
  },
)

const tubeRef = shallowRef()

defineExpose({
  value: tubeRef,
})
</script>
<template>
  <TresMesh ref="tubeRef" v-bind="$attrs">
    <TresTubeGeometry :args="args" />
    <slot>
      <TresMeshBasicMaterial :color="color" />
    </slot>
  </TresMesh>
</template>
