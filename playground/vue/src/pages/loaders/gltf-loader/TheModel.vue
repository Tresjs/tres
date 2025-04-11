<script setup lang="ts">
/* eslint-disable no-console */
import { useGraph, useLoader, useLoop } from '@tresjs/core'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { inject, ref, watch } from 'vue'
import { LoadingManager, type Mesh } from 'three'

const state = inject<{
  hasFinishLoading: boolean
  progress: number
}>('gltf-loader-state')!

// Initialize DRACOLoader
const dracoLoader = new DRACOLoader()
// Set the path to the Draco decoder (you might want to use a CDN or local path)
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/')

const modelPath = ref('https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/blender-cube.glb')

const manager = new LoadingManager()
manager.onProgress = (url, loaded, total) => {
  const progress = (loaded / total) * 100
  state.progress = progress
}

const { state: model, isLoading } = useLoader(
  GLTFLoader,
  modelPath,
  {
    extensions: (loader) => {
      if (loader instanceof GLTFLoader) {
        loader.setDRACOLoader(dracoLoader)
      }
    },
    manager,
  },
)
const scene = computed(() => model.value?.scene)
const graph = useGraph(scene)

watch(graph, (newGraph) => {
  console.log('newGraph', newGraph)
})

/* setTimeout(() => {
  execute(0, 'https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/low-poly/cloud.gltf')
}, 2000) */

watch(isLoading, (newIsLoading) => {
  console.log('isLoading', newIsLoading)
  if (newIsLoading) {
    state.hasFinishLoading = false
  }
})

watch(model, (newModel) => {
  console.log('model', newModel)
  setTimeout(() => {
    state.hasFinishLoading = true
  }, 1000)
})

const modelRef = ref<Mesh>()

const { onBeforeRender } = useLoop()

onBeforeRender(({ elapsed }) => {
  if (modelRef.value) {
    modelRef.value.position.y = Math.sin(elapsed) + 2
  }
})

/* eslint-enable no-console */
</script>

<template>
  <primitive v-if="graph?.nodes.Cube" ref="modelRef" :position="[0, 2, 0]" :object="graph.nodes.Cube" />
</template>
