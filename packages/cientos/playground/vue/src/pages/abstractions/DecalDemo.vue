<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { Box, Decal,DecalDebugUI, OrbitControls } from '@tresjs/cientos'
import { useTexture, useTextures, Environment } from '@tresjs/cientos'
import { SRGBColorSpace } from 'three'

import { useGraph, useLoader } from '@tresjs/core'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { computed } from 'vue'

const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/')

const gl = {
  clearColor: '#F6B03B',
}

const { state: texture } = useTexture('/decal/tresjs-dark.png')

const texturePaths = [
  '/decal/tresjs-dark.png',
  '/decal/vue.png',
  '/decal/threejs.png',
]

const { state: model, isLoading, error } = useLoader(
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

const torusRef = shallowRef(null)

const { textures } = useTextures(texturePaths)

const scene = computed(() => model.value?.scene)

const graph = useGraph(scene)

const nodes = computed(() => graph.value?.nodes)

watch(nodes, (newScene) => {
  if (newScene) {
    console.log('Loaded scene:', newScene)
  }
})

watch(texture, () => {
  if(!texture.value?.image) return

  texture.value.colorSpace = SRGBColorSpace
})

watch(textures, (val) => {
  if (Array.isArray(val)) {
    val.forEach(t => {
      if(t) t.colorSpace = SRGBColorSpace
    })
  }
}, { immediate: true })

</script>

<template>
  <DecalDebugUI  />

  <TresCanvas
    v-bind="gl"
  >
    <TresPerspectiveCamera
      :position="[0, 2, 8]"
    />

    <Suspense>
      <Environment
        preset="hangar"
      />
    </Suspense>

    <OrbitControls
      make-default
    />

    <TresGridHelper
      :args="[10, 10]"
      :position-y="-.5"
    />

    <TresMesh :scale="1" :position-x="-4">
      <TresSphereGeometry />
      <TresMeshBasicMaterial color="#f6f6f6"  />

      <Decal :map="texture" debug />
    </TresMesh>

    <primitive
      v-if="nodes?.BlenderCube"
      :object="nodes.BlenderCube"
      :position-x="4"
    >
    </primitive>

    <TresMesh ref="torusRef" :scale="1" :position="[-2, 0, -2.5]">
      <TresTorusGeometry :args="[1, 0.4, 16, 100]" />
      <TresMeshBasicMaterial color="#f6f6f6"  />
    </TresMesh>

    <Decal :map="textures" debug :mesh="torusRef" />

    <TresMesh :scale="2" :position-x="0">
      <TresBoxGeometry />
      <TresMeshBasicMaterial color="#f6f6f6"  />
    
      <Decal :map="textures" debug />

    </TresMesh>

  </TresCanvas>
</template>
