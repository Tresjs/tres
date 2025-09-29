<script setup lang="ts">
/* eslint-disable no-console */
import { useFBX } from '@tresjs/cientos'
import { Mesh } from 'three'

// Inject the shared state for loading progress
const state = inject<{
  hasFinishLoading: boolean
  progress: number
}>('fbx-loader-state')!

// Use the new reactive useFBX composable
const { state: model, isLoading, nodes, materials } = useFBX(
  'https://raw.githubusercontent.com/Tresjs/assets/main/models/fbx/low-poly-truck/Jeep_done.fbx',
)

// Log nodes when they become available
watch(nodes, (newNodes) => {
  console.log('FBX nodes', newNodes)
})

// Log materials when they become available
watch(materials, (newMaterials) => {
  console.log('FBX materials', newMaterials)
})

// Handle model loading and apply transformations
watch(model, (newModel) => {
  if (newModel) {
    console.log('FBX model loaded', newModel)

    // Apply transformations and shadow settings
    newModel.scale.set(0.01, 0.01, 0.01)
    newModel.position.set(0, -2.6, 0) // Adjusted for TresGroup position offset
    newModel.rotation.y = -Math.PI * 0.5

    // Enable shadows for all meshes
    newModel.traverse((child) => {
      if (child instanceof Mesh) {
        child.castShadow = true
      }
    })

    // Simulate loading completion after model is ready
    setTimeout(() => {
      state.hasFinishLoading = true
    }, 500)
  }
}, { immediate: true })

// Track loading state
watch(isLoading, (loading) => {
  console.log('FBX loading state:', loading)
  if (!loading && model.value) {
    state.progress = 100
  }
  else {
    state.progress = 0
  }
}, { immediate: true })
</script>

<template>
  <primitive v-if="model && !isLoading" :object="model" />
</template>
