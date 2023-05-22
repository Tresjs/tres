<script setup lang="ts">
import { TresColor } from '@tresjs/core'
import { BoxGeometry } from 'three'
import { watchEffect } from 'vue'

import { shallowRef } from 'vue'

export type BoxProps = {
  /**
   * The width, height and depth of the box.
   * @default [1, 1, 1]
   * @type {number[]}
   * @memberof BoxProps
   * @see https://threejs.org/docs/#api/en/geometries/BoxGeometry
   *
   */
  args?: ConstructorParameters<typeof BoxGeometry>
  /**
   * The color of the box.
   * @default 0xffffff
   * @type {TresColor}
   * @memberof BoxProps
   * @see https://threejs.org/docs/#api/en/materials/MeshBasicMaterial
   */
  color?: TresColor
  wireframe?: boolean
}

// TODO: remove disable once eslint is updated to support vue 3.3
// eslint-disable-next-line vue/no-setup-props-destructure
const {
  args = [1, 1, 1],
  color = '0xffffff',
  wireframe = false,
} = defineProps<{
  args?: ConstructorParameters<typeof BoxGeometry>
  color?: TresColor
  wireframe?: boolean
}>()

const boxRef = shallowRef()

watchEffect(() => {
  console.log('wireframe', wireframe)
})

defineExpose({
  value: boxRef,
})
</script>
<template>
  <TresMesh ref="boxRef" v-bind="$attrs">
    <TresBoxGeometry :args="args" />
    <slot>
      <TresMeshBasicMaterial :color="color" />
    </slot>
  </TresMesh>
</template>
