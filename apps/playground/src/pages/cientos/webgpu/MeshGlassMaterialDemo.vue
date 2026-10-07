<script setup lang="ts">
import { TresCanvas } from '@tresjs/core/webgpu'
import { OrbitControls, Sphere } from '@tresjs/cientos/webgpu'
// MeshGlassMaterial is left out of `/webgpu`, so this page imports it from the root entry to see
// how it behaves under WebGPURenderer.
import { MeshGlassMaterial } from '@tresjs/cientos'
import { TresLeches } from '@tresjs/leches'
import { NoToneMapping } from 'three'
import { useBackendControl } from '@/composables/useBackendControl'

const uuid = 'webgpu-mesh-glass-material'
const onReady = useBackendControl(uuid)

// The material extends MeshStandardMaterial and fakes `isMeshPhysicalMaterial` plus the
// STANDARD/PHYSICAL defines, so the WebGL shader chunks add transmission. WebGPURenderer builds
// node materials from the material type instead, so it may ignore all of that.
const checks = [
  'The torus knot and the sphere look like glass: the red plane shows through them, bent',
  'They are not solid white or grey like a plain standard material',
  'The console shows one warning that names <MeshGlassMaterial> and links to the WebGPU guide',
  'No errors in the console',
]
</script>

<template>
  <TresLeches :uuid="uuid">
    <ul class="list-disc pl-4 text-xs">
      <li v-for="check in checks" :key="check">{{ check }}</li>
    </ul>
  </TresLeches>
  <TresCanvas clear-color="#82DBC5" :tone-mapping="NoToneMapping" @ready="onReady">
    <TresPerspectiveCamera :position="[3, 3, 3]" />
    <OrbitControls />

    <TresMesh :position-x="2">
      <TresTorusKnotGeometry :args="[1, 0.4, 256, 20]" />
      <MeshGlassMaterial />
    </TresMesh>
    <Sphere :scale="0.5" :position-x="-1">
      <MeshGlassMaterial />
    </Sphere>

    <TresMesh :position="[0, 0, -2]">
      <TresPlaneGeometry :args="[6, 3]" />
      <TresMeshBasicMaterial :color="0xFF1111" />
    </TresMesh>
    <TresGridHelper :args="[10, 10]" />
    <TresAmbientLight :intensity="1" />
    <TresDirectionalLight :intensity="1" :position="[2, 2, 2]" />
  </TresCanvas>
</template>
