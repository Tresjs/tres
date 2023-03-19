<script setup lang="ts">
import { TresColor, TresObject } from '@tresjs/core'
import { shallowRef } from 'vue'

export interface IcosahedronProps extends TresObject {
  /**
   * The radius and detail of the icosahedron.
   * @default [1, 0]
   * @type {number[]}
   * @memberof IcosahedronProps
   * @see https://threejs.org/docs/#api/en/geometries/IcosahedronGeometry
   */
  args?: number[]
  /**
   * The color of the icosahedron.
   * @default 0xffffff
   * @type {TresColor}
   * @memberof IcosahedronProps
   * @see https://threejs.org/docs/#api/en/materials/MeshBasicMaterial
   */
  color?: TresColor
}
withDefaults(defineProps<IcosahedronProps>(), {
  args: () => [1, 0],
  color: '0xffffff',
})

const icosahedronRef = shallowRef()

defineExpose({
  value: icosahedronRef,
})
</script>
<template>
  <TresMesh ref="icosahedronRef" v-bind="$attrs">
    <TresIcosahedronGeometry :args="args" />
    <slot>
      <TresMeshBasicMaterial :color="color" />
    </slot>
  </TresMesh>
</template>
