<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { MeshPortalMaterial, OrbitControls } from '@tresjs/cientos'
import { useControls } from '@tresjs/leches'

const uuid = inject(`uuid`)

const { blend } = useControls({
  blend: { value: 0, min: 0, max: 1, step: 0.01 },
}, { uuid })
</script>

<template>
  <TresCanvas clear-color="#0a0a14">
    <TresPerspectiveCamera :position="[0, 0, 6]" :look-at="[0, 0, 0]" />
    <OrbitControls />
    <TresMesh>
      <TresPlaneGeometry :args="[3, 4]" />
      <MeshPortalMaterial :blend="blend">
        <TresAmbientLight :intensity="0.5" />
        <TresDirectionalLight :position="[2, 4, 3]" :intensity="1.5" />
        <TresMesh :position="[0, 0, -1]">
          <TresTorusKnotGeometry :args="[0.6, 0.25, 128, 32]" />
          <TresMeshStandardMaterial color="#fbb03b" />
        </TresMesh>
      </MeshPortalMaterial>
    </TresMesh>
    <TresAmbientLight :intensity="0.8" />
  </TresCanvas>
</template>
