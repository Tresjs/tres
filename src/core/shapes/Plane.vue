<script setup lang="ts">
import type { TresColor } from '@tresjs/core'
import type { PlaneGeometry } from 'three'
import { shallowRef, toRefs } from 'vue'

export interface PlaneProps {
  /**
   * The width and height, widthSegments, heightSegments of the plane.
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

const { args, color } = toRefs(props)
const planeRef = shallowRef()

defineExpose({
  value: planeRef,
})
</script>

<template>
  <TresMesh
    ref="planeRef"
    :rotation="[-Math.PI / 2, 0, 0]"
    v-bind="$attrs"
  >
    <TresPlaneGeometry :args="args" />
    <slot>
      <TresMeshBasicMaterial :color="color" />
    </slot>
  </TresMesh>
</template>
