<script setup lang="ts">
import { useTres } from '@tresjs/core'
import { shallowRef, toRefs, watch } from 'vue'
import type { TresColor } from '@tresjs/core'

import { RoundedPlaneGeometry } from './RoundedPlaneGeometry'

export interface RoundedPlaneProps {
  /**
   * The width, height, radius and segments.
   * @default [1, 1, 0.2, 16]
   * @type {[width?: number, height?: number, radius?: number, segments?: number]}
   * @memberof RoundedPlaneProps
   */
  args?: ConstructorParameters<typeof RoundedPlaneGeometry>
  /**
   * The color of the plane.
   * @default 0xffffff
   * @type {TresColor}
   * @memberof RoundedPlaneProps
   * @see https://threejs.org/docs/#api/en/materials/MeshBasicMaterial
   */
  color?: TresColor
}

const props = withDefaults(defineProps<RoundedPlaneProps>(), { args: () => [1, 1, 0.2, 16], color: '#ffffff' })

const { args, color } = toRefs(props)
const { invalidate, extend } = useTres()

extend({ RoundedPlaneGeometry })
watch(args, () => {
  invalidate()
})
const roundedPlaneRef = shallowRef()

defineExpose({ instance: roundedPlaneRef })
</script>

<template>
  <TresMesh ref="roundedPlaneRef">
    <TresRoundedPlaneGeometry :args="args" />
    <slot>
      <TresMeshBasicMaterial :color="color" />
    </slot>
  </TresMesh>
</template>
