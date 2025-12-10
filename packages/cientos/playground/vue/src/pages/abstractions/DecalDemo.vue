<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { Box, Decal,DecalDebugUI, OrbitControls } from '@tresjs/cientos'
import { useTexture, useTextures } from '@tresjs/cientos'
import { SRGBColorSpace } from 'three'

const gl = {
  clearColor: '#F6B03B',
}

const { state: texture } = useTexture('/decal/tresjs-dark.png')

const texturePaths = [
  '/decal/tresjs-dark.png',
  '/decal/vue.png',
  '/decal/threejs.png',
]

const dataExport = [
    {
        "id": "8e6745c4-6e09-47dc-a9a2-019c23a83a9a",
        "position": [
            1,
            0.2951952871379424,
            0.250421752701838
        ],
        "orientation": [
            0,
            1.5707963267948966,
            0
        ],
        "size": [
            0.9749061269648661,
            0.22261635970063873,
            1
        ],
        "zIndex": 1,
        "map": "tresjs-dark.png"
    },
    {
        "id": "a4992c8d-9829-4f11-a474-62774fcc728f",
        "position": [
            -0.03821859238896553,
            0.17164338457313488,
            1
        ],
        "orientation": [
            0,
            0,
            0
        ],
        "size": [
            0.7071067811865475,
            0.7071067811865475,
            1
        ],
        "zIndex": 4,
        "map": "vue.png"
    },
    {
        "id": "1b87677c-e43e-4e94-9688-9ecb186f9d56",
        "position": [
            0.6398835987226126,
            -0.45158818496946274,
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
        "zIndex": 8,
        "map": "tresjs-dark.png"
    },
    {
        "id": "2baa1fd9-1665-4058-9299-7f8fed522ffa",
        "position": [
            -0.36800979037350084,
            -0.753894120825642,
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
        "zIndex": 7,
        "map": "tresjs-dark.png"
    }
]

const { textures } = useTextures(texturePaths)

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

    <OrbitControls
      make-default
    />

    <TresGridHelper
      :args="[10, 10]"
      :position-y="-.5"
    />


    <TresMesh :scale="2" :position-x="0">
      <TresBoxGeometry />
      <TresMeshBasicMaterial color="#f6f6f6"  />
    

      <!-- <Decal :map="texture" debug /> -->
      <Decal :map="textures" debug :data="dataExport">
      </Decal>

    </TresMesh>

  </TresCanvas>
</template>
