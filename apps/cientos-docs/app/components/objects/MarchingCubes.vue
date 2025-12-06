<script setup lang="ts">
import { MarchingCube, MarchingCubes, MarchingPlane, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { NoToneMapping, Vector3 } from 'three'

const rand = () => (Math.random() - 0.5) * 1.25
const positions = Array.from({ length: 40 }, () => new Vector3(rand(), rand(), rand()))
</script>

<template>
  <TresCanvas clear-color="#222" :tone-mapping="NoToneMapping">
    <TresPerspectiveCamera />
    <OrbitControls />

    <MarchingCubes :resolution="40" :max-poly-count="40000">
      <MarchingPlane plane-type="y" />
      <MarchingCube
        v-for="position, i of positions"
        :key="i"
        :position="position"
      />
      <TresMeshPhongMaterial specular="#111111" :shininess="30" color="#049ef4" :reflectivity="1" />
    </MarchingCubes>

    <TresAxesHelper />
    <TresDirectionalLight color="#ffffff" :intensity="3" :position="[0, 200, 0]" />
    <TresDirectionalLight color="#ffffff" :intensity="3" :position="[100, 200, 100]" />
  </TresCanvas>
</template>
