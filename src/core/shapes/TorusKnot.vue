<script setup lang="ts">
import { type TresColor, useTresContext } from '@tresjs/core'
import { shallowRef, toRefs, watch } from 'vue'
import type { TorusKnotGeometry } from 'three'

export interface TorusKnotProps {
  /**
   * The radius, tube, radialSegments, tubularSegments and p, q of the torus knot.
   * @default [1, 0.4, 64, 8, 2, 3]
   * @type {number[]}
   * @memberof TorusKnotProps
   * @see https://threejs.org/docs/#api/en/geometries/TorusKnotGeometry
   */
  args?: ConstructorParameters<typeof TorusKnotGeometry>
  /**
   * The color of the torus knot.
   * @default 0xffffff
   * @type {TresColor}
   * @memberof TorusKnotProps
   * @see https://threejs.org/docs/#api/en/materials/MeshBasicMaterial
   */
  color?: TresColor
}

const props = withDefaults(defineProps<TorusKnotProps>(), { args: () => [1, 0.4, 64, 8], color: '#ffffff' })
const { args, color } = toRefs(props)
const { invalidate } = useTresContext()
watch(args, () => invalidate())

const torusKnotRef = shallowRef()

defineExpose({
  instance: torusKnotRef,
})
</script>

<template>
  <TresMesh
    ref="torusKnotRef"
    v-bind="$attrs"
  >
    <TresTorusKnotGeometry :args="args" />
    <slot>
      <TresMeshBasicMaterial :color="color" />
    </slot>
  </TresMesh>
</template>
