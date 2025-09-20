<script setup lang="ts">
import { type TresColor, useTres } from '@tresjs/core'
import { shallowRef, toRefs, watch } from 'vue'
import type { CircleGeometry } from 'three'

export interface CircleProps {
  /**
   * The radius, segment, thetaStart, thetaLength of the circle.
   * @default [1, 32, 0, Math.PI * 2]
   * @type {any[]}
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
const { invalidate } = useTres()

const { args, color } = toRefs(props)
watch(args, () => {
  invalidate()
})

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
