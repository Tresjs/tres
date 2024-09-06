<!-- eslint-disable max-len -->
<script setup lang="ts">
import { type TresColor, useTresContext } from '@tresjs/core'
import { QuadraticBezierCurve3, Vector3 } from 'three'
import { shallowRef, toRefs, watch } from 'vue'
import type { TubeGeometry } from 'three'

export interface TubeProps {
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
const { invalidate } = useTresContext()
watch(args, () => invalidate())

const tubeRef = shallowRef()

defineExpose({
  instance: tubeRef,
})
</script>

<template>
  <TresMesh
    ref="tubeRef"
    v-bind="$attrs"
  >
    <TresTubeGeometry :args="args" />
    <slot>
      <TresMeshBasicMaterial :color="color" />
    </slot>
  </TresMesh>
</template>
