<script setup lang="ts">
import { useGraph, useLoader } from '@tresjs/core'
import { type GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { computed } from 'vue'
import { Environment, OrbitControls } from '@tresjs/cientos'
import type { MeshPhysicalMaterial, Object3D } from 'three'
import { Color } from 'three'

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

watch(graph, (graph) => {
  const materials = graph?.materials

  const isMeshPhysicalMaterial = (maybeMaterial: unknown): maybeMaterial is MeshPhysicalMaterial =>
    typeof maybeMaterial === 'object' && !!maybeMaterial && 'isMeshPhysicalMaterial' in maybeMaterial && !!(maybeMaterial.isMeshPhysicalMaterial)

  if (materials?.Material && isMeshPhysicalMaterial(materials.Material)) {
    materials.Material.color = new Color('gold')
    materials.Material.roughness = 0.1
    materials.Material.metalness = 0.9
  }
})
</script>

<template>
  <TresPerspectiveCamera
    :position="[5, 5, 5]"
  />
  <OrbitControls />
  <Suspense>
    <Environment
      preset="studio"
      background
      :blur="0.6"
    />
  </Suspense>
  <TresAmbientLight :intensity="2" />
  <!-- Render the Cube node if it exists -->
  <primitive
    v-if="nodes?.BlenderCube"
    :object="nodes?.BlenderCube"
  />
</template>
