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
  'https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/suzanne/suzanne.glb',
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

const dataDecalBox = [
    {
        "id": "30c70d8b-0b71-4804-bfb7-d37f1bd5b7cd",
        "position": [
            0.022124477441550848,
            0.11464936998309772,
            1
        ],
        "orientation": [
            0,
            0,
            0
        ],
        "size": [
            0.9749061269648661,
            0.22261635970063873,
            1
        ],
        "zIndex": 2,
        "map": "tresjs-dark.png"
    }
]

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
      :position-y="-1"
    />

    <TresMesh :scale="1" :position="[-4, 0, 0]">
      <TresSphereGeometry />
      <TresMeshStandardMaterial color="#f6f6f6"  />

      <Decal :map="textures" debug  />
    </TresMesh>


    <TresMesh v-if="nodes?.Suzanne.geometry" :geometry="nodes?.Suzanne.geometry" :scale="1" :position="[3, 0, 0]" :rotation="[0, Math.PI, 0]">
      <primitive :object="nodes?.Suzanne.material" attach="material" />

      <Decal :map="textures" debug   />
    </TresMesh>

    <TresMesh ref="torusRef" :scale="1" :position="[-2, 0, -2.5]">
      <TresTorusGeometry :args="[1, 0.4, 16, 100]" />
      <TresMeshStandardMaterial color="#f6f6f6"  />
    </TresMesh>

    <Decal :map="textures" debug :mesh="torusRef" />

    <TresMesh :scale="2" :position-x="0">
      <TresBoxGeometry />
      <TresMeshStandardMaterial color="#f6f6f6"  />
    
      <Decal :map="textures" debug :data="dataDecalBox" />
    </TresMesh>

  </TresCanvas>
</template>
