<script lang="ts" setup>
import { PlaneGeometry } from 'three'
import { ImprovedNoise } from 'three-stdlib'
import { shallowRef } from 'vue'

export interface TerrainProps {
  color: string
}

const props = defineProps<TerrainProps>()

const width = 20
const depth = 20

const NOISE_SCALE = 0.3
const NOISE_SEED = 40

const landscapeRef = shallowRef({ position: { x: 0, y: 0, z: 0 } })
const geometryRef = shallowRef(undefined as unknown as PlaneGeometry)

const noise = new ImprovedNoise().noise
function getVertexArray(offset = 0) {
  const geometry = new PlaneGeometry(width - 1, depth - 1, width, depth)
  const vertices = geometry.attributes.position.array
  const numVertices = vertices.length / 3
  for (let v = 0; v < numVertices; v++) {
    const i = v * 3
    const x = vertices[i]
    const y = vertices[i + 1] + offset
    vertices[i + 2] = Math.abs(noise((NOISE_SEED + x) * NOISE_SCALE, (NOISE_SEED + y) * NOISE_SCALE, 0)) * 7
    vertices[i + 2] *= 1 - Math.abs(Math.sin(x * 0.2)) + 0.1
    vertices[i + 2] *= Math.cos((Math.PI * y) / depth)
    vertices[i + 2] += Math.sin(y * 0.133) * 0.5
  }
  return vertices
}
</script>

<template>
  <TresGroup ref="landscapeRef">
    <slot />
    <TresMesh :rotation="[-Math.PI * 0.5, 0, 0]">
      <TresPlaneGeometry ref="geometryRef" :args="[width, depth, width, depth]"
        :attributes-position-array="getVertexArray()" />
      <TresMeshBasicMaterial :color="props.color" />
    </TresMesh>
  </TresGroup>
</template>
