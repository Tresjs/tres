<script setup lang="ts">
import { type TresColor, useTres } from '@tresjs/core'
import { shallowRef, toRefs, watch } from 'vue'

import type { BoxGeometry } from 'three'

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
const { invalidate } = useTres()

const { args, color } = toRefs(props)
watch(args, () => {
  invalidate()
})

const boxRef = shallowRef()

defineExpose({
  instance: boxRef,
})
</script>

<template>
  <TresMesh ref="boxRef">
    <TresBoxGeometry :args="args" />
    <slot>
      <TresMeshBasicMaterial :color="color" />
    </slot>
  </TresMesh>
</template>
