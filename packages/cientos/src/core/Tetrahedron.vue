<script setup lang="ts">
import { TresColor, TresObject } from '@tresjs/core'
import { shallowRef } from 'vue'

export interface TetrahedronProps extends TresObject {
  /**
   * The radius and detail of the tetrahedron.
   * @default [1, 0]
   * @type {number[]}
   * @memberof TetrahedronProps
   * @see https://threejs.org/docs/#api/en/geometries/TetrahedronGeometry
   */
  args?: number[]
  /**
   * The color of the tetrahedron.
   * @default 0xffffff
   * @type {TresColor}
   * @memberof TetrahedronProps
   * @see https://threejs.org/docs/#api/en/materials/MeshBasicMaterial
   */
  color?: TresColor
}

withDefaults(defineProps<TetrahedronProps>(), {
  args: () => [1, 0],
  color: '0xffffff',
})

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
