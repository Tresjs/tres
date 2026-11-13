<script setup lang="ts">
import { TresCanvas } from '@tresjs/core/webgpu'
import { OrbitControls } from '@tresjs/cientos/webgpu'
import { TresLeches, useControls } from '@tresjs/leches'
import { defineEffect, EffectComposer } from '@tresjs/post-processing/webgpu'
import { pixelationPass } from 'three/addons/tsl/display/PixelationPassNode.js'
import { useBackendControl } from '@/composables/useBackendControl'
import { Vignette } from '../composer/effects'

// The pass renders the scene itself and ignores `input`, so it must be the first effect.
const Pixelation = defineEffect({
  name: 'Pixelation',
  props: { pixelSize: 6, normalEdgeStrength: 0.3, depthEdgeStrength: 0.4 },
  create: (_input, { scene, camera, uniforms }) =>
    pixelationPass(scene, camera, uniforms.pixelSize, uniforms.normalEdgeStrength, uniforms.depthEdgeStrength),
})

const uuid = 'postprocessing-webgpu-pixelation'
const onReady = useBackendControl(uuid)

const { pixelation, pixelSize, normalEdgeStrength, depthEdgeStrength, vignette } = useControls({
  pixelation: true,
  pixelSize: { value: 6, min: 1, max: 32, step: 1 },
  normalEdgeStrength: { value: 0.3, min: 0, max: 2, step: 0.01 },
  depthEdgeStrength: { value: 0.4, min: 0, max: 1, step: 0.01 },
  vignette: false,
}, { uuid })
</script>

<template>
  <TresLeches :uuid="uuid" />
  <TresCanvas clear-color="#121212" shadows @ready="onReady">
    <TresPerspectiveCamera :position="[3, 2, 4]" :look-at="[0, 0, 0]" />
    <OrbitControls />

    <TresMesh :position="[1, 0.5, 1]" cast-shadow>
      <TresBoxGeometry />
      <TresMeshStandardMaterial color="hotpink" />
    </TresMesh>
    <TresMesh :position="[-1.5, 0.75, 0]" cast-shadow>
      <TresConeGeometry :args="[1, 1.5, 4, 1, false, Math.PI * 0.25]" />
      <TresMeshStandardMaterial color="aqua" />
    </TresMesh>
    <TresMesh :position="[0, 0.6, -1.5]" cast-shadow>
      <TresTorusKnotGeometry :args="[0.4, 0.15, 64, 16]" />
      <TresMeshStandardMaterial color="#fbb03b" />
    </TresMesh>
    <TresMesh :rotation-x="-Math.PI / 2" receive-shadow>
      <TresPlaneGeometry :args="[8, 8]" />
      <TresMeshStandardMaterial color="#3a3a3a" />
    </TresMesh>

    <TresAmbientLight :intensity="0.9" />
    <TresDirectionalLight :position="[-10, 5, 8]" :intensity="2" cast-shadow />

    <EffectComposer>
      <Pixelation
        v-if="pixelation"
        :pixel-size="pixelSize"
        :normal-edge-strength="normalEdgeStrength"
        :depth-edge-strength="depthEdgeStrength"
      />
      <Vignette v-if="vignette" />
    </EffectComposer>
  </TresCanvas>
</template>
