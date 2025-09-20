<script setup lang="ts">
import { normalizeColor, useTres } from '@tresjs/core'
import { Vector2, Vector3 } from 'three'
import { Line2, LineGeometry, LineMaterial } from 'three-stdlib'
import { computed, onUnmounted, shallowRef, watch } from 'vue'
import type { TresColor } from '@tresjs/core'
import type { Color } from 'three'

type Points = (Vector3 | Vector2 | [number, number, number] | [number, number] | number)[]
type VertexColors = Array<TresColor>
export interface LineProps {
  points: Points
  vertexColors?: VertexColors | null
  color?: TresColor
  lineWidth?: number
  worldUnits?: boolean
  alphaToCoverage?: boolean
  dashed?: boolean
  dashSize?: number
  gapSize?: number
  dashScale?: number
  dashOffset?: number
}

const props = withDefaults(defineProps<LineProps>(), {
  vertexColors: null,
  color: 'white',
  lineWidth: 1,
  worldUnits: false,
  alphaToCoverage: false,
  dashed: false,
  dashSize: 1,
  gapSize: 1,
  dashScale: 1,
  dashOffset: 0,
})

type PropsType = typeof props

function getInterpolatedVertexColors(vertexColors: VertexColors | null, numPoints: number): Color[] {
  if (!vertexColors || vertexColors.length === 0) {
    return Array.from({ length: numPoints }).fill(normalizeColor(props.color)) as Color[]
  }
  if (vertexColors.length === 1) {
    return Array.from({ length: numPoints }).fill(normalizeColor(vertexColors[0])) as Color[]
  }
  if (vertexColors.length === numPoints) {
    return vertexColors.map(normalizeColor)
  }

  const numSegments = numPoints - 1
  const mappedColors = vertexColors.map(normalizeColor)
  if (closed) { mappedColors.push(mappedColors[0].clone()) }

  const iColors: Color[] = [mappedColors[0]]
  const divisions = numSegments / (mappedColors.length - 1)
  for (let i = 1; i < numSegments; i++) {
    const alpha = (i % divisions) / divisions
    const colorIndex = Math.floor(i / divisions)
    iColors.push(mappedColors[colorIndex].clone().lerp(mappedColors[colorIndex + 1], alpha))
  }
  iColors.push(mappedColors[mappedColors.length - 1])

  return iColors
}

const lineMaterial = new LineMaterial()
const lineGeometry = new LineGeometry()
const line = new Line2(lineGeometry, lineMaterial)
const { sizes, invalidate } = useTres()
const hasVertexColors = computed(() => Array.isArray(props.vertexColors))

function updateLineMaterial(material: LineMaterial, props: PropsType) {
  material.color = normalizeColor(props.color)
  material.linewidth = props.lineWidth
  material.alphaToCoverage = props.alphaToCoverage
  material.worldUnits = props.worldUnits
  material.vertexColors = Array.isArray(props.vertexColors)
  material.dashed = props.dashed
  material.dashScale = props.dashScale
  material.dashSize = props.dashSize
  material.dashOffset = props.dashOffset
  material.gapSize = props.gapSize
  material.needsUpdate = true
}

function updateLineGeometry(geometry: LineGeometry, points: Points, vertexColors: VertexColors | null) {
  const pValues = points.map((p) => {
    if (p instanceof Vector3) {
      return [p.x, p.y, p.z]
    }
    else if (p instanceof Vector2) {
      return [p.x, p.y, 0]
    }
    else if (Array.isArray(p) && p.length === 2) {
      return [p[0], p[1], 0]
    }
    else {
      return p
    }
  }).flat()
  geometry.setPositions(pValues.flat())

  const colors = getInterpolatedVertexColors(vertexColors, points.length).map(c => c.toArray()).flat()
  geometry.setColors(colors)

  line.computeLineDistances()
}

updateLineMaterial(lineMaterial, props)
updateLineGeometry(lineGeometry, props.points, props.vertexColors)
line.computeLineDistances()

watch(() => [
  props.color,
  props.lineWidth,
  props.alphaToCoverage,
  props.worldUnits,
  hasVertexColors,
  props.dashed,
  props.dashScale,
  props.dashSize,
  props.dashOffset,
], () => {
  updateLineMaterial(lineMaterial, props)
  invalidate()
})
watch(() => [props.points, props.vertexColors], () => {
  updateLineGeometry(lineGeometry, props.points, props.vertexColors)
  invalidate()
})
watch(() => [sizes.height, sizes.width], () => {
  lineMaterial.resolution = new Vector2(sizes.width.value, sizes.height.value)
  invalidate()
})

onUnmounted(() => {
  lineGeometry.dispose()
  lineMaterial.dispose()
})

const lineRef = shallowRef()
defineExpose({ instance: lineRef })
</script>

<template>
  <primitive
    :ref="lineRef"
    :object="line"
  />
</template>
