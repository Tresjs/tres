<script setup lang="ts">
import { type TresColor, useTres } from '@tresjs/core'
import { shallowRef, toRefs, watch } from 'vue'
import type { PlaneGeometry } from 'three'

export interface PlaneProps {
  /**
   * The width, height, widthSegments and heightSegments of the plane.
   * @default [1, 1, 1, 1]
   * @type {number[]}
   * @memberof PlaneProps
   * @see https://threejs.org/docs/#api/en/geometries/PlaneGeometry
   */
  args?: ConstructorParameters<typeof PlaneGeometry>
  /**
   * The color of the plane.
   * @default 0xffffff
   * @type {TresColor}
   * @memberof PlaneProps
   * @see https://threejs.org/docs/#api/en/materials/MeshBasicMaterial
   */
  color?: TresColor
}

const props = withDefaults(defineProps<PlaneProps>(), { args: () => [1, 1], color: '#ffffff' })
const { invalidate } = useTres()

const { args, color } = toRefs(props)
watch(args, () => {
  invalidate()
})

const planeRef = shallowRef()

defineExpose({
  instance: planeRef,
})
</script>

<template>
  <TresMesh
    ref="planeRef"
    :rotation="[-Math.PI / 2, 0, 0]"
  >
    <TresPlaneGeometry :args="args" />
    <slot>
      <TresMeshBasicMaterial :color="color" />
    </slot>
  </TresMesh>
</template>
