<script setup lang="ts">
import { useTextures } from '@tresjs/cientos'
import { RigidBody, HeightfieldCollider } from '@tresjs/rapier'
import { RepeatWrapping } from 'three'
import { TERRAIN_SIZE, HEIGHT_SCALE, HEIGHTFIELD_ROWS } from './constants'

const { textures } = useTextures([
  '/textures/world-walker/height.jpg',
  '/textures/world-walker/color.jpg',
  '/textures/world-walker/normal.png',
  '/textures/world-walker/ao.png',
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

const img = new Image()
img.src = '/textures/world-walker/height.jpg'
await img.decode()

// downsample the displacement map into a heights matrix (column-major, row = z, col = x)
const size = HEIGHTFIELD_ROWS + 1
const canvas = document.createElement('canvas')
canvas.width = size
canvas.height = size
const ctx = canvas.getContext('2d')!
ctx.drawImage(img, 0, 0, size, size)
const { data } = ctx.getImageData(0, 0, size, size)

const heights = new Float32Array(size * size)
for (let row = 0; row < size; row++) {
  for (let col = 0; col < size; col++) {
    heights[col * size + row] = data[(row * size + col) * 4]! / 255
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
