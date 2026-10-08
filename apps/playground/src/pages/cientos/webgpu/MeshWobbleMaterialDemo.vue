<script setup lang="ts">
import { TresCanvas } from '@tresjs/core/webgpu'
import { MeshWobbleMaterial, OrbitControls } from '@tresjs/cientos/webgpu'
// WebGLRenderer cannot run node materials, so `renderer: webgl` shows the GLSL MeshWobbleMaterial.
import { MeshWobbleMaterial as GlslMeshWobbleMaterial } from '@tresjs/cientos'
import { TresLeches, useControls } from '@tresjs/leches'
import { NoToneMapping } from 'three'
import { useBackendControl } from '@/composables/useBackendControl'
import { useRendererSwitch } from '@/composables/useRendererSwitch'

const uuid = 'webgpu-mesh-wobble-material'
const onReady = useBackendControl(uuid)
const rendererFactory = useRendererSwitch(uuid)
const WobbleComponent = rendererFactory ? GlslMeshWobbleMaterial : MeshWobbleMaterial

const { speed, factor, color, roughness, metalness } = useControls({
  speed: { value: 2, min: 0, max: 10, step: 0.1 },
  factor: { value: 1, min: 0, max: 8, step: 0.1 },
  color: { type: 'color', value: '#f25042' },
  roughness: { value: 0.4, min: 0, max: 1, step: 0.01 },
  metalness: { value: 0, min: 0, max: 1, step: 0.01 },
}, { uuid })

const checks = [
  'The torus twists around the Y axis in a wave that moves up and down',
  '`speed` changes how fast the wave moves, `factor` how far it twists. `factor: 0` stops the twist',
  'The light follows the twisted shape: the lit side stays toward the directional light',
  '`color`, `roughness` and `metalness` pass through to the standard material',
  'The result matches `renderer: webgl` (the GLSL material). The shading can differ a little when the camera tilts, because the GLSL version rotates the view-space normal',
  'No errors and no <MeshWobbleMaterial> WebGPU warning in the console',
]
</script>

<template>
  <TresLeches :uuid="uuid">
    <ul class="list-disc pl-4 text-xs">
      <li v-for="check in checks" :key="check">{{ check }}</li>
    </ul>
  </TresLeches>
  <TresCanvas :renderer="rendererFactory" clear-color="#82dbc5" :tone-mapping="NoToneMapping" @ready="onReady">
    <TresPerspectiveCamera :position="[3, 3, 3]" />
    <OrbitControls />
    <TresMesh>
      <TresTorusGeometry :args="[1, 0.4, 64, 128]" />
      <component
        :is="WobbleComponent"
        :speed="speed"
        :factor="factor"
        :color="color"
        :roughness="roughness"
        :metalness="metalness"
      />
    </TresMesh>
    <TresGridHelper :args="[10, 10]" />
    <TresAmbientLight :intensity="1" />
    <TresDirectionalLight :intensity="2" :position="[2, 2, 2]" />
  </TresCanvas>
</template>
