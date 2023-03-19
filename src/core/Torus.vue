<script setup lang="ts">
import { TresColor, TresObject } from '@tresjs/core'
import { shallowRef } from 'vue'

export interface TorusProps extends TresObject {
  /**
   * The radius, tube, radialSegments, tubularSegments, arc of the torus.
   * @default [1, 1, 16, 80, Math.PI * 2]
   * @type {number[]}
   * @memberof TorusProps
   * @see https://threejs.org/docs/#api/en/geometries/TorusGeometry
   */
  args?: number[]
  /**
   * The color of the torus.
   * @default 0xffffff
   * @type {TresColor}
   * @memberof TorusProps
   * @see https://threejs.org/docs/#api/en/materials/MeshBasicMaterial
   */
  color?: TresColor
}

withDefaults(defineProps<TorusProps>(), {
  args: () => [1, 1, 16, 80],
  color: '0xffffff',
})

const torusRef = shallowRef()

defineExpose({
  value: torusRef,
})
</script>
<template>
  <TresMesh ref="torusRef" v-bind="$attrs">
    <TresTorusGeometry :args="args" />
    <slot>
      <TresMeshBasicMaterial :color="color" />
    </slot>
  </TresMesh>
</template>
