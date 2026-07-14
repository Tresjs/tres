<script setup lang="ts">
import { useTextures } from '@tresjs/cientos'
import { RigidBody, HeightfieldCollider } from '@tresjs/rapier'
import { RepeatWrapping } from 'three'
import { loadHeightImage, readHeightData } from './heightmap'
import { TERRAIN_SIZE, HEIGHT_SCALE, HEIGHTFIELD_ROWS } from './constants'

const { textures } = useTextures([
  '/textures/world-walker/height.jpg',
  '/textures/world-walker/color.jpg',
  '/textures/world-walker/normal.jpg',
  '/textures/world-walker/ao.jpg',
])

// tile color/normal/ao (skip the displacement map at index 0)
watchEffect(() => {
  for (const map of [textures.value[1], textures.value[2], textures.value[3]]) {
    if (!map) continue
    map.wrapS = RepeatWrapping
    map.wrapT = RepeatWrapping
    map.repeat.set(8, 8)
    map.needsUpdate = true
  }
})

// same displacement map the vegetation plants against, downsampled to the collider resolution
const size = HEIGHTFIELD_ROWS + 1
const img = await loadHeightImage()
const rowMajor = readHeightData(img, size)

// rapier wants the heights matrix column-major (row = z, col = x)
const heights = new Float32Array(size * size)
for (let row = 0; row < size; row++) {
  for (let col = 0; col < size; col++) {
    heights[col * size + row] = rowMajor[row * size + col]!
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
        { x: TERRAIN_SIZE, y: HEIGHT_SCALE, z: TERRAIN_SIZE },
      ]"
    />
  </RigidBody>
  <TresMesh :rotation-x="Math.PI * -0.5">
    <TresPlaneGeometry :args="[TERRAIN_SIZE, TERRAIN_SIZE, 256, 256]" />
    <TresMeshStandardMaterial
      v-if="textures[0] && textures[1]"
      :displacement-map="textures[0]"
      :displacement-scale="HEIGHT_SCALE"
      :map="textures[1]"
      :normal-map="textures[2]"
      :ao-map="textures[3]"
    />
  </TresMesh>
</template>
