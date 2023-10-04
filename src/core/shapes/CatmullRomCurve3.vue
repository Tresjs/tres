<script setup lang="ts">
import type { TresColor } from '@tresjs/core'
import { CatmullRomCurve3, Vector3 } from 'three'
import { computed } from 'vue'
import Line2 from './Line2.vue'

type CurveType = 'centripetal' | 'chordal' | 'catmullrom'
type Points = Array<Vector3 | [number, number, number]>

interface CatmullRomCurve3Props {
  segments?: number
  closed?: boolean
  curveType?: CurveType
  tension?: number

  // Line2 properties
  points: Points
  vertexColors?: TresColor[] | undefined
  color?: TresColor
  lineWidth?: number
  alphaToCoverage?: boolean
  dashed?: boolean
  dashSize?: number
  dashScale?: number
  dashOffset?: number
  gapSize?: number
  worldUnits?: boolean
}

const props = withDefaults(defineProps<CatmullRomCurve3Props>(), {
  segments: 20,
  closed: false,
  curveType: 'centripetal',
  tension: 0.5,
})

function getCatmullRomCurve(points: Points, closed: boolean, curveType: CurveType, tension: number) {
  const mappedPoints = points.map(pt =>
    pt instanceof Vector3 ? pt : new Vector3(...(pt as [number, number, number])),
  )

  return new CatmullRomCurve3(mappedPoints, closed, curveType, tension)
}

function getSegmentedPoints(curve: CatmullRomCurve3, segments: number): Vector3[] {
  return curve.getPoints(segments)
}

const curve = computed(() => getCatmullRomCurve(props.points, props.closed, props.curveType, props.tension))
const segmentedPoints = computed(() => getSegmentedPoints(curve.value, props.segments))
</script>

<template>
  <Line2 
    :points="segmentedPoints"
    :vertex-colors="props.vertexColors"
    :color="props.color"
    :lineWidth="props.lineWidth"
    :alphaToCoverage="props.alphaToCoverage"
    :dashed="props.dashed"
    :dashSize="props.dashSize"
    :dashScale="props.dashScale"
    :dashOffset="props.dashOffset"
    :gapSize="props.gapSize"
    :worldUnits="props.worldUnits"
  />
</template>
