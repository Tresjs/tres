<script setup lang="ts">
import { TresColor } from '@tresjs/core'
import { TorusKnotGeometry } from 'three'
import { shallowRef } from 'vue'

export type TorusKnotProps = {
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

// TODO: remove disable once eslint is updated to support vue 3.3
// eslint-disable-next-line vue/no-setup-props-destructure
const { args = [1, 0.4, 64, 8], color = '0xffffff' } = defineProps<TorusKnotProps>()

const torusKnotRef = shallowRef()

defineExpose({
  value: torusKnotRef,
})
</script>
<template>
  <TresMesh ref="torusKnotRef" v-bind="$attrs">
    <TresTorusKnotGeometry :args="args" />
    <slot>
      <TresMeshBasicMaterial :color="color" />
    </slot>
  </TresMesh>
</template>
