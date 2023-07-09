<script setup lang="ts">
import { TresColor } from '@tresjs/core'
import { SphereGeometry } from 'three'
import { shallowRef, toRefs } from 'vue'

export type SphereProps = {
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
const { args, color } = toRefs(props)

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
