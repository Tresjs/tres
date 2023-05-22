<script setup lang="ts">
import { TresColor } from '@tresjs/core'
import { RingGeometry } from 'three'
import { shallowRef } from 'vue'

export type RingProps = {
  /**
   * The innerRadius, outerRadius, thetaSegments, phiSegments, tethaStart, thetaLength of the ring.
   * @default [0.5, 1, 32, 1, 0, Math.PI * 2]
   * @type {number[]}
   * @memberof RingProps
   * @see https://threejs.org/docs/#api/en/geometries/RingGeometry
   */
  args?: ConstructorParameters<typeof RingGeometry>
  /**
   * The color of the ring.
   * @default 0xffffff
   * @type {TresColor}
   * @memberof RingProps
   * @see https://threejs.org/docs/#api/en/materials/MeshBasicMaterial
   */
  color?: TresColor
}

// TODO: remove disable once eslint is updated to support vue 3.3
// eslint-disable-next-line vue/no-setup-props-destructure
const { args = [0.5, 1, 32], color = '0xffffff' } = defineProps<RingProps>()

const ringRef = shallowRef()

defineExpose({
  value: ringRef,
})
</script>
<template>
  <TresMesh ref="ringRef" v-bind="$attrs">
    <TresRingGeometry :args="args" />
    <slot>
      <TresMeshBasicMaterial :color="color" />
    </slot>
  </TresMesh>
</template>
