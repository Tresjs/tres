<script setup lang="ts">
import { TresColor } from '@tresjs/core'
import { ConeGeometry } from 'three'
import { shallowRef } from 'vue'

export type ConeProps = {
  /**
   * The radius, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength of the cone.
   * @default [1, 1, 12, false, 0, Math.PI * 2]
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
// TODO: remove disable once eslint is updated to support vue 3.3
// eslint-disable-next-line vue/no-setup-props-destructure
const { args = [1, 1, 12, false, 0, Math.PI * 2], color = '0xffffff' } = defineProps<ConeProps>()

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
