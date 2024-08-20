<script setup lang="ts">
import { type TresColor, useTresContext } from '@tresjs/core'
import type { IcosahedronGeometry } from 'three'
import { shallowRef, toRefs, watch } from 'vue'

export interface IcosahedronProps {
  /**
   * The radius and detail of the icosahedron.
   * @default [1, 0]
   * @type {number[]}
   * @memberof IcosahedronProps
   * @see https://threejs.org/docs/#api/en/geometries/IcosahedronGeometry
   */
  args?: ConstructorParameters<typeof IcosahedronGeometry>
  /**
   * The color of the icosahedron.
   * @default 0xffffff
   * @type {TresColor}
   * @memberof IcosahedronProps
   * @see https://threejs.org/docs/#api/en/materials/MeshBasicMaterial
   */
  color?: TresColor
}

const props = withDefaults(defineProps<IcosahedronProps>(), { args: () => [1, 0], color: '#ffffff' })
const { args, color } = toRefs(props)
const { invalidate } = useTresContext()
watch(args, () => invalidate())

const icosahedronRef = shallowRef()

defineExpose({
  instance: icosahedronRef,
})
</script>

<template>
  <TresMesh
    ref="icosahedronRef"
    v-bind="$attrs"
  >
    <TresIcosahedronGeometry :args="args" />
    <slot>
      <TresMeshBasicMaterial :color="color" />
    </slot>
  </TresMesh>
</template>
