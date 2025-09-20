<script setup lang="ts">
import { useGraph, useLoader } from '@tresjs/core'
import { type GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { computed } from 'vue'
import { OrbitControls } from '@tresjs/cientos'
import type { Object3D } from 'three'

// Setup DRACO loader for compressed GLTFs
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/')

// Load a GLTF model
const { state: model } = useLoader<GLTF>(
  GLTFLoader,
  'https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/blender-cube.glb',
  {
    extensions: (loader) => {
      if (loader instanceof GLTFLoader) {
        loader.setDRACOLoader(dracoLoader)
      }
    },
  },
)

// Extract the scene and graph
const scene = computed(() => model.value?.scene as unknown as Object3D | undefined)
const graph = useGraph(scene)

const nodes = computed(() => graph.value?.nodes)
</script>

<template>
  <TresPerspectiveCamera
    :position="[5, 5, 5]"
    :look-at="[0, 2, 0]"
  />
  <OrbitControls />
  <TresGridHelper />
  <TresAmbientLight :intensity="2" />
  <!-- Render the Cube node if it exists -->
  <primitive
    v-if="nodes?.BlenderCube"
    :position="[0, 2, 0]"
    :object="nodes?.BlenderCube"
  />
</template>
