<script setup lang="ts">
/* eslint-disable no-console */
import { useGLTF } from '@tresjs/cientos'

const state = inject<{
  hasFinishLoading: boolean
  progress: number
}>('gltf-loader-state')!

const { state: model, progress, nodes, materials } = useGLTF(
  '/blender-cube-draco.glb',
  { draco: true },
)

watch(nodes, (newNodes) => {
  console.log('nodes', newNodes)
})

watch(materials, (newMaterials) => {
  console.log('materials', newMaterials)
})

watch(model, (newModel) => {
  console.log('model', newModel)
  setTimeout(() => {
    state.hasFinishLoading = true
  }, 1000)
})

watch(progress, (newProgress) => {
  console.log('progress', newProgress)
  state.progress = newProgress.percentage
}, { immediate: true })
</script>

<template>
  <primitive v-if="nodes.BlenderCube" :object="nodes.BlenderCube" />
</template>
