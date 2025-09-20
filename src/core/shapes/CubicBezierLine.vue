<script setup lang="ts">
import { CubicBezierCurve3, Vector3 } from 'three'
import Line2 from './Line2.vue'
import { computed, shallowRef } from 'vue'

interface CubicBezierLineProps {
  start: Vector3 | [number, number, number]
  end: Vector3 | [number, number, number]
  midA: Vector3 | [number, number, number]
  midB: Vector3 | [number, number, number]
  segments?: number
}

const props = withDefaults(defineProps<CubicBezierLineProps>(), {
  segments: 20,
})

const points = computed(() => {
  const startV = props.start instanceof Vector3 ? props.start : new Vector3(...props.start)
  const endV = props.end instanceof Vector3 ? props.end : new Vector3(...props.end)
  const midAV = props.midA instanceof Vector3 ? props.midA : new Vector3(...props.midA)
  const midBV = props.midB instanceof Vector3 ? props.midB : new Vector3(...props.midB)
  return new CubicBezierCurve3(startV, midAV, midBV, endV).getPoints(props.segments)
})

const lineRef = shallowRef()

defineExpose({ instance: lineRef })
</script>

<template>
  <Line2 ref="lineRef" :points="points" />
</template>
