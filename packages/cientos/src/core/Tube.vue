<script setup lang="ts">
import { TresColor, TresObject } from '@tresjs/core'
import { CatmullRomCurve3, CubicBezierCurve3, LineCurve3, QuadraticBezierCurve3, Vector3 } from 'three'
import { shallowRef } from 'vue'

export type CurveType = QuadraticBezierCurve3 | CubicBezierCurve3 | CatmullRomCurve3 | LineCurve3
export type TubeGeometryParams = [CurveType, number, number, number, boolean]

export interface TubeProps extends TresObject {
  /**
   * The curve, segments, radius, radialSegments, closed.
   * @default [new QuadraticBezierCurve3(new Vector3(-1, 0, 0), new Vector3(0, 1, 0), new Vector3(1, 0, 0)), 20, 0.2, 8, false]
   * @type {TubeGeometryParams}
   * @memberof TubeProps
   * @see https://threejs.org/docs/#api/en/geometries/TubeGeometry
   */
  args?: TubeGeometryParams
  /**
   * The color of the tube.
   * @default 0xffffff
   * @type {TresColor}
   * @memberof TubeProps
   * @see https://threejs.org/docs/#api/en/materials/MeshBasicMaterial
   */
  color?: TresColor
}

withDefaults(defineProps<TubeProps>(), {
  args: () => [
    new QuadraticBezierCurve3(new Vector3(-1, 0, 0), new Vector3(0, 1, 0), new Vector3(1, 0, 0)),
    20,
    0.2,
    8,
    false,
  ],
  color: '0xffffff',
})

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
