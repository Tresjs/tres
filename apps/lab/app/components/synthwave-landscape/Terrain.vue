<script lang="ts" setup>
import {
  AdditiveBlending,
  BufferGeometry,
  Color,
  Float32BufferAttribute,
  Group,
  Mesh,
  MeshPhongMaterial,
  PlaneGeometry,
  Points,
  PointsMaterial,
  Vector3,
} from 'three'
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry'
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial'
import { Line2 } from 'three/examples/jsm/lines/Line2'
import { clamp, lerp } from 'three/src/math/MathUtils'

export interface TerrainProps {
  colorFills: string
  colorLines: string
  colorDust: string
  speed: number
  terrainGenFn: (x: number, y: number) => [number, number, number]
  shininess: number
  cameraZ: number
}

const props = defineProps<TerrainProps>()

const NUM_CHUNKS = 20
const ROWS_PER_CHUNK = 6
const COLS_PER_CHUNK = 30
const NUM_DUST_PER_CHUNK = 150

const meshMaterial = new MeshPhongMaterial({
  color: props.colorFills,
  flatShading: true,
  shininess: 50 * props.shininess,
})

watch(
  () => props.shininess,
  () => {
    meshMaterial.shininess = 10 + props.shininess * 90
  },
)

const lineMaterial = new LineMaterial({
  color: new Color(props.colorLines).getHex(),
  worldUnits: false,
  alphaToCoverage: false,
})

const dustMaterial = new PointsMaterial({
  color: props.colorDust,
  size: 0.2,
  blending: AdditiveBlending,
  depthTest: true,
  transparent: true,
})

function getChunk(chunkI = 0) {
  const geometry = new PlaneGeometry(1, 1 / NUM_CHUNKS, COLS_PER_CHUNK, ROWS_PER_CHUNK)
  const chunk = new Mesh(geometry, meshMaterial)
  const positions = geometry.attributes.position.array
  const offsetY = chunkI / NUM_CHUNKS
  const numVertices = positions.length / 3
  for (let v = 0; v < numVertices; v++) {
    const i = v * 3
    const xx = positions[i]
    const yy = positions[i + 1] + offsetY
    const [x, y, z] = props.terrainGenFn(xx, yy)
    positions[i] = x
    positions[i + 1] = y
    positions[i + 2] = z - offsetY
  }
  return chunk
}

function getLines(mesh: Mesh) {
  const vis = []
  for (let row = 0; row < ROWS_PER_CHUNK; row++) {
    const rowOffset = row * (COLS_PER_CHUNK + 1)
    if (row % 2 === 0) {
      for (let col = 0; col < COLS_PER_CHUNK; col++) {
        for (let point = 0; point < 4; point++) {
          vis.push(rowOffset + col + point + (point < 2 ? 0 : COLS_PER_CHUNK - 1))
        }
      }
    }
    else {
      for (let col = COLS_PER_CHUNK - 1; col >= 0; col--) {
        for (let point = 3; point >= 0; point--) {
          vis.push(rowOffset + col + point + (point < 2 ? 0 : COLS_PER_CHUNK - 1))
        }
      }
    }
  }

  const srcVerts = mesh.geometry.attributes.position.array
  const vertices: number[] = []
  vis.forEach(vi => vertices.push(srcVerts[vi * 3], srcVerts[vi * 3 + 1], srcVerts[vi * 3 + 2]))
  const lineGeometry = new LineGeometry()
  lineGeometry.setPositions(vertices)
  return new Line2(lineGeometry, lineMaterial)
}

const rangeSplit = (n: number) => n * (Math.random() - 0.5)

function getDust() {
  const geometry = new BufferGeometry()
  const vertices = []
  for (let i = 0; i < NUM_DUST_PER_CHUNK; i++) {
    const x = rangeSplit(2)
    const y = rangeSplit(10)
    const z = Math.random() / NUM_CHUNKS
    vertices.push(x, y, z)
  }

  geometry.setAttribute('position', new Float32BufferAttribute(vertices, 3))
  const particles = new Points(geometry, dustMaterial)
  return particles
}

function easeOutSine(x: number): number {
  return Math.sin((x * Math.PI) / 2)
}

const v = new Vector3(0, 0, 0)

const { onBeforeRender } = useLoop()
onBeforeRender(({ delta }) => {
  group.position.z += delta * props.speed
  let p = group.children[NUM_CHUNKS - 1].worldToLocal(v.set(0, 0, props.cameraZ)).z
  let progress = p * NUM_CHUNKS * -1 - 1
  lineMaterial.linewidth = clamp(Math.sin(progress * Math.PI) * 2.2 - 0.5, 0, 1) * 0.001
  while (p < -0.1) {
    group.position.z -= 1 / NUM_CHUNKS
    p = group.children[NUM_CHUNKS - 1].worldToLocal(v.set(0, 0, props.cameraZ)).z
    const c = group.children.pop()
    if (c) {
      group.children.unshift(c)
    }
    group.children.forEach((c, i) => {
      c.position.z = i / NUM_CHUNKS
      c.position.y = 0
    })
    lineMaterial.color = new Color(props.colorLines)
  }
  group.children.forEach((c, i) => {
    c.children[1].visible = i === NUM_CHUNKS - 4
  })
  progress = p * NUM_CHUNKS * -1 - 1
  group.children[0].position.y = lerp(-3, 0, easeOutSine(progress))
})

const conveyor = new Group()
const group = new Group()
conveyor.add(group)
{
  for (let chunkI = 0; chunkI < NUM_CHUNKS; chunkI++) {
    const chunk = new Group()
    const mesh = getChunk(chunkI)
    chunk.add(mesh)
    const lines = getLines(mesh)
    lines.position.y += 0.001
    chunk.add(lines)
    const dust = getDust()
    chunk.add(dust)

    group.add(chunk)
  }
  group.children.forEach((c, i) => (c.position.z = i / NUM_CHUNKS))
  group.position.z = 1
}
</script>

<template>
  <primitive :object="conveyor" />
</template>
