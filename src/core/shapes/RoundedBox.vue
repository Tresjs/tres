<script setup lang="ts">
import { useTresContext } from '@tresjs/core'
import { RoundedBoxGeometry } from 'three-stdlib'
import { shallowRef, toRefs, watch } from 'vue'
import type { TresColor } from '@tresjs/core'

import type { BoxGeometry } from 'three'

export interface BoxProps {
  /**
   * The width, height, depth, segments and radius.
   * @default [1, 1, 1, 2, 0.1]
   * @type {number[]}
   * @memberof BoxProps
   * @see https://github.com/mrdoob/three.js/blob/master/examples/jsm/geometries/RoundedBoxGeometry.js
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

const props = withDefaults(defineProps<BoxProps>(), { args: () => [1, 1, 1, 2, 0.1], color: '#ffffff' })

const { args, color } = toRefs(props)
const { invalidate, extend } = useTresContext()
extend({ RoundedBoxGeometry })
watch(args, () => invalidate())

const roundedBoxRef = shallowRef()

defineExpose({ instance: roundedBoxRef })
</script>

<template>
  <TresMesh ref="roundedBoxRef">
    <TresRoundedBoxGeometry :args="args" />
    <slot>
      <TresMeshBasicMaterial :color="color" />
    </slot>
  </TresMesh>
</template>
