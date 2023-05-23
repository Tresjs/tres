<script setup lang="ts">
import { TresColor } from '@tresjs/core'
import { PlaneGeometry } from 'three'
import { shallowRef } from 'vue'

export type PlaneProps = {
  /**
   * The width and height, widthSegments, heightSegments of the plane.
   * @default [1, 1, 1, 1]
   * @type {number[]}
   * @memberof PlaneProps
   * @see https://threejs.org/docs/#api/en/geometries/PlaneGeometry
   */
  args?: ConstructorParameters<typeof PlaneGeometry>
  /**
   * The color of the plane.
   * @default 0xffffff
   * @type {TresColor}
   * @memberof PlaneProps
   * @see https://threejs.org/docs/#api/en/materials/MeshBasicMaterial
   */
  color?: TresColor
}

// TODO: remove disable once eslint is updated to support vue 3.3
// eslint-disable-next-line vue/no-setup-props-destructure
const { args = [1, 1], color = '0xffffff' } = defineProps<PlaneProps>()

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
