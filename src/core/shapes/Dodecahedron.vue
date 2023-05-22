<script setup lang="ts">
import { TresColor } from '@tresjs/core'
import { DodecahedronGeometry } from 'three'
import { shallowRef } from 'vue'

export type DodecahedronProps = {
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

// TODO: remove disable once eslint is updated to support vue 3.3
// eslint-disable-next-line vue/no-setup-props-destructure
const { args = [1, 0], color = '0xffffff' } = defineProps<DodecahedronProps>()

const dodecahedronRef = shallowRef()

defineExpose({
  value: dodecahedronRef,
})
</script>
<template>
  <TresMesh ref="dodecahedronRef" v-bind="$attrs">
    <TresDodecahedronGeometry :args="args" />
    <slot>
      <TresMeshBasicMaterial :color="color" />
    </slot>
  </TresMesh>
</template>
