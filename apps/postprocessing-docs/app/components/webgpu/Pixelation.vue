<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos/webgpu'
import { TresCanvas } from '@tresjs/core/webgpu'
import { useControls } from '@tresjs/leches'
import { defineEffect, EffectComposer } from '@tresjs/post-processing/webgpu'
import { pixelationPass } from 'three/addons/tsl/display/PixelationPassNode.js'

// The pass renders the scene itself and ignores `input`, so it must be the first effect.
const Pixelation = defineEffect({
  name: 'Pixelation',
  props: { pixelSize: 6, normalEdgeStrength: 0.3, depthEdgeStrength: 0.4 },
  create: (_input, { scene, camera, uniforms }) =>
    pixelationPass(scene, camera, uniforms.pixelSize, uniforms.normalEdgeStrength, uniforms.depthEdgeStrength),
})

const uuid = inject<string>('uuid')

const { pixelSize, normalEdgeStrength, depthEdgeStrength } = useControls({
  pixelSize: { value: 8, min: 1, max: 32, step: 1 },
  normalEdgeStrength: { value: 0.3, min: 0, max: 2, step: 0.01 },
  depthEdgeStrength: { value: 0.4, min: 0, max: 1, step: 0.01 },
}, { uuid })
</script>

<template>
  <TresCanvas clear-color="#121212">
    <TresPerspectiveCamera :position="[3, 2, 4]" :look-at="[0, 0, 0]" />
    <OrbitControls />

    <TresMesh :position="[1, 0.5, 1]">
      <TresBoxGeometry />
      <TresMeshStandardMaterial color="hotpink" />
    </TresMesh>
    <TresMesh :position="[-1.5, 0.75, 0]">
      <TresConeGeometry :args="[1, 1.5, 4, 1, false, Math.PI * 0.25]" />
      <TresMeshStandardMaterial color="aqua" />
    </TresMesh>

    <TresGridHelper />
    <TresAmbientLight :intensity="0.9" />
    <TresDirectionalLight :position="[-10, 5, 8]" :intensity="2" />

    <EffectComposer>
      <Pixelation
        :pixel-size="pixelSize"
        :normal-edge-strength="normalEdgeStrength"
        :depth-edge-strength="depthEdgeStrength"
      />
    </EffectComposer>
  </TresCanvas>
</template>
