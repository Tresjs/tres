<script setup lang="ts">
import { TresCanvas } from '@tresjs/core/webgpu'
import { MeshDiscardMaterial, OrbitControls } from '@tresjs/cientos/webgpu'
// WebGLRenderer cannot run node materials, so `renderer: webgl` shows the GLSL MeshDiscardMaterial.
import { MeshDiscardMaterial as GlslMeshDiscardMaterial } from '@tresjs/cientos'
import { TresLeches, useControls } from '@tresjs/leches'
import { NoToneMapping } from 'three'
import { useBackendControl } from '@/composables/useBackendControl'
import { useRendererSwitch } from '@/composables/useRendererSwitch'

const uuid = 'webgpu-mesh-discard-material'
const onReady = useBackendControl(uuid)
const rendererFactory = useRendererSwitch(uuid)
const DiscardComponent = rendererFactory ? GlslMeshDiscardMaterial : MeshDiscardMaterial

const { discard } = useControls({
  discard: true,
}, { uuid })

const checks = [
  'With `discard` on, the large box is invisible. Its small child box above it and its shadow on the floor stay visible',
  'With `discard` off, the large box shows with a normal material, and the shadow does not change',
  'The result matches `renderer: webgl` (the GLSL material)',
  'No errors and no <MeshDiscardMaterial> WebGPU warning in the console',
]
</script>

<template>
  <TresLeches :uuid="uuid">
    <ul class="list-disc pl-4 text-xs">
      <li v-for="check in checks" :key="check">{{ check }}</li>
    </ul>
  </TresLeches>
  <TresCanvas :renderer="rendererFactory" clear-color="#333333" shadows :tone-mapping="NoToneMapping" @ready="onReady">
    <TresPerspectiveCamera :position="[4, 4, 4]" :look-at="[0, 0, 0]" />
    <OrbitControls />
    <TresMesh :position-y="1" cast-shadow>
      <TresBoxGeometry />
      <component :is="DiscardComponent" v-if="discard" />
      <TresMeshNormalMaterial v-else />
      <TresMesh :position-y="1" :scale="0.33" cast-shadow>
        <TresBoxGeometry />
        <TresMeshNormalMaterial />
      </TresMesh>
    </TresMesh>
    <TresMesh :rotation-x="-Math.PI / 2" receive-shadow>
      <TresPlaneGeometry :args="[10, 10]" />
      <TresMeshStandardMaterial color="#f0f0f0" />
    </TresMesh>
    <TresAmbientLight :intensity="0.5" />
    <TresDirectionalLight :intensity="2" :position="[3, 5, 2]" cast-shadow />
  </TresCanvas>
</template>
