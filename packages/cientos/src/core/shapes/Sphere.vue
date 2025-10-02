<script setup lang="ts">
import { type TresColor, useTres } from '@tresjs/core'
import { shallowRef, toRefs, watch } from 'vue'
import type { SphereGeometry } from 'three'

export interface SphereProps {
  /**
   * The radius, widthSegments, heightSegments, phiStart phiLength,
   * thetaStart and thetaLength of the sphere.
   * @default [2, 32, 16, 0, Math.PI * 2, 0, Math.PI]
   * @type {number[]}
   * @memberof SphereProps
   * @see https://threejs.org/docs/#api/en/geometries/SphereGeometry
   */
  args?: ConstructorParameters<typeof SphereGeometry>
  /**
   * The color of the sphere.
   * @default 0xffffff
   * @type {TresColor}
   * @memberof SphereProps
   * @see https://threejs.org/docs/#api/en/materials/MeshBasicMaterial
   */
  color?: TresColor
}

const props = withDefaults(defineProps<SphereProps>(), { args: () => [2, 32, 16], color: '#ffffff' })
const { invalidate } = useTres()

const { args, color } = toRefs(props)
watch(args, () => {
  invalidate()
})

const sphereRef = shallowRef()

defineExpose({
  instance: sphereRef,
})
</script>

<template>
  <TresMesh
    ref="sphereRef"
    v-bind="$attrs"
  >
    <TresSphereGeometry :args="args" />
    <slot>
      <TresMeshBasicMaterial :color="color" />
    </slot>
  </TresMesh>
</template>
