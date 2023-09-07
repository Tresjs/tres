<script setup lang="ts">
import type { TresColor } from '@tresjs/core'
import type { BoxGeometry } from 'three'

import { shallowRef, toRefs } from 'vue'

export interface BoxProps {
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
}

const props = withDefaults(defineProps<BoxProps>(), { args: () => [1, 1, 1], color: '#ffffff' })

const { args, color } = toRefs(props)

const boxRef = shallowRef()

defineExpose({
  value: boxRef,
})
</script>

<template>
  <TresMesh
    ref="boxRef"
    v-bind="$attrs"
  >
    <TresBoxGeometry :args="args" />
    <slot>
      <TresMeshBasicMaterial :color="color" />
    </slot>
  </TresMesh>
</template>
