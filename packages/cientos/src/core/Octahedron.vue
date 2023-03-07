<script setup lang="ts">
import { TresColor, TresObject } from '@tresjs/core'
import { shallowRef } from 'vue'

export interface OctahedronProps extends TresObject {
  /**
   * The radius and detail of the octahedron.
   * @default [1, 0]
   * @type {number[]}
   * @memberof OctahedronProps
   * @see https://threejs.org/docs/#api/en/geometries/OctahedronGeometry
   */
  args?: number[]
  /**
   * The color of the octahedron.
   * @default 0xffffff
   * @type {TresColor}
   * @memberof OctahedronProps
   * @see https://threejs.org/docs/#api/en/materials/MeshBasicMaterial
   */
  color?: TresColor
}

withDefaults(defineProps<OctahedronProps>(), {
  args: () => [1, 0],
  color: '0xffffff',
})

const octahedronRef = shallowRef()

defineExpose({
  value: octahedronRef,
})
</script>
<template>
  <TresMesh ref="octahedronRef" v-bind="$attrs">
    <TresOctahedronGeometry :args="args" />
    <slot>
      <TresMeshBasicMaterial :color="color" />
    </slot>
  </TresMesh>
</template>
