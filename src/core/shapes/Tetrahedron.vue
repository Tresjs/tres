<script setup lang="ts">
import { TresColor } from '@tresjs/core'
import { TetrahedronGeometry } from 'three'
import { shallowRef } from 'vue'

export type TetrahedronProps = {
  /**
   * The radius and detail of the tetrahedron.
   * @default [1, 0]
   * @type {number[]}
   * @memberof TetrahedronProps
   * @see https://threejs.org/docs/#api/en/geometries/TetrahedronGeometry
   */
  args?: ConstructorParameters<typeof TetrahedronGeometry>
  /**
   * The color of the tetrahedron.
   * @default 0xffffff
   * @type {TresColor}
   * @memberof TetrahedronProps
   * @see https://threejs.org/docs/#api/en/materials/MeshBasicMaterial
   */
  color?: TresColor
}

// TODO: remove disable once eslint is updated to support vue 3.3
// eslint-disable-next-line vue/no-setup-props-destructure
const { args = [1, 0], color = '0xffffff' } = defineProps<TetrahedronProps>()

const tetrahedronRef = shallowRef()

defineExpose({
  value: tetrahedronRef,
})
</script>
<template>
  <TresMesh ref="tetrahedronRef" :rotation="[-Math.PI / 2, 0, 0]" v-bind="$attrs">
    <TresTetrahedronGeometry :args="args" />
    <slot>
      <TresMeshBasicMaterial :color="color" />
    </slot>
  </TresMesh>
</template>
