<script setup lang="ts">
import { type TresColor, useTres } from '@tresjs/core'
import { shallowRef, toRefs, watch } from 'vue'
import type { TetrahedronGeometry } from 'three'

export interface TetrahedronProps {
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

const props = withDefaults(defineProps<TetrahedronProps>(), { args: () => [1, 0], color: '#ffffff' })
const { invalidate } = useTres()

const { args, color } = toRefs(props)
watch(args, () => {
  invalidate()
})

const tetrahedronRef = shallowRef()

defineExpose({
  instance: tetrahedronRef,
})
</script>

<template>
  <TresMesh
    ref="tetrahedronRef"
    :rotation="[-Math.PI / 2, 0, 0]"
    v-bind="$attrs"
  >
    <TresTetrahedronGeometry :args="args" />
    <slot>
      <TresMeshBasicMaterial :color="color" />
    </slot>
  </TresMesh>
</template>
