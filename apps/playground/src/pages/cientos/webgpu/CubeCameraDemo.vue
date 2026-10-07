<script setup lang="ts">
import { TresCanvas } from '@tresjs/core/webgpu'
import type { TresContextWithClock } from '@tresjs/core'
import { CubeCamera, OrbitControls } from '@tresjs/cientos/webgpu'
import { TresLeches } from '@tresjs/leches'
import { shallowRef } from 'vue'
import { useBackendControl } from '@/composables/useBackendControl'
import { useRendererSwitch } from '@/composables/useRendererSwitch'

const uuid = 'webgpu-cube-camera'
const onReady = useBackendControl(uuid)
const rendererFactory = useRendererSwitch(uuid)

const boxX = shallowRef(0)
const onLoop = ({ elapsed }: TresContextWithClock) => {
  boxX.value = Math.sin(elapsed) * 8
}

// CubeCamera renders the scene into a WebGLCubeRenderTarget and sets it as `envMap` on the meshes
// inside it. Same code path as <Environment> with Lightformers.
const checks = [
  'The torus knot and the sphere are mirrors: they reflect the pink box, the grid and each other',
  'The reflection of the pink box follows the box as it moves left and right',
  'The result matches `renderer: webgl` (same reflections, not mirrored left/right)',
  'No errors in the console',
]
</script>

<template>
  <TresLeches :uuid="uuid">
    <ul class="list-disc pl-4 text-xs">
      <li v-for="check in checks" :key="check">{{ check }}</li>
    </ul>
  </TresLeches>
  <TresCanvas :renderer="rendererFactory" clear-color="#222" @ready="onReady" @loop="onLoop">
    <TresPerspectiveCamera :position="[0, 8, 24]" :look-at="[0, 4, 0]" />
    <OrbitControls />

    <CubeCamera :position-y="4">
      <TresMesh :position-x="-5" :scale="2">
        <TresTorusKnotGeometry />
        <TresMeshPhysicalMaterial :roughness="0.05" :metalness="1" />
      </TresMesh>
      <TresMesh :position-x="5" :scale="3">
        <TresSphereGeometry :args="[1, 64, 32]" />
        <TresMeshPhysicalMaterial :roughness="0.05" :metalness="1" />
      </TresMesh>
    </CubeCamera>

    <TresMesh :position="[boxX, 2.5, -6]">
      <TresBoxGeometry :args="[3, 3, 3]" />
      <TresMeshStandardMaterial color="hotpink" />
    </TresMesh>

    <TresAmbientLight :intensity="3.14" />
    <TresPointLight :intensity="500" :position="[20, 20, 0]" />
    <TresGridHelper :args="[40, 20]" />
  </TresCanvas>
</template>
