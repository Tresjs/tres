<script setup lang="ts">
import { TresColor, TresObject } from '@tresjs/core'
import { shallowRef } from 'vue'

export interface TorusKnotProps extends TresObject {
  /**
   * The radius, tube, radialSegments, tubularSegments and p, q of the torus knot.
   * @default [1, 0.4, 64, 8, 2, 3]
   * @type {number[]}
   * @memberof TorusKnotProps
   * @see https://threejs.org/docs/#api/en/geometries/TorusKnotGeometry
   */
  args?: number[]
  /**
   * The color of the torus knot.
   * @default 0xffffff
   * @type {TresColor}
   * @memberof TorusKnotProps
   * @see https://threejs.org/docs/#api/en/materials/MeshBasicMaterial
   */
  color?: TresColor
}

withDefaults(defineProps<TorusKnotProps>(), {
  args: () => [1, 0.4, 64, 8],
  color: '0xffffff',
})

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
