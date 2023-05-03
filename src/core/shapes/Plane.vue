<script setup lang="ts">
import { TresColor, TresObject } from '@tresjs/core'
import { shallowRef } from 'vue'

export interface PlaneProps extends TresObject {
  /**
   * The width and height, widthSegments, heightSegments of the plane.
   * @default [1, 1, 1, 1]
   * @type {number[]}
   * @memberof PlaneProps
   * @see https://threejs.org/docs/#api/en/geometries/PlaneGeometry
   */
  args?: number[]
  /**
   * The color of the plane.
   * @default 0xffffff
   * @type {TresColor}
   * @memberof PlaneProps
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
    args: () => [1, 1],
    color: '0xffffff',
  },
)

const planeRef = shallowRef()

defineExpose({
  value: planeRef,
})
</script>
<template>
  <TresMesh ref="planeRef" :rotation="[-Math.PI / 2, 0, 0]" v-bind="$attrs">
    <TresPlaneGeometry :args="args" />
    <slot>
      <TresMeshBasicMaterial :color="color" />
    </slot>
  </TresMesh>
</template>
