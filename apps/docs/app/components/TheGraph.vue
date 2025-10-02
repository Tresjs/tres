<script setup lang="ts">
// I was trying to make this a generic graph component that could be reused in the docs
// but it got a bit out of hand. Still, it might be useful for future stuff
// so I'm keeping it here for now.
import { useElementSize } from '@vueuse/core'

interface DataPoint {
  x: number
  y: number
}

interface Dataset {
  label: string
  points: DataPoint[]
  color: string
  strokeWidth?: number
  strokeDasharray?: string | number
  strokeDashoffset?: string | number
}

interface UIConfig {
  strokeWidth?: number
  fillColor?: string
  backgroundColor?: string
  gridColor?: string
  showGrid?: boolean
  showAxes?: [boolean, boolean] // [x-axis, y-axis]
  showLabels?: [boolean, boolean] // [x-labels, y-labels]
  axisColor?: string
  labelColor?: string
  fontSize?: number
  padding?: number
  dataPadding?: [number, number] // [x-padding %, y-padding %] - extends data bounds
  labelIntervals?: [number, number] // [x-interval, y-interval] - step size for labels
}

const props = withDefaults(defineProps<{
  data: Dataset[]
  ui?: UIConfig
}>(), {
  ui: () => ({}),
})

const defaultUI: Required<UIConfig> = {
  strokeWidth: 1.5,
  fillColor: 'transparent',
  backgroundColor: 'transparent',
  gridColor: '#e5e7eb',
  showGrid: false,
  showAxes: [false, false], // [x-axis, y-axis]
  showLabels: [false, false], // [x-labels, y-labels]
  axisColor: '#6b7280',
  labelColor: '#374151',
  fontSize: 12,
  padding: 40,
  dataPadding: [5, 10], // [x-padding %, y-padding %] - 5% x, 10% y
  labelIntervals: [1, 0.5], // [x-interval, y-interval] - auto-calculated if not set
}

const config = computed(() => ({ ...defaultUI, ...props.ui }))

const containerRef = ref<HTMLElement>()
const { width, height } = useElementSize(containerRef)

const viewBox = computed(() => `0 0 ${width.value} ${height.value}`)

const bounds = computed(() => {
  if (props.data.length === 0) {
    return { minX: 0, maxX: 1, minY: 0, maxY: 1 }
  }

  const allPoints = props.data.flatMap(dataset => dataset.points)
  const xs = allPoints.map(d => d.x)
  const ys = allPoints.map(d => d.y)

  const rawMinX = Math.min(...xs)
  const rawMaxX = Math.max(...xs)
  const rawMinY = Math.min(...ys)
  const rawMaxY = Math.max(...ys)

  // Apply data padding (percentage of range)
  const [xPaddingPercent, yPaddingPercent] = config.value.dataPadding

  const xRange = rawMaxX - rawMinX
  const yRange = rawMaxY - rawMinY

  const xPadding = (xRange * xPaddingPercent) / 100
  const yPadding = (yRange * yPaddingPercent) / 100

  return {
    minX: rawMinX - xPadding,
    maxX: rawMaxX + xPadding,
    minY: rawMinY - yPadding,
    maxY: rawMaxY + yPadding,
  }
})

const scale = computed(() => {
  const { minX, maxX, minY, maxY } = bounds.value
  const { padding } = config.value

  const dataWidth = maxX - minX
  const dataHeight = maxY - minY

  return {
    x: (width.value - 2 * padding) / (dataWidth || 1),
    y: (height.value - 2 * padding) / (dataHeight || 1),
  }
})

const transformPoint = (point: DataPoint) => {
  const { minX, minY } = bounds.value
  const { padding } = config.value

  return {
    x: padding + (point.x - minX) * scale.value.x,
    y: height.value - padding - (point.y - minY) * scale.value.y,
  }
}

const createPathData = (points: DataPoint[]) => {
  if (points.length === 0) {
    return ''
  }

  const transformedPoints = points.map(transformPoint)

  return transformedPoints.reduce((path, point, index) => {
    const command = index === 0 ? 'M' : 'L'
    return `${path} ${command} ${point.x} ${point.y}`
  }, '').trim()
}

const gridLines = computed(() => {
  const { padding } = config.value
  const lines = []

  // Vertical grid lines
  for (let i = 1; i < 10; i++) {
    const x = padding + (width.value - 2 * padding) * (i / 10)
    lines.push({ x1: x, y1: padding, x2: x, y2: height.value - padding })
  }

  // Horizontal grid lines
  for (let i = 1; i < 5; i++) {
    const y = padding + (height.value - 2 * padding) * (i / 5)
    lines.push({ x1: padding, y1: y, x2: width.value - padding, y2: y })
  }

  return lines
})

const axisLabels = computed(() => {
  const { minX, maxX, minY, maxY } = bounds.value
  const { padding, fontSize, labelIntervals } = config.value
  const [xInterval, yInterval] = labelIntervals
  const labels = []

  // Y-axis labels (left side) - use interval
  if (yInterval > 0) {
    const startY = Math.ceil(minY / yInterval) * yInterval
    const endY = Math.floor(maxY / yInterval) * yInterval

    for (let value = startY; value <= endY; value += yInterval) {
      // Handle floating point precision
      const roundedValue = Math.round(value / yInterval) * yInterval
      const y = height.value - padding - (roundedValue - minY) * scale.value.y

      labels.push({
        type: 'y',
        x: padding - 10,
        y: y + fontSize / 3,
        text: roundedValue.toFixed(yInterval < 1 ? 1 : 0),
      })
    }
  }

  // X-axis labels (bottom) - use interval
  if (xInterval > 0) {
    const startX = Math.ceil(minX / xInterval) * xInterval
    const endX = Math.floor(maxX / xInterval) * xInterval

    for (let value = startX; value <= endX; value += xInterval) {
      // Handle floating point precision
      const roundedValue = Math.round(value / xInterval) * xInterval
      const x = padding + (roundedValue - minX) * scale.value.x

      labels.push({
        type: 'x',
        x,
        y: height.value - padding + fontSize + 5,
        text: roundedValue.toFixed(xInterval < 1 ? 1 : 0),
      })
    }
  }

  return labels
})
</script>

<template>
  <div ref="containerRef" class="graph-container">
    <svg
      :viewBox="viewBox"
      :width="width"
      :height="height"
      class="svg-graph"
      :style="{ backgroundColor: config.backgroundColor }"
    >
      <!-- Background -->
      <rect
        :width="width"
        :height="height"
        :fill="config.backgroundColor"
      />

      <!-- Grid -->
      <g v-if="config.showGrid" class="grid">
        <line
          v-for="(line, index) in gridLines"
          :key="`grid-${index}`"
          :x1="line.x1"
          :y1="line.y1"
          :x2="line.x2"
          :y2="line.y2"
          :stroke="config.gridColor"
          stroke-width="1"
          opacity="0.3"
        />
      </g>

      <!-- Axes -->
      <g class="axes">
        <!-- X axis (y=0 line) -->
        <line
          v-if="config.showAxes[0]"
          :x1="config.padding"
          :y1="transformPoint({ x: 0, y: 0 }).y"
          :x2="width - config.padding"
          :y2="transformPoint({ x: 0, y: 0 }).y"
          :stroke="config.axisColor"
          stroke-width="2"
        />

        <!-- Y axis (x=0 line) -->
        <line
          v-if="config.showAxes[1]"
          :x1="transformPoint({ x: 0, y: 0 }).x"
          :y1="config.padding"
          :x2="transformPoint({ x: 0, y: 0 }).x"
          :y2="height - config.padding"
          :stroke="config.axisColor"
          stroke-width="2"
        />
      </g>

      <!-- Axis labels -->
      <g class="labels">
        <text
          v-for="(label, index) in axisLabels"
          v-show="(label.type === 'x' && config.showLabels[0]) || (label.type === 'y' && config.showLabels[1])"
          :key="`label-${index}`"
          :x="label.x"
          :y="label.y"
          :fill="config.labelColor"
          :font-size="config.fontSize"
          :text-anchor="label.type === 'x' ? 'middle' : 'end'"
          font-family="system-ui, sans-serif"
        >
          {{ label.text }}
        </text>
      </g>

      <!-- Data paths and points for each dataset -->
      <g v-for="(dataset, datasetIndex) in data" :key="`dataset-${datasetIndex}`">
        <!-- Data path -->
        <path
          v-if="createPathData(dataset.points)"
          :d="createPathData(dataset.points)"
          :stroke="dataset.color"
          :stroke-width="dataset.strokeWidth ?? config.strokeWidth"
          v-bind="{
            ...(dataset.strokeDasharray ? { 'stroke-dasharray': dataset.strokeDasharray } : {}),
            ...(dataset.strokeDashoffset ? { 'stroke-dashoffset': dataset.strokeDashoffset } : {}),
          }"
          :fill="config.fillColor"
          vector-effect="non-scaling-stroke"
        />

        <!-- Data points -->
        <!-- <g class="data-points">
          <circle
            v-for="(point, index) in dataset.points"
            :key="`point-${datasetIndex}-${index}`"
            :cx="transformPoint(point).x"
            :cy="transformPoint(point).y"
            :r="(dataset.strokeWidth ?? config.strokeWidth) + 1"
            :fill="dataset.color"
          />
        </g> -->
      </g>
    </svg>
  </div>
</template>

<style scoped>
.graph-container {
  width: 100%;
  height: 100%;
  min-height: 200px;
}

.svg-graph {
  width: 100%;
  height: 100%;
  transition: all 0.3s ease;
}

.grid line {
  transition: opacity 0.3s ease;
}

path {
  transition: d 0.5s ease;
}

circle {
  transition:
    cx 0.5s ease,
    cy 0.5s ease;
}
</style>
