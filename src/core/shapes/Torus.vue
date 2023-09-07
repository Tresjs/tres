<script setup lang="ts">
import type { TresColor } from '@tresjs/core'
import type { TorusGeometry } from 'three'
import { shallowRef, toRefs } from 'vue'

export interface TorusProps {
  /**
   * The radius, tube, radialSegments, tubularSegments, arc of the torus.
   * @default [1, 1, 16, 80, Math.PI * 2]
   * @type {number[]}
   * @memberof TorusProps
   * @see https://threejs.org/docs/#api/en/geometries/TorusGeometry
   */
  args?: ConstructorParameters<typeof TorusGeometry>
  /**
   * The color of the torus.
   * @default 0xffffff
   * @type {TresColor}
   * @memberof TorusProps
   * @see https://threejs.org/docs/#api/en/materials/MeshBasicMaterial
   */
  color?: TresColor
}

const props = withDefaults(defineProps<TorusProps>(), { args: () => [1, 1, 16, 80], color: '#ffffff' })
const { args, color } = toRefs(props)

const torusRef = shallowRef()

defineExpose({
  value: torusRef,
})
</script>

<template>
  <TresMesh
    ref="torusRef"
    v-bind="$attrs"
  >
    <TresTorusGeometry :args="args" />
    <slot>
      <TresMeshBasicMaterial :color="color" />
    </slot>
  </TresMesh>
</template>
