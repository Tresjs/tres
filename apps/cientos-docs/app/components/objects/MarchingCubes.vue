<script setup lang="ts">
import { MarchingCube, MarchingCubes, MarchingPlane, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { NoToneMapping, Vector3 } from 'three'
import { TresLeches, useControls } from '@tresjs/leches'

const rand = () => (Math.random() - 0.5) * 1.25
const positions = Array.from({ length: 40 }, () => new Vector3(rand(), rand(), rand()))

const {
  resolution,
  maxPolyCount,
  enableUvs,
  enableColors,
  planeType,
  strength,
  subtract,
  color,
} = useControls({
  resolution: { value: 40, min: 8, max: 128, step: 1 },
  maxPolyCount: { value: 40000, min: 1000, max: 200000, step: 1000 },
  enableUvs: false,
  enableColors: false,
  planeType: { value: 'y', options: ['x', 'y', 'z'] },
  strength: { value: 0.5, min: 0.01, max: 5, step: 0.01 },
  subtract: { value: 12, min: 0, max: 50, step: 1 },
  color: '#049ef4',
})
</script>

<template>
  <div class="aspect-video">
    <TresCanvas clear-color="#222" :tone-mapping="NoToneMapping">
      <TresPerspectiveCamera />
      <OrbitControls />

      <MarchingCubes :resolution="resolution" :max-poly-count="maxPolyCount" :enable-uvs="enableUvs" :enable-colors="enableColors">
        <MarchingPlane :plane-type="planeType" />
        <MarchingCube
          v-for="position, i of positions"
          :key="i"
          :position="position"
          :strength="strength"
          :subtract="subtract"
          :color="color"
        />
        <TresMeshPhongMaterial specular="#111111" :shininess="30" :color="color" :reflectivity="1" />
      </MarchingCubes>

      <TresAxesHelper />
      <TresDirectionalLight color="#ffffff" :intensity="3" :position="[0, 200, 0]" />
      <TresDirectionalLight color="#ffffff" :intensity="3" :position="[100, 200, 100]" />
    </TresCanvas>
  </div>
  <TresLeches :float="false" />
</template>
