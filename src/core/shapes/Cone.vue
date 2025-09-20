<script setup lang="ts">
import { type TresColor, useTres } from '@tresjs/core'
import { shallowRef, toRefs, watch } from 'vue'
import type { ConeGeometry } from 'three'

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
const { invalidate } = useTres()

const { args, color } = toRefs(props)
watch(args, () => {
  invalidate()
})

const coneRef = shallowRef()

defineExpose({
  instance: coneRef,
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
