<script setup lang="ts">
import { TresColor } from '@tresjs/core'
import { IcosahedronGeometry } from 'three'
import { shallowRef } from 'vue'

export type IcosahedronProps = {
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

// TODO: remove disable once eslint is updated to support vue 3.3
// eslint-disable-next-line vue/no-setup-props-destructure
const { args = [1, 0], color = '0xffffff' } = defineProps<IcosahedronProps>()

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
