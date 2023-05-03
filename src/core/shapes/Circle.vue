<script setup lang="ts">
import { TresColor, TresObject } from '@tresjs/core'
import { shallowRef } from 'vue'

export interface CircleProps extends TresObject {
  /**
   * The radius, segment, thetaStart, thetaLength of the circle.
   * @default [1, 32, 0, Math.PI * 2]
   * @type {number[]}
   * @memberof CircleProps
   * @see https://threejs.org/docs/#api/en/geometries/CircleGeometry
   */
  args?: number[]
  /**
   * The color of the circle.
   * @default 0xffffff
   * @type {TresColor}
   * @memberof CircleProps
   * @see https://threejs.org/docs/#api/en/materials/MeshBasicMaterial
   */
  color?: TresColor
}
withDefaults(
  defineProps<{
    args?: number[]
    color?: TresColor
  }>(),
  {
    args: () => [1, 32, 0, Math.PI * 2],
    color: '0xffffff',
  },
)

const circleRef = shallowRef()

defineExpose({
  value: circleRef,
})
</script>
<template>
  <TresMesh ref="circleRef" v-bind="$attrs">
    <TresCircleGeometry :args="args" />
    <slot>
      <TresMeshBasicMaterial :color="color" />
    </slot>
  </TresMesh>
</template>
