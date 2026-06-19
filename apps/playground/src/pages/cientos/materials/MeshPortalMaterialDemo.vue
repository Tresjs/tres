<script setup lang="ts">
import { MeshPortalMaterial, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'

const uuid = 'materials-mesh-portal'
useControls('fpsgraph', { uuid })

const { blend, resolution, worldUnits } = useControls({
  blend: { value: 0, min: 0, max: 1, step: 0.01 },
  resolution: { value: 512, min: 64, max: 2048, step: 64 },
  worldUnits: false,
}, { uuid })
</script>

<template>
  <TresLeches :uuid="uuid" />
  <TresCanvas clear-color="#0a0a14">
    <TresPerspectiveCamera :position="[0, 0, 6]" :fov="50" :look-at="[0, 0, 0]" />
    <OrbitControls />

    <!-- Host portal surface -->
    <TresMesh>
      <TresPlaneGeometry :args="[3, 4]" />
      <MeshPortalMaterial
        :blend="blend"
        :resolution="resolution"
        :world-units="worldUnits"
      >
        <!-- Portal scene: rendered off-main, shown through the surface -->
        <TresAmbientLight :intensity="0.5" />
        <TresDirectionalLight :position="[2, 4, 3]" :intensity="1.5" />
        <TresMesh :position="[0, 0, -1]">
          <TresTorusKnotGeometry :args="[0.6, 0.25, 128, 32]" />
          <TresMeshStandardMaterial color="#fbb03b" />
        </TresMesh>
        <TresMesh :position="[0, -1.5, 0]" :rotation="[-Math.PI / 2, 0, 0]">
          <TresPlaneGeometry :args="[10, 10]" />
          <TresMeshStandardMaterial color="#1a3a5a" />
        </TresMesh>
      </MeshPortalMaterial>
    </TresMesh>

    <!-- World object to contrast against the portal -->
    <TresMesh :position="[-3.5, 0, 0]">
      <TresSphereGeometry :args="[0.7, 32, 32]" />
      <TresMeshNormalMaterial />
    </TresMesh>
    <TresAmbientLight :intensity="0.8" />
  </TresCanvas>
</template>
