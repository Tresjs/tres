<script setup lang="ts">
import type { Object3D, Object3DEventMap } from 'three'
import { LOD } from 'three'
import { isReactive, onMounted, shallowRef, watch } from 'vue'

interface LODProps {
  /**
   * The distances at which to display each level of detail.
   * There should be one `levels` value for each `LOD` child.
   */
  levels: number[]
  /**
  * Threshold used to avoid flickering at LOD boundaries, as a fraction of distance
  * @default 0.0
  */
  hysteresis?: number
}

const props = withDefaults(
  defineProps<LODProps>(),
  {
    hysteresis: 0.0,
  },
)

const lodRef = shallowRef(new LOD())

function onChange() {
  // NOTE: Check validity of `levels`.
  // It should exist. It should be an array. Every value should be a number.
  const distances = (props.levels && props.levels.length && props.levels.every(n => typeof n === 'number')) ? [...props.levels] : [1000]

  // NOTE: Add `levels` values if there fewer `levels` values than `children`.
  while (distances.length < lodRef.value.children.length) {
    distances.push(Math.abs(distances[distances.length - 1]) * 2)
  }

  // NOTE: Levels can be in any order, but the THREE implementation doesn't work
  // work properly unless the levels are pushed in ascending order of `distance`.
  // So, construct ascending order of `distance`.
  const levels = [] as { distance: number, hysteresis: number, object: Object3D<Object3DEventMap> }[]
  for (let i = 0; i < lodRef.value.children.length; i++) {
    const hysteresis = props.hysteresis
    const distance = distances[i]
    const object = lodRef.value.children[i] as Object3D<Object3DEventMap>
    levels.push({ hysteresis, distance, object })
  }
  levels.sort((a, b) => a.distance - b.distance)

  // NOTE: Clear the current LOD levels.
  lodRef.value.levels.length = 0

  // NOTE: Push levels in ascending order of `distance`.
  levels.forEach(level => lodRef.value.levels.push(level))
}

if (isReactive(props.levels)) {
  watch(() => props.levels, onChange)
}

if (isReactive(props.hysteresis)) {
  watch(() => props.hysteresis, onChange)
}

onMounted(onChange)

defineExpose({
  instance: lodRef,
})
</script>

<template>
  <TresLOD ref="lodRef">
    <slot></slot>
  </TresLOD>
</template>
