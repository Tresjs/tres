<script setup lang="ts">
import { AdditiveBlending, Color, Mesh, MeshBasicMaterial, PlaneGeometry } from 'three'
import { Line2, LineGeometry, LineMaterial } from 'three-stdlib'

interface ColFill {
  colNum: number
  color: string
}

export interface TerrainProps {
  color?: string
  fill: string
  numDivisions?: number
  colFills?: ColFill[]
  progress?: number
}

const props = withDefaults(defineProps<TerrainProps>(), {
  color: '#FFFFFF',
  numDivisions: 19,
  colFills: () => [
    { colNum: 10, color: '#F00' },
    { colNum: 11, color: '#FFFFFF' },
  ],
  progress: 1.0,
})

const OPACITY = 0.2

const lineGeometry = new LineGeometry()
const numDivisions = props.numDivisions
const linePositions: number[] = []
for (let row = 0; row < numDivisions; row++) {
  linePositions.push(row % 2 ? 0.5 : -0.5)
  linePositions.push(row / numDivisions - 0.5)
  linePositions.push(0)
  linePositions.push(row % 2 ? -0.5 : 0.5)
  linePositions.push(row / numDivisions - 0.5)
  linePositions.push(0)
  linePositions.push(row % 2 ? -0.5 : 0.5)
  linePositions.push((row + 1) / numDivisions - 0.5)
  linePositions.push(0)
}

for (let col = 0; col < numDivisions; col++) {
  linePositions.push(col / numDivisions - 0.5)
  linePositions.push(col % 2 ? -0.5 : 0.5)
  linePositions.push(0)
  linePositions.push(col / numDivisions - 0.5)
  linePositions.push(col % 2 ? 0.5 : -0.5)
  linePositions.push(0)
  linePositions.push((col + 1) / numDivisions - 0.5)
  linePositions.push(col % 2 ? 0.5 : -0.5)
  linePositions.push(0)
}
lineGeometry.setPositions(linePositions)

// the material for the grid lines
const lineMaterial = new LineMaterial({
  color: new Color(props.color).getHex(),
  linewidth: 0.001,
  alphaToCoverage: false,
  blending: AdditiveBlending,
})

const grid = new Line2(lineGeometry, lineMaterial)

const matDefault = new MeshBasicMaterial({ color: new Color(props.fill), opacity: OPACITY, blending: AdditiveBlending })
const geo = new PlaneGeometry(1, 1, 1, 1)
const position = geo.attributes.position.array
position[1] = 1
position[4] = 1
position[7] = 0
position[10] = 0
const cols: Mesh[] = []
const offsets: number[] = []
const invNumDivisions = 1 / numDivisions
const mats = props.colFills.reduce(
  (o, c) => {
    o[c.colNum] = new MeshBasicMaterial({ color: new Color(c.color), opacity: OPACITY, blending: AdditiveBlending })
    return o
  },
  {} as Record<number, MeshBasicMaterial>,
)

for (const i of Array.from({ length: props.numDivisions }, (e, i) => i)) {
  const ii = Math.floor(i - props.numDivisions * 0.5)
  const col = new Mesh(geo, ii in mats ? mats[ii] : matDefault)
  col.scale.set(1 / numDivisions, 1 / numDivisions, 1)
  col.position.x = (i - 0.5) * invNumDivisions - 0.5
  col.position.y = -0.5
  grid.add(col)
  cols.push(col)
  offsets.push((i > numDivisions * 0.5 ? i : numDivisions - i + 1) * invNumDivisions)
}

watch(() => props.progress, update)

function update() {
  cols.forEach((col, i) => {
    col.scale.y = Math.abs(Math.floor(Math.sin(props.progress + -offsets[i] * 0.2) * numDivisions)) * invNumDivisions
  })
}
</script>

<template>
  <TresGroup>
    <primitive :object="grid" />
  </TresGroup>
</template>
