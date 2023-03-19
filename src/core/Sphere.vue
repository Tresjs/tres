<script setup lang="ts">
import { TresColor, TresObject } from '@tresjs/core'
import { shallowRef } from 'vue'

export interface SphereProps extends TresObject {
  /**
   * The radius, widthSegments, heightSegments, phiStart phiLength,
   * thetaStart and thetaLength of the sphere.
   * @default [2, 32, 16, 0, Math.PI * 2, 0, Math.PI]
   * @type {number[]}
   * @memberof SphereProps
   * @see https://threejs.org/docs/#api/en/geometries/SphereGeometry
   */
  args?: number[]
  /**
   * The color of the sphere.
   * @default 0xffffff
   * @type {TresColor}
   * @memberof SphereProps
   * @see https://threejs.org/docs/#api/en/materials/MeshBasicMaterial
   */
  color?: TresColor
}

withDefaults(defineProps<SphereProps>(), {
  args: () => [2, 32, 16],
  color: '0xffffff',
})

const sphereRef = shallowRef()

defineExpose({
  value: sphereRef,
})
</script>
<template>
  <TresMesh ref="sphereRef" v-bind="$attrs">
    <TresSphereGeometry :args="args" />
    <slot>
      <TresMeshBasicMaterial :color="color" />
    </slot>
  </TresMesh>
</template>
