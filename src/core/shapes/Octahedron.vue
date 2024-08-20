<script setup lang="ts">
import { type TresColor, useTresContext } from '@tresjs/core'
import type { OctahedronGeometry } from 'three'
import { shallowRef, toRefs, watch } from 'vue'

export interface OctahedronProps {
  /**
   * The radius and detail of the octahedron.
   * @default [1, 0]
   * @type {number[]}
   * @memberof OctahedronProps
   * @see https://threejs.org/docs/#api/en/geometries/OctahedronGeometry
   */
  args?: ConstructorParameters<typeof OctahedronGeometry>
  /**
   * The color of the octahedron.
   * @default 0xffffff
   * @type {TresColor}
   * @memberof OctahedronProps
   * @see https://threejs.org/docs/#api/en/materials/MeshBasicMaterial
   */
  color?: TresColor
}

const props = withDefaults(defineProps<OctahedronProps>(), { args: () => [1, 0], color: '#ffffff' })
const { args, color } = toRefs(props)
const { invalidate } = useTresContext()
watch(args, () => invalidate())

const octahedronRef = shallowRef()

defineExpose({
  instance: octahedronRef,
})
</script>

<template>
  <TresMesh
    ref="octahedronRef"
    v-bind="$attrs"
  >
    <TresOctahedronGeometry :args="args" />
    <slot>
      <TresMeshBasicMaterial :color="color" />
    </slot>
  </TresMesh>
</template>
