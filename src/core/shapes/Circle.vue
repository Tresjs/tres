<script setup lang="ts">
import { type TresColor, useTresContext } from '@tresjs/core'
import type { CircleGeometry } from 'three'
import { shallowRef, toRefs, watch } from 'vue'

export interface CircleProps {
  /**
   * The radius, segment, thetaStart, thetaLength of the circle.
   * @default [1, 32, 0, Math.PI * 2]
   * @type {number[]}
   * @memberof CircleProps
   * @see https://threejs.org/docs/#api/en/geometries/CircleGeometry
   */
  args?: ConstructorParameters<typeof CircleGeometry>
  /**
   * The color of the circle.
   * @default 0xffffff
   * @type {TresColor}
   * @memberof CircleProps
   * @see https://threejs.org/docs/#api/en/materials/MeshBasicMaterial
   */
  color?: TresColor
}

const props = withDefaults(defineProps<CircleProps>(), { args: () => [1, 32, 0, Math.PI * 2], color: '#ffffff' })
const { args, color } = toRefs(props)
const { invalidate } = useTresContext()
watch(args, () => invalidate())

const circleRef = shallowRef()

defineExpose({
  instance: circleRef,
})
</script>

<template>
  <TresMesh
    ref="circleRef"
    v-bind="$attrs"
  >
    <TresCircleGeometry :args="args" />
    <slot>
      <TresMeshBasicMaterial :color="color" />
    </slot>
  </TresMesh>
</template>
