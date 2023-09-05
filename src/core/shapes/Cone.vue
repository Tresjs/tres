<script setup lang="ts">
import type { TresColor } from '@tresjs/core'
import type { ConeGeometry } from 'three'
import { shallowRef, toRefs } from 'vue'

export interface ConeProps {
  /**
   * The radius, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength of the cone.
   * @default [1, 1, 12, 12, false, 0, Math.PI * 2]
   * @type {any[]}
   * @memberof ConeProps
   * @see https://threejs.org/docs/#api/en/geometries/ConeGeometry
   */
  args?: ConstructorParameters<typeof ConeGeometry>
  /**
   * The color of the cone.
   * @default 0xffffff
   * @type {TresColor}
   * @memberof ConeProps
   * @see https://threejs.org/docs/#api/en/materials/MeshBasicMaterial
   */
  color?: TresColor
}

const props = withDefaults(defineProps<ConeProps>(), {
  args: () => [1, 1, 12, 12, false, 0, Math.PI * 2],
  color: '#ffffff',
})
const { args, color } = toRefs(props)

const coneRef = shallowRef()

defineExpose({
  value: coneRef,
})
</script>

<template>
  <TresMesh
    ref="coneRef"
    v-bind="$attrs"
  >
    <TresConeGeometry :args="args" />
    <slot>
      <TresMeshBasicMaterial :color="color" />
    </slot>
  </TresMesh>
</template>
