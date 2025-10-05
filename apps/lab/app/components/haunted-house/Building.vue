<script setup>
import { shallowRef, watch, computed } from 'vue'
import { Float32BufferAttribute } from 'three'
import { useTextures } from '@tresjs/cientos'

const wallRef = shallowRef()
const doorRef = shallowRef()

// Define texture paths for bricks
const brickTexturePaths = [
  'https://raw.githubusercontent.com/Tresjs/assets/main/textures/haunted-house/bricks/color.jpg',
  'https://raw.githubusercontent.com/Tresjs/assets/main/textures/haunted-house/bricks/normal.jpg',
  'https://raw.githubusercontent.com/Tresjs/assets/main/textures/haunted-house/bricks/roughness.jpg',
  'https://raw.githubusercontent.com/Tresjs/assets/main/textures/haunted-house/bricks/ambientOcclusion.jpg',
]

// Define texture paths for door
const doorTexturePaths = [
  'https://raw.githubusercontent.com/Tresjs/assets/main/textures/haunted-house/door/color.jpg',
  'https://raw.githubusercontent.com/Tresjs/assets/main/textures/haunted-house/door/alpha.jpg',
  'https://raw.githubusercontent.com/Tresjs/assets/main/textures/haunted-house/door/ambientOcclusion.jpg',
  'https://raw.githubusercontent.com/Tresjs/assets/main/textures/haunted-house/door/height.jpg',
  'https://raw.githubusercontent.com/Tresjs/assets/main/textures/haunted-house/door/normal.jpg',
  'https://raw.githubusercontent.com/Tresjs/assets/main/textures/haunted-house/door/metalness.jpg',
  'https://raw.githubusercontent.com/Tresjs/assets/main/textures/haunted-house/door/roughness.jpg',
]

// Load brick textures
const {
  textures: brickTextures,
  error: brickError
} = useTextures(brickTexturePaths)

// Load door textures
const {
  textures: doorTextures,
  error: doorError
} = useTextures(doorTexturePaths)

// Create wall material options from loaded textures
const wallOptions = computed(() => ({
  map: brickTextures.value?.[0], // color
  normalMap: brickTextures.value?.[1], // normal
  roughnessMap: brickTextures.value?.[2], // roughness
  aoMap: brickTextures.value?.[3], // ambient occlusion
}))

// Create door material options from loaded textures
const doorOptions = computed(() => ({
  transparent: true,
  displacementScale: 0.1,
  map: doorTextures.value?.[0], // color
  alphaMap: doorTextures.value?.[1], // alpha
  aoMap: doorTextures.value?.[2], // ambient occlusion
  displacementMap: doorTextures.value?.[3], // height/displacement
  normalMap: doorTextures.value?.[4], // normal
  metalnessMap: doorTextures.value?.[5], // metalness
  roughnessMap: doorTextures.value?.[6], // roughness
}))

// Check for texture loading errors
watch([brickError, doorError], ([brickErr, doorErr]) => {
  if (brickErr) {
    console.error('Error loading brick textures:', brickErr)
  }
  if (doorErr) {
    console.error('Error loading door textures:', doorErr)
  }
})
watch(wallRef, (value) => {
  value.geometry.setAttribute('uv2', new Float32BufferAttribute(value.geometry.attributes.uv.array, 2))
})

watch(doorRef, (value) => {
  value.geometry.setAttribute('uv2', new Float32BufferAttribute(value.geometry.attributes.uv.array, 2))
})
</script>

<template>
  <TresGroup>
    <TresMesh ref="doorRef" :position="[0, 0.9, 2.01]">
      <TresPlaneGeometry :args="[2, 2, 100, 100]" />
      <TresMeshStandardMaterial v-bind="doorOptions" />
    </TresMesh>
    <TresMesh :position="[0, 3, 0]" :rotation="[0, Math.PI * 0.25, 0]">
      <TresConeGeometry :args="[3.5, 1, 4]" />
      <TresMeshStandardMaterial color="#b35f45" />
    </TresMesh>
    <TresMesh ref="wallRef" :position="[0, 1.25, 0]" cast-shadow>
      <TresBoxGeometry :args="[4, 2.5, 4]" />
      <TresMeshStandardMaterial v-bind="wallOptions" />
    </TresMesh>
    <TresPointLight :position="[0, 2.2, 2.7]" :args="['#ff7d46', 1, 7]" :shadow-mapSize-width="256"
      :shadow-mapSize-height="256" :shadow-camera-far="7" cast-shadow />
  </TresGroup>
</template>
