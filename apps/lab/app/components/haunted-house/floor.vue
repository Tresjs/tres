<script setup>
import { shallowRef, watch, computed } from 'vue'
import { Float32BufferAttribute, RepeatWrapping, BoxGeometry, MeshStandardMaterial, Mesh } from 'three'
import { useTextures } from '@tresjs/cientos'

const floorRef = shallowRef()
const gravesRef = shallowRef()

// Define texture paths for floor/grass
const floorTexturePaths = [
  'https://raw.githubusercontent.com/Tresjs/assets/main/textures/haunted-house/grass/color.jpg',
  'https://raw.githubusercontent.com/Tresjs/assets/main/textures/haunted-house/grass/normal.jpg',
  'https://raw.githubusercontent.com/Tresjs/assets/main/textures/haunted-house/grass/roughness.jpg',
  'https://raw.githubusercontent.com/Tresjs/assets/main/textures/haunted-house/grass/ambientOcclusion.jpg',
]

// Load floor textures
const {
  textures: floorTextures,
  error: floorError
} = useTextures(floorTexturePaths)

// Configure texture wrapping and repeat when textures are loaded
watch(floorTextures, (textures) => {
  if (textures && textures.length === floorTexturePaths.length) {
    textures.forEach(texture => {
      if (texture) {
        texture.repeat.set(8, 8)
        texture.wrapS = RepeatWrapping
        texture.wrapT = RepeatWrapping
      }
    })
  }
}, { immediate: true })

// Create floor material options from loaded textures
const floorOptions = computed(() => ({
  color: '#82DBC5',
  roughness: 0.5,
  metalness: 0.5,
  map: floorTextures.value?.[0], // color
  normalMap: floorTextures.value?.[1], // normal
  roughnessMap: floorTextures.value?.[2], // roughness
  aoMap: floorTextures.value?.[3], // ambient occlusion
}))

// Check for texture loading errors
watch(floorError, (error) => {
  if (error) {
    console.error('Error loading floor textures:', error)
  }
})
watch(floorRef, (value) => {
  value.geometry.setAttribute('uv2', new Float32BufferAttribute(value.geometry.attributes.uv.array, 2))
})

const bushes = [
  {
    scale: [0.5, 0.5, 0.5],
    position: [0.8, 0.2, 2.2],
  },
  {
    scale: [0.25, 0.25, 0.25],
    position: [1.4, 0.1, 2.1],
  },
  {
    scale: [0.4, 0.4, 0.4],
    position: [-0.8, 0.1, 2.2],
  },
  {
    scale: [0.15, 0.15, 0.15],
    position: [-1, 0.05, 2.6],
  },
]

const graveGeometry = new BoxGeometry(0.6, 0.8, 0.1)
const graveMaterial = new MeshStandardMaterial({ color: '#727272' })
const graves = []

for (let i = 0; i < 50; i++) {
  const angle = Math.random() * Math.PI * 2 // Random angle
  const radius = 3 + Math.random() * 6 // Random radius
  const x = Math.cos(angle) * radius // Get the x position using cosinus
  const z = Math.sin(angle) * radius // Get the z position using sinus

  // Create the mesh
  const grave = new Mesh(graveGeometry, graveMaterial)
  grave.castShadow = true
  // Position
  grave.position.set(x, 0.3, z)

  // Rotation
  grave.rotation.z = (Math.random() - 0.5) * 0.4
  grave.rotation.y = (Math.random() - 0.5) * 0.4
  graves.push(grave)
}
</script>

<template>
  <TresMesh ref="floorRef" receive-shadow :rotation="[-Math.PI * 0.5, 0, 0]" :position="[0, 0, 0]">
    <TresPlaneGeometry :args="[20, 20]" />
    <TresMeshStandardMaterial v-bind="floorOptions" />
  </TresMesh>
  <TresMesh v-for="({ position, scale }, index) in bushes" :key="index" :position="position" :scale="scale">
    <TresSphereGeometry :args="[1, 16, 16]" />
    <TresMeshStandardMaterial color="#89c854" />
  </TresMesh>
  <TresGroup ref="gravesRef">
    <TresMesh v-for="({ position, scale, rotation }, index) in graves" :key="index" :position="position" :scale="scale"
      :rotation="rotation" :material="graveMaterial" :geometry="graveGeometry" />
  </TresGroup>
</template>
