<script setup lang="ts">
import { MeshPortalMaterial, OrbitControls } from '@tresjs/cientos'
import { useControls } from '@tresjs/leches'
import PortalScene from './PortalScene.vue'

const uuid = 'materials-mesh-portal'
useControls('fpsgraph', { uuid })

const { blend, resolution, worldUnits } = useControls({
  blend: { value: 0, min: 0, max: 1, step: 0.01 },
  resolution: { value: 1024, min: 64, max: 2048, step: 64 },
  worldUnits: false,
}, { uuid })
</script>

<template>
  <TresPerspectiveCamera :position="[0, 0, 6]" :fov="50" :look-at="[0, 0, 0]" />
  <OrbitControls />

  <!-- Host portal surface -->
  <TresMesh>
    <TresPlaneGeometry :args="[3, 4]" />
    <MeshPortalMaterial :blend="blend" :resolution="resolution" :world-units="worldUnits">
      <!-- Portal scene: rendered off-main, shown through the surface -->
      <PortalScene />
    </MeshPortalMaterial>
  </TresMesh>

  <!-- World object to contrast against the portal -->
  <TresMesh :position="[-3.5, 0, 0]">
    <TresSphereGeometry :args="[0.7, 32, 32]" />
    <TresMeshNormalMaterial />
  </TresMesh>
  <TresAmbientLight :intensity="0.8" />
</template>
