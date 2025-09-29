<script setup lang="ts">
import { QuadraticBezierCurve3, Vector3 } from 'three'
import Line2 from './Line2.vue'
import { computed, shallowRef } from 'vue'

interface QuadraticBezierLineProps {
  start: Vector3 | [number, number, number]
  end: Vector3 | [number, number, number]
  mid?: Vector3 | [number, number, number]
  segments?: number
}

const props = withDefaults(defineProps<QuadraticBezierLineProps>(), {
  segments: 20,
})

const points = computed(() => {
  const startV = props.start instanceof Vector3 ? props.start : new Vector3(...props.start)
  const endV = props.end instanceof Vector3 ? props.end : new Vector3(...props.end)
  const mid = props.mid instanceof Vector3 ? props.mid : (Array.isArray(props.mid) ? new Vector3(...props.mid) : new Vector3(endV.x, startV.y, endV.z))
  return new QuadraticBezierCurve3(startV, mid, endV).getPoints(props.segments)
})

const lineRef = shallowRef()

defineExpose({ instance: lineRef })
</script>

<template>
  <Line2 ref="lineRef" :points="points" />
</template>
