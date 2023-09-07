<script setup lang="ts">
import type { TresColor } from '@tresjs/core'
import type { DodecahedronGeometry } from 'three'
import { shallowRef, toRefs } from 'vue'

export interface DodecahedronProps {
  /**
   * The radius and detail of the dodecahedron.
   * @default [1, 0]
   * @type {number[]}
   * @memberof DodecahedronProps
   * @see https://threejs.org/docs/#api/en/geometries/DodecahedronGeometry
   */
  args?: ConstructorParameters<typeof DodecahedronGeometry>
  /**
   * The color of the dodecahedron.
   * @default 0xffffff
   * @type {TresColor}
   * @memberof DodecahedronProps
   * @see https://threejs.org/docs/#api/en/materials/MeshBasicMaterial
   */
  color?: TresColor
}

const props = withDefaults(defineProps<DodecahedronProps>(), { args: () => [1, 0], color: '#ffffff' })
const { args, color } = toRefs(props)

const dodecahedronRef = shallowRef()

defineExpose({
  value: dodecahedronRef,
})
</script>

<template>
  <TresMesh
    ref="dodecahedronRef"
    v-bind="$attrs"
  >
    <TresDodecahedronGeometry :args="args" />
    <slot>
      <TresMeshBasicMaterial :color="color" />
    </slot>
  </TresMesh>
</template>
