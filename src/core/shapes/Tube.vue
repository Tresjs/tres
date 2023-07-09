<!-- eslint-disable max-len -->
<script setup lang="ts">
import { TresColor } from '@tresjs/core'
import { QuadraticBezierCurve3, TubeGeometry, Vector3 } from 'three'
import { shallowRef, toRefs } from 'vue'

export type TubeProps = {
  /**
   * The curve, segments, radius, radialSegments, closed.
   * @default [new QuadraticBezierCurve3(new Vector3(-1, 0, 0), new Vector3(0, 1, 0), new Vector3(1, 0, 0)), 20, 0.2, 8, false]
   * @type {TubeGeometryParams}
   * @memberof TubeProps
   * @see https://threejs.org/docs/#api/en/geometries/TubeGeometry
   */
  args?: ConstructorParameters<typeof TubeGeometry>
  /**
   * The color of the tube.
   * @default 0xffffff
   * @type {TresColor}
   * @memberof TubeProps
   * @see https://threejs.org/docs/#api/en/materials/MeshBasicMaterial
   */
  color?: TresColor
}

const props = withDefaults(defineProps<TubeProps>(), {
  args: () => [
    new QuadraticBezierCurve3(new Vector3(-1, 0, 0), new Vector3(0, 1, 0), new Vector3(1, 0, 0)),
    20,
    0.2,
    8,
    false,
  ],
  color: '#ffffff',
})
const { args, color } = toRefs(props)

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
