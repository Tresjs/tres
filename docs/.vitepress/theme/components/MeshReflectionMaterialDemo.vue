<script setup lang="ts">
import { TresCanvas, useTexture } from '@tresjs/core'
import { MeshReflectionMaterial, SVG as MySVG, OrbitControls } from '@tresjs/cientos'

const normalMapSrc = 'https://raw.githubusercontent.com/'
  + 'Tresjs/assets/main/textures/rock/normal.jpg'
const normalMap = await useTexture([normalMapSrc])
const svgSrc = '/logo.svg'
</script>

<template>
  <Suspense>
    <TresCanvas clear-color="white">
      <TresMesh :rotation-x="-Math.PI / 2">
        <TresPlaneGeometry :args="[30, 30]" />
        <MeshReflectionMaterial
          :roughness="0"
          :normal-map="normalMap"
        />
      </TresMesh>
      <TresPerspectiveCamera :position="[0, 2, 20]" />
      <OrbitControls />
      <MySVG
        :src="svgSrc"
        :position="[-8.0, 4, 0]"
        :scale="0.04"
        :depth="1"
      />
    </TresCanvas>
  </Suspense>
</template>
