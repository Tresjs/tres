<script setup lang="ts">
import { TresColor, TresObject } from '@tresjs/core'
import { shallowRef } from 'vue'

export interface ConeProps extends TresObject {
  /**
   * The radius, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength of the cone.
   * @default [1, 1, 12, false, 0, Math.PI * 2]
   * @type {any[]}
   * @memberof ConeProps
   * @see https://threejs.org/docs/#api/en/geometries/ConeGeometry
   */
  args?: [number, number, number, boolean?, number?, number?]
  /**
   * The color of the cone.
   * @default 0xffffff
   * @type {TresColor}
   * @memberof ConeProps
   * @see https://threejs.org/docs/#api/en/materials/MeshBasicMaterial
   */
  color?: TresColor
}

withDefaults(defineProps<ConeProps>(), {
  args: () => [1, 1, 12, false, 0, Math.PI * 2],
  color: '0xffffff',
})

const coneRef = shallowRef()

defineExpose({
  value: coneRef,
})
</script>
<template>
  <TresMesh ref="coneRef" v-bind="$attrs">
    <TresConeGeometry :args="args" />
    <slot>
      <TresMeshBasicMaterial :color="color" />
    </slot>
  </TresMesh>
</template>
