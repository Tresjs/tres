<script setup lang="ts">
import { type TresColor, useTresContext } from '@tresjs/core'
import { shallowRef, toRefs, watch } from 'vue'
import type { CylinderGeometry } from 'three'

export interface CylinderProps {
  /**
   * The radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength of the cylinder.
   * @default [1, 1, 1, 32, 1, false, 0, Math.PI * 2]
   * @type {any[]}
   * @memberof CylinderProps
   * @see https://threejs.org/docs/#api/en/geometries/CylinderGeometry
   */
  args?: ConstructorParameters<typeof CylinderGeometry>
  /**
   * The color of the cylinder.
   * @default 0xffffff
   * @type {TresColor}
   * @memberof CylinderProps
   * @see https://threejs.org/docs/#api/en/materials/MeshBasicMaterial
   */
  color?: TresColor
}

const props = withDefaults(defineProps<CylinderProps>(), {
  args: () => [1, 1, 1, 32, 1, false, 0, Math.PI * 2],
  color: '#ffffff',
})
const { args, color } = toRefs(props)
const { invalidate } = useTresContext()
watch(args, () => invalidate())

const cylinderRef = shallowRef()

defineExpose({
  instance: cylinderRef,
})
</script>

<template>
  <TresMesh ref="cylinderRef" v-bind="$attrs">
    <TresCylinderGeometry :args="args" />
    <slot>
      <TresMeshBasicMaterial :color="color" />
    </slot>
  </TresMesh>
</template>
