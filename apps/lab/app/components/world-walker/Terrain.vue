<script setup lang="ts">
import { useTextures } from '@tresjs/cientos'
import { HeightfieldCollider, RigidBody } from '@tresjs/rapier'
import { RepeatWrapping } from 'three'
import { getHeightSampler } from './heightmap'
import { buildTerrainGeometry } from './terrain'
import { HEIGHT_SCALE, HEIGHTFIELD_ROWS, TERRAIN_SIZE } from './constants'

// the height map is read on the CPU through the sampler, so only the surface maps are uploaded
const { textures } = useTextures([
  '/textures/world-walker/color.jpg',
  '/textures/world-walker/normal.jpg',
  '/textures/world-walker/ao.jpg',
])

watchEffect(() => {
  for (const map of textures.value) {
    if (!map) { continue }
    map.wrapS = RepeatWrapping
    map.wrapT = RepeatWrapping
    map.repeat.set(8, 8)
    map.needsUpdate = true
  }
})

// one shared sampler: the mesh below, the collider below it and the vegetation all read
// the same grid, so grass roots land on the surface the capsule actually stands on
const sampler = await getHeightSampler()
const geometry = buildTerrainGeometry(sampler)

// rapier wants the heights matrix column-major (row = z, col = x)
const size = sampler.resolution
const heights = new Float32Array(size * size)
for (let row = 0; row < size; row++) {
  for (let col = 0; col < size; col++) {
    heights[col * size + row] = sampler.heights[row * size + col]!
  }
}
</script>

<template>
  <RigidBody type="fixed" :collider="false">
    <HeightfieldCollider
      :args="[
        HEIGHTFIELD_ROWS,
        HEIGHTFIELD_ROWS,
        heights,
        { x: TERRAIN_SIZE,
          y: HEIGHT_SCALE,
          z: TERRAIN_SIZE },
      ]"
    />
  </RigidBody>
  <TresMesh :geometry="geometry">
    <TresMeshStandardMaterial
      v-if="textures[0]"
      :map="textures[0]"
      :normal-map="textures[1]"
      :ao-map="textures[2]"
    />
  </TresMesh>
</template>
