<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { Box, Decal,DecalDebugUI, OrbitControls } from '@tresjs/cientos'
import { TresLeches, useControls } from '@tresjs/leches'
import { useTexture, useTextures } from '@tresjs/cientos'
import { SRGBColorSpace } from 'three'

const gl = {
  clearColor: '#F6B03B',
}

const { enabled, edgeColor, edgeThreshold } = useControls({
  enabled: { value: true, type: 'boolean', label: 'Enabled' },
  edgeColor: { value: '#292929', type: 'color', label: 'Color' },
  edgeThreshold: {
    label: 'Threshold Angle',
    value: 15,
    min: 1,
    max: 100,
    step: 1,
  },
})

const { state: texture } = useTexture('/decal/tresjs-dark.png')

const texturePaths = [
  '/decal/tresjs-dark.png',
  '/decal/vue.png',
  '/decal/threejs.png',
]

const testttttt = [
    {
        "id": "5d77b913-fb20-42ab-a9a6-d8c8c7642f4b",
        "position": [
            0.004330500446731596,
            1,
            0.16115118796291394
        ],
        "orientation": [
            -1.57069632679523,
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
  <TresLeches />
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
      <TresMeshBasicMaterial color="#f6f6f6" />
    

      <!-- <Decal :map="texture" debug /> -->
      <Decal :map="textures" debug :data="testttttt"   />

    </TresMesh>

  </TresCanvas>
</template>
