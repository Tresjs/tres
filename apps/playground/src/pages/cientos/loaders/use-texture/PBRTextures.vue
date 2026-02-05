<script setup lang="ts">
/* eslint-disable no-console */
import { TresCanvas } from '@tresjs/core'
import { Environment, OrbitControls, useGLTF, useTextures } from '@tresjs/cientos'
import type { MeshStandardMaterial } from 'three'

// Load the 3D model
const { nodes, materials } = useGLTF('https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/blender-cube.glb', { draco: true })
const cube = computed(() => nodes.value?.BlenderCube)
const material = computed(() => materials.value?.Material)

// Define texture paths
const texturePaths = [
  'https://raw.githubusercontent.com/Tresjs/assets/main/textures/rusted-metal/Metal053C_4K-JPG_Color.jpg',
  'https://raw.githubusercontent.com/Tresjs/assets/main/textures/rusted-metal/Metal053C_4K-JPG_NormalGL.jpg',
  'https://raw.githubusercontent.com/Tresjs/assets/main/textures/rusted-metal/Metal053C_4K-JPG_Roughness.jpg',
  'https://raw.githubusercontent.com/Tresjs/assets/main/textures/rusted-metal/Metal053C_4K-JPG_Metalness.jpg',
  'https://raw.githubusercontent.com/Tresjs/assets/main/textures/rusted-metal/Metal053C_4K-JPG_Displacement.jpg',
]

// Load all PBR textures at once
const { textures, isLoading, error } = useTextures(texturePaths)

// Apply textures to material when loaded
watch([material, textures], ([modelMaterial, textures]) => {
  if (modelMaterial && textures && textures.length === texturePaths.length) {
    // Cast to MeshStandardMaterial to access PBR properties
    const pbrMaterial = modelMaterial as MeshStandardMaterial

    // Apply textures
    pbrMaterial.map = textures[0]
    pbrMaterial.normalMap = textures[1]
    pbrMaterial.roughnessMap = textures[2]
    pbrMaterial.metalnessMap = textures[3]
    pbrMaterial.displacementMap = textures[4]

    // Set material properties
    pbrMaterial.displacementScale = 0
    pbrMaterial.metalness = 0.8
    pbrMaterial.roughness = 0.2
  }
})

// Log loading state and errors
watch(isLoading, (_loading) => {
  // Only log errors, not loading state
  console.log('isLoading', _loading)
}, { immediate: true })

watch(error, (errs) => {
  if (errs) {
    console.error('Error loading textures:', errs)
  }
})
</script>

<template>
  <Transition
    name="fade-overlay"
    enter-active-class="opacity-1 transition-opacity duration-200"
    leave-active-class="opacity-0 transition-opacity duration-200"
  >
    <div
      v-show="isLoading"
      class="absolute bg-white t-0 l-0 w-full h-full z-20 flex justify-center items-center text-black font-mono"
    >
      <div class="w-200px">
        Loading...
      </div>
    </div>
  </Transition>
  <TresCanvas clear-color="#4f4f4f">
    <Suspense>
      <Environment preset="studio" background :blur="1" />
    </Suspense>
    <TresPerspectiveCamera :position="[8, 8, 8]" />
    <OrbitControls />
    <TresGridHelper />
    <TresAmbientLight :intensity="2" />
    <TresGroup position-y="2">
      <primitive v-if="cube" :object="cube" />
    </TresGroup>
  </TresCanvas>
</template>
